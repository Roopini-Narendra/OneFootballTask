class MainPage {

    searchButton = '#searchButton';

    checkSearchButtonIsDisplayed() {
        cy.get(this.searchButton).should('exist').and('be.visible');
    }

    clickOnSearchButton() {
        cy.get(this.searchButton).should('be.visible').click();
    }
}

export default MainPage;