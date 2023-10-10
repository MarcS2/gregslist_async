import { AppState } from "../AppState.js";
import { House } from "../models/House.js";
import { housesService } from "../services/HousesService.js";
import { Pop } from "../utils/Pop.js";
import { setHTML } from "../utils/Writer.js";

function _drawHouses() {
  let content = ''
  AppState.houses.forEach(house => content += house.houseCardTemplate)
  setHTML('house-cards', content)
}

function _drawHousesForm() {
  if (!AppState.account) {
    return
  }
  setHTML('house-form', House.houseFormTemplate)

}

export class HousesController {
  constructor() {
    this.getHouses()
    _drawHousesForm()
    AppState.on('houses', _drawHouses)
    AppState.on('account', _drawHousesForm)
  }


  async getHouses() {
    try {
      await housesService.getHouses()

    } catch (error) {
      Pop.error(error)
      console.error(error);
    }
  }
}