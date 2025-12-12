import axios from 'axios';
import { environment } from '../../config/environment';


const API_URL = `${environment.API_URL}/WeatherForecast/`;

const getWeather = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

const weatherService = {
    getWeather,
};

export default weatherService;
