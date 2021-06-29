import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class LightningRecordForm extends NavigationMixin(
    LightningElement
) {
    @api action1;
    @api action2;
    @api action3;
    @api buttonLabel;
    @api contentId1;
    @api contentId2;
    @api contentId3;
    @api redirectPageApiName;
    @api title;
    @api title1;
    @api title2;
    @api title3;

    _selectedAction;

    handleSubmit(event) {
        if (!this._selectedAction) {
            return;
        }
        event.preventDefault();
        const fields = event.detail.fields;
        fields.Quote_Type__c = this._selectedAction;
        this.template.querySelector('lightning-record-form').submit(fields);
    }

    handleSuccess() {
        // Navigate to the redirectPageApiName page
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: this.redirectPageApiName
            }
        });
    }

    handleImageSelected(event) {
        this._selectedAction = event.detail.action;
        this.template
            .querySelectorAll('c-cms-image-with-title')
            .forEach((tile) => {
                tile.selected = this._selectedAction === tile.action;
            });
    }
}
