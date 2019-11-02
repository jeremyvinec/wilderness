import config from '../utils/config'

const KEY = config.get('accessToken')

class Api {

    static getCities(search) {
      console.log(search)
      return fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/' + search + '.json?access_token=' + KEY, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .catch((error) => console.error(error));
    }
  
  }
  
  export default Api