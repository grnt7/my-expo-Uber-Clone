// api/autocomplete.js (Standard Node.js version)
export default async function handler(req, res) {
  // 1. Get input from query (Standard Node syntax)
  const { input } = req.query;

  if (!input) {
    return res.status(400).json({ error: "Input is required" });
  }

  // Use the exact key name from your Vercel Environment Variables
  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY; 
  
  const googleUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
    input
  )}&key=${apiKey}&language=en`;

  try {
    const response = await fetch(googleUrl);
    const data = await response.json();

    // 2. Return data
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch from Google" });
  }
}