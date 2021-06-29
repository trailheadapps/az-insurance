import { LightningElement, api, wire } from 'lwc';
import getContent from '@salesforce/apex/ManagedContentController.getContent';
import basePath from '@salesforce/community/basePath';
import FORM_FACTOR from '@salesforce/client/formFactor';

export default class CmsCustomizibleSection extends LightningElement {
    @api contentId;
    @api
    set displayOrder(value) {
        this._displayOrder = value;
    }
    get displayOrder() {
        if (FORM_FACTOR !== 'Large' || this._displayOrder === 'default') {
            return true;
        }
        return false;
    }

    @api
    set showBackgroundColor(value) {
        this._showBackgroundColor = value;
    }
    get showBackgroundColor() {
        if (this._showBackgroundColor) {
            return 'cms_section_show-background';
        }
        return '';
    }

    altText;
    excerpt;
    title;
    url;

    _displayOrder;
    _showBackgroundColor;

    @wire(getContent, {
        contentId: '$contentId',
        page: 0,
        pageSize: 1,
        language: 'en_US',
        filterby: ''
    })
    wiredContent({ data, error }) {
        if (data) {
            this.title = data.title.value;
            this.excerpt = data.excerpt.value;
            this.url =
                basePath + '/sfsites/c' + data.bannerImage.unauthenticatedUrl;
            this.altText = data.bannerImage.altText.value;
            this.error = undefined;
        }
        if (error) {
            console.log('Error: ' + JSON.stringify(error));
        }
    }

    get contentClass() {
        return `slds-col slds-var-p-vertical_${
            FORM_FACTOR !== 'Large' ? 'xx-large' : 'small'
        } slds-size_1-of-1 slds-large-size_1-of-2`;
    }

    get imageClass() {
        return `slds-col slds-var-p-around_${
            FORM_FACTOR !== 'Large' ? 'xx-large' : 'small'
        } slds-size_1-of-1 slds-large-size_1-of-2`;
    }
}
