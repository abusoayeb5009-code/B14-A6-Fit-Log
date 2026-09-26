'use client';

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

// টাইপ ডেফিনিশন
export interface Workout {
  id?: string | number;
  name?: string;
  title?: string;
  image?: string;
  img?: string;
  category?: string;
  tags?: string[];
  equipment?: string;
  sub?: string;
  time?: string;
  calories?: string;
  rating?: string | number;
}

interface WorkoutContextType {
  workouts: Workout[];
  loading: boolean;
  error: string | null;
}

// Context তৈরি
const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

// Provider কম্পোনেন্ট
export const WorkoutProvider = ({ children }: { children: ReactNode }) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setLoading(true);
        const res = await fetch('https://api.abcz.workers.dev/api/fitlog');
        
        if (!res.ok) {
          throw new Error('Data fetch failed');
        }

        const data = await res.json();
        const workoutData = Array.isArray(data) ? data : (data.workouts || data.data || []);
        setWorkouts(workoutData);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <WorkoutContext.Provider value={{ workouts, loading, error }}>
      {children}
    </WorkoutContext.Provider>
  );
};

// Custom Hook
export const useWorkouts = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error('useWorkouts must be used within a WorkoutProvider');
  }
  return context;
};