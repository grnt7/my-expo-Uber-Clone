// api/distance.js
export default async function handler(req, res) {
  const { origin, destination } = req.query;
  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!origin || !destination) {
    return res.status(400).json({ error: "Origin and Destination required" });
  }

  // We use encodeURIComponent to handle spaces in city names like "New York"
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch distance" });
  }
}