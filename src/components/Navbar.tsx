import { FaMoon, FaSignOutAlt, FaSun } from 'react-icons/fa'
import horseLogo from '../assets/horse_logo.png'
import { useTheme } from '../context/ThemeContext'

import { Link, useNavigate } from 'react-router-dom'
import { clearToken } from '../utils/auth'

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme()
// Get auth context directly without useAuth hook
const navigate = useNavigate();

const handleLogout = () => {
   clearToken();
    navigate('/login');
  
};
  return (
    <nav className="bg-white dark:bg-black shadow-md py-4 px-6 sm:px-10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
      <Link to={`/horses`}>
        <div className="flex items-center space-x-3">
          <img 
            src={horseLogo} 
            alt="Horse Logo" 
            className="h-10 w-10 object-contain dark:invert"
          />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Horse Management
          </h1>
        </div>
        </Link>
        <div className="flex items-center space-x-4">
        
        

        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-yellow-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-yellow-400"
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
        </button>
       
            <button
              onClick={handleLogout}
              className={`p-2 rounded-full ${isDarkMode 
                ? 'text-gray-300 hover:bg-gray-700' 
                : 'text-gray-700 hover:bg-gray-200'
              } transition-all duration-300`}
              aria-label="Logout"
              title="Logout"
            >
              <FaSignOutAlt className="w-5 h-5" />
            </button>
          
        </div>
      </div>
    </nav>
  )
}

export default Navbar