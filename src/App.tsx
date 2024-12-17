import { BrowserRouter as Router } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Routes from './Routes';
import { useState } from 'react';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="flex min-h-screen bg-dark">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar */}
        <div 
          className={`
            fixed inset-y-0 left-0 z-50 w-64 bg-dark-nav border-r border-gray-800
            transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          <Sidebar onClose={() => setIsSidebarOpen(false)} />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <Header onMenuClick={() => setIsSidebarOpen(true)} />
          <main className="container mx-auto px-4 py-6 max-w-7xl">
            <Routes />
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;