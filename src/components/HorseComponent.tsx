import { HorseCardProps } from '../api/horseCardProps';
import { useTheme } from '../context/ThemeContext'
import { Link } from 'react-router-dom';



const HorseCard = ({
  id,
  name,
  horse_number,
  breed,
  date_of_birth,
  gender,
  user,
  imageUrl,
  training_horse,
  country_origin
}: HorseCardProps) => {
  const { isDarkMode } = useTheme()
  const age = date_of_birth 
    ? new Date().getFullYear() - new Date(date_of_birth).getFullYear() 
    : 'Unknown';

  const getGenderColor = (genderName: string) => {
    switch (genderName.toLowerCase()) {
      case 'male':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'female':
        return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200';
      case 'gelding':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'stallion':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'mare':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };


  return (
    <div
      className={`rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl ${isDarkMode ? 'bg-dark-700' : 'bg-white'
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
              <span className="font-semibold">Owner:</span> {user?.first_name} {user?.last_name}
            </p>
            <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <span className="font-semibold">Age:</span> {age} years
            </p>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${getGenderColor(gender?.name_en || 'unknown')}`}>
            {gender?.name_en}
          </span>
        </div>

        <div className="flex justify-between border-t pt-3">
          <div className="text-center">
            <p className={`text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Training
            </p>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {training_horse ? 'In Training' : 'Not Training'}
            </p>
          </div>

          <div className="text-center">
            <p className={`text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Origin
            </p>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              {country_origin || 'Unknown'}
            </p>
          </div>
        </div>

        {/* View Button */}
        <Link to={`/horses/${id}`}>
          <button
            className={`w-full mt-4 py-2 rounded-lg font-medium transition-colors ${isDarkMode
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