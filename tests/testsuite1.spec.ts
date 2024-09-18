//testsuite1.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login-page';
import { DashboardPage } from './pages/dashboard-page';
import { ListRoomsPage } from './pages/listrooms-page';
import { CreateRoomPage } from './pages/createroom-page';
import { EditRoomPage } from './pages/editroom-page';
import { ListBillsPage } from './pages/listbills-page';
import { CreateBillsPage } from './pages/createbills-page';
import { EditBillPage } from './pages/editbill-page';
import { execSync } from 'child_process';

//Restarts docker container after each test to reset contents of application.
function restartDocker(containerName) {
  try {
    execSync(`docker stop ${containerName}`);
    execSync(`docker start ${containerName}`);
  } catch (error) {
    console.error('Error restarting Docker container:', error.message);
    throw error;
  }
}

const containerName = ''; //Enter your own container name here from docker.

test.afterEach(() => {
  restartDocker(containerName);
});

//Note: Docker container must be started before running the tests, tests must be ran one at a time.
test.describe('Test suite 01', () => {
  test('Test case 1 - Test logging into the application by automatically retrieving username and password from .env, assert that login fields are visible and editable, and that login button is enabled and visible. Also assert that the user sees dashboard after login, then logout.', async ({ page }) => {
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

  });

  test('Test case 2 - Create an available room with randomly generated data, and assert relevant fields so that they are visible and editable, then save the room and back out of the rooms section.', async ({ page }) => {
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
    await expect(page.locator("div.field:nth-child(1) > select:nth-child(2)")).toBeEditable();
    await expect(page.locator("div.field:nth-child(2) > input:nth-child(2)")).toBeVisible();
    await expect(page.locator("div.field:nth-child(2) > input:nth-child(2)")).toBeEditable();
    await expect(page.locator("div.field:nth-child(3) > input:nth-child(2)")).toBeVisible();
    await expect(page.locator("div.field:nth-child(3) > input:nth-child(2)")).toBeEditable();
    await expect(page.locator(".checkbox")).toBeVisible();
    await expect(page.locator("div.field:nth-child(5) > input:nth-child(2)")).toBeVisible();
    await expect(page.locator("div.field:nth-child(5) > input:nth-child(2)")).toBeEditable();
    await expect(page.locator("div.field:nth-child(6) > select:nth-child(2)")).toBeVisible();
    await expect(page.locator("div.field:nth-child(6) > select:nth-child(2)")).toBeEditable();
    await expect(page.locator("a.btn:nth-child(2)")).toBeEnabled();
    await expect(page.locator("a.btn:nth-child(2)")).toBeVisible();

    await createRoomPage.saveRoom();

    await listRoomsPage.backoutRooms();

    await expect(page.locator("div.container:nth-child(2) > h2:nth-child(1)")).toBeVisible();

  });

  test('Test case 3 - Edit an existing room and assert that the fields are visible and that they are not empty.', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const listRoomsPage = new ListRoomsPage(page);
    const editRoomPage = new EditRoomPage(page);

    await loginPage.goto();

    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)

    await listRoomsPage.listRooms();
    await editRoomPage.editRoom();

    await expect(page.locator("div.field:nth-child(3) > select:nth-child(2)")).toBeVisible();
    await expect(page.locator("div.field:nth-child(3) > select:nth-child(2)")).not.toBeEmpty();
    await expect(page.locator("div.field:nth-child(5) > input:nth-child(2)")).toBeVisible();
    await expect(page.locator("div.field:nth-child(5) > input:nth-child(2)")).not.toBeEmpty();
    await expect(page.locator(".checkbox")).toBeEnabled();
    await expect(page.locator("div.field:nth-child(7) > input:nth-child(2)")).toBeVisible();
    await expect(page.locator("div.field:nth-child(7) > input:nth-child(2)")).not.toBeEmpty();
    await expect(page.locator("div.field:nth-child(8) > select:nth-child(2)")).toBeVisible();
    await expect(page.locator("div.field:nth-child(4) > input:nth-child(2)")).toBeVisible();
    await expect(page.locator("div.field:nth-child(4) > input:nth-child(2)")).not.toBeEmpty();

    await editRoomPage.saveEditRoom();

    await expect(page.locator("div.container:nth-child(2) > h2:nth-child(1) > div:nth-child(1)")).toBeVisible();

  });

  test('Test case 4 - Delete all rooms that display when starting the application fresh, and assert that the page gives a message that there are no more rooms.', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const listRoomsPage = new ListRoomsPage(page);
    const editRoomPage = new EditRoomPage(page);

    await loginPage.goto();

    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)

    await listRoomsPage.listRooms();
    await editRoomPage.deleteRoom();
    await editRoomPage.deleteRoom();

    await expect(page.locator("div.container:nth-child(2) > div:nth-child(3) > p:nth-child(1)")).toBeVisible();

  });

  test('Test case 5 - Create a new bill with a randomly generated amount and assert that the value field is visible and editable.', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const listBillsPage = new ListBillsPage(page);
    const createBillsPage = new CreateBillsPage(page);

    await loginPage.goto();

    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)

    await listBillsPage.listBills();
    await createBillsPage.createBill();

    await expect(page.locator("div.field:nth-child(1) > input:nth-child(2)")).toBeEditable();
    await expect(page.locator("div.field:nth-child(1) > input:nth-child(2)")).toBeVisible(); 
    await expect(page.locator(".checkbox")).toBeEnabled();

    await createBillsPage.saveBill();

    await expect(page.locator("div.container:nth-child(2) > h2:nth-child(1) > div:nth-child(1)")).toBeVisible();

  });

  test('Test case 6 - Edit an existing bill, then delete a bill.', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const listBillsPage = new ListBillsPage(page);
    const editBillPage = new EditBillPage(page);

    await loginPage.goto();

    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)

    await listBillsPage.listBills();

    await expect(page.locator("div.card:nth-child(1) > div:nth-child(4) > img:nth-child(1)")).toBeEnabled();
    await expect(page.locator(".menu > a:nth-child(1)")).toBeHidden();

    await editBillPage.editBill();

    await expect(page.locator(".checkbox")).toBeVisible();
    await expect(page.locator(".blue")).toBeEnabled();

    await editBillPage.saveEditedBill();
    await editBillPage.deleteBill();

    await expect(page.locator("div.container:nth-child(2) > h2:nth-child(1) > div:nth-child(1)")).toBeVisible();

  });

  test('Test case 7 - From a fresh start, delete an existing bill and assert that the page displays that there are no more bills, then create a new bill.', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const listBillsPage = new ListBillsPage(page);
    const editBillPage = new EditBillPage(page);
    const createBillsPage = new CreateBillsPage(page);

    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)

    await listBillsPage.listBills();
    await editBillPage.deleteBill();
    await expect(page.locator("div.container:nth-child(2) > div:nth-child(3)")).toBeVisible();

    await createBillsPage.createBill();
    await createBillsPage.saveBill();

    await expect(page.locator("div.container:nth-child(2) > h2:nth-child(1) > div:nth-child(1)")).toBeVisible();

  });

});