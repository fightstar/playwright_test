import { test, expect } from '@playwright/test';

test.describe('Add/Remove Elements Page', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to the Add/Remove Elements page before each test
        await page.goto('https://the-internet.herokuapp.com/add_remove_elements/');
    });

    test('should add and remove elements',{tag: '@sometag'}, async ({ page }) => {
        
        // Click the "Add Element" buttond
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
    test('should add multiple elements and remove them all', async ({ page }) => {
        await test.step('Add multiple elements', async () => {
            const addButton = page.locator('button:has-text("Add Element")');
            for (let i = 0; i < 5; i++) {
                await addButton.click();
            }
        });

        await test.step('Remove all elements', async () => {
            const deleteButtons = page.locator('button:has-text("Delete")');
            await expect(deleteButtons).toHaveCount(5);
            for (let i = 0; i < 5; i++) {
                await deleteButtons.nth(0).click();
            }
            await expect(deleteButtons).toHaveCount(0);
        });
    });
});