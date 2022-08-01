import Utils from "../Utils";

const utilsObj = new Utils();

class ResultPage {

    searchResultTitle = '.mw-search-result-heading a';
    searchResultFileExtension = '.searchResultImage td:nth-child(2) a';
    matchingSearchResult = '.searchmatch';
    searchResultDate = '.mw-search-result-data';
    advanceSearchPreviewLableElement = '.mw-advancedSearch-searchPreview div';
    firstArticleTimeStamp;
    secondArticleTimeStamp;
    count;
    format = 'hh:mm, DD MMMM YYYY';

    /**
     * @description Validate that if the expectedTitle is present in the result title
     * @param  {string} expectedTitle
     */
    validateSearchResultTitleText(expectedTitle) {
        cy.get(this.searchResultTitle).each((el, index, list) => {
            cy.wrap(utilsObj.getElementAttributeValue(el, 'title').then(actualTitle => {
                expect(actualTitle.toLowerCase()).to.contain(expectedTitle.toString().toLowerCase());
            }))
        })
    }

    /**
     * @description Validate result file extension type
     * @param  {string} extensionType
     */
    validateSearchResultFileExtensionType(extensionType) {
        cy.get(this.searchResultFileExtension).each((el, index, list) => {
            cy.wrap(utilsObj.getElementAttributeValue(el, 'title').then(actualExtension => {
                expect((actualExtension.split('.'))[1]).to.be.eq(extensionType);
            }))
        })
    }

    /**
     * @description check if the expectedWord is present in search result
     * @param  {string} expectedWord
     */
    validateSearchResultMatchingWord(expectedWord) {
        cy.get(this.matchingSearchResult).each((el, index, list) => {
            cy.wrap(utilsObj.getElementVisibleText(el, 0).then(actualWord => {
                expect(actualWord.toLowerCase()).to.contain(expectedWord.toString().toLowerCase());
            }))
        })
    }

    validatePreviewLabelElement(text) {
        cy.wrap(utilsObj.getElementVisibleText(this.advanceSearchPreviewLableElement, 0).then(actualText => {
            expect(actualText).to.contains(text);
        }))
    }

    /**
     * @description validate if the date and time is sorted in descending order
     */
    validateDateAndTimeIsSorted() {
        cy.wrap(utilsObj.getNumberOfElementInPage(this.searchResultDate).then(count => {
            this.count = count;
        }))
        cy.get(this.searchResultDate).each((el, index, list) => {
            if (index !== this.count - 1) {
                cy.wrap(utilsObj.getElementVisibleText(this.searchResultDate, index).then(text => {
                    this.firstArticleTimeStamp = (text.split('-'))[1];
                    utilsObj.getElementVisibleText(this.searchResultDate, index + 1).then(text => {
                        this.secondArticleTimeStamp = (text.toString().split('-'))[1];
                        cy.convertDateToUnix(this.firstArticleTimeStamp, this.format).then(time1 => {
                            cy.convertDateToUnix(this.secondArticleTimeStamp, this.format).then(time2 => {
                                expect(time1).to.be.gte(time2);
                            })
                        })
                    })
                }))
            }
        })

    }
}

export default ResultPage;