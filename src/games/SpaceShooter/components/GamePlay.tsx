import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { gameModes } from '../config/gameModes';
import { Player, Enemy, Projectile, PowerUp, Particle } from '../utils/gameEntities';

interface GamePlayProps {
  mode: string;
  onGameOver: (score: number, stats: {
    enemiesDefeated: number;
    bossesDefeated: number;
    wavesCompleted: number;
    timeElapsed: number;
    shotsFired: number;
    shotsHit: number;
    accuracy: number;
  }, reason?: 'hearts' | 'time') => void;
  onScore: (score: number) => void;
  isMuted: boolean;
  playLaser: () => void;
  playExplosion: () => void;
  playPowerUp: () => void;
  playBossAlert: () => void;
}

interface Wave {
  enemyCount: number;
  enemySpeed: number;
  isBossWave: boolean;
}

export default function GamePlay({ mode, onGameOver, onScore, isMuted, playLaser }: GamePlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameLoop, setGameLoop] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [wave, setWave] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes per game
  const [currentWave, setCurrentWave] = useState(1);
  const [waveProgress, setWaveProgress] = useState(0);
  const [isBossWave, setIsBossWave] = useState(false);
  const [lives, setLives] = useState(3);
  const touchRef = useRef<{ x: number | null; lastShot: number }>({ x: null, lastShot: 0 });
  const [stats, setStats] = useState({
    enemiesDefeated: 0,
    bossesDefeated: 0,
    wavesCompleted: 0,
    timeElapsed: 0,
    shotsFired: 0,
    shotsHit: 0,
    accuracy: 0,
  });

  // Game state
  const gameState = useRef({
    player: {
      x: 0,
      y: 0,
      width: 40,
      height: 40,
      speed: 5,
      health: 100,
      maxHealth: 100,
      shield: 0,
      powerUps: [],
      fireRate: 250,
      lastShot: 0,
    } as Player,
    enemies: [] as Enemy[],
    projectiles: [] as Projectile[],
    powerUps: [] as PowerUp[],
    particles: [] as Particle[],
    stars: [] as { x: number; y: number; speed: number; size: number }[],
    lastTime: 0,
    deltaTime: 0,
  });

  // Input state
  const keys = useRef<{ [key: string]: boolean }>({});

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keys.current[e.key] = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keys.current[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Initialize game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateCanvasSize = () => {
      const container = canvas.parentElement;
      if (!container) return;

      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Initialize stars for parallax background
    const initStars = () => {
      const stars = [];
      for (let i = 0; i < 100; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          speed: 0.1 + Math.random() * 0.5,
          size: 1 + Math.random() * 2,
        });
      }
      gameState.current.stars = stars;
    };
    initStars();

    // Initialize player position
    gameState.current.player.x = canvas.width / 2 - gameState.current.player.width / 2;
    gameState.current.player.y = canvas.height - gameState.current.player.height - 20;

    // Start game loop
    let animationId: number;
    const gameLoop = (timestamp: number) => {
      if (!gameState.current.lastTime) {
        gameState.current.lastTime = timestamp;
      }
      gameState.current.deltaTime = timestamp - gameState.current.lastTime;
      gameState.current.lastTime = timestamp;

      if (!isPaused) {
        update();
        draw(ctx);
      }
      animationId = requestAnimationFrame(gameLoop);
    };
    animationId = requestAnimationFrame(gameLoop);
    setGameLoop(animationId);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isPaused]);

  const getWaveConfig = (waveNumber: number): Wave => {
    if (waveNumber % 5 === 0) {
      return {
        enemyCount: 1,
        enemySpeed: 1 + waveNumber * 0.1,
        isBossWave: true
      };
    }
    return {
      enemyCount: 3 + Math.floor(waveNumber * 1.5),
      enemySpeed: 1 + waveNumber * 0.2,
      isBossWave: false
    };
  };

  // Spawn enemies
  const spawnEnemies = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const wave = getWaveConfig(currentWave);
    if (gameState.current.enemies.length === 0) {
      if (wave.isBossWave) {
        // Spawn boss
        const boss: Enemy = {
          x: canvas.width / 2 - 50,
          y: 50,
          width: 100,
          height: 100,
          speed: wave.enemySpeed,
          health: 100 * currentWave,
          maxHealth: 100 * currentWave,
          type: 'boss',
          points: 1000,
          fireRate: 1000,
          lastShot: 0,
          pattern: 'zigzag'
        };
        gameState.current.enemies.push(boss);
        setIsBossWave(true);
      } else {
        // Spawn regular enemies
        for (let i = 0; i < wave.enemyCount; i++) {
          const enemy: Enemy = {
            x: Math.random() * (canvas.width - 30),
            y: -50 - (Math.random() * 200),
            width: 30,
            height: 30,
            speed: wave.enemySpeed,
            health: 20,
            maxHealth: 20,
            type: 'regular',
            points: 100,
            fireRate: 2000,
            lastShot: 0
          };
          gameState.current.enemies.push(enemy);
        }
        setIsBossWave(false);
      }
    }
  };

  // Update enemies
  const updateEnemies = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    gameState.current.enemies = gameState.current.enemies.filter(enemy => {
      // Move enemies
      if (enemy.type === 'boss') {
        // Boss movement pattern
        if (enemy.pattern === 'zigzag') {
          enemy.x += Math.sin(Date.now() / 1000) * enemy.speed * 2;
          enemy.y = 50 + Math.sin(Date.now() / 2000) * 30;
        }
      } else {
        // Regular enemy movement
        enemy.y += enemy.speed;
      }

      // Enemy shooting
      const now = Date.now();
      if (now - enemy.lastShot > enemy.fireRate) {
        const projectile: Projectile = {
          x: enemy.x + enemy.width / 2,
          y: enemy.y + enemy.height,
          width: 4,
          height: 10,
          speed: 5,
          damage: enemy.type === 'boss' ? 20 : 10,
          health: 1,
          maxHealth: 1,
          isEnemy: true
        };
        gameState.current.projectiles.push(projectile);
        enemy.lastShot = now;
      }

      // Remove if off screen or dead
      return enemy.y < canvas.height && enemy.health > 0;
    });
  };

  // Add touch controls
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      touchRef.current.x = touch.clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (touchRef.current.x === null) return;

      const touch = e.touches[0];
      const player = gameState.current.player;
      const deltaX = touch.clientX - touchRef.current.x;
      
      player.x = Math.max(0, Math.min(canvas.width - player.width, player.x + deltaX));
      touchRef.current.x = touch.clientX;
    };

    const handleTouchEnd = () => {
      touchRef.current.x = null;
    };

    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('touchend', handleTouchEnd);

    return () => {
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  // Auto-shoot for mobile
  useEffect(() => {
    const autoShootInterval = setInterval(() => {
      if (touchRef.current.x !== null) { // Only shoot when touching screen
        const now = Date.now();
        const player = gameState.current.player;
        if (now - player.lastShot > player.fireRate) {
          const projectile: Projectile = {
            x: player.x + player.width / 2 - 2,
            y: player.y,
            width: 4,
            height: 10,
            speed: 7,
            damage: 10,
            health: 1,
            maxHealth: 1,
            isEnemy: false,
          };
          gameState.current.projectiles.push(projectile);
          player.lastShot = now;
          if (!isMuted) playLaser();
        }
      }
    }, 100);

    return () => clearInterval(autoShootInterval);
  }, [isMuted, playLaser]);

  // Update collision detection to handle lives
  const checkCollisions = () => {
    // Player projectiles hitting enemies
    gameState.current.projectiles = gameState.current.projectiles.filter(projectile => {
      if (projectile.isEnemy) return true;

      let hit = false;
      gameState.current.enemies = gameState.current.enemies.map(enemy => {
        if (
          projectile.x < enemy.x + enemy.width &&
          projectile.x + projectile.width > enemy.x &&
          projectile.y < enemy.y + enemy.height &&
          projectile.y + projectile.height > enemy.y
        ) {
          enemy.health -= projectile.damage;
          hit = true;
          if (enemy.health <= 0) {
            setScore(prev => prev + enemy.points);
          }
        }
        return enemy;
      });
      return !hit;
    });

    // Enemy projectiles hitting player or enemy collision with player
    const player = gameState.current.player;
    let playerHit = false;

    // Check enemy collision with player
    gameState.current.enemies = gameState.current.enemies.filter(enemy => {
      // Check if enemy touches player
      if (
        player.x < enemy.x + enemy.width &&
        player.x + player.width > enemy.x &&
        player.y < enemy.y + enemy.height &&
        player.y + player.height > enemy.y
      ) {
        playerHit = true;
        return false; // Remove enemy when it hits player
      }
      return true;
    });

    // Check enemy projectiles
    gameState.current.projectiles = gameState.current.projectiles.filter(projectile => {
      if (!projectile.isEnemy) return true;

      if (
        projectile.x < player.x + player.width &&
        projectile.x + projectile.width > player.x &&
        projectile.y < player.y + player.height &&
        projectile.y + projectile.height > player.y
      ) {
        playerHit = true;
        return false;
      }
      return true;
    });

    if (playerHit) {
      setLives(prev => {
        const newLives = prev - 1;
        if (newLives <= 0) {
          onGameOver(score, stats, 'hearts');
        }
        return newLives;
      });

      // Reset player position and provide brief invulnerability
      player.x = canvasRef.current!.width / 2 - player.width / 2;
      
      // Remove all enemies from screen when player gets hit
      gameState.current.enemies = [];
      gameState.current.projectiles = gameState.current.projectiles.filter(p => !p.isEnemy);
    }
  };

  // Update game logic
  const update = () => {
    updateStars();
    updatePlayer();
    updateProjectiles();
    updateEnemies();
    checkCollisions();
    spawnEnemies();

    // Check wave completion
    if (gameState.current.enemies.length === 0) {
      setCurrentWave(prev => prev + 1);
    }
  };

  const updatePlayer = () => {
    const player = gameState.current.player;
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Movement
    if (keys.current['ArrowLeft'] || keys.current['a']) {
      player.x = Math.max(0, player.x - player.speed);
    }
    if (keys.current['ArrowRight'] || keys.current['d']) {
      player.x = Math.min(canvas.width - player.width, player.x + player.speed);
    }

    // Shooting
    if (keys.current[' '] || keys.current['w'] || keys.current['ArrowUp']) {
      const now = Date.now();
      if (now - player.lastShot > player.fireRate) {
        const projectile: Projectile = {
          x: player.x + player.width / 2 - 2,
          y: player.y,
          width: 4,
          height: 10,
          speed: 7,
          damage: 10,
          health: 1,
          maxHealth: 1,
          isEnemy: false,
        };
        gameState.current.projectiles.push(projectile);
        player.lastShot = now;
        if (!isMuted) playLaser();
      }
    }
  };

  const updateProjectiles = () => {
    gameState.current.projectiles = gameState.current.projectiles.filter(projectile => {
      projectile.y -= projectile.speed;
      return projectile.y + projectile.height > 0;
    });
  };

  const updateStars = () => {
    gameState.current.stars = gameState.current.stars.map(star => ({
      ...star,
      y: (star.y + star.speed) % (canvasRef.current?.height || 0),
    }));
  };

  // Draw game state
  const draw = (ctx: CanvasRenderingContext2D) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Clear canvas
    ctx.fillStyle = '#13141f';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw stars
    drawStars(ctx);

    // Get player reference once
    const { player } = gameState.current;

    // Draw player (triangle spaceship)
    ctx.fillStyle = '#8b5cf6';
    ctx.beginPath();
    ctx.moveTo(player.x + player.width / 2, player.y);
    ctx.lineTo(player.x + player.width, player.y + player.height);
    ctx.lineTo(player.x, player.y + player.height);
    ctx.closePath();
    ctx.fill();

    // Draw projectiles
    ctx.fillStyle = '#8b5cf6';
    gameState.current.projectiles.forEach(projectile => {
      ctx.fillRect(projectile.x, projectile.y, projectile.width, projectile.height);
    });

    // Draw enemies
    gameState.current.enemies.forEach(enemy => {
      // Draw enemy
      ctx.fillStyle = enemy.type === 'boss' ? '#ef4444' : '#f59e0b';
      ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);

      // Draw health bar
      const healthBarWidth = enemy.width;
      const healthBarHeight = 4;
      ctx.fillStyle = '#64748b';
      ctx.fillRect(
        enemy.x,
        enemy.y - healthBarHeight - 2,
        healthBarWidth,
        healthBarHeight
      );
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(
        enemy.x,
        enemy.y - healthBarHeight - 2,
        (enemy.health / enemy.maxHealth) * healthBarWidth,
        healthBarHeight
      );
    });

    // Draw player health bar
    const healthBarWidth = 200;
    const healthBarHeight = 10;
    ctx.fillStyle = '#64748b';
    ctx.fillRect(10, 10, healthBarWidth, healthBarHeight);
    ctx.fillStyle = '#22c55e';
    ctx.fillRect(
      10,
      10,
      (player.health / player.maxHealth) * healthBarWidth,
      healthBarHeight
    );
  };

  // Draw stars
  const drawStars = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = '#ffffff';
    gameState.current.stars.forEach(star => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
    });
  };

  // Add timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          onGameOver(score, stats, 'time');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Update when shooting
  const handleShoot = () => {
    setStats(prev => ({
      ...prev,
      shotsFired: prev.shotsFired + 1
    }));
  };

  // Update when hitting enemy
  const handleEnemyHit = (enemy: Enemy) => {
    setStats(prev => ({
      ...prev,
      shotsHit: prev.shotsHit + 1,
      accuracy: ((prev.shotsHit + 1) / (prev.shotsFired || 1)) * 100,
      enemiesDefeated: enemy.health <= 0 ? prev.enemiesDefeated + 1 : prev.enemiesDefeated,
      bossesDefeated: enemy.type === 'boss' && enemy.health <= 0 ? prev.bossesDefeated + 1 : prev.bossesDefeated
    }));
  };

  // Update when completing wave
  useEffect(() => {
    setStats(prev => ({
      ...prev,
      wavesCompleted: currentWave - 1
    }));
  }, [currentWave]);

  // Update time elapsed
  useEffect(() => {
    const timer = setInterval(() => {
      setStats(prev => ({
        ...prev,
        timeElapsed: prev.timeElapsed + 1
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Update GameOver call
  const handleGameOver = () => {
    onGameOver(score, stats);
  };

  return (
    <div className="relative w-full" style={{ height: 'calc(100vh - 200px)' }}>
      <canvas
        ref={canvasRef}
        className="w-full h-full bg-dark-card rounded-xl touch-none"
      />
      <div className="absolute top-4 left-4 text-white text-lg sm:text-xl space-y-2">
        <div>Score: {score}</div>
        <div>Wave: {currentWave}</div>
        <div>Time: {timeLeft}s</div>
        {isBossWave && <div className="text-red-500 font-bold">BOSS WAVE!</div>}
      </div>

      {/* Hearts display */}
      <div className="absolute top-4 right-4 text-2xl sm:text-3xl">
        {'❤️'.repeat(lives)}
      </div>
      
      {/* Mobile instructions */}
      <div className="absolute bottom-4 left-4 right-4 text-center text-white text-sm opacity-50">
        Touch and drag to move • Auto-firing enabled
      </div>
    </div>
  );
} 