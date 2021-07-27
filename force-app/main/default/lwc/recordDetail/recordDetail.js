import { LightningElement, api, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';

export default class RecordDetail extends LightningElement {
    @api
    set objectApiName(name) {
        switch (name) {
            //Case Lead render Lead layout
            case 'LWR_Demo_Lead__c':
                this._currentName = name;
                this.isLead = true;
                break;
            //Case Neither do not Render
            default:
                this._currentName = '';
                this.isLead = false;
                this.isPolicy = false;
        }
    }
    get objectApiName() {
        return this._currentName;
    }

    @wire(CurrentPageReference)
    pageReference({ state }) {
        if (state && state.recordId) {
            this.recordId = state.recordId;
        }
    }

    areDetailsVisible;
    isLead;
    recordId;

    _currentName;

    handleLoad() {
        this.areDetailsVisible = true;
    }
}
