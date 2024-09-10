import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

const fullName = faker.person.fullName();
const email = faker.internet.email();
const phoneNumber = faker.phone.number();

export class EditClientsPage {
  //Attributes
  readonly page: Page;
  readonly nameTextField;
  readonly emailTextField;
  readonly telephoneTextField;
  readonly saveButton


  constructor(page: Page) {
    this.page = page;
    this.nameTextField = page.locator('div.field:nth-child(3) > input:nth-child(2)');
    this.emailTextField = page.locator('div.field:nth-child(4) > input:nth-child(2)');
    this.telephoneTextField = page.locator('div.field:nth-child(5) > input:nth-child(2)');
    this.saveButton = page.locator('.blue');
  }

  async perfromFillClient() {
    await this.nameTextField.Fill(fullName);
    await this.emailTextField.Fill(email);
    await this.telephoneTextField.Fill(phoneNumber);
 }

 async saveEditClient() {
    await this.saveButton.click();
 }


}