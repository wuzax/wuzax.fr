import React from 'react';
import { NavLink } from 'react-router-dom';
import { Code2, Home, Mail, FolderGit2, LogIn } from 'lucide-react';
import { ThemeToggle } from '../ThemeToggle';
import { useAuth } from '../../lib/store';

const Header = () => {
  const { isAuthenticated } = useAuth();
  
  const navItems = [
    { to: '/', icon: Home, label: 'Accueil' },
    { to: '/projects', icon: FolderGit2, label: 'Projets' },
    { to: '/contact', icon: Mail, label: 'Contact' },
  ];

  return (
    <header className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <NavLink to="/" className="flex items-center space-x-2 text-blue-600 dark:text-blue-400">
            <Code2 className="w-6 h-6" />
            <span className="font-bold text-xl">Wuzax_</span>
          </NavLink>
          
          <div className="flex items-center space-x-8">
            <ul className="flex items-center space-x-8">
              {navItems.map(({ to, icon: Icon, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      `flex items-center space-x-1 text-sm font-medium transition-colors
                      ${isActive 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'}`
                    }
                  >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <NavLink
                to={isAuthenticated ? "/admin" : "/login"}
                className="flex items-center space-x-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <span>{isAuthenticated ? "Admin" : "Login"}</span>
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;