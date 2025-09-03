import { useRef, useEffect, useState } from 'react'
import * as maptilersdk from '@maptiler/sdk'
import '@maptiler/sdk/dist/maptiler-sdk.css'
import '../../css/map.css'

interface Coordinates {
  lat: number
  lng: number
}

const MapTiler = ({ geoLocation }: { geoLocation?: { lat: number; lng: number } | null }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null)
  const map = useRef<maptilersdk.Map | null>(null)
  const markerRef = useRef<maptilersdk.Marker | null>(null)
  const [coords, setCoords] = useState<Coordinates>({ lat: 28.3949, lng: 84.124 }) // Nepal
  maptilersdk.config.apiKey = import.meta.env.VITE_MAPTILER_API_KEY as string

  if (geoLocation) {
    // removing the previous markers.
    if (markerRef.current) {
      markerRef.current.remove()
    }
    markerRef.current = new maptilersdk.Marker({ color: 'red' })
      .setLngLat([geoLocation.lng, geoLocation.lat])
      .addTo(map.current as maptilersdk.Map)
  }

  useEffect(() => {
    if (map.current || !mapContainer.current) return
    map.current = new maptilersdk.Map({
      container: mapContainer.current as HTMLDivElement,
      style: maptilersdk.MapStyle.STREETS,
      // this can be set to the first or preferred hub location for the user.
      // Or place the zoom and coords in such a way that we can see all the hubs.
      center: [
        geoLocation ? geoLocation.lng : coords.lng,
        geoLocation ? geoLocation.lat : coords.lat,
      ],
      zoom: 7,
    })

    // Put markers when clicked.
    // map.current.on('click', (event: maptilersdk.MapMouseEvent) => {
    //   const { lng, lat } = event.lngLat
    //   setCoords({ lat, lng })
    //   if (markerRef.current) {
    //     markerRef.current.remove()
    //   }
    //   markerRef.current = new maptilersdk.Marker({ color: 'blue' })
    //     .setLngLat([lng, lat])
    //     .addTo(map.current as maptilersdk.Map)

    //    console.log('Marker placed at:', lat, lng)
    // })
  }, [geoLocation])

  useEffect(() => {
    const fetchReverseGeolocation = async (lat: number, lng: number) => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
        )
        const data = await response.json()

        if (data.address) {
          // console.log(`Reverse Geolocation for lat:${lat}, lng:${lng}:`, data.address)
        } else {
          // console.log(`No address found for lat:${lat}, lng:${lng}`)
        }
      } catch (error) {
        // console.error('Reverse geolocation failed:', error)
      }
    }
    fetchReverseGeolocation(coords.lat, coords.lng)
  }, [coords.lat, coords.lng])

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
      <div className="coordinates"></div>
    </div>
  )
}

export default MapTiler
