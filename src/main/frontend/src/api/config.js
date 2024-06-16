const BACKEND_SERVER = 'http://localhost:8080/api'

const API_URLS = {
  GET_ALL_PLACE: `http://localhost:8080/api/places`,
  GET_STORE_INFO: `http://localhost:8080/api/info`,
  CHOSEN_PLACE: (place_id) => `${BACKEND_SERVER}/chosen/${place_id}`,
  UNCHOSEN_PLACE: `http://localhost:8080/api/unchosen`,
}

export default API_URLS
