//testsuite01.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login-page';
import { DashboardPage } from './pages/dashboard-page';
import { ClientsPage } from './pages/clients-page';
import { ReservationsPage } from './pages/reservations-page';
import { faker } from '@faker-js/faker';
import { RoomsPage } from './pages/rooms-page';
import { BillsPage } from './pages/bills-page';
import { CreateClientsPage } from './pages/createclients-page';
import { CreateReservationsPage } from './pages/createreservations-page.ts';
import { EditClientsPage } from './pages/editclients-page.ts';




test.describe('Test suite 02', () => {
  test('Test case 06 testing the dashboard', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const roomsPage = new RoomsPage(page);
    const clientsPage = new ClientsPage(page);
    const billsPage = new BillsPage(page);
    const reservationsPage = new ReservationsPage(page);


    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
    await expect(dashboardPage.logoutButton).toBeEnabled();
    await expect(dashboardPage.logoutButton).toHaveText('Logout');
    await expect(dashboardPage.logoutButton).toBeVisible();
    await dashboardPage.inRooms();
    await expect(roomsPage.roomsBackButton).toBeEnabled();
    await expect(roomsPage.roomsBackButton).toHaveText('Back');
    await expect(roomsPage.roomsBackButton).toBeVisible();
    await roomsPage.outRooms();
    await dashboardPage.inClients();
    await expect(clientsPage.clientsBackButton).toBeEnabled();
    await expect(clientsPage.clientsBackButton).toHaveText('Back');
    await expect(clientsPage.clientsBackButton).toBeVisible();
    await clientsPage.outClients();
    await dashboardPage.inBills();
    await expect(billsPage.billsBackButton).toBeEnabled();
    await expect(billsPage.billsBackButton).toHaveText('Back');
    await expect(billsPage.billsBackButton).toBeVisible();
    await billsPage.outBills();
    await dashboardPage.inReservations();
    await expect(reservationsPage.reservationsBackButton).toBeEnabled();
    await expect(reservationsPage.reservationsBackButton).toHaveText('Back');
    await expect(reservationsPage.reservationsBackButton).toBeVisible();
    await reservationsPage.outReservations();
    await dashboardPage.performLogout();
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    await page.waitForTimeout(5000);
  });
});

test.describe('Test suite 02', () => {
  test('Test case 07 create a client and save it', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const clientsPage = new ClientsPage(page);
    const createClientsPage = new CreateClientsPage(page);

    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)
    await dashboardPage.inClients();
    await expect(page.getByRole('heading', { name: 'Clients' })).toBeVisible();
    await expect(clientsPage.createClientButton).toBeEnabled();
    await expect(clientsPage.createClientButton).toHaveText('Create Client');
    await expect(clientsPage.createClientButton).toBeVisible();
    await clientsPage.perfromCreateClient();
    await expect(createClientsPage.nameTextField).toBeEditable;
    await expect (createClientsPage.emailTextField).toBeEditable;
    await expect (createClientsPage.phoneNumber).toBeEditable;
    await expect(page.getByRole('heading', { name: 'New Client' })).toBeVisible();
    await expect(page.locator('div.field:nth-child(1) > label:nth-child(1)')).toBeVisible(); //To see if this element is visible
    await expect(page.locator('div.field:nth-child(1) > label:nth-child(1)')).toHaveText('Name'); //To see if the word 'Name' is above the name text box
    await expect(page.locator('div.field:nth-child(2) > label:nth-child(1)')).toBeVisible(); //To see if element is visible
    await expect(page.locator('div.field:nth-child(2) > label:nth-child(1)')).toHaveText('Email'); //To see if the word 'Email' is above the email text box
    await expect(page.locator('div.field:nth-child(3) > label:nth-child(1)')).toBeVisible(); //To see if this element is visible
    await expect(page.locator('div.field:nth-child(3) > label:nth-child(1)')).toHaveText('Telephone') //To see if the word 'Telephone' is above the telephone text box
    await createClientsPage.saveClient();
    await clientsPage.outClients();
    await page.waitForTimeout(5000);


  });
});

test.describe('Test suite 02', () => {
  test('Test case 08 create a reservation and save it', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const reservationsPage = new ReservationsPage(page);
    const createReservationsPage = new CreateReservationsPage(page);

    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)
    await dashboardPage.inReservations();
    await expect(page.getByRole('heading', { name: 'Reservations' })).toBeVisible();
    await expect(reservationsPage.createReservationButton).toBeEnabled();
    await expect(reservationsPage.createReservationButton).toHaveText('Create Reservation');
    await expect(reservationsPage.createReservationButton).toBeVisible();
    await reservationsPage.perfomCreateReservation();
    await createReservationsPage.perfomFillReservation();
    await expect(createReservationsPage.startDateTextField).toBeEditable;
    await expect(createReservationsPage.endDateTextField).toBeEditable;
    await expect(createReservationsPage.selectClient).toBeEnabled;
    await expect(createReservationsPage.selectRoom).toBeEnabled;
    await expect(createReservationsPage.selectBill).toBeEnabled;
    await createReservationsPage.perfromSaveReservation();
    // make a test that checks that the reservation was saved.
    await page.waitForTimeout(5000);


  });
});

test.describe('Test suite 02', () => {
  test('Test case 09 delete a client', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const clientsPage = new ClientsPage(page);

    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)
    await dashboardPage.inClients();
    await clientsPage.deleteClient();
    await clientsPage.deleteClient();
    await expect(page.locator('div.container:nth-child(2) > div:nth-child(3) > p:nth-child(1)')).toHaveText('There are no clients')
    await page.waitForTimeout(5000);


  });
});

test.describe('Test suite 02', () => {
  test('Test case 10 delete a reservation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const reservationsPage = new ReservationsPage(page);

    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)
    await dashboardPage.inReservations();
    await reservationsPage.deleteReservation();
    await expect(page.locator('div.container:nth-child(2) > div:nth-child(3) > p:nth-child(1)')).toHaveText('There are no reservations');
    await page.waitForTimeout(5000);



  });
});

test.describe('Test suite 02', () => {
  test('Test case 12 edit a client', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const clientsPage = new ClientsPage(page);
    const editClientsPage = new EditClientsPage(page);

    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)
    await dashboardPage.inClients();
    await clientsPage.editClient();
    await editClientsPage.perfromFillClient();
    await editClientsPage.saveEditClient();
    await page.waitForTimeout(5000);



  });
});