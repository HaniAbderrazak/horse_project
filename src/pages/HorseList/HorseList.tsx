import Navbar from '../../components/Navbar';
import HorseCarouselCarousel from '../../components/SwipperCarousel';
import './HorseList.css';
import { horses } from "../../api/horses"
import HorseCard from '../../components/HorseComponent';
import Footer from '../../components/Footer';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';
const ITEMS_PER_PAGE = 6;
const HorseList = () => {

    const [currentPage, setCurrentPage] = useState(0);

    const offset = currentPage * ITEMS_PER_PAGE;
    const currentHorses = horses.slice(offset, offset + ITEMS_PER_PAGE);
    const pageCount = Math.ceil(horses.length / ITEMS_PER_PAGE);

    const handlePageClick = ({ selected }: { selected: number }) => {
        setCurrentPage(selected);
    };

    return (
        <div>
            < Navbar />
            < HorseCarouselCarousel />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {currentHorses.map((horse) => 
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
                )}
            </div>
            <div className="flex justify-center my-8">
                <ReactPaginate
                    previousLabel={"← Prev"}
                    nextLabel={"Next →"}
                    pageCount={pageCount}
                    onPageChange={handlePageClick}
                    containerClassName={"flex space-x-2"}
                    pageClassName={"px-4 py-2 border rounded text-gray-700 hover:bg-gray-200"}
                    activeClassName={"bg-primary-600 text-white"}
                    previousClassName={"px-4 py-2 border rounded hover:bg-gray-200"}
                    nextClassName={"px-4 py-2 border rounded hover:bg-gray-200"}
                    breakLabel={"..."}
                    breakClassName={"px-4 py-2 text-gray-500"}
                />
            </div>
        < Footer />
        </div>
    );
};

export default HorseList;
