import { AppState } from "../AppState.js";
import { House } from "../models/House.js";
import { Pop } from "../utils/Pop.js"
import { api } from "./AxiosService.js"



class HousesService {
  async removeHouse(houseId) {
    try {
      const res = await api.delete(`api/houses/${houseId}`)
      const houseIndex = AppState.houses.findIndex(house => house.Id == houseId)
      if (houseIndex == -1) {
        return

      }
      AppState.houses.splice(houseIndex, 1)
      AppState.emit('houses')
    } catch (error) {

    }
  }
  async newHouse(houseData) {
    const res = await api.post('api/houses', houseData)
    const newHome = new House(res.data)
    AppState.houses.push(newHome)
    AppState.emit('houses')
  }

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