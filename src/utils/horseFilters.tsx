import { Horse } from "../api/horses";

export const filterHorsesByBreed = (horses: Horse[], breed: string) => {
    if (!breed) return horses;
    const lowercasedBreed = breed.toLowerCase();
    
    return horses.filter(horse => 
      horse.breed?.toLowerCase().includes(lowercasedBreed)
    );
  };
  
export const filterHorsesBySearch = (horses: Horse[], searchTerm: string) => {
    if (!searchTerm) return horses;
    const lowercasedSearch = searchTerm.toLowerCase();
    return horses.filter(horse =>
      horse.name.toLowerCase().includes(lowercasedSearch) ||
      horse.horse_number.toLowerCase().includes(lowercasedSearch) ||
      horse.breed.toLowerCase().includes(lowercasedSearch) ||
      horse.mother_name.toLowerCase().includes(lowercasedSearch) ||
      horse.father_name.toLowerCase().includes(lowercasedSearch) ||
      horse.country_origin.toLowerCase().includes(lowercasedSearch)
    );
}