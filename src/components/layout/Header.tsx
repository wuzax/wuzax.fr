import { Code2, FolderGit2, Home, LogIn, Mail, Menu } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../lib/store";
import { ThemeToggle } from "../ThemeToggle";

const Header = () => {
  const { isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { to: "/", icon: Home, label: "Accueil" },
    { to: "/projects", icon: FolderGit2, label: "Projets" },
    { to: "/contact", icon: Mail, label: "Contact" },
  ];

  return (
    <header className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <NavLink
            to="/"
            className="flex items-center space-x-2 text-blue-600 dark:text-blue-400"
          >
            <Code2 className="w-6 h-6" />
            <span className="font-bold text-xl">Wuzax_</span>
          </NavLink>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>

          <div
            className={`${
              isMenuOpen ? "flex" : "hidden"
            } md:flex absolute md:relative top-full left-0 right-0 md:top-auto bg-white dark:bg-gray-900 md:bg-transparent flex-col md:flex-row items-center space-y-4 md:space-y-0 p-4 md:p-0 md:space-x-8 border-b md:border-0 border-gray-200 dark:border-gray-800`}
          >
            <ul className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 w-full md:w-auto">
              {navItems.map(({ to, icon: Icon, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      `flex items-center space-x-1 text-sm font-medium transition-colors
                      ${
                        isActive
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                      }`
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
                className="flex items-center space-x-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors w-full md:w-auto justify-center"
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
