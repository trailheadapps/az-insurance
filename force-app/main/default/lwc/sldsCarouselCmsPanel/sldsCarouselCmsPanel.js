import { LightningElement, api, wire } from 'lwc';
import getContent from '@salesforce/apex/ManagedContentController.getContent';
import basePath from '@salesforce/community/basePath';
export default class SldsCarouselCmsPanel extends LightningElement {
    @api contentId;
    @api href;

    altText;
    ariaHidden = 'true';
    ariaLabelledby;
    excerpt;
    initialRender = true;
    tabIndex = '-1';
    title;
    url;

    includeButton1;
    includeButton2;
    buttonLabel1;
    buttonLabel2;
    buttonNavigationType1;
    buttonNavigationType2;
    buttonVariant1;
    buttonVariant2;
    buttonUrl1;
    buttonUrl2;

    _selected;

    @wire(getContent, {
        contentId: '$contentId',
        page: 0,
        pageSize: 1,
        language: 'en_US',
        filterby: ''
    })
    results({ data, error }) {
        if (data) {
            this.title = data.title.value;
            this.excerpt = htmlDecode(htmlDecode(data.excerpt.value));
            this.url =
                basePath + '/sfsites/c' + data.bannerImage.unauthenticatedUrl;
            this.altText = basePath + '/sfsites/c' + data.bannerImage.altText;
            if (data.buttonLabel1 && data.buttonLabel1.value) {
                this.includeButton1 = true;
                this.buttonLabel1 = data.buttonLabel1.value;
                this.buttonVariant1 = data.buttonVariant1.value;
                this.buttonNavigationType1 = data.buttonNavigationType1.value;
                this.buttonUrl1 = data.buttonUrl1.value;
            } else {
                this.includeButton1 = false;
            }
            if (data.buttonLabel2 && data.buttonLabel2.value) {
                this.includeButton2 = true;
                this.buttonLabel2 = data.buttonLabel2.value;
                this.buttonVariant2 = data.buttonVariant2.value;
                this.buttonNavigationType2 = data.buttonNavigationType2.value;
                this.buttonUrl2 = data.buttonUrl2.value;
            } else {
                this.includeButton2 = false;
            }
            this.error = undefined;
        } else if (error) {
            console.log('Error: ' + JSON.stringify(error));
        }
    }

    connectedCallback() {
        this.selected = false;
        this.setAttribute('data-handles-touch', true);
    }

    renderedCallback() {
        if (this.initialRender) {
            this.panelElement = this.template.querySelector('div');

            const privateimageregister = new CustomEvent(
                'privateimageregister',
                {
                    bubbles: true,
                    detail: {
                        callbacks: {
                            select: this.select.bind(this),
                            unselect: this.unselect.bind(this),
                            isSelected: this.isSelected.bind(this),
                            setTabIndex: this.setTabIndex.bind(this),
                            setLabelledBy: this.setLabelledBy.bind(this)
                        },
                        contentId: this.panelElement.getAttribute('id'),
                        guid: Math.random()
                    }
                }
            );

            this.classList.add('slds-carousel__panel');
            this.dispatchEvent(privateimageregister);

            this.initialRender = false;
        }
    }

    set selected(value) {
        this._selected = value;

        if (value === true) {
            this.ariaHidden = 'false';
            this.setTabIndex('0');
        } else {
            this.ariaHidden = 'true';
            this.setTabIndex('-1');
        }
    }

    get selected() {
        return this._selected;
    }

    isSelected() {
        return this.selected;
    }

    select() {
        const privateimageselect = new CustomEvent('privateimageselect', {
            bubbles: true,
            composed: true
        });

        this.selected = true;
        this.dispatchEvent(privateimageselect);
    }

    setLabelledBy(value) {
        this.panelElement.setAttribute('aria-labelledby', value);
    }

    setTabIndex(value) {
        this.tabIndex = value;
    }

    unselect() {
        this.selected = false;
    }
}

//hack to remove html tags and get plain text from CMS.body.value
function htmlDecode(input) {
    var doc = new DOMParser().parseFromString(input, 'text/html');
    let parsedstring = doc.documentElement.textContent;

    return parsedstring;
}
