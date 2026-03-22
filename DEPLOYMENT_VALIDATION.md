# Azure Deployment Validation & Troubleshooting Guide

## Issues Found and Fixed ✓

### 1. **Build Error** ✓ FIXED
- **Issue**: TypeScript error - `useMemo` imported but not used in `ChatWidget.tsx`
- **Fix**: Removed unused import from src/components/ChatWidget.tsx
- **Status**: Build now completes successfully ✓

### 2. **GitHub Actions Workflow** ✓ FIXED
- **Issue**: Workflow was missing build steps - it tried to deploy without building
- **Fixes Applied**:
  - Added Node.js setup step
  - Added npm ci (clean install)
  - Added `npm run build` step
  - Fixed output_location from "build" to "dist" (Vite outputs to dist/)
- **Status**: Workflow now properly builds before deploying ✓

### 3. **Azure Static Web Apps Configuration** ✓ ADDED
- **Issue**: No staticwebapp.config.json for routing and CORS configuration
- **Fix**: Created staticwebapp.config.json with:
  - Navigation fallback to index.html (for SPA routing)
  - API proxy configuration
  - CORS headers for API calls
  - Security headers
- **Status**: Configuration file in place ✓

### 4. **Environment Variables** ✓ CONFIGURED
- **Issue**: `VITE_LEAD_API` environment variable not configured
- **Files Created**:
  - `.env.example` - Template for developers
  - `.env.production` - Production environment with API endpoint
- **Current Setting**: `VITE_LEAD_API=https://api-ofstride-001.azurewebsites.net`
- **Action Needed**: Update this URL to your actual API endpoint ⚠️

---

## Deployment Validation Checklist

### Pre-Deployment (Local Testing)
- [x] Code builds successfully: `npm run build`
- [x] No TypeScript errors
- [x] Build output in `dist/` directory
- [x] GitHub Actions workflow properly configured
- [x] staticwebapp.config.json created

### Current Azure Deployment Status
**Subscription**: 9579f57d-bbc4-4063-821e-ded5cf489adc
**Resource Group**: res-ofs-app-001
**App Name**: was-ofstride-001

### If URL is Still Not Working - Check These Items:

#### 1. **Environment Variables in Azure**
```bash
# Check if VITE_LEAD_API is set in Azure App Service
# Portal: App Service > Configuration > Application settings
# Required:
# - Name: VITE_LEAD_API
# - Value: https://your-api-endpoint.com
```

#### 2. **API Connectivity Issues**
- [ ] Verify API endpoint is running and accessible
- [ ] Check API CORS configuration allows requests from your app domain
- [ ] API should accept requests from: `https://was-ofstride-001.azurestaticapps.net`

#### 3. **Deployment Status**
```bash
# Check deployment status in Azure CLI:
az webapp show --resource-group res-ofs-app-001 --name was-ofstride-001 --query "state"

# Check if deployment is running:
az webapp deployment slot list --resource-group res-ofs-app-001 --name was-ofstride-001
```

#### 4. **View Application Logs**
```bash
# Tail logs in real-time:
az webapp log tail --resource-group res-ofs-app-001 --name was-ofstride-001

# Or download all logs:
az webapp log download --resource-group res-ofs-app-001 --name was-ofstride-001 --log-file logs.zip
```

#### 5. **Verify Correct Output Directory**
Azure should be serving from the `dist/` directory which contains:
- `index.html`
- `assets/index-*.js`
- `assets/index-*.css`
- Image files

---

## Required Configuration Updates

### 1. Update API Endpoint in .env.production
Edit `.env.production` and set the correct API endpoint:
```env
# Current (placeholder):
VITE_LEAD_API=https://api-ofstride-001.azurewebsites.net

# Replace with your actual API endpoint:
VITE_LEAD_API=https://your-actual-api.azurewebsites.net
```

### 2. Configure Application Settings in Azure Portal
```
App Service > Settings > Configuration > Application settings

Add or Update:
Name: VITE_LEAD_API
Value: https://your-api-endpoint.com
```

### 3. Ensure API Endpoints Are Accessible
The frontend makes calls to these endpoints:
- `POST /api/hr/candidate` - From ApplyForJobs page
- `POST /api/hr/candidate/analyze` - From ApplyForJobs page  
- `POST /api/chat` - From ChatWidget component

Verify your API backend handles these routes.

---

## Routes Configured in Frontend
- `/` - Home
- `/services` - Services page
- `/hr-consulting` - HR Consulting
- `/financial-consulting` - Financial Consulting
- `/legal-consulting` - Legal Consulting  
- `/it-consulting` - IT Consulting
- `/hire-through-ofstride` - Hiring page
- `/apply-for-jobs` - Job applications (uses API)
- `/about` - About page
- `/founder` - Founder page
- `/team` - Team page
- `/contact` - Contact page

All routes are configured for SPA routing - requests will fall back to `/index.html` for client-side routing.

---

## Next Steps

1. **Verify API Connection**: Make sure `VITE_LEAD_API` points to a running API server
2. **Test the Application**: 
   - Visit `https://was-ofstride-001.azurestaticapps.net`
   - Navigate through pages
   - Test a form submission to verify API connectivity
3. **Check Browser Console**: Open DevTools > Console to see any JavaScript errors
4. **Review Logs**: Check Azure App Service logs for any backend errors

---

## Troubleshooting API Errors

If you see errors like "Failed to fetch /api/..." check:

1. **CORS Issues**:
   ```
   Access to fetch at 'https://...' from origin 'https://was-ofstride-001.azurestaticapps.net' 
   has been blocked by CORS policy
   ```
   Solution: Configure CORS on your API server to allow this origin

2. **API Not Reachable**:
   ```
   Failed to fetch /api/chat: fetch failed
   ```
   Solution: Verify `VITE_LEAD_API` environment variable is set correctly

3. **Wrong Port**:
   If API is on a different port, update `VITE_LEAD_API` with the correct port

---

## Rebuild and Redeploy

After making configuration changes:

```bash
# Local testing:
npm run build
npm run preview

# Push to trigger GitHub Actions deployment:
git add .
git commit -m "Update deployment configuration"
git push origin main
```

This will trigger the GitHub Actions workflow to rebuild and redeploy to Azure.
