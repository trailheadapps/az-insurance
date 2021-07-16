import { LightningElement, wire } from 'lwc';
import Id from '@salesforce/user/Id';
import CITY_FIELD from '@salesforce/schema/User.Contact.Owner.City';
import EMAIL_FIELD from '@salesforce/schema/User.Contact.Owner.Email';
import NAME_FIELD from '@salesforce/schema/User.Contact.Owner.Name';
import PHONE_FIELD from '@salesforce/schema/User.Contact.Owner.Phone';
import PHOTO_FIELD from '@salesforce/schema/User.Contact.Owner.SmallPhotoUrl';
import POSTAL_FIELD from '@salesforce/schema/User.Contact.Owner.PostalCode';
import STATE_FIELD from '@salesforce/schema/User.Contact.Owner.State';
import STREET_FIELD from '@salesforce/schema/User.Contact.Owner.Street';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

const FIELDS = [
    NAME_FIELD,
    EMAIL_FIELD,
    PHONE_FIELD,
    PHOTO_FIELD,
    STREET_FIELD,
    STATE_FIELD,
    CITY_FIELD,
    POSTAL_FIELD
];

export default class ContactCard extends LightningElement {
    userId = Id;
    //Wire Service to get Agent user information
    @wire(getRecord, { recordId: '$userId', fields: FIELDS }) agent;

    get agentCity() {
        return getFieldValue(this.agent.data, CITY_FIELD);
    }

    get agentEmailTo() {
        let toReturn = 'mailto:' + getFieldValue(this.agent.data, EMAIL_FIELD);
        return toReturn;
    }

    get agentName() {
        return getFieldValue(this.agent.data, NAME_FIELD);
    }

    get agentPhoneCallTo() {
        let toReturn = 'tel:' + getFieldValue(this.agent.data, PHONE_FIELD);
        return toReturn;
    }

    get agentPhone() {
        return getFieldValue(this.agent.data, PHONE_FIELD);
    }

    get agentPhoto() {
        return getFieldValue(this.agent.data, PHOTO_FIELD);
    }

    get agentPostalCode() {
        return getFieldValue(this.agent.data, POSTAL_FIELD);
    }

    get agentState() {
        return getFieldValue(this.agent.data, STATE_FIELD);
    }

    get agentStreet() {
        return getFieldValue(this.agent.data, STREET_FIELD);
    }
}
