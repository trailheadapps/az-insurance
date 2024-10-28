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
# sf org delete scratch -p -o  $ORG_ALIAS &> /dev/null
echo ""

echo "Creating scratch org..." 
#vsf org create scratch -f config/project-scratch-def.json -d 30 -a $ORG_ALIAS
echo ""

echo "Creating dummy Experience site..."
sf community create --name "Some Test" --templat-name "Aloha" -p "somesome"
echo ""

echo "Sleeping 30s for Experience site deployment"
sleep 60
echo ""

echo "Deploying standard metadata..."
sf project deploy start --metadata ApexClass --metadata Layout --metadata CustomObject --metadata LightningComponentBundle --metadata ManagedContentType --metadata StaticResource --metadata CustomTab --metadata PermissionSet --metadata Flow
echo ""

echo "Deploying Experience site metadata..."
sf project deploy start --metadata ApexPage --metadata CustomSite --metadata ExperienceBundle --metadata NavigationMenu --metadata Network --metadata Profile --ignore-conflicts
echo ""

echo "Assigning permission set for Marketing Site Builder"
sf org assign permset -n LWR_Marketing_Builder
echo ""

echo "Publishing Marketing Site..."
sf community publish -n "LWR Demo Marketing" 
echo ""

echo "Publishing Agent Portal..."
sf community publish -n "LWR Demo Agent"
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
