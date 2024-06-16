import axios from 'axios'
import BACKEND_URL from '../api/config'

/**
 * Fetching Data from the server.
 *
 * @returns {Promise<Object[]>} The response data containing the list of places.
 */
export const fetchPlaces = async () => {
  try {
    const response = await axios.post(`http://localhost:8080/api/place`)
    return response.data
  } catch (error) {
    console.log('Fetching Data Error : ' + error)
    return []
  }
}

/**
 * Fetching Data from the server.
 *
 * @returns {Promise<Object[]>} The response data containinng the list of activities.
 * */
export const fetchActivities = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/activities`)
    return response.data
  } catch (error) {
    console.log('Fetching Data Error :' + error)
    return []
  }
}

/**
 * Fetching Data from the server.
 *
 * @returns {Promise<Object[]>} The response data containinng the list of restaurants.
 * */
export const fetchRestaurants = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/restaurants`)
    return response.data
  } catch (error) {
    console.log('Fetching Data Error :' + error)
    return []
  }
}
