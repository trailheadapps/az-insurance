import { LightningElement, api } from 'lwc';
import FORM_FACTOR from '@salesforce/client/formFactor';
export default class CardsSectionWithHeader extends LightningElement {
    @api title;
    @api subTitle;

    @api buttonLabel1;
    @api buttonLabel2;
    @api buttonLabel3;

    @api contentId1;
    @api contentId2;
    @api contentId3;

    @api redirectPageApiName1;
    @api redirectPageApiName2;
    @api redirectPageApiName3;

    get cardsContent() {
        let cardsContent = [];
        if (this.buttonLabel1) {
            cardsContent.push({
                buttonLabel: this.buttonLabel1,
                contentId: this.contentId1,
                redirectPageApiName: this.redirectPageApiName1
            });
        }
        if (this.buttonLabel2) {
            cardsContent.push({
                buttonLabel: this.buttonLabel2,
                contentId: this.contentId2,
                redirectPageApiName: this.redirectPageApiName2
            });
        }
        if (this.buttonLabel3) {
            cardsContent.push({
                buttonLabel: this.buttonLabel3,
                contentId: this.contentId3,
                redirectPageApiName: this.redirectPageApiName3
            });
        }
        return cardsContent;
    }

    get gridContainerCss() {
        const wrap = FORM_FACTOR !== 'Large' ? 'slds-wrap' : '';
        return `slds-grid slds-grid_align-center ${wrap}`;
    }
}
