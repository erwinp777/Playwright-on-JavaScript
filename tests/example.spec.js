// @ts-check
const { test, expect } = require('@playwright/test');

test.skip('Example:homepage has title and links to intro page', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
  // create a locator
  const getStarted = page.getByRole('link', { name: 'Get started' });
  // Expect an attribute "to be strictly equal" to the value.
  await expect(getStarted).toHaveAttribute('href', '/docs/intro');
  // Click the get started link.
  await getStarted.click();
  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);
  await page.pause();
});

test.describe('Podlaski Bon Turystyczny', () => {
test.skip('test', async ({ page }) => {
  await page.goto('https://podlaskibonturystyczny.pl/');
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('main').getByRole('link', { name: 'Złóż wniosek o Bon' }).click();
  const page1 = await page1Promise;
  await page1.getByText('Już 20 czerwca 2026').click();
  //await expect(page1.getByRole('heading', { name: 'Wszystkie Bony na I turę*' })).toBeVisible();
  await page.pause();
})
});

test.skip("Product page Add to basket" , async ({page}) => {
await page.goto("/")
//const addToBasketButton = page.getByRole('button', { name: 'Add to Basket' }).first();
const addToBasketButton = page.locator('[data-qa="product-button"]').nth(1)
const basketCounter = page.locator('[data-qa="header-basket-count"]')
//await expect(addToBasketButton).toBeVisible();
await addToBasketButton.waitFor()
await expect(basketCounter).toHaveText("0")
await addToBasketButton.click()
console.log("Number of addToBasketButton elements:", await addToBasketButton.count())
await expect(addToBasketButton).toHaveText("Remove from Basket")
await expect(basketCounter).toHaveText("1")
const checkoutLink = page.getByRole('link',{ name: 'Checkout' })
await checkoutLink.click()
await page.waitForURL("/basket")
await page.pause();
}
)
