import { useState, useEffect } from "react";
import { Horse } from "../api/horses";
import { HorseService } from "../services/HorseService";

export const useHorseById = (id:number) => {
  const [horse, setHorse] = useState<Horse>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    HorseService.getHorseById(id )
      .then(setHorse)
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch horse.');
      })
      .finally(() => setLoading(false));
  }, []);

  return { horse, loading, error };
};