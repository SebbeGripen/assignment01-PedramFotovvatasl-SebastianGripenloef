//dashboard-page.ts

import { expect, type Locator, type Page } from '@playwright/test';

export class DashboardPage {
  //Attributes
  readonly page: Page;
  readonly logoutButton: Locator;
  readonly roomsButton: Locator;
  readonly roomsBackButton: Locator;
  readonly clientsButton: Locator;
  readonly clientsBackButton: Locator;
  readonly billsButton: Locator;
  readonly billsBackButton: Locator;
  readonly reservationsButton: Locator;
  readonly reservationsBackButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logoutButton = page.getByRole('button', { name: 'Logout' });
    this.roomsButton = page.locator('div.block:nth-child(1) > a:nth-child(3)');
    this.roomsBackButton = page.locator('a.btn:nth-child(1)');
    this.clientsButton = page.locator('div.block:nth-child(2) > a:nth-child(3)');
    this.clientsBackButton = page.locator('a.btn:nth-child(1)');
    this.billsButton = page.locator('div.block:nth-child(3) > a:nth-child(4)');
    this.billsBackButton = page.locator('a.btn:nth-child(1)');
    this.reservationsButton = page.locator('div.block:nth-child(4) > a:nth-child(4)');
    this.reservationsBackButton = page.locator('a.btn:nth-child(1)');
  }

  async performLogout() {
    await this.logoutButton.click();
  }

  async inRooms() {
    await this.roomsButton.click();
  }
  async outRooms() {
    await this.roomsBackButton.click();
  }
  async inClients() {
    await this.clientsButton.click();
  }
  async outClients() {
    await this.clientsBackButton.click();
  }
  async inBills() {
    await this.billsButton.click();
  }
  async outBills() {
    await this.billsBackButton.click();
  }
  async inReservations() {
    await this.reservationsButton.click();
  }
  async outReservations() {
    await this.reservationsBackButton.click();
  }
}