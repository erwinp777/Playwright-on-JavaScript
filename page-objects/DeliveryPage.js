const { Page } = import('@playwright/test')
import { expect } from "@playwright/test"
import { deliveryDetails } from "../data/deliveryDetails.js"

export class DeliveryPage {
  constructor(page) {
    this.page = page
    this.firstNameField = page.locator('[placeholder="First name"]')
    this.lastNameField = page.locator('[placeholder="Last name"]')
    this.streetField = page.locator('[placeholder="Street"]')
    this.postCodeField = page.locator('[placeholder="Post code"]')
    this.cityField = page.getByPlaceholder("City")
    this.countryDropdown = page.locator('[data-qa="country-dropdown"]')
    this.saveAddressButton = page.getByRole('button', { name: 'Save address for next time' })
    this.savedAddressContainer = page.locator('[data-qa="saved-address-container"]')
    this.savedAddressFirstName = page.locator('[data-qa="saved-address-firstName"]')    
    this.savedAddressLastName = page.locator('[data-qa="saved-address-lastName"]')
    this.savedAddressStreet = page.locator('[data-qa="saved-address-street"]')
    this.savedAddressPostCode = page.locator('[data-qa="saved-address-postcode"]')
    this.savedAddressCity = page.locator('[data-qa="saved-address-city"]')
    this.savedAddressCountry = page.locator('[data-qa="saved-address-country"]')
    this.continueToPaymentButton = page.getByRole('button', { name: 'Continue to payment' })
}
//option 1
//   fillDeliveryDetails = async(firstName, lastName, street, city, postCode, country) => {
//     await this.firstNameField.fill(firstName)
//     await this.lastNameField.fill(lastName)
//     await this.streetField.fill(street)
//     await this.postCodeField.fill(postCode)
//     await this.cityField.fill(city)
//     await this.countryDropdown.selectOption({ label: country })
//     }
//option 2
    fillDeliveryDetails = async(deliveryDetails) => {
        await this.firstNameField.fill(deliveryDetails.firstName)
        await this.lastNameField.fill(deliveryDetails.lastName)
        await this.streetField.fill(deliveryDetails.street)
        await this.postCodeField.fill(deliveryDetails.postCode)
        await this.cityField.fill(deliveryDetails.city)
        await this.countryDropdown.selectOption({ label: deliveryDetails.country })
    }

    saveAddressButtonClick = async () => {
        const addressCountBeforeSave = await this.savedAddressContainer.count()
        console.log("Address count before save:", addressCountBeforeSave)
        await this.saveAddressButton.waitFor()
        await this.saveAddressButton.click()
    //    await this.savedAddressContainer.waitFor({ timeout: 9000 })
        const addressCountAfterSave = await expect(this.savedAddressContainer).toHaveCount(addressCountBeforeSave + 1)
        console.log("Address count after save:", addressCountAfterSave)
    } 
  
    confirmSavedAddress = async () => {
        await this.savedAddressContainer.first().waitFor()
        expect(await this.savedAddressFirstName.first().innerText()).toBe(deliveryDetails.firstName)
        console.log("Saved address:", await this.savedAddressContainer.first().innerText())
        expect(await this.savedAddressLastName.first().innerText()).toBe(await this.lastNameField.inputValue())//deliveryDetails.lastName)
        console.log("Saved address:", await this.savedAddressContainer.first().innerText())
        expect(await this.savedAddressStreet.first().innerText()).toBe(deliveryDetails.street)
        console.log("Saved address:", await this.savedAddressContainer.first().innerText())
        expect(await this.savedAddressPostCode.first().innerText()).toBe(deliveryDetails.postCode)
        console.log("Saved address:", await this.savedAddressContainer.first().innerText())
        expect(await this.savedAddressCity.first().innerText()).toBe(deliveryDetails.city)
        console.log("Saved address:", await this.savedAddressContainer.first().innerText())
        expect(await this.savedAddressCountry.first().innerText()).toBe(deliveryDetails.country)
        console.log("Saved address:", await this.savedAddressContainer.first().innerText())
    }
    continueToPayment = async () => {
        await this.continueToPaymentButton.click()
        await this.page.waitForURL(/\/payment/, { timeout: 4000 })
    } 
}