import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { Organizations } from '../pages/best-practices/organizations';
import { BestPracticesHeader } from '../pages/best-practices/best-practices-header';

Given('vyberiem si prvú firmu v poradí', () => {
    Organizations.selectFirstCompany();
});

Given('kliknem na tlačidlo organizácií', () => {
    BestPracticesHeader.clickAtOgranizations();
});

When('kliknem na tlačidlo pridať organizáciu', () => {
    Organizations.clickAdd();
});

When('zadám {string} {string} {string} {string} {string} {string}', 
(name: string, bussinessId: string, street: string, houseNumber: string, zipcode: string, city: string) => {
    Organizations.typeInNewCompanyFields(
        name,
        bussinessId,
        street,
        houseNumber,
        zipcode,
        city);
});

When('zadám údaje', (dataTable) => {
    const valuesArray = dataTable.rawTable[1];
    Organizations.typeInNewCompanyFields(
        valuesArray[0],
        valuesArray[1],
        valuesArray[2],
        valuesArray[3],
        valuesArray[4],
        valuesArray[5]);
});

When('kliknem na tlačidlo uložiť', () => {
    Organizations.clickSave();
});

When('zadám názov firmy {string} a Ulicu {string}', (companyName: string, street: string) => {
    Organizations.typeInAnotherCompanyFields(companyName, street);
});

Then('v zozname sa zobrazí novo pridaná firma', () => {
    Organizations.shouldIncludeNewCompany();
});

Then('danú firmu neuložím', () => {
    Organizations.shouldNotBeAbleToSaveNewCompany();
});