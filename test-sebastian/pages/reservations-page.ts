import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';


const dateStart = faker.date.between({ from: '2025-01-01', to: '2025-02-01' });
const dateEnd = faker.date.between({ from: '2025-02-02', to: '2025-03-01' });
// Convert dates to string format (YYYY-MM-DD)
const formattedDateStart = dateStart.toISOString().split('T')[0];
const formattedDateEnd = dateEnd.toISOString().split('T')[0];

export class ReservationsPage {
    readonly page: Page;
    readonly createReservationButton: Locator;
    readonly startDateTextField: Locator;
    readonly endDateTextField: Locator;
    readonly selectClient: Locator;
    readonly selectRoom: Locator;
    readonly selectBill: Locator;
    readonly selectSaveReservation: Locator;
    readonly contextMenu: Locator;
    readonly deleteButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.createReservationButton = page.locator('a.btn:nth-child(2)');
        this.startDateTextField = page.locator('div.field:nth-child(1) > input:nth-child(2)');
        this.endDateTextField = page.locator('div.field:nth-child(2) > input:nth-child(2)');
        this.selectClient = page.locator('div.field:nth-child(3) > select:nth-child(2)');
        this.selectRoom = page.locator('div.field:nth-child(4) > select:nth-child(2)');
        this.selectBill = page.locator('div.field:nth-child(5) > select:nth-child(2)');
        this.selectSaveReservation = page.locator('a.btn:nth-child(2)');
        this.contextMenu = page.locator('.action > img:nth-child(1)');
        this.deleteButton = page.locator('.menu > a:nth-child(2)');

    }

    async perfomCreateReservation() {
        await this.createReservationButton.click();
        await this.startDateTextField.fill(formattedDateStart);
        await this.endDateTextField.fill(formattedDateEnd);
        await this.selectClient.selectOption({ index: 2 });
        await this.selectRoom.selectOption({ index: 2 })
        await this.selectBill.selectOption({ index: 1 })
    }
    async perfromSaveReservation() {
        await this.selectSaveReservation.click();
    }

    async deleteReservation() {
        await this.contextMenu.click();
        await this.deleteButton.click();
    }
}

