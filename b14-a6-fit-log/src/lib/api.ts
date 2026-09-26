const API_URL = "https://api.abcz.workers.dev/api/fitlog";

export async function getWorkouts() {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("Failed to fetch workouts");
  }

  return res.json();
}

export async function getWorkout(id: string) {
  const res = await fetch(`${API_URL}/${id}`);

  if (!res.ok) {
    throw new Error("Workout not found");
  }

  return res.json();
}