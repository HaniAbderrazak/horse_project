import { useState, useEffect } from "react";
import { Horse } from "../api/horses";
import { HorseService } from "../services/HorseService";

export const useHorses = () => {
  const [horses, setHorses] = useState<Horse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHorses = async () => {
      try {
        setLoading(true);
        const data = await HorseService.listHorses();
        setHorses(data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch horses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchHorses();
  }, []);
  return { horses, loading, error };
};