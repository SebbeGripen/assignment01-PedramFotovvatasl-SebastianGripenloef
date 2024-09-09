import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';


const dateStart = faker.date.between({ from: '2025-01-01', to: '2025-02-01' });
const dateEnd = faker.date.between({ from: '2025-02-02', to: '2025-03-01' });

export class ReservationsPage {
    readonly page: Page;
    readonly createReservationButton: Locator;
    readonly startDateTextField: Locator;
    readonly endDateTextField: Locator;
    readonly selectClient: Locator;
    readonly selectRoom: Locator;
    readonly selectBill: Locator;


    constructor(page: Page) {
        this.page = page;
        this.createReservationButton = page.locator('a.btn:nth-child(2)');
        this.startDateTextField = page.locator('div.field:nth-child(1) > input:nth-child(2)');
        this.endDateTextField = page.locator('div.field:nth-child(2) > input:nth-child(2)');
        this.selectClient = page.locator('div.field:nth-child(3) > select:nth-child(2)');
        this.selectRoom = page.locator('div.field:nth-child(4) > select:nth-child(2)');
        this.selectBill = page.locator('div.field:nth-child(5) > select:nth-child(2)');

    }

    async perfomCreateReservation() {
        await this.createReservationButton.click();
        await this.startDateTextField.fill(dateStart);
        await this.endDateTextField.fill(dateEnd);
        await this.selectClient.selectOption({index:1});
        await this.selectRoom.selectOption({index:1})
        await this.selectBill.selectOption({index:0})
    }
}

