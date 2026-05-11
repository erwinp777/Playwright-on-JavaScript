import { expect } from "@playwright/test"
export class Navigation {
    constructor(page) {
        this.page = page
        this.basketCounter = page.locator('[data-qa="header-basket-count"]')
}
getBasketCounter = async () => {
    await this.basketCounter.waitFor() //TODO: await expect(this.basketCounter).toBeVisible() check mobile version
    const text = await this.basketCounter.innerText()
    return parseInt(text, 10) // parseInt(text) to specify the radix (base 10)
}
goToCheckout = async () => {
    const checkoutLink = this.page.getByRole('link',{ name: 'Checkout' })
    await checkoutLink.click()
    await this.page.waitForURL("/basket")
}

async clickBasket() {
        await this.page.click('[data-qa="header-basket"]')
    }
}