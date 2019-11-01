import config from '../utils/config'

const KEY = config.get('accessToken')

const getCities = (text) => {
    fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/' + text + '.json?access_token=' + KEY )
    .then((res) => res.json())
    .then(data => console.log(data))
    .catch((error) => console.error(error))
}

export default getCities