// src/components/HeroCarousel.tsx
import { useTheme } from '../context/ThemeContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import './Swipper.css';

const HorseCarousel = () => {
  const { isDarkMode } = useTheme();

  const slides = [
    {
      id: 1,
      imageUrl: 'https://images.unsplash.com/photo-1553284965-e2815db2e5a0',
      title: 'Championship Bloodlines',
      subtitle: 'Discover our pedigree champions with generations of racing excellence'
    },
    {
      id: 2,
      imageUrl: 'https://images.unsplash.com/photo-1553284965-e2815db2e5a0',
      title: 'Elite Training Facilities',
      subtitle: 'World-class care and training for peak performance'
    },
    {
      id: 3,
      imageUrl: 'https://images.unsplash.com/photo-1553284965-e2815db2e5a0',
      title: 'Victory Awaits',
      subtitle: 'Join us on the journey to the winner\'s circle'
    }
  ];

  return (
    <div className="relative w-full h-screen">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="h-full w-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full">
              <img
                src={slide.imageUrl}
                alt={slide.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center px-4 max-w-4xl mx-auto">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white animate-fadeInUp">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 text-gray-100 animate-fadeInUp delay-100">
                    {slide.subtitle}
                  </p>
                  <button
                    className={`px-8 py-3 rounded-full font-bold text-lg ${
                      isDarkMode
                        ? 'bg-primary-600 hover:bg-primary-700 text-white'
                        : 'bg-white hover:bg-gray-100 text-gray-800'
                    } transition-colors duration-300 shadow-lg animate-fadeInUp delay-200`}
                  >
                    Explore Our Horses
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HorseCarousel;