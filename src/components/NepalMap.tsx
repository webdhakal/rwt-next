import { useEffect, useState } from 'react'
import L, { Map } from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Define types for the cities
interface City {
  city: string
  coords: [number, number]
}

const NepalMap = () => {
  const [map, setMap] = useState<Map | null>(null) // Type the map state to be either a Map instance or null
  const [search, setSearch] = useState<string>('') // Type the search state to be a string
  const [cities, setCities] = useState<City[]>([
    // Type the cities state as an array of City objects
    { city: 'Kathmandu', coords: [27.7172, 85.324] },
    { city: 'Pashupatinath', coords: [27.6677, 85.4094] },
    { city: 'Thamel', coords: [27.7149, 85.2922] },
    { city: 'Salaghari', coords: [27.659, 85.3779] },
  ])

  useEffect(() => {
    // Initialize the map only once the component has mounted
    const initializedMap = L.map('hs-change-city-leaflet', {
      center: [27.7172, 85.324], // Kathmandu's coordinates
      zoom: 12,
    })

    // Tile Layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      attribution: '© <a href="https://carto.com/attributions">CARTO</a>',
    }).addTo(initializedMap)

    // Set the map instance
    setMap(initializedMap)

    return () => {
      // Clean up the map when the component unmounts
      initializedMap.remove()
    }
  }, [])

  const handleSearch = () => {
    const selectedCity = cities.find((cityObj) => cityObj.city === search)
    if (selectedCity && map) {
      map.setView(selectedCity.coords, 14) // Update map center
      L.marker(selectedCity.coords).addTo(map).bindPopup(selectedCity.city) // Add a marker for the city
    }
  }

  return (
    <div className="container my-8">
      {/* <div className="mt-6">
        <h3 className="mb-3 text-lg font-semibold text-gray-700">Search City</h3>
        <div className="space-y-3">
          <div>
            <label htmlFor="cityDropdown" className="block text-sm font-medium text-gray-600">
              Select a city:
            </label>
            <select
              id="cityDropdown"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:ring focus:ring-blue-200"
            >
              <option value="">Choose a city</option>
              {cities.map(({ city }) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleSearch}
            className="w-full rounded-lg bg-blue-500 px-4 py-2 font-medium text-white shadow hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </div> */}
      <div id="hs-change-city-leaflet" className="m-auto h-[400px] w-full"></div>
    </div>
  )
}

export default NepalMap
