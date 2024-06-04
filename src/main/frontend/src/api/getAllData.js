import axios from 'axios'

export const fetchPlaces = async () => {
  try {
    const response = await axios.post('http://localhost:8080/api/place')
    return response.data
  } catch (error) {
    console.log()
    return []
  }
}

export const fetchActivities = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/activities')
    return response.data
  } catch (error) {
    console.log('Fetching data error :' + error)
    return []
  }
}

export const fetchRestaurants = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/restaurants')
    return response.data
  } catch (error) {
    console.log('Fetching data error :' + error)
    return []
  }
}
