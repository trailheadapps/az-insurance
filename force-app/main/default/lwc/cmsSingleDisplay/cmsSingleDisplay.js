import { LightningElement, api, wire } from 'lwc';
import getContent from '@salesforce/apex/ManagedContentController.getContent';
import basePath from '@salesforce/community/basePath';
import FORM_FACTOR from '@salesforce/client/formFactor';
export default class CmsSingleDisplay extends LightningElement {
    @api contentId;
    @api hideOnMobile;

    excerpt;
    title;
    url;

    @wire(getContent, {
        contentId: '$contentId',
        page: 0,
        pageSize: 1,
        language: 'en_US',
        filterby: ''
    })
    results({ data, error }) {
        if (data) {
            this.title = data.title.value;
            this.excerpt = data.excerpt.value;
            this.url =
                basePath + '/sfsites/c' + data.bannerImage.unauthenticatedUrl;
            this.error = undefined;
        }
        if (error) {
            console.log('Error: ' + JSON.stringify(error));
        }
    }

    get hideComponent() {
        return this.hideOnMobile && FORM_FACTOR === 'Small';
    }
}
