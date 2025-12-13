export async function ImageToday(key) {
  const URL = `https://api.nasa.gov/planetary/apod?api_key=${key}`;
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
}
export async function AllMounth(key, start_date, end_date) {
  const URL = `https://api.nasa.gov/planetary/apod?api_key=${key}&start_date=${start_date}&end_date=${end_date}`;
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
}
