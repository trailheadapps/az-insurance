import { LightningElement, api } from 'lwc';

export default class RecordDetail extends LightningElement {
    @api recordId;
    @api
    set objectApiName(name) {
        switch (name) {
            //Case Lead render Lead layout
            case 'Lead':
                this.currentName = name;
                this.isLead = true;
                this.isPolicy = false;
                break;
            //Case Policy__c render Policy__c layout
            case 'Policy__c':
                this.currentName = name;
                this.isLead = false;
                this.isPolicy = true;
                break;
            //Case Neither do not Render
            default:
                this.currentName = '';
                this.isLead = false;
                this.isPolicy = false;
        }
    }
    get objectApiName() {
        return this._currentName;
    }

    areDetailsVisible;
    isLead;
    isPolicy;

    _currentName;

    handleLoad() {
        this.areDetailsVisible = true;
    }
}
