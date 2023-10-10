import { AppState } from "../AppState.js";
import { House } from "../models/House.js";
import { Pop } from "../utils/Pop.js"
import { api } from "./AxiosService.js"



class HousesService {

  async getHouses() {
    try {
      const res = await api.get('api/houses')
      console.log('Houses Got', res.data);
      const newHouse = res.data.map(housePOJO => new House(housePOJO))
      AppState.houses = newHouse
      console.log('AppState Houses', AppState.houses);
    } catch (error) {
      Pop.error(error)
      console.error(error)
    }
  }

}

export const housesService = new HousesService()