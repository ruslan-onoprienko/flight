import { createPinia, defineStore } from 'pinia';
import { getLocation } from '../service/airportLocationService';

export const useFlightStore = defineStore('flight', {
  state: () => ({
    fromAirportLocation: '',
    toAirportLocation: '',
  }),
  actions: {
    async setFromAirportLocation(fromAirport) {
      this.fromAirportLocation = await getLocation(fromAirport);
    },
    async setToAirportLocation(toAirport) {
      this.toAirportLocation = await getLocation(toAirport);
    },
  },
})

const store = createPinia();

export default store;
