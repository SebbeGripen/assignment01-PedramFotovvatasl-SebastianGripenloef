//testsuite01.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login-page';
import { DashboardPage } from './pages/dashboard-page';
import { RoomsPage } from './pages/rooms-page';
import { BillsPage } from './pages/bills-page';

//test teardown
test.beforeEach(async ({ page }) => {
  // Navigate to the initial page before each test if needed
  await page.goto("http://localhost:3000"); // Replace with your initial URL
});

test.describe('Test suite 01', () => {
  test('Test case 1 - Test login function,text fields and logout', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto();
    await expect(loginPage.usernameTextfield).toBeVisible();
    await expect(loginPage.usernameTextfield).toBeEditable();
    await expect(loginPage.usernameTextfield).toBeEmpty();
    
    await expect(loginPage.passwordTextfield).toBeVisible();
    await expect(loginPage.passwordTextfield).toBeEditable();
    await expect(loginPage.passwordTextfield).toBeEmpty();

    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.loginButton).toBeEnabled();

    await loginPage.performLogin(`${process.env.TEST_USERNAME}`,`${process.env.TEST_PASSWORD}`)
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
    await dashboardPage.performLogout();
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible(); 
    await page.waitForTimeout(5000);   
  });   

  test('Test case 2 - Test creating an available room with valid values', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const roomsPage = new RoomsPage(page);

    await loginPage.goto();

    await loginPage.performLogin(`${process.env.TEST_USERNAME}`,`${process.env.TEST_PASSWORD}`)

    await roomsPage.createValidRoom();
    //expect 'new room' header to be visible
    await expect(page.locator("div.container:nth-child(2) > h2:nth-child(1) > div:nth-child(1)")).toBeVisible();
    await expect(roomsPage.categorySelector).toBeVisible();
    await expect(roomsPage.numberTextField).toBeVisible();
    await expect(roomsPage.floorTextField).toBeVisible();
    await expect(roomsPage.availableCheckbox).toBeVisible();
    await expect(roomsPage.priceTextField).toBeVisible();

    await roomsPage.saveRoom();
    //Rooms header visible
    await expect(page.locator("div.container:nth-child(2) > h2:nth-child(1)")).toBeVisible();

    await page.waitForTimeout(5000);   

    
  });  

  test('Test case 3 - Test creating an invalid room with incorrect values', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const roomsPage = new RoomsPage(page);

    await loginPage.goto();

    await loginPage.performLogin(`${process.env.TEST_USERNAME}`,`${process.env.TEST_PASSWORD}`)

    await roomsPage.createInvalidRoom();
    //expect 'new room' header to be visible
    await expect(page.locator("div.container:nth-child(2) > h2:nth-child(1) > div:nth-child(1)")).toBeVisible();
    await expect(roomsPage.categorySelector).toBeVisible();
    await expect(roomsPage.numberTextField).toBeVisible();
    await expect(roomsPage.floorTextField).toBeVisible();
    await expect(roomsPage.availableCheckbox).toBeVisible();
    await expect(roomsPage.priceTextField).toBeVisible();

    await roomsPage.saveRoom();
    //Rooms header visible
    await expect(page.locator("div.container:nth-child(2) > h2:nth-child(1)")).toBeVisible();  

  }); 
  
  test('Test case 4 - Create a valid bill', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const billsPage = new BillsPage(page);

    await loginPage.goto();

    await loginPage.performLogin(`${process.env.TEST_USERNAME}`,`${process.env.TEST_PASSWORD}`)

    await billsPage.createPaidBill();
    //New Bills header
    await expect(page.locator("div.container:nth-child(2) > h2:nth-child(1) > div:nth-child(1)")).toBeVisible();

    await expect(billsPage.createBillButton).toBeVisible();
    await expect(billsPage.valueTextField).toBeVisible();
    await expect(billsPage.paidCheckbox).toBeVisible();
    await expect(billsPage.saveBillButton).toBeVisible();

    await billsPage.saveBill();
    //Bills header
    await expect(page.locator("div.container:nth-child(2) > h2:nth-child(1) > div:nth-child(1)")).toBeVisible();

  }); 

  test('Test case 5 - Creating an unpaid bill', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const billsPage = new BillsPage(page);

    await loginPage.goto();

    await loginPage.performLogin(`${process.env.TEST_USERNAME}`,`${process.env.TEST_PASSWORD}`)

    await billsPage.createUnpaidBill();

    await expect(billsPage.createBillButton).toBeVisible();
    await expect(billsPage.valueTextField).toBeVisible();
    await expect(billsPage.valueTextField).toBeVisible();
    await expect(billsPage.paidCheckbox).toBeVisible();
    await expect(billsPage.saveBillButton).toBeVisible();

    await billsPage.saveBill();

    //bills header
    await expect(page.locator("div.container:nth-child(2) > h2:nth-child(1) > div:nth-child(1)")).toBeVisible();

  }); 

  
  

});