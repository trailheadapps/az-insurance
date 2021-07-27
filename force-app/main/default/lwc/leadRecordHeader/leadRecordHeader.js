import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import FIRST_NAME_FIELD from '@salesforce/schema/Lead.Name';
import STATUS_FIELD from '@salesforce/schema/Lead.Status';

const OWNER_FIELD = 'Lead.Owner.Name';
const DATE_FIELD = 'Lead.LastModifiedDate';
const fields = [FIRST_NAME_FIELD, STATUS_FIELD];
export default class RecordHeader extends LightningElement {
    @api recordId;

    @wire(getRecord, {
        recordId: '$recordId',
        fields: fields,
        optionalFields: [DATE_FIELD, OWNER_FIELD]
    })
    record;

    get date() {
        return getFieldValue(this.record.data, DATE_FIELD);
    }

    get owner() {
        return getFieldValue(this.record.data, OWNER_FIELD);
    }

    get name() {
        return getFieldValue(this.record.data, FIRST_NAME_FIELD);
    }

    get status() {
        return getFieldValue(this.record.data, STATUS_FIELD);
    }
}
