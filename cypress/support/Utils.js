class Utils{

    /**
     * @description Get the visible text of a specific element using css locator
     * @param {String} element: The element locator
     * @param {number} index: The index of the element
     * @return {Promise<String>}: The visible text
     */
    getElementVisibleText (element,index){
        return new Cypress.Promise(resolve => {
            cy.get(element).eq(index).invoke('text').then(text => {
                resolve(text.toString().trim());
            });
        });
    }

    /**
     * @description Get the value  of a specific attribute
     * @param {String} element: The element locator
     * @param {String} attributeName: The attribute name
     * @return {Promise<String>}: The value of the attribute
     */
    getElementAttributeValue(element,attributeName){
        return new Cypress.Promise(resolve => {
            cy.get(element).invoke('attr',attributeName).then(text => {
                resolve(text.toString().trim());
            });
        });
    }

    /**
     * @description Get the actual number of a specific visible element using element locator
     * @param {String} element: The element locator
     * @return {Promise<Number>}: Number of elements match the locator
     */
    getNumberOfElementInPage(element ) {
        return new Cypress.Promise(resolve => {
            cy.get(element).its('length').then(count => {
                resolve(count);
            });
        });
    };

}
export default Utils;