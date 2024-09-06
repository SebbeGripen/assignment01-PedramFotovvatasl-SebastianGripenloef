import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

const fullName = faker.person.fullName();      
const email = faker.internet.email();     
const phoneNumber = faker.phone.number(); 

export class ClientsPage {
  //Attributes
  readonly page: Page;
  readonly createClientButton: Locator;
  readonly nameTextField: Locator;
  readonly emailTextField: Locator;
  readonly phoneNumber: Locator;
  readonly saveButton: Locator;


  constructor(page: Page) {
    this.page = page;
    this.createClientButton = page.locator('a.btn:nth-child(2)');
    this.nameTextField = page.locator('div.field:nth-child(1) > input:nth-child(2)');
    this.emailTextField = page.locator('div.field:nth-child(2) > input:nth-child(2)');
    this.phoneNumber = page.locator('div.field:nth-child(3) > input:nth-child(2)');
    this.saveButton = page.locator('a.btn:nth-child(2)');
  }

   async perfromCreateClient() {
    await this.createClientButton.click();
    await this.nameTextField.fill(fullName);
    await this.emailTextField.fill(email);
    await this.phoneNumber.fill(phoneNumber);
   }
   async saveClient(){
    await this.saveButton.click();
   }

}