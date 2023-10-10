import { AppState } from "../AppState.js";
import { House } from "../models/House.js";
import { housesService } from "../services/HousesService.js";
import { getFormData } from "../utils/FormHandler.js";
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

  async removeHouse(houseId) {
    try {
      const wantsToDel = await Pop.confirm('Would you like to remove this house ?')
      if (!wantsToDel) {
        return
      }
      await housesService.removeHouse(houseId)
    } catch (error) {
      console.error(error);
    }
  }

  async newHouse(event) {
    try {
      event.preventDefault()
      const form = event.target
      const houseData = getFormData(form)
      await housesService.newHouse(houseData)
      form.reset()
    } catch (error) {
      console.error(error);
    }
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