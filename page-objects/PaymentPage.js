import { expect } from "@playwright/test"
import { paymentDetails } from "../data/paymentDetails.js"

export class PaymentPage {
    constructor(page) {
        this.page = page
        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]')
                                .locator('[data-qa="discount-code"]')
        this.discountInput = page.getByPlaceholder('Discount code')
        this.submitDiscountButton = page.locator('[data-qa="submit-discount-button"]') 
        this.discountActivatedMessage = page.locator('[data-qa="discount-active-message"]')                      
        this.totalPrice = page.locator('[data-qa="total-value"]')
        this.priceAfterDiscount = page.locator('[data-qa="total-with-discount-value"]')
        this.ccOwnerInput = page.getByPlaceholder('Card owner')
        this.ccNumberInput = page.getByPlaceholder('Card number')
        this.validUntilInput = page.getByPlaceholder('Valid until')
        this.cvcInput = page.getByPlaceholder('CVC')
        this.payButton = page.getByRole('button', { name: 'Pay' })
    }

    activateDiscount = async () => {
        expect(await this.priceAfterDiscount.isVisible()).toBeFalsy()
        await this.discountCode.waitFor()
        const discountCodeText = await this.discountCode.innerText()
        console.log("Discount code:", discountCodeText)
        // option1 for laggy inputs with away expect
        await this.discountInput.fill(discountCodeText)
        await expect(this.discountInput).toHaveValue(discountCodeText)
        // option 2 for laggy inputs with slow typing
        // await this.discountInput.focus()
        // await this.page.keyboard.type(discountCodeText, { delay: 1500 })
        // expect(await this.discountInput.inputValue()).toBe(discountCodeText)
        await this.submitDiscountButton.click()
        await expect(this.discountActivatedMessage).toBeVisible()
        const totalPrice = await this.totalPrice.innerText()
        const totalPriceNumber = parseFloat(totalPrice.replace("$", ""))
        const priceAfterDiscount = await this.priceAfterDiscount.innerText()
        const priceAfterDiscountNumber = parseFloat(priceAfterDiscount.replace("$", ""))
        expect(priceAfterDiscountNumber).toBeLessThan(totalPriceNumber)
    }

    fillPaymentDetailsAndPay = async (paymentDetails) => {
        await this.ccOwnerInput.fill(paymentDetails.ccOwner)
        await this.ccNumberInput.fill(paymentDetails.ccNumber)
        await this.validUntilInput.fill(paymentDetails.valid)
        await this.cvcInput.fill(paymentDetails.cvc)
        await this.payButton.click()
        await this.page.waitForURL(/\/thank-you/)
    }

}