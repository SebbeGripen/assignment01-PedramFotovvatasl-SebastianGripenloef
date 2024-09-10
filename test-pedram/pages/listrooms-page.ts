//login-page.ts
import { expect, type Locator, type Page } from '@playwright/test';

//faker data

export class ListRoomsPage {
  //Attributes
  readonly page: Page;
  readonly roomsButton: Locator;
  readonly createRoomButton: Locator;
  readonly roomsBackButton: Locator;
  //testing below
  readonly contextMenuButton: Locator;
  readonly contextDeleteButton: Locator;
  readonly contextEditButton: Locator;
  readonly contextEditSaveButton: Locator;


  //Constructor
  constructor(page: Page) {
    this.page = page;
    this.roomsButton = page.locator('div.block:nth-child(1) > a:nth-child(3)');
    this.createRoomButton = page.locator("a.btn:nth-child(2)");
    this.roomsBackButton = page.locator("a.btn:nth-child(1)");
    //testing below
    this.contextMenuButton = page.locator("div.card:nth-child(1) > div:nth-child(3) > img:nth-child(1)");
    this.contextDeleteButton = page.locator(".menu > a:nth-child(2)");
    this.contextEditButton = page.locator(".menu > a:nth-child(1)");
    this.contextEditSaveButton = page.locator(".blue"); 
  }

  // Methods / functions
  async listRooms() {
    await this.roomsButton.click();
    


  }


}