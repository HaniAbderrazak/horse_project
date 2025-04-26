// src/pages/HorseDetails.tsx
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { horses } from "../../api/horses";
import { useTheme } from '../../context/ThemeContext';
import { FaUpload, FaStar, FaHorse, FaVenusMars, FaCalendarAlt, FaWeight, FaRulerVertical } from 'react-icons/fa';
import Navbar from '../../components/Navbar';

const HorseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { isDarkMode } = useTheme();
  const horseId = id ? parseInt(id) : 0;
  const [image, setImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'pedigree' | 'stats'>('details');

  const horse = horses.find(horse => horse.id === horseId);

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

  if (!horse) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <p className={`text-xl ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Horse not found</p>
      </div>
    );
  }

  return (
    <div>
        <Navbar />
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-8 mb-8  max-h-96">
          {/* Image Section */}
          <div className="w-full md:w-1/3">
            <div className={`relative rounded-xl overflow-hidden shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="aspect-w-3 aspect-h-4">
                <img
                  src={image || horse.imageUrl}
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
                <h1 className="text-3xl font-bold">{horse.name}</h1>
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar
                      key={i}
                      className={`${i < horse.rating ? 'text-yellow-400' : isDarkMode ? 'text-gray-600' : 'text-gray-300'} ml-1`}
                    />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center">
                  <FaHorse className={`mr-2 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  <span>{horse.breed}</span>
                </div>
                <div className="flex items-center">
                  <FaVenusMars className={`mr-2 ${isDarkMode ? 'text-pink-400' : 'text-pink-600'}`} />
                  <span>{horse.gender}</span>
                </div>
                <div className="flex items-center">
                  <FaCalendarAlt className={`mr-2 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                  <span>{horse.age} years</span>
                </div>
                <div className="flex items-center">
                  <FaWeight className={`mr-2 ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                  <span>{horse.weight} kg</span>
                </div>
                <div className="flex items-center">
                  <FaRulerVertical className={`mr-2 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                  <span>{horse.height} hands</span>
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
                    onClick={() => setActiveTab('stats')}
                    className={`py-2 px-4 font-medium ${activeTab === 'stats' ? (isDarkMode ? 'text-blue-400 border-b-2 border-blue-400' : 'text-blue-600 border-b-2 border-blue-600') : (isDarkMode ? 'text-gray-400' : 'text-gray-500')}`}
                  >
                    Stats
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              <div className="mt-4">
                {activeTab === 'details' && (
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{horse.description}</p>
                )}

                {activeTab === 'pedigree' && (
                  <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <h3 className="font-bold mb-2">Sire: {horse.sire}</h3>
                    <h3 className="font-bold">Dam: {horse.dam}</h3>
                  </div>
                )}

                {activeTab === 'stats' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <h4 className="font-bold">Races</h4>
                      <p>{horse.races || 0}</p>
                    </div>
                    <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <h4 className="font-bold">Wins</h4>
                      <p>{horse.wins || 0}</p>
                    </div>
                
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className={`p-6 rounded-xl shadow-lg mb-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-2xl font-bold mb-4">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
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