#!/bin/bash

# Azure Deployment Validation Script
# Usage: bash validate-deployment.sh

echo "================================================"
echo "Azure Deployment Validation Script - ofstride-frontend"
echo "================================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
SUBSCRIPTION="9579f57d-bbc4-4063-821e-ded5cf489adc"
RESOURCE_GROUP="res-ofs-app-001"
APP_NAME="was-ofstride-001"

echo "Configuration:"
echo "  Subscription: $SUBSCRIPTION"
echo "  Resource Group: $RESOURCE_GROUP"
echo "  App Name: $APP_NAME"
echo ""

# Check 1: Azure CLI is installed
echo -e "${YELLOW}[1/6]${NC} Checking Azure CLI..."
if command -v az &> /dev/null; then
    echo -e "${GREEN}✓${NC} Azure CLI is installed"
else
    echo -e "${RED}✗${NC} Azure CLI is not installed. Please install it first."
    exit 1
fi
echo ""

# Check 2: Logged in to Azure
echo -e "${YELLOW}[2/6]${NC} Checking Azure login..."
if az account show &> /dev/null; then
    CURRENT_SUBSCRIPTION=$(az account show --query "id" -o tsv)
    CURRENT_USER=$(az account show --query "user.name" -o tsv)
    echo -e "${GREEN}✓${NC} Logged in as: $CURRENT_USER"
    echo "  Current Subscription: $CURRENT_SUBSCRIPTION"
else
    echo -e "${RED}✗${NC} Not logged in to Azure. Run: az login"
    exit 1
fi
echo ""

# Check 3: Resource Group exists
echo -e "${YELLOW}[3/6]${NC} Checking Resource Group..."
if az group exists --name $RESOURCE_GROUP --subscription $SUBSCRIPTION | grep -q "true"; then
    echo -e "${GREEN}✓${NC} Resource Group exists: $RESOURCE_GROUP"
else
    echo -e "${RED}✗${NC} Resource Group not found: $RESOURCE_GROUP"
    exit 1
fi
echo ""

# Check 4: App Service exists
echo -e "${YELLOW}[4/6]${NC} Checking App Service..."
if az webapp show --resource-group $RESOURCE_GROUP --name $APP_NAME --subscription $SUBSCRIPTION &> /dev/null; then
    echo -e "${GREEN}✓${NC} App Service exists: $APP_NAME"
    STATE=$(az webapp show --resource-group $RESOURCE_GROUP --name $APP_NAME --subscription $SUBSCRIPTION --query "state" -o tsv)
    echo "  State: $STATE"
    DEFAULT_HOST=$(az webapp show --resource-group $RESOURCE_GROUP --name $APP_NAME --subscription $SUBSCRIPTION --query "defaultHostName" -o tsv)
    echo "  URL: https://$DEFAULT_HOST"
else
    echo -e "${RED}✗${NC} App Service not found: $APP_NAME"
    exit 1
fi
echo ""

# Check 5: Application Settings
echo -e "${YELLOW}[5/6]${NC} Checking Application Settings..."
ENV_VARS=$(az webapp config appsettings list --resource-group $RESOURCE_GROUP --name $APP_NAME --subscription $SUBSCRIPTION --query "[].{name:name, value:value}" -o json)

if echo "$ENV_VARS" | grep -q "VITE_LEAD_API"; then
    API_VAL=$(echo "$ENV_VARS" | grep -o '"VITE_LEAD_API":"[^"]*' | cut -d'"' -f4)
    echo -e "${GREEN}✓${NC} VITE_LEAD_API is set: $API_VAL"
else
    echo -e "${YELLOW}⚠${NC} VITE_LEAD_API is NOT set - API calls will fail"
    echo "  To set it, run:"
    echo "  az webapp config appsettings set --resource-group $RESOURCE_GROUP --name $APP_NAME --settings VITE_LEAD_API=https://your-api-endpoint.com"
fi
echo ""

# Check 6: Test URL accessibility
echo -e "${YELLOW}[6/6]${NC} Testing URL accessibility..."
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://$DEFAULT_HOST" --max-time 5)
if [ "$HTTP_STATUS" = "200" ]; then
    echo -e "${GREEN}✓${NC} Application is accessible (HTTP $HTTP_STATUS)"
else
    echo -e "${YELLOW}⚠${NC} HTTP Status: $HTTP_STATUS"
    if [ "$HTTP_STATUS" = "000" ]; then
        echo "  Connection timed out or failed"
    fi
fi
echo ""

echo "================================================"
echo "Validation Complete"
echo "================================================"
echo ""
echo "If there are any issues, refer to DEPLOYMENT_VALIDATION.md"
