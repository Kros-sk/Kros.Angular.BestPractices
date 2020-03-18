import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { Browser } from '../pages/browser';
import * as constants from '../../support/constants';
import { IdentityServerPage } from '../pages/identity-server/identity-server-page';
import { Utils } from '../pages/utils';

/**
 * Given
 */

Given('som prihlásený', () => {
  Browser.login();
});

Given('navštívim stránku best practices', () => {
  Browser.visit('/');
});

Given('nie som prihlásený', () => {
  Browser.DeleteAccessToken();
});

Given('navštívim základnú stránku', () => {
  Browser.visit('/');
});

/**
 * When
 */

When('kliknem na odkaz vytvoriť nový účet', () => {
  IdentityServerPage.clickCreateNewAccountLink();
});

When('vyplním registračné údaje užívateľa, ktorý sa ešte nikdy do systému neregistroval', () => {
  const userEmail = constants.USER_EMAIL;
  const atIndex = userEmail.lastIndexOf('@');
  const randomUserEmail = userEmail.substring(0, atIndex) + '+' + Utils.randomLongId() + userEmail.substring(atIndex);

  IdentityServerPage.fillUserRegistrationData(randomUserEmail, constants.USER_PASSWORD, constants.USER_PASSWORD, true);
});

When('vyplním registračné údaje užívateľa, ktorý už v systéme existuje', () => {
  IdentityServerPage.fillUserRegistrationData(constants.USER_EMAIL, constants.USER_PASSWORD, constants.USER_PASSWORD, true);
});

When('nesprávne vyplním registračné údaje {string} {string} {string} {string}',
    (email: string, password: string, confirmPassword: string, acceptLicenseTermsString: string) => {

  const acceptLicenseTerms = (acceptLicenseTermsString === 'true');
  IdentityServerPage.fillUserRegistrationData(email, password, confirmPassword, acceptLicenseTerms);
});

When('kliknem na tlačidlo vytvoriť účet', () => {
  IdentityServerPage.clickCreateNewAccount();
});

/**
 * Then
 */

Then('ma aplikácia presmeruje na prihlasovaciu stránku', () => {
  IdentityServerPage.registerPageShouldHasHost(constants.OIDC_HOST);
});

Then('som presmerovaný na registračnú stránku', () => {
  IdentityServerPage.registerPageShouldHasPathName('/Account/Register');
});

Then('mám možnosť kliknúť na vytvorenie účtu', () => {
  IdentityServerPage.registerPageContainsRegisterButton();
});

Then('som informovaný o vytvorení účtu', () => {
  IdentityServerPage.afterRegistrationShouldSeeInfoMessage();
});

Then('som informovaný, že užívateľ už existuje', () => {
  IdentityServerPage.afterRegistrationShouldSeeUserExistsInfoMessage();
});

Then('som informovaný, že som nesprávne vyplnil údaje', () => {
  IdentityServerPage.afterBadRegistrationShouldSeeErrorMessage();
});
