import { useSearchParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import HorseCarouselCarousel from '../../components/SwipperCarousel';
import './HorseList.css';
import HorseCard from '../../components/HorseComponent';
import Footer from '../../components/Footer';
import { useState, useMemo, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useTheme } from '../../context/ThemeContext';
import { useHorses } from '../../hooks/useHorses';
import { filterHorsesByBreed, filterHorsesBySearch } from '../../utils/horseFilters';
import LoaderComponent from '../../components/Loader';
import NotFoundComponent from '../../components/notFound';

const ITEMS_PER_PAGE = 6;

const HorseList = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { isDarkMode } = useTheme();

    // Get pagination and search from URL
    const initialPage = parseInt(searchParams.get('page') || '0');
    const initialSearch = searchParams.get('search') || '';

    // Breed filter remains in component state
    const [breedFilter, setBreedFilter] = useState('');
    const [searchTerm, setSearchTerm] = useState(initialSearch);
    const [currentPage, setCurrentPage] = useState(initialPage);

    const { horses, loading, error } = useHorses();

    // Filter horses by breed and search term
    const filteredHorses = useMemo(() => {
        let result = horses;
        if (breedFilter) {
            result = filterHorsesByBreed(result, breedFilter);
        }
        if (searchTerm) {
            result = filterHorsesBySearch(result, searchTerm);
        }
        return result;
    }, [horses, breedFilter, searchTerm]);

    const uniqueBreeds = useMemo(() => {
        const breeds = new Set(horses.map(horse => horse.breed));
        return Array.from(breeds).sort();
    }, [horses]);

    const offset = currentPage * ITEMS_PER_PAGE;
    const currentHorses = filteredHorses.slice(offset, offset + ITEMS_PER_PAGE);
    const pageCount = Math.ceil(filteredHorses.length / ITEMS_PER_PAGE);

    useEffect(() => {
        const params = new URLSearchParams();
        if (currentPage > 0) params.set('page', currentPage.toString());
        if (searchTerm) params.set('search', searchTerm);

        if (params.toString() !== searchParams.toString()) {
            setSearchParams(params);
        }
    }, [currentPage, searchTerm, searchParams, setSearchParams]);

    const handlePageClick = ({ selected }: { selected: number }) => {
        setCurrentPage(selected);
    };

    const handleBreedFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setBreedFilter(e.target.value);
        setCurrentPage(0); 
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(0); // Reset to first page when search changes
    };

    // Loading state
    if (loading) {
        return (
            <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <Navbar />
                <LoaderComponent
                    message="Loading horseS list..."
                    darkMode={isDarkMode}
                />
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <NotFoundComponent 
            darkMode={isDarkMode}
            itemType="Horse"
            isList={true}
            searchTerm={searchTerm}
            icon="🐴"
          />
        );
    }

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
            <Navbar />
            <HorseCarouselCarousel />

            {/* Search and Filter Section */}
            <div className={`p-6`}>
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Search Input */}
                    <div>
                        <label
                            htmlFor="search"
                            className={`block mb-2 text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
                        >
                            Search Horses:
                        </label>
                        <input
                            id="search"
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Search by name, breed, etc."
                            className={`w-full p-2 border rounded-md ${isDarkMode
                                ? 'bg-gray-600 border-gray-500 text-white'
                                : 'bg-white border-gray-300 text-gray-700'
                                }`}
                        />
                    </div>

                    {/* Breed Filter */}
                    <div>
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
                            className={`w-full p-2 border rounded-md ${isDarkMode
                                ? 'bg-gray-600 border-gray-500 text-white'
                                : 'bg-white border-gray-300 text-gray-700'
                                }`}
                        >
                            <option value="">All Breeds</option>
                            {uniqueBreeds.map((breed, index) => (
                                <option key={`${breed}-${index}`} value={breed}>
                                    {breed}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Horse Cards Grid */}
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 max-w-7xl mx-auto`}>
                {currentHorses.length > 0 ? (
                    currentHorses.map((horse) => (
                        <HorseCard
                            key={horse.id}
                            id={horse.id}
                            name={horse?.name}
                            horse_number={horse?.horse_number}
                            breed={horse?.breed}
                            date_of_birth={horse?.date_of_birth}
                            gender={horse?.gender}
                            user={{
                                first_name: horse.user?.first_name || 'Unknown',
                                last_name: horse.user?.last_name || 'Owner',
                                image: horse.user?.image || '../../assets/images/avatar.jpg'
                            }}
                            imageUrl={"https://images.unsplash.com/photo-1553284965-e2815db2e5a0"}
                            training_horse={horse.training_horse}
                            country_origin={horse.country_origin || 'Unknown'}
                        />
                    ))
                ) : (
                    <div className="col-span-full text-center py-10">
                        <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                            {filteredHorses.length === 0 && horses.length > 0
                                ? 'No horses match your search criteria.'
                                : 'No horses found.'}
                        </p>
                    </div>
                )}
            </div>

            {/* Pagination - Only show if there are multiple pages */}
            {pageCount > 1 && (
                <div className={`flex justify-center py-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <ReactPaginate
                        previousLabel={"← Prev"}
                        nextLabel={"Next →"}
                        pageCount={pageCount}
                        forcePage={currentPage} // Sync with URL
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