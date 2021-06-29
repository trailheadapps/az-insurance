import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import basePath from '@salesforce/community/basePath';

export default class FooterMenuItem extends NavigationMixin(LightningElement) {
    /**
     * The NavigationMenuItem from the Apex controller,
     * contains a label and a target.
     */
    @api item = {};

    href = '#';

    /**
     * The PageReference object used by lightning/navigation
     */
    pageReference;

    connectedCallback() {
        const { type, target, defaultListViewId } = this.item;

        // Get the correct PageReference object for the menu item type
        if (type === 'SalesforceObject') {
            // AKA "Salesforce Object" menu item
            this.pageReference = {
                type: 'standard__objectPage',
                attributes: {
                    objectApiName: target
                },
                state: {
                    filterName: defaultListViewId
                }
            };
        } else if (type === 'InternalLink') {
            // AKA "Site Page" menu item

            // WARNING: Normally you shouldn't use 'standard__webPage' for internal relative targets, but
            // we don't have a way of identifying the Page Reference type of an InternalLink URL
            this.pageReference = {
                type: 'standard__webPage',
                attributes: {
                    url: basePath + target
                }
            };
        } else if (type === 'ExternalLink') {
            // aka "External URL" menu item
            this.pageReference = {
                type: 'standard__webPage',
                attributes: {
                    url: target
                }
            };
        }

        // Use the NavigationMixin from lightning/navigation to generate the URL for navigation.
        if (this.pageReference) {
            this[NavigationMixin.GenerateUrl](this.pageReference).then(
                (url) => {
                    this.href = url;
                }
            );
        }
    }

    handleClick(evt) {
        // Use the NavigationMixin from lightning/navigation to perform the navigation.
        evt.stopPropagation();
        evt.preventDefault();
        if (this.pageReference) {
            this[NavigationMixin.Navigate](this.pageReference);
        } else {
            let message = `Navigation menu type "${
                this.item.type
            }" not implemented for item ${JSON.stringify(this.item)}`;
            let note = new ShowToastEvent({
                title: 'Error',
                message: message,
                variant: 'error'
            });
            this.dispatchEvent(note);
        }
    }
}
