# LifePath Prototype - File Export List

## Project Structure for Manual Export

### Root Files
- App.tsx

### Components Directory (/components/)
- ActiveEmergency.tsx
- AmbulanceDetails.tsx
- AudioSupport.tsx
- AuthPage.tsx
- BackToHome.tsx
- BugReportModal.tsx
- Dashboard.tsx
- History.tsx
- HospitalDashboard.tsx
- HospitalSelection.tsx
- Landing.tsx
- LanguageDemo.tsx
- LanguageSelector.tsx
- MobileDashboardLayout.tsx
- MobileEmergencyActions.tsx
- MobileGestureHandler.tsx
- MobileNavigation.tsx
- MobileTopBar.tsx
- Profile.tsx
- ProfileHeader.tsx
- RideSummary.tsx
- SOSButton.tsx
- TopBar.tsx
- TrafficControl.tsx
- TrafficPolicePanel.tsx
- UpdatesModal.tsx

### UI Components Directory (/components/ui/)
- accordion.tsx
- alert-dialog.tsx
- alert.tsx
- aspect-ratio.tsx
- avatar.tsx
- badge.tsx
- breadcrumb.tsx
- button.tsx
- calendar.tsx
- card.tsx
- carousel.tsx
- chart.tsx
- checkbox.tsx
- collapsible.tsx
- command.tsx
- context-menu.tsx
- dialog.tsx
- drawer.tsx
- dropdown-menu.tsx
- form.tsx
- hover-card.tsx
- input-otp.tsx
- input.tsx
- label.tsx
- menubar.tsx
- navigation-menu.tsx
- pagination.tsx
- popover.tsx
- progress.tsx
- radio-group.tsx
- resizable.tsx
- scroll-area.tsx
- select.tsx
- separator.tsx
- sheet.tsx
- sidebar.tsx
- skeleton.tsx
- slider.tsx
- sonner.tsx
- switch.tsx
- table.tsx
- tabs.tsx
- textarea.tsx
- toggle-group.tsx
- toggle.tsx
- tooltip.tsx
- use-mobile.ts
- utils.ts

### Figma Components Directory (/components/figma/)
- ImageWithFallback.tsx

### Contexts Directory (/contexts/)
- ActivityContext.tsx
- LanguageContext.tsx

### Hooks Directory (/hooks/)
- useMobile.ts

### Styles Directory (/styles/)
- globals.css

### Types Directory (/types/)
- user.ts

### Guidelines Directory (/guidelines/)
- Guidelines.md

## Package.json Dependencies
You'll also need to include a package.json file with the following key dependencies:
- React
- Tailwind CSS
- Lucide React (for icons)
- Recharts (for charts)
- Sonner (for toasts)
- Motion/React (for animations)

## Instructions for Manual Export:
1. Create a new folder called "LifePath-Prototype"
2. Recreate the directory structure shown above
3. Copy each file from your development environment to the corresponding location
4. Include a package.json file with proper dependencies
5. Compress the entire folder using your preferred archive tool (RAR/ZIP)

## Development Setup Instructions:
After extracting the archive:
1. Run `npm install` to install dependencies
2. Run `npm run dev` to start the development server
3. The application should be accessible at localhost:3000