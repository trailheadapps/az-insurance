import { LightningElement, api, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { getListUi } from 'lightning/uiListApi';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';

const actions = [{ label: 'Open record', name: 'open_record' }];

export default class RecordList extends NavigationMixin(LightningElement) {
    @api detailPage;
    @api listView;
    @api object;
    @api showListViewLabel;

    columnFields;
    customTableData;
    error;
    fields;
    listViewLabel;
    records;

    @wire(getObjectInfo, { objectApiName: '$object' })
    objectInfo({ error, data }) {
        if (data) {
            this.fields = data.fields;
        } else if (error) {
            console.log(error);
        }
    }

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

    get columns() {
        let columns = [];
        if (this.columnFields && this.fields) {
            columns = this.columnFields.map((field) => {
                let formattedField = {};
                formattedField.label = field.label;
                formattedField.fieldName = field.fieldApiName;
                const dataType = this.fields[field.fieldApiName].dataType;
                if (dataType === 'DateTime') {
                    formattedField.type = 'date-local';
                } else {
                    formattedField.type = dataType;
                }
                return formattedField;
            });
            columns.push({
                type: 'action',
                typeAttributes: { rowActions: actions }
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

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        switch (actionName) {
            case 'open_record':
                this.actionOpenRecord(row);
                break;
            default:
        }
    }

    actionOpenRecord(row) {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: this.detailPage
            },
            state: {
                recordId: row.Id
            }
        });
    }
}
