import { expect, type Locator, type Page } from '@playwright/test';

export class ClientsPage {

  readonly page: Page;
  readonly createClientButton: Locator;
  readonly contextMenu: Locator;
  readonly deleteButton: Locator;
  readonly editClientButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.createClientButton = page.locator('a.btn:nth-child(2)');
    this.contextMenu = page.locator('div.card:nth-child(1) > div:nth-child(3) > img:nth-child(1)');
    this.deleteButton = page.locator('.menu > a:nth-child(2)');
    this.editClientButton = page.locator('.menu > a:nth-child(1)');
  }

  async perfromCreateClient() {
    await this.createClientButton.click();
  }

  async deleteClient() {
    await this.contextMenu.click();
    await this.deleteButton.click();
  }

  async editClient() {
    await this.contextMenu.click();
    await this.editClientButton.click();
  }





}