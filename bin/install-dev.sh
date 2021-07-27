#!/bin/bash
SCRIPT_PATH=$( cd "$(dirname "${BASH_SOURCE[0]}")" ; pwd -P )
cd $SCRIPT_PATH/..

# Set parameters
ORG_ALIAS="az-insurance"

echo ""
echo "Installing AZ Insurance scratch org ($ORG_ALIAS)"
echo ""

# Install script
echo "Cleaning previous scratch org..."
# sfdx force:org:delete -p -u $ORG_ALIAS &> /dev/null
echo ""

echo "Creating scratch org..." 
#vsfdx force:org:create -s -f config/project-scratch-def.json -d 30 -a $ORG_ALIAS
echo ""

echo "Creating dummy Experience site..."
sfdx force:community:create --name "Some Test" --templatename "Aloha" -p "somesome"
echo ""

echo "Sleeping 30s for Experience site deployment"
sleep 30
echo ""

echo "Deploying standard metadata..."
sfdx force:source:deploy -m ApexClass,Layout,CustomObject,LightningComponentBundle,ManagedContentType,CustomObject,StaticResource,CustomTab,PermissionSet,Flow
echo ""

echo "Deploying Experience site metadata..."
sfdx force:source:deploy -m ApexPage,CustomSite,ExperienceBundle,NavigationMenu,Network,Profile
echo ""

echo "Assigning permission set for Marketing Site Builder"
sfdx force:user:permset:assign -n LWR_Marketing_Builder
echo ""

echo "Publishing Marketing Site..."
sfdx force:community:publish -n "LWR Demo Marketing" 
echo ""

echo "Publishing Agent Portal..."
sfdx force:community:publish -n "LWR Demo Agent"
echo ""

EXIT_CODE="$?"
echo ""

# Check exit code
echo ""
if [ "$EXIT_CODE" -eq 0 ]; then
  echo "Installation completed."
else
    echo "Installation failed."
fi
exit $EXIT_CODE
