import { LightningElement, api, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getContent from '@salesforce/apex/ManagedContentController.getContent';

export default class CmsNewsCardWithButton extends NavigationMixin(
    LightningElement
) {
    @api buttonLabel;
    @api contentId;
    @api redirectPageApiName;

    body;
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
            this.body = htmlDecode(htmlDecode(data.body.value));
            this.error = undefined;
        }
        if (error) {
            console.log('Error: ' + JSON.stringify(error));
        }
    }

    handleClick() {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: `/${this.redirectPageApiName}`
            }
        });
    }
}

//hack to remove html tags and get plain text from CMS.body.value
function htmlDecode(input) {
    var doc = new DOMParser().parseFromString(input, 'text/html');
    let parsedstring = doc.documentElement.textContent;

    return parsedstring;
}
