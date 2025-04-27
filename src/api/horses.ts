export interface Horse {
  id: number;
  name: string;
  horse_number: string;
  mother_name: string;
  father_name: string;
  country_origin: string;
  date_of_birth: string;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    image: string;
    horses_count: number;
  };
  gender: {
    id: number;
    name_ar: string;
    name_en: string;
  };
  breed: string;
  training_horse: number;
  other_registers: string;
  other_injuries: string;
  production_place: string;
  is_out: number;
  out_reason: string;
  out_time: string;
  created_at: string;
  injuries: Array<{
    id: number;
    name: string;
  }>;
  registers: Array<{
    id: number;
    name_ar: string;
    name_en: string;
  }>;
  services: any[];  
  packages: any[];  
  place: {
    id: number;
    number: string;
    capacity: number;
    category: {
      id: number;
      name: string;
      is_deletable: number;
      parent: {
        id: number;
        name: string;
        is_deletable: number;
        parent: any;  
      } | null;
    };
  };
}
