import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';


const dateStart = faker.date.between({ from: '2025-01-01', to: '2025-02-01' });
const dateEnd = faker.date.between({ from: '2025-02-02', to: '2025-03-01' });

// Convert dates to string format (YYYY-MM-DD)
const formattedDateStart = dateStart.toISOString().split('T')[0];
const formattedDateEnd = dateEnd.toISOString().split('T')[0];

export class EditReservationsPage {
    readonly page: Page;
    readonly startDateTextField: Locator;
    readonly endDateTextField: Locator;
    readonly selectClient: Locator;
    readonly selectRoom: Locator;
    readonly selectBill: Locator;
    readonly selectSaveReservation: Locator;



    constructor(page: Page) {
        this.page = page;
        this.startDateTextField = page.locator('div.field:nth-child(3) > input:nth-child(2)');
        this.endDateTextField = page.locator('div.field:nth-child(4) > input:nth-child(2)');
        this.selectClient = page.locator('div.field:nth-child(5) > select:nth-child(2)');
        this.selectRoom = page.locator('div.field:nth-child(6) > select:nth-child(2)');
        this.selectBill = page.locator('div.field:nth-child(7) > select:nth-child(2)');
        this.selectSaveReservation = page.locator('.blue');
    }

    async perfomFillReservation() {
        await this.startDateTextField.fill(formattedDateStart);
        await this.endDateTextField.fill(formattedDateEnd);
        await this.selectClient.selectOption({ index: 2 });
        await this.selectRoom.selectOption({ index: 2 })
        await this.selectBill.selectOption({ index: 0 })
    }
    async perfromSaveReservation() {
        await this.selectSaveReservation.click();
    }



}
