import { LightningElement, api, wire } from 'lwc';
import { CurrentPageReference, NavigationMixin } from 'lightning/navigation';
import AGENT_HAMBURGER_ICON from '@salesforce/resourceUrl/agentHamburgerIcon';
import AGENT_PROFILE_ICON from '@salesforce/resourceUrl/menuProfileAgent';
import AGENT_X_ICON from '@salesforce/resourceUrl/agentXIcon';
import getNavigationMenuItems from '@salesforce/apex/NavigationMenuItemsController.getNavigationMenuItems';

export default class AuthNavigationMenu extends NavigationMixin(
    LightningElement
) {
    @api buttonLabel;
    @api buttonRedirectPageAPIName;
    @api menuName;

    error;
    href = '#';
    isLoaded;
    menuItems = [];

    publishedState;
    showHamburgerMenu;

    hamburgerIcon = AGENT_HAMBURGER_ICON;
    profileIcon = AGENT_PROFILE_ICON;
    xIcon = AGENT_X_ICON;

    @wire(getNavigationMenuItems, {
        menuName: '$menuName',
        publishedState: '$publishedState'
    })
    wiredMenuItems({ error, data }) {
        if (data && !this.isLoaded) {
            this.menuItems = data
                .map((item, index) => {
                    return {
                        target: item.Target,
                        id: index,
                        label: item.Label,
                        defaultListViewId: item.DefaultListViewId,
                        type: item.Type,
                        accessRestriction: item.AccessRestriction
                    };
                })
                .filter((item) => {
                    // Only show "Public" items if guest user
                    return (
                        item.accessRestriction === 'None' ||
                        item.accessRestriction === 'LoginRequired'
                    );
                });
            this.error = undefined;
            this.isLoaded = true;
        } else if (error) {
            this.error = error;
            this.menuItems = [];
            this.isLoaded = true;
            // TODO: Check for error handling
            console.log(`Navigation menu error: ${JSON.stringify(this.error)}`);
        }
    }

    @wire(CurrentPageReference)
    setCurrentPageReference(currentPageReference) {
        const app =
            currentPageReference &&
            currentPageReference.state &&
            currentPageReference.state.app;
        if (app === 'commeditor') {
            this.publishedState = 'Draft';
        } else {
            this.publishedState = 'Live';
        }
    }

    handleClick() {
        this[NavigationMixin.Navigate]({
            type: 'comm__namedPage',
            attributes: {
                name: this.buttonRedirectPageAPIName
            }
        });
    }

    handleHamburgerMenuToggle(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        if (this.showHamburgerMenu) {
            this.showHamburgerMenu = false;
        } else {
            this.showHamburgerMenu = true;
        }
    }

    handleNavigation() {
        this.showHamburgerMenu = false;
    }
}
