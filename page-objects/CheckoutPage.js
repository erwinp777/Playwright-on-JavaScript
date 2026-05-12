import { expect } from "@playwright/test"

export class CheckoutPage {
    constructor(page) {
        this.page = page
        this.basketCard = page.locator('[data-qa="basket-card"]')
        this.basketItemPrice = page.locator('[data-qa="basket-item-price"]')
        this.removeButton = page.locator('[data-qa="basket-card-remove-item"]')
        this.continueToCheckoutButton = page.locator('[data-qa="continue-to-checkout"]')
        this.userEmailInput = page.locator('[placeholder="E-Mail"]')
        this.userPasswordInput = page.locator('[placeholder="Password"]')
        this.loginButton = page.locator("(//button[@type='submit'])[1]")

    }
    removeCheapestItem = async () => {
       await this.basketCard.first().waitFor()
       const itemsBeforeRemove = await this.basketCard.count()
       const alllPriceText = await this.basketItemPrice.allInnerTexts()
       console.warn("All prices:", alllPriceText)
       const justNumbers = alllPriceText.map((Element) => {
        const noDolarSign = Element.replace("$", "")
        return parseInt(noDolarSign, 10) //return parseFloat(noDolarSign)
        })
       const minPrice = Math.min(...justNumbers)
       const minPriceIndex = justNumbers.indexOf(minPrice)
       await this.removeButton.nth(minPriceIndex).click()
       await expect(this.basketCard).toHaveCount(itemsBeforeRemove - 1)
       console.log("Removed item price:", minPrice)
       const remainingPriceText = await this.basketItemPrice.allInnerTexts()
       console.log("Remaining price items:", remainingPriceText)
    }

    continueToCheckout = async () => {
        await this.continueToCheckoutButton.waitFor()
        await this.continueToCheckoutButton.click()
        await this.page.waitForURL(/\/login/)
        await this.userEmailInput.fill("admin")
        await this.userPasswordInput.fill("Admin123")
        await this.loginButton.click()
        await this.page.waitForURL(/\/delivery-details/, { timeout: 10000 })
    }
}