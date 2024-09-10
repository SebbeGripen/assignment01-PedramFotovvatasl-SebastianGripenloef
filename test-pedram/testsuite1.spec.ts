//testsuite01.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login-page';
import { DashboardPage } from './pages/dashboard-page';
import { ListRoomsPage } from './pages/listrooms-page';
import { CreateRoomPage } from './pages/createroom-page';
import { EditRoomPage } from './pages/editroom-page';
import { ListBillsPage } from './pages/listbills-page';
import { CreateBillsPage } from './pages/createbills-page';
import { EditBillPage } from './pages/editbill-page';


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

    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
    await dashboardPage.performLogout();
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    await page.waitForTimeout(5000);
  });

  test('Test case 2 - Create an available room with randomly generated data', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const listRoomsPage = new ListRoomsPage(page);
    const createRoomPage = new CreateRoomPage(page);

    await loginPage.goto();

    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)

    await listRoomsPage.listRooms();
    //Rooms header visible
    await expect(page.locator("div.container:nth-child(2) > h2:nth-child(1) > div:nth-child(1)")).toBeVisible();

    await createRoomPage.createRoom();
    //New rooms header
    await expect(page.locator("div.container:nth-child(2) > h2:nth-child(1) > div:nth-child(1)")).toBeVisible();

    await expect(page.locator("div.field:nth-child(1) > select:nth-child(2)")).toBeVisible();
    await expect(page.locator("div.field:nth-child(2) > input:nth-child(2)")).toBeVisible();
    await expect(page.locator("div.field:nth-child(3) > input:nth-child(2)")).toBeVisible();
    await expect(page.locator(".checkbox")).toBeVisible();
    //await expect(page.locator(""))
    await expect(page.locator("div.field:nth-child(5) > input:nth-child(2)")).toBeVisible();
    await expect(page.locator("div.field:nth-child(6) > select:nth-child(2)")).toBeVisible();

    await expect(page.locator("a.btn:nth-child(2)")).toBeEnabled();
    await expect(page.locator("a.btn:nth-child(2)")).toBeVisible();

    await createRoomPage.saveRoom();

    await page.waitForTimeout(5000);


  });

  test('Test case 3 - Edit an existing room', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const listRoomsPage = new ListRoomsPage(page);
    const editRoomPage = new EditRoomPage(page);
    
    await loginPage.goto();

    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)

    await listRoomsPage.listRooms();
    await editRoomPage.editRoom();
    await editRoomPage.saveEditRoom();

  });

  test('Test case 4 -  Delete all rooms and assert that the page is empty', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const listRoomsPage = new ListRoomsPage(page);
    const editRoomPage = new EditRoomPage(page);
    
    await loginPage.goto();

    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)

    await listRoomsPage.listRooms();
    await editRoomPage.deleteRoom();
    await editRoomPage.deleteRoom();
    //assert that page displays that there are no more rooms
    await expect(page.locator("div.container:nth-child(2) > div:nth-child(3) > p:nth-child(1)")).toBeVisible();

  });

  test('Test case 5 - Create a new bill with a randomly generated amount', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const listBillsPage = new ListBillsPage(page);
    const createBillsPage = new CreateBillsPage(page);

    await loginPage.goto();

    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)

    await listBillsPage.listBills();
    await createBillsPage.createBill();
    await createBillsPage.saveBill();

  });

  test('Test case 6 - Edit existing bill', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const listBillsPage = new ListBillsPage(page);
    const editBillPage = new EditBillPage(page);

    await loginPage.goto();

    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)

    await listBillsPage.listBills();
    await editBillPage.editBill();
    await editBillPage.saveEditedBill();

  });

  test('Test case 7 - Delete existing bill', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const listBillsPage = new ListBillsPage(page);
    const editBillPage = new EditBillPage(page);

    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)

    await listBillsPage.listBills();
    await editBillPage.deleteBill();

  });




});