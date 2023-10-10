import { AppState } from "../AppState.js"

export class House {
  constructor(data) {
    this.Id = data.id
    this.creatorId = data.creatorId
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
    this.year = data.year
    this.levels = data.levels
    this.bathrooms = data.bathrooms
    this.bedrooms = data.bedrooms
    this.description = data.description || ''
    this.price = data.price
    this.imgUrl = data.imgUrl
    this.creator = data.creator


  }


  get houseCardTemplate() {
    return `<section class="row justify-content-around my-3">
    <div class="col-4">
      <section class="row">
        <div class="col-12 ">
          <img class="house-img  border border-2 border-dark" src=${this.imgUrl}"
            alt="house">

        </div>
      </section>
    </div>
    <div class="col-6 border border-2 border-dark">
      <p class="fs-2">${this.creator.name} </p>
      <p class="fs-4">Listed at: ${this.createdAt.toLocaleString()}, Edited at: ${this.updatedAt.toLocaleString()}</p>
      <p class="fs-5">Levels ${this.levels}, Bathrooms ${this.bathrooms}, Bedrooms ${this.bedrooms} Year Built
        ${this.year} </p>
      <p class="fs-4">${this.description}</p>
      <p class="fs-5">Price: ${this.price}</p>
      <img class="img-fluid rounded-circle house-creator" src="${this.creator.picture}" alt="">
      <div class="text-end">
      ${this.computeDelButton}
      </div>
    </div>
  </section>
    `
  }



  static get houseFormTemplate() {
    return `<div class="col-12">
    <form onsubmit="app.HousesController.newHouse(event)">
      <div class="mb-2">
        <label for="year">Year</label>
        <input id="year" type="number" name="year" required placeholder="Year Built">
      </div>
      <div class="mb-2">
        <label for="levels">Levels</label>
        <input id="levels" type="number" name="levels" required placeholder="Levels">
      </div>
      <div class="mb-2">
        <label for="bedrooms">Bedrooms</label>
        <input id="bedrooms" type="number" name="bedrooms" placeholder="Number Of Bedrooms" required>
      </div>
      <div class="mb-2">
        <label for="bathrooms">Bathrooms</label>
        <input id="bathrooms" type="number" name="bathrooms" placeholder="Number Of Bathrooms" required>
      </div>
      <div class="mb-2">
        <label for="price">Price</label>
        <input id="price" type="number" name="price" placeholder="Price Amount" required>
      </div>
      <div class="mb-2">
        <label for="imgUrl">Image URL</label>
        <input id="imgUrl" type="url" name="imgUrl" placeholder="Image URL" maxlength="500" required>
      </div>
      <div class="mb-2">
        <label for="description">Description</label>
        <textarea name="description" id="description" cols="50" rows="5" placeholder="House Description"
          maxlength="5000"></textarea>
      </div>

      <div>
        <button type="submit" class="btn btn-danger">Submit</button>
      </div>

    </form>
  </div>`


  }

  get computeDelButton() {
    if (AppState.account?.id == this.creatorId) {
      return ` <button class="btn btn-danger" onclick="app.HousesController.removeHouse('${this.Id}')">Remove House</button>`
    }
    return ''
  }
}



