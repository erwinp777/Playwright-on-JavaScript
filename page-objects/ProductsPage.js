import { expect } from "@playwright/test"
import { Navigation } from "./Navigation.js"
export class ProductsPage {
//method
constructor(page) {
    this.page = page
    this.addButton = page.locator('[data-qa="product-button"]')
    this.sortDropdown = page.locator('[data-qa="sort-dropdown"]')
    this.productTitle = page.locator('[data-qa="product-title"]')
}
//function, async b/c using awaits
openPage = async() => {
    await this.page.goto("/")
}
addToBasket = async (index) => {
  const AddButton = this.addButton.nth(index)
  await AddButton.waitFor()
  const navigation = new Navigation(this.page)
  const basketCountBeforeAdd = await navigation.getBasketCounter()
  //console.log("Basket Counter before add:", basketCountBeforeAdd)
  await AddButton.click()
  await expect(AddButton).toHaveText("Remove from Basket")
  const basketCountAfterAdd = await navigation.getBasketCounter()
  //console.log("Basket Counter after add:", basketCountAfterAdd)
  expect(basketCountAfterAdd).toBeGreaterThanOrEqual(basketCountBeforeAdd)
}
sortByPriceLowToHigh = async () => {
    await this.sortDropdown.waitFor()
    await this.productTitle.first().waitFor()
    const productTitleBeforeSort = await this.productTitle.allInnerTexts()
    await this.sortDropdown.selectOption("price-asc")
    const productTitleAfterSort = await this.productTitle.allInnerTexts()
    expect(productTitleAfterSort).not.toEqual(productTitleBeforeSort)
    
}

}    