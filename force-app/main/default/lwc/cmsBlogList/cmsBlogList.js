import { LightningElement, api, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getContentList from '@salesforce/apex/ManagedContentController.getContentList';
import basePath from '@salesforce/community/basePath';

export default class CmsBlogList extends NavigationMixin(LightningElement) {
    @api maxEntries;
    @api pageTitle;

    blogs;

    @wire(getContentList, {
        page: 0,
        pageSize: '$maxEntries',
        language: 'en_US',
        filterby: 'cms_blogpost'
    })
    wiredContent({ data, error }) {
        if (data) {
            this.blogs = data.map((entry) => ({
                key: entry.contentKey,
                title: entry.contentNodes.title.value,
                excerpt: entry.contentNodes.blogExcerpt.value,
                imageUrl: `${basePath}/sfsites/c${entry.contentNodes.blogImage.unauthenticatedUrl}`,
                imageAltText: entry.contentNodes.blogImageAltText.value
            }));
            this.error = undefined;
        }
        if (error) {
            console.log('Error: ' + JSON.stringify(error));
        }
    }

    handleClick(event) {
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: `${basePath}/blog/post?blogId=${event.currentTarget.dataset.id}`
            }
        });
    }
}
