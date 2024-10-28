// Initialize map with a central view over the US
const map = L.map('map').setView([37.0902, -95.7129], 4);

// Set up Leaflet tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Function to generate random coordinates
function getRandomInRange(from, to, fixed) {
  return (Math.random() * (to - from) + from).toFixed(fixed) * 1; // Converts to a number
}

// Generate 3 random coordinate sets
const coordinates = [
  {
    lat: getRandomInRange(30, 35, 3),
    lon: getRandomInRange(-100, -90, 3),
    markerId: "marker1"
  },
  {
    lat: getRandomInRange(30, 35, 3),
    lon: getRandomInRange(-100, -90, 3),
    markerId: "marker2"
  },
  {
    lat: getRandomInRange(30, 35, 3),
    lon: getRandomInRange(-100, -90, 3),
    markerId: "marker3"
  }
];

// Function to fetch locality for a given coordinate
async function fetchLocality(lat, lon, markerId) {
  const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
  const data = await response.json();

  // Set latitude and longitude in the respective spans
  document.getElementById(`${markerId}-coord`).innerText = lat; // Set latitude
  document.getElementById(`${markerId}-lon`).innerText = lon; // Set longitude
  document.getElementById(`${markerId}-locality`).innerText = data.locality || "Unknown"; // Set locality
}

// Place markers and fetch locality data
coordinates.forEach(coord => {
  const marker = L.marker([coord.lat, coord.lon]).addTo(map);
  fetchLocality(coord.lat, coord.lon, coord.markerId);
});
