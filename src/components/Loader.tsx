import { FC } from 'react';

interface LoaderProps {
  message?: string;
  darkMode?: boolean;
  fullHeight?: boolean;
}

const LoaderComponent: FC<LoaderProps> = ({ 
  message = 'Loading...', 
  darkMode = false,
  fullHeight = true
}) => {
  return (
    <div className={`flex flex-col items-center justify-center ${fullHeight ? 'min-h-[calc(100vh-4rem)]' : 'py-12'}`}>
      <div className="relative">
        <div className={`w-12 h-12 rounded-full animate-spin border-4 border-solid ${darkMode ? 'border-gray-600' : 'border-gray-300'} border-t-transparent`}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full ${darkMode ? 'border-gray-800' : 'border-gray-200'} border-2`}></div>
      </div>
      <p className={`mt-4 text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        {message}
      </p>
    </div>
  );
};

export default LoaderComponent;