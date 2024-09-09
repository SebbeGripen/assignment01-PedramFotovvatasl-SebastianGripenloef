//login-page.ts
import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

//faker data
const randomRoomNumber = faker.finance.amount({min:1, max:200, dec:0})
const randomFloorNumber = faker.finance.amount({min:1, max:10, dec:0})
const randomPriceAmount = faker.commerce.price({ min: 100, max: 2000, dec:0 })
const randomRoomNumber2 = faker.finance.amount({min:1, max:200, dec:0})
const randomFloorNumber2 = faker.finance.amount({min:1, max:10, dec:0})
const randomPriceAmount2 = faker.commerce.price({ min: 100, max: 2000, dec:0 })
export class RoomsPage {
  //Attributes
  readonly page: Page;
  readonly roomsButton: Locator;
  //readonly clickRoomsButton: Locator;
  readonly createRoomButton: Locator;
  readonly categorySelector: Locator;
  readonly numberTextField: Locator;
  readonly floorTextField: Locator;
  readonly availableCheckbox: Locator;
  readonly priceTextField: Locator;
  readonly saveRoomButton: Locator;
  readonly featureSelect: Locator;
  

  //Constructor
  constructor(page: Page) {
    this.page = page;
    this.roomsButton = page.locator('div.block:nth-child(1) > a:nth-child(3)'); 
    this.createRoomButton= page.locator("a.btn:nth-child(2)");
    this.categorySelector= page.locator("div.field:nth-child(1) > select:nth-child(2)");
    this.numberTextField= page.locator("div.field:nth-child(2) > input:nth-child(2)");
    this.floorTextField = page.locator("div.field:nth-child(3) > input:nth-child(2)");
    this.availableCheckbox = page.locator(".checkbox")
    this.priceTextField = page.locator("div.field:nth-child(5) > input:nth-child(2)");
    this.saveRoomButton = page.locator("a.btn:nth-child(2)");
    this.featureSelect = page.locator("div.field:nth-child(6) > select:nth-child(2)")
  }

  // Methods / functions
  async createValidRoom () {
    await this.roomsButton.click();
    await this.createRoomButton.click();
    await this.categorySelector.selectOption({index:1});
    await this.numberTextField.fill(randomRoomNumber);
    await this.floorTextField.fill(randomFloorNumber);
    await this.availableCheckbox.click();
    await this.priceTextField.fill(randomPriceAmount);
    await this.featureSelect.selectOption({index:2})

  }

  async createInvalidRoom () {
    await this.roomsButton.click();
    await this.createRoomButton.click();
    await this.categorySelector.selectOption({index:2});
    await this.numberTextField.fill(randomRoomNumber2);
    await this.floorTextField.fill(randomFloorNumber2);
    //await this.availableCheckbox.click();
    await this.priceTextField.fill(randomPriceAmount2);
    await this.featureSelect.selectOption({index:3})

  }
  
  async saveRoom() {
    await this.saveRoomButton.click();

  }


}