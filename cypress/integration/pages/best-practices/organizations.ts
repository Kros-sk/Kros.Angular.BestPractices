import { App } from "./app";

export class Organizations {
    private static companyName: string;

    static shouldNotBeAbleToSaveNewCompany() {
        cy.get('[data-test=save-company-button]').should('be.disabled');
    }

    static shouldIncludeNewCompany() {
        cy.get('kros-company-item > .company-grid > .name').should('contain', this.companyName);
    }

    static shouldSetCompanyAsDefault() {
        cy.get('kros-company-item > .company-grid > .name').should('not.contain', this.companyName);
    }

    static typeInNewCompanyFields(
        companyName: string, 
        bussinesId: string,
        street: string,
        houseNumber: string,
        zipcode: string,
        city: string) {

        this.companyName = companyName;
        this.typeIfNotNullOrEmpty('[data-test=add-company-name]', companyName);
        this.typeIfNotNullOrEmpty('[data-test=add-company-bussines-id]', bussinesId);
        this.typeIfNotNullOrEmpty('[data-test=add-company-street]', street);
        this.typeIfNotNullOrEmpty('[data-test=add-company-street-number]', houseNumber);
        this.typeIfNotNullOrEmpty('[data-test=add-company-zipcode]', zipcode);
        this.typeIfNotNullOrEmpty('[data-test=add-company-city]', city);
    }

    private static typeIfNotNullOrEmpty(selector: string, textToType: string) {
        if (textToType != '') {
            cy.get(selector).type(textToType);
        }
    }

    static typeInAnotherCompanyFields(companyName: string, street: string) {
        this.companyName = companyName;
        cy.get('.name > .col').type(companyName);
        cy.get('.street > .col').type(street);
    }

    static clickAdd() {
        cy.get('[data-test=add-company-button]').click();
    }
    
    static clickSave() {
        cy.get('[data-test=save-company-button]').click();
    }

    static selectFirstCompany() {
        App.visitAndWaitForApp();

        // TODO: Add data-test attribute
        cy.get(':nth-child(1) > kros-company-item > .company-grid > .actions > :nth-child(1)').click();
    }
}
