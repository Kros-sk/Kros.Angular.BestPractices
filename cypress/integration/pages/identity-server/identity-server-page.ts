export class IdentityServerPage {

    public static clickCreateNewAccountLink() {
      cy.get('a[href^="/Account/Register"]').click();
    }

    public static clickCreateNewAccount() {
      cy.get('.btn').click();
    }

    public static fillUserRegistrationData(userEmail: string, userPassword: string, confirmPassword: string, acceptLicenseTerms: boolean) {
      if (userEmail) cy.get('#Email').type(userEmail);
      if (userPassword) cy.get('#Password').type(userPassword);
      if (confirmPassword) cy.get('#ConfirmPassword').type(confirmPassword);

      if (acceptLicenseTerms) {
        cy.get('#LicenceTermsConsent').click({ force: true });
      }
    }

    public static registerPageShouldHasHost(host: string) {
      cy.location('host').should('eq', host);
    }

    public static registerPageShouldHasPathName(pathName: string) {
      cy.location('pathname').should('eq', pathName);
    }

    public static registerPageContainsRegisterButton() {
      cy.get('.btn').should('exist');
    }

    public static afterRegistrationShouldSeeInfoMessage() {
      cy.get('h3').should('have.html', 'Váš účet je vytvorený!');
    }

    public static afterRegistrationShouldSeeUserExistsInfoMessage() {
      cy.get('h2').should('have.html', 'Používateľ už existuje');
    }

    public static afterBadRegistrationShouldSeeErrorMessage() {
      cy.get('.text-danger.validation-summary-errors').should('exist');
    }
}
