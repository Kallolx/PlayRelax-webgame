export interface Entity {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  health: number;
  maxHealth: number;
}

export interface Player extends Entity {
  powerUps: string[];
  shield: number;
  fireRate: number;
  lastShot: number;
}

export interface Enemy extends Entity {
  type: string;
  points: number;
  fireRate: number;
  lastShot: number;
  pattern?: string;
}

export interface Projectile extends Entity {
  damage: number;
  isEnemy: boolean;
}

export interface PowerUp extends Entity {
  type: string;
  duration: number;
}

export interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  angle: number;
  alpha: number;
  life: number;
} 