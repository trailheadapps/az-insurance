import { LightningElement, api, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { getListUi } from 'lightning/uiListApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';

export default class RecordList extends NavigationMixin(LightningElement) {
    @api listView;
    @api object;
    @api showListViewLabel;

    columnFields;
    customTableData;
    error;
    fields;
    listViewLabel;
    records;

    @wire(getListUi, {
        objectApiName: '$object',
        listViewApiName: '$listView'
    })
    results({ data, error }) {
        if (data) {
            this.columnFields = data.info.displayColumns;
            this.records = data.records.records;
            this.listViewLabel = data.info.label;
            this.customTableData = this.getCustomTableData();
            this.error = undefined;
        }
        if (error) {
            this.error = error;
        }
    }

    @wire(getObjectInfo, { objectApiName: '$object' })
    objectInfo({ error, data }) {
        if (data) {
            this.fields = data.fields;
        } else if (error) {
            // TODO: Better error handling
            console.log(error);
        }
    }

    get columns() {
        let columns = [];
        if (this.columnFields && this.fields) {
            columns = this.columnFields.map((field) => {
                let formattedField = {};
                formattedField.label = field.label;
                formattedField.fieldName = field.fieldApiName;
                formattedField.type = this.fields[field.fieldApiName].dataType;
                const dataType = this.fields[field.fieldApiName].dataType;
                if (dataType === 'DateTime') {
                    formattedField.type = 'date-local';
                } else {
                    formattedField.type = dataType;
                }
                return formattedField;
            });
        }
        return columns;
    }

    getCustomTableData() {
        const formattedRecords = [];
        this.records.forEach((record) => {
            const formattedRecord = {};
            Object.keys(record.fields).forEach((key) => {
                formattedRecord[key] = record.fields[key].value;
            });
            formattedRecords.push(formattedRecord);
        });
        return formattedRecords;
    }

    handleClick(event) {
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: event.currentTarget.dataset.id,
                objectApiName: this.objectInfo.data.apiName,
                actionName: 'view'
            }
        });
    }

    handleOpenList() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'LWR_Demo_Lead__c',
                actionName: 'home'
            }
        });
    }

    handleOpenLead() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'LWR_Demo_Lead__c',
                actionName: 'list'
            },
            state: {
                filterName: 'Recent'
            }
        });
    }

    handleCreateLead() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Account',
                actionName: 'new'
            },
            state: {
                nooverride: '1'
            }
        });
    }
}
