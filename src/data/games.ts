import rpsImage from '../assets/games/rock-paper-scissors.jpg';
import spaceShooterBanner from '../assets/games/space-shooter/banner.jpg';
import spaceShooterCard from '../assets/games/space-shooter/card.jpg';

export interface Game {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  path: string;
  videoUrl?: string;
  bannerImage?: string;
}

export const games: Game[] = [
  {
    id: 'rock-paper-scissors',
    title: 'Rock Paper Scissors',
    description: 'Challenge the computer in this classic game of Rock Paper Scissors with beautiful animations and sound effects!',
    image: '/images/rock-paper-scissor.png',
    category: 'Casual',
    path: '/games/rock-paper-scissors',
    videoUrl: '',
  },
  {
    id: 'whack-a-mole',
    title: 'Whack-a-Mole',
    description: 'Test your reflexes in this classic arcade game with multiple challenging modes!',
    image: '/images/whack-a-mole.png',
    category: 'Arcade',
    path: '/games/whack-a-mole',
    videoUrl: '',
  },
  {
    id: 'snake-game',
    title: 'Snake Game',
    description: 'Guide the snake to eat food and grow longer while avoiding walls and your own tail.',
    image: '/images/snake.jpg',
    category: 'Arcade',
    path: '/games/snake',
    videoUrl: '',
  },
  {
    id: 'tic-tac-toe',
    title: 'Tic Tac Toe',
    description: "Classic game of X's and O's with a modern twist. Play against AI or challenge a friend.",
    image: '/images/tiktak.jpg',
    category: 'Strategy',
    path: '/games/tic-tac-toe',
    videoUrl: '',
  },
  {
    id: '2048',
    title: '2048',
    description: 'Combine matching numbers to reach 2048 in this addictive puzzle game!',
    image: '/images/2048.jpg',
    category: 'Puzzle',
    path: '/games/2048',
    videoUrl: '',
  },
  {
    id: 'space-shooter',
    title: 'Space Shooter',
    description: 'Defend Earth from alien invaders in this action-packed space shooter game.',
    image: '/images/space.jpg',
    category: 'Action',
    path: '/games/space-shooter',
    videoUrl: '',
  },
  {
    id: 'math-challenge',
    title: 'Math Challenge',
    description: 'Test your math skills with quick-fire arithmetic problems against the clock.',
    image: 'https://placehold.co/600x400/1a1b26/ffffff?text=Math+Challenge',
    category: 'Educational',
    path: '/games/math-challenge',
    videoUrl: '',
  },
  {
    id: 'color-match',
    title: 'Color Match',
    description: 'Test your reflexes by matching colors in this fast-paced arcade game.',
    image: 'https://placehold.co/600x400/1a1b26/ffffff?text=Color+Match',
    category: 'Arcade',
    path: '/games/color-match',
    videoUrl: '',
  },
  {
    id: 'typing-race',
    title: 'Typing Race',
    description: 'Improve your typing speed and accuracy in this multiplayer racing game.',
    image: 'https://placehold.co/600x400/1a1b26/ffffff?text=Typing+Race',
    category: 'Multiplayer',
    path: '/games/typing-race',
    videoUrl: '',
  }
];