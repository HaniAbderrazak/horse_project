import React from 'react';
import Navbar from './Navbar';

interface NotFoundProps {
  darkMode?: boolean;
  itemType?: string;
  itemId?: string | number;
  icon?: React.ReactNode;
  customMessage?: string;
  isList?: boolean;
  searchTerm?: string;
  withNavbar?: boolean;
}

const NotFoundComponent = ({ 
  darkMode = false, 
  itemType = 'item',
  itemId,
  icon = '🔍',
  customMessage,
  isList = false,
  searchTerm,
  withNavbar = true
}: NotFoundProps) => {
  const getDefaultMessage = () => {
    if (isList && searchTerm) {
      return `No ${itemType.toLowerCase()}s found matching "${searchTerm}"`;
    }
    if (isList) {
      return `No ${itemType.toLowerCase()}s found`;
    }
    return `No ${itemType.toLowerCase()} found${itemId ? ` with ID ${itemId}` : ''}`;
  };

  const message = customMessage || getDefaultMessage();
  const title = isList ? `No ${itemType.toLowerCase()}s found` : `${itemType} Not Found`;

  const content = (
    <div className={`flex-grow flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="text-center p-6 max-w-md">
        <div className={`text-5xl mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {icon}
        </div>
        <h2 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          {title}
        </h2>
        <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {message}
        </p>
      </div>
    </div>
  );

  return withNavbar ? (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Navbar />
      {content}
    </div>
  ) : content;
};

export default NotFoundComponent;