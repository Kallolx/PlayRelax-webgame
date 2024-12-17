import React from 'react';
import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Games from './pages/Games';
import Recent from './pages/Recent';
import New from './pages/New';
import Trending from './pages/Trending';
import Updated from './pages/Updated';
import Originals from './pages/Originals';
import Multiplayer from './pages/Multiplayer';
import TwoPlayer from './pages/TwoPlayer';
import CategoryPage from './pages/CategoryPage';
import RockPaperScissors from './games/RockPaperScissors/RockPaperScissors';
import WhackAMole from './games/WhackAMole/WhackAMole';
import Snake from './games/Snake/Snake';
import TicTacToe from './games/TicTacToe/TicTacToe';
import Game2048 from './games/2048/2048';
import SpaceShooter from './games/SpaceShooter/SpaceShooter';

export default function Routes() {
  return (
    <RouterRoutes>
      <Route path="/" element={<Home />} />
      <Route path="/games" element={<Games />} />
      <Route path="/recent" element={<Recent />} />
      <Route path="/new" element={<New />} />
      <Route path="/trending" element={<Trending />} />
      <Route path="/updated" element={<Updated />} />
      <Route path="/originals" element={<Originals />} />
      <Route path="/multiplayer" element={<Multiplayer />} />
      <Route path="/2player" element={<TwoPlayer />} />
      <Route path="/category/:category" element={<CategoryPage />} />
      
      {/* Game Routes */}
      <Route path="/games/rock-paper-scissors" element={<RockPaperScissors />} />
      <Route path="/games/whack-a-mole" element={<WhackAMole />} />
      <Route path="/games/snake" element={<Snake />} />
      <Route path="/games/tic-tac-toe" element={<TicTacToe />} />
      <Route path="/games/2048" element={<Game2048 />} />
      <Route path="/games/space-shooter" element={<SpaceShooter />} />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </RouterRoutes>
  );
} 