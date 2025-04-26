import { useTheme } from '../context/ThemeContext'
import { Link } from 'react-router-dom';

interface HorseCardProps {
  id: number
  name: string
  breed: string
  age: number
  gender: 'Male' | 'Female' | 'Gelding' | 'Stallion' | 'Mare'
  imageUrl: string
  lastRaceDate?: string
  wins?: number
  owner?: string
}

const HorseCard = ({
    id,
  name,
  breed,
  age,
  gender,
  imageUrl,
  lastRaceDate,
  wins = 0,
  owner = 'Unknown'
}: HorseCardProps) => {
  const { isDarkMode } = useTheme()

  const genderColors = {
    Male: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    Female: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
    Gelding: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    Stallion: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    Mare: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
  }

  return (
    <div 
      className={`rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl ${
        isDarkMode ? 'bg-dark-700' : 'bg-white'
      }`}
    >
      {/* Horse Image */}
      <div className="relative h-48 w-full">
        <img
          src={imageUrl}
          alt={`${name} the ${breed}`}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=Horse+Image'
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-xl font-bold text-white">{name}</h3>
          <p className="text-gray-200">{breed}</p>
        </div>
      </div>

      {/* Horse Details */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <span className="font-semibold">Owner:</span> {owner}
            </p>
            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <span className="font-semibold">Age:</span> {age} years
            </p>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${genderColors[gender]}`}>
            {gender}
          </span>
        </div>

        {/* Stats */}
        <div className="flex justify-between border-t pt-3">
          <div className="text-center">
            <p className={`text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Wins
            </p>
            <p className="text-lg font-bold text-primary-500">{wins}</p>
          </div>
          
          {lastRaceDate && (
            <div className="text-center">
              <p className={`text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Last Race
              </p>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {new Date(lastRaceDate).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>

        {/* View Button */}
        <Link to={`/horses/${id}`}>
        <button 
          className={`w-full mt-4 py-2 rounded-lg font-medium transition-colors ${
            isDarkMode
              ? 'bg-primary-600 hover:bg-primary-700 text-white'
              : 'bg-primary-100 hover:bg-primary-200 text-primary-800'
          }`}
        >
          View Details
        </button>
        </Link>
      </div>
    </div>
  )
}

export default HorseCard