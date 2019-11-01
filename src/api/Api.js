import config from '../utils/config'

const KEY = config.get('accessToken')

export function getCities (text) {
    fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/" + text + ".json?access_token=" + KEY )
    .then((response) => response.json())
    .then(data => console.log(data))
    .catch((error) => console.error(error))
}