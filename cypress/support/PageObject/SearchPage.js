class SearchPage {

    searchButton = '.oo-ui-actionFieldLayout-button';
    advancedSearchOption = 'div.mw-advancedSearch-searchPreview';
    pageTitleContainsInputField = '(*//div[@class="mw-advancedSearch-fieldContainer"]/fieldset[2]//input)[1]';
    exactTextInputField = '(*//div[@class="mw-advancedSearch-fieldContainer"]/fieldset[1]//input)[2]';
    fileTypeDropdown = '#advancedSearchField-filetype select';
    sortingOrderDropdown = '#advancedSearchField-sort select';

    clickOnSearchButton() {
        cy.get(this.searchButton).click();
    }

    checkAdvancedSearchOptionIsDisplayed(){
        cy.get(this.advancedSearchOption).should('exist').and('be.visible');
    }

    clickOnAdvancedSearchOption() {
        cy.get(this.advancedSearchOption).click();
    }

    enterValueInPageTitleContainsInputField(title) {
        cy.xpath(this.pageTitleContainsInputField).clear();
        cy.xpath(this.pageTitleContainsInputField).type(title);
    }

    enterValueInExactTextInputFiled(word) {
        cy.xpath(this.exactTextInputField).clear();
        cy.xpath(this.exactTextInputField).type(word);
    }

    selectFileType(value) {
        cy.get(this.fileTypeDropdown).select(value, {force: true});
    }

    selectSortingOrder(value) {
        cy.get(this.sortingOrderDropdown).select(value, {force: true});
    }
}

export default SearchPage;