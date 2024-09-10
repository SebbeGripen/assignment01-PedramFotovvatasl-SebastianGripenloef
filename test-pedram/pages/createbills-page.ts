import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

//faker data
const randomValueAmount = faker.finance.amount({ min: 1, max: 2000, dec: 0 })

export class CreateBillsPage {
    //Attributes
    readonly page: Page;
    readonly billsButton: Locator;
    readonly createBillButton: Locator;
    readonly valueTextField: Locator;
    readonly paidCheckbox: Locator;
    readonly saveBillButton: Locator;

    //Constructor
    constructor(page: Page) {
        this.page = page;
        this.billsButton = page.locator("div.block:nth-child(3) > a:nth-child(4)");
        this.createBillButton = page.locator("a.btn:nth-child(2)");
        this.valueTextField = page.locator("div.field:nth-child(1) > input:nth-child(2)");
        this.paidCheckbox = page.locator(".checkbox");
        this.saveBillButton = page.locator("a.btn:nth-child(2)");
    }

    // Methods / functions
    async createBill() {
        await this.createBillButton.click();
        await this.valueTextField.fill(randomValueAmount);
        await this.paidCheckbox.click();

    }

    async saveBill() {
        await this.saveBillButton.click();
    }
}