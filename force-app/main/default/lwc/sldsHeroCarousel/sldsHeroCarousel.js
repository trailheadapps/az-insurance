import { LightningElement, api } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import brandedCarouselStyle from '@salesforce/resourceUrl/sldsBrandedCarousel';

export default class SldsHeroCarousel extends LightningElement {
    @api bannerContentId;
    @api contentId1;
    @api contentId2;
    @api contentId3;

    renderedCallback() {
        Promise.all([loadStyle(this, brandedCarouselStyle)]);
    }
}
