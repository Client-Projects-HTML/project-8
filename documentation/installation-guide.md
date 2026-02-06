# Installation Guide

## Prerequisites
- Web browser (Chrome, Firefox, Safari, Edge)
- Text editor (VS Code, Sublime Text, etc.)
- Optional: Local development server

## Quick Installation

### Option 1: Direct Use
1. Extract the template to your web directory
2. Open `pages/index.html` in your browser
3. Start customizing!

### Option 2: Local Development Server
```bash
# Navigate to template directory
cd template-name

# Python 3
python -m http.server 8000

# Node.js (if installed)
npx http-server

# PHP (if installed)
php -S localhost:8000
```

### Option 3: VS Code Live Server
1. Install "Live Server" extension
2. Open `pages/index.html`
3. Right-click and select "Open with Live Server"

## Directory Structure
```
template-name/
├── assets/
│   ├── css/         # Stylesheets
│   ├── js/          # JavaScript files
│   ├── images/      # Images and media
│   └── fonts/       # Custom fonts
├── pages/           # HTML pages
├── documentation/   # Documentation files
└── README.md        # This file
```

## First Steps
1. Replace placeholder images with your own
2. Update text content with your company information
3. Configure contact form (Formspree/Netlify)
4. Set up Google Maps API key
5. Deploy to your hosting provider
