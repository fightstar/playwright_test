import { test, expect } from '@playwright/test';

test.describe('Add/Remove Elements Page', () => {
    test('should add and remove elements', async ({ page }) => {
        // Navigate to the Add/Remove Elements page
        await page.goto('https://the-internet.herokuapp.com/add_remove_elements/');

        // Click the "Add Element" button
        const addButton = page.locator('button:has-text("Add Element")');
        await addButton.click();

        // Verify the "Delete" button is added
        const deleteButton = page.locator('button:has-text("Delete")');
        await expect(deleteButton).toBeVisible();

        // Click the "Delete" button
        await deleteButton.click();

        // Verify the "Delete" button is removed
        await expect(deleteButton).not.toBeVisible();
    });
});