import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FaUpload, FaHorse, FaVenusMars, FaCalendarAlt, FaRunning, FaHome, FaGlobe } from 'react-icons/fa';
import Navbar from '../../components/Navbar';
import { useHorseById } from '../../hooks/useHoseById';
import LoaderComponent from '../../components/Loader';
import NotFoundComponent from '../../components/notFound';

const HorseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { isDarkMode } = useTheme();
  const horseId = id ? parseInt(id) : 0;
  const [image, setImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'pedigree' | 'records'>('details');

  const { horse, loading, error } = useHorseById(horseId);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  if (loading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <Navbar />
        <LoaderComponent 
          message="Loading horse details..."
          darkMode={isDarkMode}
        />
      </div>
    );
  }

  if (!horse) {
    return (
     
        <NotFoundComponent 
          darkMode={isDarkMode}
          itemType="Horse"
          itemId={horseId}
          icon="🐴"
        />
    );
  }

  return (
    <div>
  <Navbar />
  <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        {/* Image Section */}
        <div className="w-full md:w-1/3">
          <div className={`relative rounded-xl overflow-hidden shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="aspect-w-3 aspect-h-4">
              <img
                src={ image ||'https://images.unsplash.com/photo-1553284965-e2815db2e5a0'}
                alt={horse.name}
                className="w-100 h-100 max-h-96 object-cover"
              />
            </div>
            <label className={`absolute bottom-4 right-4 cursor-pointer p-2 rounded-full ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} transition-colors`}>
              <FaUpload className="text-gray-600 dark:text-gray-300" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Main Info */}
        <div className="w-full md:w-2/3">
          <div className={`p-6 rounded-xl shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold">{horse.name} <span className="text-sm font-normal opacity-75">#{horse.horse_number}</span></h1>
              <div className={`px-3 py-1 rounded-full ${horse.is_out ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'}`}>
                {horse.is_out ? 'Out: ' + horse.out_reason : 'Active'}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center">
                <FaHorse className={`mr-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <span>{horse.breed}</span>
              </div>
              <div className="flex items-center">
                <FaVenusMars className={`mr-2 ${isDarkMode ? 'text-pink-400' : 'text-pink-600'}`} />
                <span>{horse.gender.name_en}</span>
              </div>
              <div className="flex items-center">
                <FaCalendarAlt className={`mr-2 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                <span>{new Date().getFullYear() - new Date(horse.date_of_birth).getFullYear()} years</span>
              </div>
              <div className="flex items-center">
                <FaGlobe className={`mr-2 ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                <span>{horse.country_origin}</span>
              </div>
              <div className="flex items-center">
                <FaHome className={`mr-2 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                <span>Stable {horse.place?.number || 'N/A'}</span>
              </div>
              <div className="flex items-center">
                <FaRunning className={`mr-2 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
                <span>{horse.training_horse ? 'In Training' : 'Not Training'}</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
              <nav className="flex space-x-4">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`py-2 px-4 font-medium ${activeTab === 'details' ? (isDarkMode ? 'text-blue-400 border-b-2 border-blue-400' : 'text-blue-600 border-b-2 border-blue-600') : (isDarkMode ? 'text-gray-400' : 'text-gray-500')}`}
                >
                  Details
                </button>
                <button
                  onClick={() => setActiveTab('pedigree')}
                  className={`py-2 px-4 font-medium ${activeTab === 'pedigree' ? (isDarkMode ? 'text-blue-400 border-b-2 border-blue-400' : 'text-blue-600 border-b-2 border-blue-600') : (isDarkMode ? 'text-gray-400' : 'text-gray-500')}`}
                >
                  Pedigree
                </button>
                <button
                  onClick={() => setActiveTab('records')}
                  className={`py-2 px-4 font-medium ${activeTab === 'records' ? (isDarkMode ? 'text-blue-400 border-b-2 border-blue-400' : 'text-blue-600 border-b-2 border-blue-600') : (isDarkMode ? 'text-gray-400' : 'text-gray-500')}`}
                >
                  Records
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="mt-4">
              {activeTab === 'details' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold mb-2">Owner</h3>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {horse?.user?.first_name} {horse?.user?.last_name}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Production Place</h3>
                    <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {horse.production_place || 'Not specified'}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Registered In</h3>
                    <div className="flex flex-wrap gap-2">
                      {horse.registers.length > 0 ? (
                        horse.registers.map(register => (
                          <span key={register.id} className={`px-3 py-1 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                            {register.name_en}
                          </span>
                        ))
                      ) : (
                        <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>No registers</span>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'pedigree' && (
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <h3 className="font-bold mb-2">Sire: {horse?.father_name || 'Unknown'}</h3>
                  <h3 className="font-bold mb-4">Dam: {horse?.mother_name || 'Unknown'}</h3>
                  <div>
                    <h4 className="font-bold mb-2">Injuries</h4>
                    {horse.injuries.length > 0 ? (
                      <ul className="list-disc pl-5">
                        {horse.injuries.map(injury => (
                          <li key={injury.id}>{injury.name}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>No injuries recorded</p>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'records' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <h4 className="font-bold mb-2">Created At</h4>
                    <p>{new Date(horse.created_at).toLocaleDateString()}</p>
                  </div>
                  {horse.is_out && (
                    <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <h4 className="font-bold mb-2">Out Since</h4>
                      <p>{new Date(horse.out_time).toLocaleDateString()}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={`p-6 rounded-xl shadow-lg mb-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <h2 className="text-2xl font-bold mb-4">Gallery</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
         
          {[1, 2, 3,4].map((item) => (
            <div key={item} className="aspect-square rounded-lg overflow-hidden">
              <img
                src={`https://images.unsplash.com/photo-1553284965-e2815db2e5a0`}
                alt={`Gallery ${item}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default HorseDetails;