import axios from 'axios';
import { AIRPORT_LOCATION_API } from '../constants/api';

const getLocation = async (destination) => {
    try {
        const { data } = await axios.get(`${AIRPORT_LOCATION_API}${destination}`);
        return data;
    } catch (error) {
        console.error('error: ', error);
    }
};

export {
    getLocation
};
