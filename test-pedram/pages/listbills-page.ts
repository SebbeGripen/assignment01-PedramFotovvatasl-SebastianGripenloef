import { expect, type Locator, type Page } from '@playwright/test';

export class ListBillsPage {
    //Attributes
    readonly page: Page;
    readonly billsButton: Locator;
    readonly billsBackButton: Locator;

    //Constructor
    constructor(page: Page) {
        this.page = page;
        this.billsButton = page.locator("div.block:nth-child(3) > a:nth-child(4)");

    }

    // Methods / functions
    async listBills() {
        await this.billsButton.click();

    }

    async backoutBills() {
        await this.billsBackButton.click();

    }

}