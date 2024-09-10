import { expect, type Locator, type Page } from '@playwright/test';

export class BillsPage {
    readonly page: Page;
    readonly billsBackButton: Locator;


    constructor(page: Page) {
        this.page = page;

        this.billsBackButton = page.locator('a.btn:nth-child(1)');
    }

    async outBills() {
        await this.billsBackButton.click();
      }
}