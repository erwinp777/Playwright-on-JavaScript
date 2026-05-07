import {test, expect} from '@playwright/test';
import {ProductsPage} from "../page-objects/ProductsPage.js"
import {Navigation} from "../page-objects/Navigation.js"
import {CheckoutPage} from "../page-objects/CheckoutPage.js"

test.only("Product end2end", async ({page}) => {
const productsPage = new ProductsPage(page)
const navigation = new Navigation(page)
const checkoutPage = new CheckoutPage(page)

await productsPage.openPage()
await productsPage.sortByPriceLowToHigh()
await productsPage.addToBasket(0)
await productsPage.addToBasket(1)
await productsPage.addToBasket(2)
await navigation.goToCheckout()
await checkoutPage.removeCheapestItem()
await checkoutPage.continueToCheckout()
await page.pause()
})