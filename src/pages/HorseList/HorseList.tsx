import Navbar from '../../components/Navbar';
import HorseCarouselCarousel from '../../components/SwipperCarousel';
import './HorseList.css';
import { horses } from "../../api/horses"
import HorseCard from '../../components/HorseComponent';
import Footer from '../../components/Footer';
import { useState, useMemo } from 'react';
import ReactPaginate from 'react-paginate';
import { useTheme } from '../../context/ThemeContext';

const ITEMS_PER_PAGE = 6;

const HorseList = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [breedFilter, setBreedFilter] = useState('');
    const { isDarkMode } = useTheme();

    // Get unique breeds for the filter dropdown
    const uniqueBreeds = useMemo(() => {
        const breeds = new Set(horses.map(horse => horse.breed));
        return Array.from(breeds).sort();
    }, []);

    // Filter horses by breed if filter is set
    const filteredHorses = useMemo(() => {
        if (!breedFilter) return horses;
        return horses.filter(horse => 
            horse.breed.toLowerCase().includes(breedFilter.toLowerCase())
        );
    }, [breedFilter]);

    // Pagination logic
    const offset = currentPage * ITEMS_PER_PAGE;
    const currentHorses = filteredHorses.slice(offset, offset + ITEMS_PER_PAGE);
    const pageCount = Math.ceil(filteredHorses.length / ITEMS_PER_PAGE);

    const handlePageClick = ({ selected }: { selected: number }) => {
        setCurrentPage(selected);
    };

    const handleBreedFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setBreedFilter(e.target.value);
        setCurrentPage(0); // Reset to first page when filter changes
    };

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
            <Navbar />
            <HorseCarouselCarousel />
            
            {/* Breed Filter Section */}
            <div className={`p-6 `}>
                <div className="max-w-7xl mx-auto">
                    <label 
                        htmlFor="breed-filter" 
                        className={`block mb-2 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                    >
                        Filter by Breed:
                    </label>
                    <select
                        id="breed-filter"
                        value={breedFilter}
                        onChange={handleBreedFilterChange}
                        className={`w-full md:w-64 p-2 border rounded-md ${isDarkMode 
                            ? 'bg-gray-600 border-gray-500 text-white' 
                            : 'bg-white border-gray-300 text-gray-700'
                        }`}
                    >
                        <option value="">All Breeds</option>
                        {uniqueBreeds.map(breed => (
                            <option key={breed} value={breed}>
                                {breed}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Horse Cards Grid */}
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 max-w-7xl mx-auto`}>
                {currentHorses.length > 0 ? (
                    currentHorses.map((horse) => (
                        <HorseCard
                            key={horse.id}
                            id={horse.id}
                            name={horse.name}
                            breed={horse.breed}
                            age={horse.age}
                            gender={horse.gender}
                            imageUrl={horse.imageUrl}
                            lastRaceDate={horse.lastRaceDate}
                            wins={horse.wins}
                            owner={horse.owner}
                        />
                    ))
                ) : (
                    <div className="col-span-full text-center py-10">
                        <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            No horses found matching the selected breed.
                        </p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {filteredHorses.length > ITEMS_PER_PAGE && (
                <div className={`flex justify-center py-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <ReactPaginate
                        previousLabel={"← Prev"}
                        nextLabel={"Next →"}
                        pageCount={pageCount}
                        onPageChange={handlePageClick}
                        containerClassName={"flex space-x-2"}
                        pageClassName={`px-4 py-2 border rounded ${isDarkMode
                            ? "text-gray-300 hover:bg-gray-700 border-gray-600"
                            : "text-gray-700 hover:bg-gray-200 border-gray-300"
                        }`}
                        activeClassName={isDarkMode ? "bg-blue-600 text-white" : "bg-blue-600 text-white"}
                        previousClassName={`px-4 py-2 border rounded ${isDarkMode
                            ? "text-gray-300 hover:bg-gray-700 border-gray-600"
                            : "text-gray-700 hover:bg-gray-200 border-gray-300"
                        }`}
                        nextClassName={`px-4 py-2 border rounded ${isDarkMode
                            ? "text-gray-300 hover:bg-gray-700 border-gray-600"
                            : "text-gray-700 hover:bg-gray-200 border-gray-300"
                        }`}
                        breakLabel={"..."}
                        breakClassName={`px-4 py-2 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                        disabledClassName={isDarkMode ? "opacity-50 text-gray-500" : "opacity-50 text-gray-400"}
                    />
                </div>
            )}

            <Footer />
        </div>
    );
};

export default HorseList;