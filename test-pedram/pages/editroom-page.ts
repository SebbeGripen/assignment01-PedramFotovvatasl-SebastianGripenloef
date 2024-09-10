import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

//faker data
const randomRoomNumber2 = faker.finance.amount({ min: 1, max: 200, dec: 0 })
const randomFloorNumber2 = faker.finance.amount({ min: 1, max: 10, dec: 0 })
const randomPriceAmount2 = faker.commerce.price({ min: 100, max: 2000, dec: 0 })
export class EditRoomPage {
    //Attributes
    readonly page: Page;
    readonly roomsButton: Locator;
    readonly editCategoryField: Locator;

    readonly editNumberField: Locator;
    readonly editFloorField: Locator;
    readonly availableCheckbox: Locator;
    readonly editpriceField: Locator;
    readonly editfeatures: Locator;

    //testing below
    readonly contextMenuButton: Locator;
    readonly editPageDeleteButton: Locator;
    readonly contextEditButton: Locator;
    readonly editSaveButton: Locator;
    readonly contextDeleteButton: Locator;


    //Constructor
    constructor(page: Page) {
        this.page = page;
        this.roomsButton = page.locator('div.block:nth-child(1) > a:nth-child(3)');
        this.editCategoryField = page.locator("div.field:nth-child(3) > select:nth-child(2)");
        this.editFloorField = page.locator("div.field:nth-child(5) > input:nth-child(2)");
        this.availableCheckbox = page.locator(".checkbox");
        this.editpriceField = page.locator("div.field:nth-child(7) > input:nth-child(2)");
        this.editfeatures = page.locator("div.field:nth-child(8) > select:nth-child(2)");
        this.editNumberField = page.locator("div.field:nth-child(4) > input:nth-child(2)");
        this.contextMenuButton = page.locator("div.card:nth-child(1) > div:nth-child(3) > img:nth-child(1)");
        this.editPageDeleteButton = page.locator(".red");
        this.contextEditButton = page.locator(".menu > a:nth-child(1)");
        this.editSaveButton = page.locator(".blue");
        this.contextDeleteButton = page.locator(".menu > a:nth-child(2)");
    }

    // Methods / functions
    async editRoom() {
        await this.contextMenuButton.click();
        await this.contextEditButton.click();
        await this.editCategoryField.selectOption({ index: 2 });
        await this.editNumberField.fill(randomRoomNumber2);
        await this.editFloorField.fill(randomFloorNumber2);
        await this.editpriceField.fill(randomPriceAmount2);
        await this.editfeatures.selectOption({ index: 3 })


    }

    async saveEditRoom() {
        await this.editSaveButton.click();

    }

    async deleteRoom() {
        await this.contextMenuButton.click();
        await this.contextDeleteButton.click();



    }

}


