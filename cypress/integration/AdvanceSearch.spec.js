import MainPage from "../support/PageObject/MainPage";
import ResultPage from "../support/PageObject/ResultPage";
import SearchPage from "../support/PageObject/SearchPage";

const mainPageObj= new MainPage();
const resultPageObj= new ResultPage();
const searchPageObj= new SearchPage();
let testData;

describe('Advance Search Test Cases', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
    })

    before(() => {
        cy.fixture('testData').then(data=>{
            testData=data;
        });
    })

    beforeEach(() => {
        cy.visit("/");
        cy.verifyPageTitle(testData.mainPageTitle);
        mainPageObj.checkSearchButtonIsDisplayed();
        mainPageObj.clickOnSearchButton();
        cy.verifyPageTitle(testData.searchPageTitle);
        searchPageObj.checkAdvancedSearchOptionIsDisplayed();
        searchPageObj.clickOnAdvancedSearchOption();
    })

    //Advance search with search title as "Germany"
    it('Advance search with one search parameter', () => {
        searchPageObj.enterValueInPageTitleContainsInputField(testData.pageTitleText);
        searchPageObj.clickOnSearchButton();
        cy.verifyPageTitle('intitle:Germany - Search results - Wikipedia');
        resultPageObj.validateSearchResultTitleText(testData.pageTitleText);
        resultPageObj.validatePreviewLabelElement('Page title containsGermany')
    })

    //Advance search with Exact matching word as "football" and file extention as "pdf"
    it('Advance search with multiple search parameters', () => {
        cy.scrollTo('bottom');
        searchPageObj.selectFileType(testData.fileExtensionType)
        searchPageObj.enterValueInExactTextInputFiled(testData.exactMatchingWord)
        searchPageObj.clickOnSearchButton();
        cy.verifyPageTitle('Football filemime:application/pdf - Search results - Wikipedia');
        resultPageObj.validateSearchResultFileExtensionType(testData.fileExtensionType);
        resultPageObj.validateSearchResultMatchingWord(testData.exactMatchingWord)
    })

    //Advance search with search title as "Germany" and Sording order as "Edit date - current on top"
    it('Advance search with sorting the result based on edit date', () => {
        searchPageObj.enterValueInPageTitleContainsInputField(testData.pageTitleText);
        cy.scrollTo('bottom');
        searchPageObj.selectSortingOrder(testData.sortingOrderOption);
        searchPageObj.clickOnSearchButton();
        resultPageObj.validateDateAndTimeIsSorted();
    })
})