import getURLQuery from "./restaurantController";
import fetchRestaurants from "./restaurantController";

let markers = []

/**
 * Initialize leaflet map, called from HTML.
 */
export default function initMap() {
    console.log('initializing map');
    self.newMap = L.map('map', {
          center: [40.722216, -73.987501],
          zoom: 12,
          scrollWheelZoom: false
        });
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.jpg70?access_token={mapboxToken}', {
      mapboxToken: 'pk.eyJ1IjoiamVsb2Nrcm8iLCJhIjoiY2ppZXoydmUxMGg5ZjNrb2Nuc3l0N2J0MSJ9.DVVsqyqurrIcRVgdKmGU-Q',
      maxZoom: 18,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      id: 'mapbox.streets'
    }).addTo(self.newMap);
}

/**
 * Add markers for current restaurants to the map.
 */
export function addMarkersToMap() {
    fetchRestaurants().then(objectArray => {
        objectArray.forEach(restaurant => {
            // Add marker to the map
            console.log('this should be a restaurant object', restaurant);
            const marker = mapMarkerForRestaurant(restaurant, self.newMap);
            console.log("this should still be a marker", marker);
            marker.on("click", onClick);
            function onClick() {
              window.location.href = marker.options.url;
            }
            markers.push(marker);
          });
    })

  
}
/**
 * Map marker for a restaurant. Takes restaurant object and map object for
 * arguments.
 */
export function mapMarkerForRestaurant(restaurant, map) {
// https://leafletjs.com/reference-1.3.0.html#marker
    const marker = new L.marker([restaurant.latlng.lat, restaurant.latlng.lng],
        {title: restaurant.name,
        alt: restaurant.name,
        url: getURLQuery(restaurant)
        })
        marker.addTo(self.newMap);
    console.log("this should be a marker:", marker);
    return marker;
}
/**
 * Remove all map markers
 */
function removeMapMarkers() {  
  if (markers) {
    markers.forEach(marker => marker.remove());
  }
  markers = [];
  restaurants = fetchRestaurants();
}

  