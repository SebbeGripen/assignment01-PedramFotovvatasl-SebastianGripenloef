//testsuite01.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login-page';
import { DashboardPage } from './pages/dashboard-page';
import { ClientsPage } from './pages/clients-page';
import exp from 'constants';

test.describe('Test suite 01', () => {
  test('Test case 01', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    await loginPage.goto();
    await loginPage.performLogin(`${process.env.TEST_USERNAME}`,`${process.env.TEST_PASSWORD}`)
    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
    await expect(dashboardPage.logoutButton).toBeEnabled();
    await expect(dashboardPage.logoutButton).toHaveText('Logout');
    await expect(dashboardPage.logoutButton).toBeVisible();
    await dashboardPage.inRooms();
    await expect (dashboardPage.roomsBackButton).toBeEnabled();
    await expect (dashboardPage.roomsBackButton).toHaveText('Back');
    await expect (dashboardPage.roomsBackButton).toBeVisible();
    await dashboardPage.outRooms();
    await dashboardPage.inClients();
    await expect ( dashboardPage.clientsBackButton).toBeEnabled();
    await expect ( dashboardPage.clientsBackButton).toHaveText('Back');
    await expect ( dashboardPage.clientsBackButton).toBeVisible();
    await dashboardPage.outClients();
    await dashboardPage.inBills();
    await expect ( dashboardPage.billsBackButton).toBeEnabled();
    await expect ( dashboardPage.billsBackButton).toHaveText('Back');
    await expect ( dashboardPage.billsBackButton).toBeVisible();
    await dashboardPage.outBills();
    await dashboardPage.inReservations();
    await expect ( dashboardPage.reservationsBackButton).toBeEnabled();
    await expect ( dashboardPage.reservationsBackButton).toHaveText('Back');
    await expect ( dashboardPage.reservationsBackButton).toBeVisible();
    await dashboardPage.outReservations();
    await dashboardPage.performLogout();
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible(); 
    await page.waitForTimeout(5000);   
  });   
});

test.describe('Test suite 01', () => {
  test('Test case 02 create a client and save it', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    const clientsPage = new ClientsPage(page);


  });
});