//testsuite01.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login-page';
import { DashboardPage } from './pages/dashboard-page';
import { ClientsPage } from './pages/clients-page';
import { ReservationsPage } from './pages/reservations-page';
import { faker } from '@faker-js/faker';



test.describe('Test suite 02', () => {
  test('Test case 06', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
    await expect(dashboardPage.logoutButton).toBeEnabled();
    await expect(dashboardPage.logoutButton).toHaveText('Logout');
    await expect(dashboardPage.logoutButton).toBeVisible();
    await dashboardPage.inRooms();
    await expect(dashboardPage.roomsBackButton).toBeEnabled();
    await expect(dashboardPage.roomsBackButton).toHaveText('Back');
    await expect(dashboardPage.roomsBackButton).toBeVisible();
    await dashboardPage.outRooms();
    await dashboardPage.inClients();
    await expect(dashboardPage.clientsBackButton).toBeEnabled();
    await expect(dashboardPage.clientsBackButton).toHaveText('Back');
    await expect(dashboardPage.clientsBackButton).toBeVisible();
    await dashboardPage.outClients();
    await dashboardPage.inBills();
    await expect(dashboardPage.billsBackButton).toBeEnabled();
    await expect(dashboardPage.billsBackButton).toHaveText('Back');
    await expect(dashboardPage.billsBackButton).toBeVisible();
    await dashboardPage.outBills();
    await dashboardPage.inReservations();
    await expect(dashboardPage.reservationsBackButton).toBeEnabled();
    await expect(dashboardPage.reservationsBackButton).toHaveText('Back');
    await expect(dashboardPage.reservationsBackButton).toBeVisible();
    await dashboardPage.outReservations();
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

    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)
    await dashboardPage.inClients();
    await expect(page.getByRole('heading', { name: 'Clients' })).toBeVisible();
    await expect(clientsPage.createClientButton).toBeEnabled();
    await expect(clientsPage.createClientButton).toHaveText('Create Client');
    await expect(clientsPage.createClientButton).toBeVisible();
    await clientsPage.perfromCreateClient();
    //await expect (clientsPage.nameTextField)
    //await expect (clientsPage.emailTextField)
    //await expect (clientsPage.phoneNumber)
    await expect(page.getByRole('heading', { name: 'New Client' })).toBeVisible();
    await expect(page.locator('div.field:nth-child(1) > label:nth-child(1)')).toBeVisible(); //To see if this element is visible
    await expect(page.locator('div.field:nth-child(1) > label:nth-child(1)')).toHaveText('Name'); //To see if the word 'Name' is above the name text box
    await expect(page.locator('div.field:nth-child(2) > label:nth-child(1)')).toBeVisible(); //To see if element is visible
    await expect(page.locator('div.field:nth-child(2) > label:nth-child(1)')).toHaveText('Email'); //To see if the word 'Email' is above the email text box
    await expect(page.locator('div.field:nth-child(3) > label:nth-child(1)')).toBeVisible(); //To see if this element is visible
    await expect(page.locator('div.field:nth-child(3) > label:nth-child(1)')).toHaveText('Telephone') //To see if the word 'Telephone' is above the telephone text box
    await clientsPage.saveClient();
    await dashboardPage.outClients();
    await page.waitForTimeout(5000);


  });
});

test.describe('Test suite 02', () => {
  test('Test case 08 create a reservation and save it', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const clientsPage = new ClientsPage(page);
    const reservationsPage = new ReservationsPage(page);

    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)
    await dashboardPage.inReservations();
    await expect(page.getByRole('heading', { name: 'Reservations' })).toBeVisible();
    await expect(reservationsPage.createReservationButton).toBeEnabled();
    await expect(reservationsPage.createReservationButton).toHaveText('Create Reservation');
    await expect(reservationsPage.createReservationButton).toBeVisible();
    await reservationsPage.perfomCreateReservation();
    await reservationsPage.perfromSaveReservation();
    // make a test that checks that the reservation was saved.

  });
});