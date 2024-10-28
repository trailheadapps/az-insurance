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
sf org delete scratch -p -o $ORG_ALIAS &> /dev/null
echo ""

echo "Creating scratch org..." && \
sf org create scratch -f config/project-scratch-def.json -a $ORG_ALIAS -d -y 30 && \
echo "" && \

echo "Creating dummy Experience site..."
sf community create --name "Dummy" --template-name "Aloha" -p "dummy"
echo ""

echo "Sleeping 30s for Experience site deployment"
sleep 30
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
sf community publish -n "LWR Demo Marketing" 
echo ""

echo "Opening org..." && \
sf org open
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
