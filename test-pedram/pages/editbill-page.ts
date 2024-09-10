//login-page.ts
import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

//faker data
const randomValueAmount2 = faker.finance.amount({ min: 1, max: 2000, dec: 0 })

export class EditBillPage {
    //Attributes
    readonly page: Page;

    readonly billsContextMenu: Locator;
    readonly billsContextEditButton: Locator;
    readonly billsContextDeleteButton: Locator;
    readonly billsEditValueField: Locator;
    readonly billsEditCheckbox: Locator;
    readonly saveEditBillsButton: Locator;

    //Constructor
    constructor(page: Page) {
        this.page = page;
        this.billsContextMenu = page.locator("div.card:nth-child(1) > div:nth-child(4) > img:nth-child(1)")
        this.billsContextEditButton = page.locator(".menu > a:nth-child(1)");
        this.billsContextDeleteButton = page.locator(".menu > a:nth-child(2)");
        this.billsEditValueField = page.locator("div.field:nth-child(3) > input:nth-child(2)");
        this.billsEditCheckbox = page.locator(".checkbox");
        this.saveEditBillsButton = page.locator(".blue");
    }

    // Methods / functions
    async editBill() {
        await this.billsContextMenu.click();
        await this.billsContextEditButton.click();
        await this.billsEditValueField.fill(randomValueAmount2);
        await this.billsEditCheckbox.click();

    }

    async saveEditedBill() {
        await this.saveEditBillsButton.click();
    }

    async deleteBill() {
        await this.billsContextMenu.click();
        await this.billsContextDeleteButton.click();
    }
}