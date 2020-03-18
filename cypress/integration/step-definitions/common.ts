import { Browser } from '../pages/browser';
import { Given } from 'cypress-cucumber-preprocessor/steps';
import { App } from '../pages/best-practices/app';

Given('som prihlásený', () => {
    Browser.login();
});

Given('navštívim stránku best practices', () => {
    App.visitAndWaitForApp();
});