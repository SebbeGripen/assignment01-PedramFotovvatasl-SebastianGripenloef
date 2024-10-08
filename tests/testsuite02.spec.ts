
import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login-page';
import { DashboardPage } from './pages/dashboard-page';
import { ClientsPage } from './pages/clients-page';
import { ReservationsPage } from './pages/reservations-page';
import { CreateClientsPage } from './pages/createclients-page';
import { CreateReservationsPage } from './pages/createreservations-page.ts';
import { EditClientsPage } from './pages/editclients-page.ts';
import { EditReservationsPage } from './pages/editreservations-page.ts';
import { execSync } from 'child_process';

/// You have to start docker first and then run the tests. You can only run 1 test a time. You also have to change containerName to your Docker container name.

function restartDocker(containerName) {
  try {
    execSync(`docker stop ${containerName}`);
    execSync(`docker start ${containerName}`);
  } catch (error) {
    console.error('Error restarting Docker container:', error.message);
    throw error;
  }
}

const containerName = ''; /// Write your container name here.

test.afterEach(() => {
  restartDocker(containerName);
});

test.describe('Test suite 02', () => {
  test('Test case 01 testing the dashboard', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
    await expect(dashboardPage.logoutButton).toBeEnabled();
    await expect(dashboardPage.logoutButton).toHaveText('Logout');
    await expect(dashboardPage.logoutButton).toBeVisible();
    await dashboardPage.inRooms();
    await expect(dashboardPage.backButton).toBeEnabled();
    await expect(dashboardPage.backButton).toHaveText('Back');
    await expect(dashboardPage.backButton).toBeVisible();
    await dashboardPage.backOutButton();
    await dashboardPage.inClients();
    await expect(dashboardPage.backButton).toBeEnabled();
    await expect(dashboardPage.backButton).toHaveText('Back');
    await expect(dashboardPage.backButton).toBeVisible();
    await dashboardPage.backOutButton();
    await dashboardPage.inBills();
    await expect(dashboardPage.backButton).toBeEnabled();
    await expect(dashboardPage.backButton).toHaveText('Back');
    await expect(dashboardPage.backButton).toBeVisible();
    await dashboardPage.backOutButton();
    await dashboardPage.inReservations();
    await expect(dashboardPage.backButton).toBeEnabled();
    await expect(dashboardPage.backButton).toHaveText('Back');
    await expect(dashboardPage.backButton).toBeVisible();
    await dashboardPage.backOutButton();
    await dashboardPage.performLogout();
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  });
});

test.describe('Test suite 02', () => {
  test('Test case 02 create a client and save it', async ({ page }) => {
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
    await createClientsPage.perfromFillClient();
    await expect(createClientsPage.nameTextField).toBeEditable;
    await expect(createClientsPage.emailTextField).toBeEditable;
    await expect(createClientsPage.phoneNumber).toBeEditable;
    await expect(page.getByRole('heading', { name: 'New Client' })).toBeVisible();
    await expect(page.locator('div.field:nth-child(1) > label:nth-child(1)')).toBeVisible(); //To see if this element is visible
    await expect(page.locator('div.field:nth-child(1) > label:nth-child(1)')).toHaveText('Name'); //To see if the word 'Name' is above the name text box
    await expect(page.locator('div.field:nth-child(2) > label:nth-child(1)')).toBeVisible(); //To see if element is visible
    await expect(page.locator('div.field:nth-child(2) > label:nth-child(1)')).toHaveText('Email'); //To see if the word 'Email' is above the email text box
    await expect(page.locator('div.field:nth-child(3) > label:nth-child(1)')).toBeVisible(); //To see if this element is visible
    await expect(page.locator('div.field:nth-child(3) > label:nth-child(1)')).toHaveText('Telephone') //To see if the word 'Telephone' is above the telephone text box
    await createClientsPage.saveClient();
    await expect(page.locator('div.card:nth-child(3)')).toBeVisible();
    await dashboardPage.backOutButton();
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();


  });
});

test.describe('Test suite 02', () => {
  test('Test case 03 create a reservation and save it', async ({ page }) => {
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
    await expect(page.locator('div.card:nth-child(2)')).toBeVisible();
    await dashboardPage.backOutButton();
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();


  });
});

test.describe('Test suite 02', () => {
  test('Test case 04 delete a client', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const clientsPage = new ClientsPage(page);

    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)
    await dashboardPage.inClients();
    await clientsPage.deleteClient();
    await clientsPage.deleteClient();
    await expect(page.locator('div.container:nth-child(2) > div:nth-child(3) > p:nth-child(1)')).toHaveText('There are no clients')
    await dashboardPage.backOutButton();
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();


  });
});

test.describe('Test suite 02', () => {
  test('Test case 05 delete a reservation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const reservationsPage = new ReservationsPage(page);

    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)
    await dashboardPage.inReservations();
    await reservationsPage.deleteReservation();
    await expect(page.locator('div.container:nth-child(2) > div:nth-child(3) > p:nth-child(1)')).toHaveText('There are no reservations');
    await dashboardPage.backOutButton();
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();



  });
});

test.describe('Test suite 02', () => {
  test('Test case 06 edit a client', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const clientsPage = new ClientsPage(page);
    const editClientsPage = new EditClientsPage(page);

    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)
    await dashboardPage.inClients();
    await clientsPage.editClient();
    await expect(page.getByRole('heading', { name: 'Tester Hotel' })).toBeVisible();
    await editClientsPage.perfromFillClient();
    await editClientsPage.saveEditClient();
    await expect(page.locator('div.card:nth-child(1)')).not.toHaveText('Jonas Hellman (#1)');
    await dashboardPage.backOutButton();
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();



  });
});

test.describe('Test suite 02', () => {
  test('Test case 07 edit a reservation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const reservationsPage = new ReservationsPage(page);
    const editReservationsPage = new EditReservationsPage(page);

    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`, `${process.env.TEST_PASSWORD}`)
    await dashboardPage.inReservations();
    await reservationsPage.editReservation();
    await expect(page.getByRole('heading', { name: 'Tester Hotel' })).toBeVisible();
    await editReservationsPage.perfomFillReservation();
    await editReservationsPage.perfromSaveReservation();
    await expect(page.locator('.card > h3:nth-child(1)')).not.toContainText('Jonas Hellman');
    await dashboardPage.backOutButton();
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();

  });
});