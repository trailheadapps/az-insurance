import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import getContent from '@salesforce/apex/ManagedContentController.getContent';
import basePath from '@salesforce/community/basePath';

export default class CmsBlogDetail extends LightningElement {
    _blogId;
    _body;
    _imageAltText;
    _imageUrl;
    _title;

    @wire(CurrentPageReference)
    pageReference({ state }) {
        if (state && state.blogId) {
            this._blogId = state.blogId;
        }
    }

    @wire(getContent, {
        contentId: '$_blogId',
        page: 0,
        pageSize: 1,
        language: 'en_US',
        filterby: ''
    })
    wiredContent({ data, error }) {
        console.log(data);
        if (data) {
            this._title = data.title.value;
            this._body = data.blogBody.value;
            this._imageUrl =
                basePath + '/sfsites/c' + data.blogImage.unauthenticatedUrl;
            this._imageAltText = data.blogImageAltText.value;
            this.error = undefined;
        }
        if (error) {
            console.log('Error: ' + JSON.stringify(error));
        }
    }

    get body() {
        return this._body;
    }

    get imageUrl() {
        return this._imageUrl;
    }

    get title() {
        return this._title;
    }
}
