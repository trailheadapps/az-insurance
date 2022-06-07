# AZ Insurance Lightning Web Runtime Sample Application

[![Github Workflow](<https://github.com/trailheadapps/az-insurance/workflows/Salesforce%20DX%20(scratch%20org)/badge.svg?branch=main>)](https://github.com/trailheadapps/az-insurance/actions?query=workflow%3A%22Salesforce+DX+%28scratch+org%29%22)

AZ Insurance is a sample application that demonstrates how to build customer, partner, and marketing experiences for Salesforce Experience Cloud and Lightning Web Runtime. AZ Insurance is a fictitious insurance company. The application helps AZ Insurance to provide engaging experiences to their external partners that directly integrate with their internal systems.

## Application progress

> The full source code of this application will be released in stages throughout the month of July 2021. Check out the new mini-series about Experience Cloud and LWR sites, that will walk you through the key elements once released. Click **Watch** here on the repository to get updates on changes, and check out the playlist on YouTube.

[![Experience Cloud and LWR sites](/images/yt_thumbnail_github.png)](https://www.youtube.com/playlist?list=PLgIMQe2PKPSJXw3x0cPTJhzNyLBgpZV5a)

## Table of contents

-   [Installing AZ Insurance using a scratch org](#installing-az-insurance-using-a-scratch-org)

-   [Optional installation instructions](#optional-installation-instructions)

## Installing AZ Insurance using a Scratch Org

1.  Set up your environment. Follow the steps in the [Quick Start: Lightning Web Components](https://trailhead.salesforce.com/content/learn/projects/quick-start-lightning-web-components/) Trailhead project. The steps include:

    -   Enable Dev Hub in your Trailhead Playground
    -   Install Salesforce CLI
    -   Install Visual Studio Code
    -   Install the Visual Studio Code Salesforce extensions, including the Lightning Web Components extension

1.  If you haven't already done so, authorize your hub org and provide it with an alias (**myhuborg** in the command below):

    ```zsh
    sfdx auth:web:login -d -a myhuborg
    ```

1.  Clone the repository:

    ```zsh
    git clone https://github.com/trailheadapps/az-insurance
    cd az-insurance
    ```

1.  Create a scratch org and provide it with an alias (**az-insurance** in the command below):

    ```zsh
    sfdx force:org:create -s -f config/project-scratch-def.json -a az-insurance
    ```

1.  Create a dummy Experience site. This is currently a necessary intermediate step to provision Experience Cloud related metadata before deploying our site.

    ```zsh
    sfdx force:community:create --name "Dummy" --templatename "Aloha" -p "dummy"
    ```

1.  Deploy Salesforce org metadata (does not contain Experience site metadata, a current product bug prevents a deploy of all metadata at once):

    ```zsh
    sfdx force:source:deploy -m "ApexClass,Layout,CustomObject,LightningComponentBundle,ManagedContentType,CustomObject,StaticResource,CustomTab,PermissionSet,Flow"
    ```

1.  Deploy Experience site metadata:

    ```zsh
    sfdx force:source:deploy -m "ApexPage,CustomSite,ExperienceBundle,NavigationMenu,Network,Profile"
    ```

1.  Assign the **LWR_Marketing_Builder** permission set to the default user:

    ```zsh
    sfdx force:user:permset:assign -n LWR_Marketing_Builder
    ```

1.  Publish the Marketing site. The site URL will be printed via the CLI, and you'll receive a notification via email:

    ```zsh
    sfdx force:community:publish -n "LWR Demo Marketing"
    ```

1.  Open the scratch org:

    ```
    sfdx force:org:open
    ```

As the sample app uses data from Salesforce CMS we have to import the provided sample data.

1.  In App Launcher, enter **Digital Experiences** in the search box, and select that entry.

1.  Click **Add Workspace**.

1.  Enter **AZ Insurance** as CMS Workspace name, click **Next**.

1.  Select **LWR Demo Marketing** as channel, click **Next**, and **Next**.

1.  Select **English** as language, and also set **English** as **Default Language**. Click **Next**, then **Done**.

1.  Import media content by selecting the dropdown besides the **Language** button, then select **Import**.

1.  Select the file [`2-media-content-0gU1F000000000a.zip`](./data/2-media-content-0gU1F000000000a.zip) from this projects `data` folder. Ensure to select **Publish content after import**.

1.  Import text content by selecting the dropdown besides the **Language** button, then select **Import**.

1.  Import text the file [`1-content-0gU1F000000000a.zip`](./data/2-media-content-0gU1F000000000a.zip) from this projects `data` folder. Ensure to select **Publish content after import**.

1.  Open the previously provided URL to access your Experience Cloud LWR site.

## Optional Installation Instructions

This repository contains several files that are relevant if you want to integrate modern web development tooling to your Salesforce development processes, or to your continuous integration/continuous deployment processes.

### Code formatting

[Prettier](https://prettier.io/) is a code formatter used to ensure consistent formatting across your code base. To use Prettier with Visual Studio Code, install [this extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) from the Visual Studio Code Marketplace. The [.prettierignore](/.prettierignore) and [.prettierrc](/.prettierrc) files are provided as part of this repository to control the behavior of the Prettier formatter.

### Code linting

[ESLint](https://eslint.org/) is a popular JavaScript linting tool used to identify stylistic errors and erroneous constructs. To use ESLint with Visual Studio Code, install [this extension](https://marketplace.visualstudio.com/items?itemName=salesforce.salesforcedx-vscode-lwc) from the Visual Studio Code Marketplace. The [.eslintignore](/.eslintignore) file is provided as part of this repository to exclude specific files from the linting process in the context of Lightning Web Components development.

### Pre-commit hook

This repository also comes with a [package.json](./package.json) file that makes it easy to set up a pre-commit hook that enforces code formatting and linting by running Prettier and ESLint every time you `git commit` changes.

To set up the formatting and linting pre-commit hook:

1. Install [Node.js](https://nodejs.org) if you haven't already done so

1. Run `npm install` in your project's root folder to install the ESLint and Prettier modules (Note: Mac users should verify that Xcode command line tools are installed before running this command.)

Prettier and ESLint will now run automatically every time you commit changes. The commit will fail if linting errors are detected. You can also run the formatting and linting from the command line using the following commands (check out [package.json](./package.json) for the full list):

```
npm run lint
npm run prettier
```
