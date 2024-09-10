import { expect, type Locator, type Page } from '@playwright/test';

export class ReservationsPage {
    readonly page: Page;
    readonly createReservationButton: Locator;
    readonly contextMenu: Locator;
    readonly deleteButton: Locator;
    readonly reservationsBackButton: Locator;



    constructor(page: Page) {
        this.page = page;
        this.createReservationButton = page.locator('a.btn:nth-child(2)');
        this.contextMenu = page.locator('.action > img:nth-child(1)');
        this.deleteButton = page.locator('.menu > a:nth-child(2)');
        this.reservationsBackButton = page.locator('a.btn:nth-child(1)');

    }

    async perfomCreateReservation() {
        await this.createReservationButton.click();
    }

    async deleteReservation() {
        await this.contextMenu.click();
        await this.deleteButton.click();
    }

    async outReservations() {
        await this.reservationsBackButton.click();
    }


}
