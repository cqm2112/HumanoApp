import axios from 'axios';


const API_URL = 'http://localhost:7293/WeatherForecast/';

const getWeather = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

const weatherService = {
    getWeather,
};

export default weatherService;
