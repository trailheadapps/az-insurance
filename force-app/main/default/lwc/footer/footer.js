import { LightningElement, api } from 'lwc';

/**
 * This is a custom LWC footer component.
 */
export default class Footer extends LightningElement {
    @api footerMenuName1;
    @api footerMenuName2;
    @api footerMenuName3;
}
