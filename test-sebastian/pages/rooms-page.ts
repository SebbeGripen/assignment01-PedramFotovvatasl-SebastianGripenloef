import { expect, type Locator, type Page } from '@playwright/test';

export class RoomsPage {
    readonly page: Page;
    readonly roomsBackButton: Locator;


    constructor(page: Page) {
        this.page = page;

        this.roomsBackButton = page.locator('a.btn:nth-child(1)');
    }

    async outRooms() {
        await this.roomsBackButton.click();
    }

}