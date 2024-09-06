import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

const fullName = faker.person.fullName();      
const userEmail = faker.internet.email();     
const userPhone = faker.phone.number(); 

export class ClientsPage {
  //Attributes
  readonly page: Page;
  readonly createClientButton: Locator;
  readonly nameTextField: Locator


  constructor(page: Page) {
    this.page = page;
    this.createClientButton = page.locator('a.btn:nth-child(2)');
    this.nameTextField = page.locator('div.field:nth-child(1) > input:nth-child(2)');
  }

   async perfromCreateClient() {
    await this.createClientButton.click();
    await this.nameTextField.fill(fullName)
   }

}