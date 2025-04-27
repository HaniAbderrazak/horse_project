export interface HorseCardProps {
    id?: number;
    name?: string;
    horse_number?: string;
    breed?: string;
    date_of_birth?: string;
    gender?: {
      id: number;
      name_en: string;
    };
    user?: {
      first_name?: string;
      last_name?: string;
      image?: string;
    };
    imageUrl?: string;
    training_horse?: number;
    country_origin?: string;
  
  }