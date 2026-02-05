# Commercial Roofing Contractor Website Template

A modern, responsive website template for commercial roofing contractors built with Bootstrap 5. This template includes a comprehensive client dashboard with drone inspection galleries, warranty tracking, and repair estimate approval features.

## Features

### Core Features
- **Responsive Design** - Mobile-first approach with breakpoints for all screen sizes
- **Dark/Light Mode** - Toggle between themes with system preference detection
- **RTL Support** - Full right-to-left layout support for Arabic and Hebrew
- **SEO Optimized** - Semantic HTML, meta tags, and structured data
- **Accessibility** - WCAG 2.1 AA compliant

### Pages Included
- Home Page with hero section, services, testimonials
- About Us with team, mission, and history
- Services listing and service details pages
- Blog with articles and filtering
- Contact page with form and map
- Admin Dashboard with:
  - Drone inspection photo galleries
  - Warranty tracking
  - Repair estimate approval portal
- 404 Page
- Pricing Page
- Login/Register
- Coming Soon Page

### Design Principles
- Clean, semantic code structure
- CSS variables for consistent theming
- Reusable UI components
- Professional icon library (Bootstrap Icons)
- Consistent spacing system (8px base)

## File Structure

```
template-name/
├── assets/
│   ├── css/
│   │   ├── style.css (main styles)
│   │   ├── dark-mode.css
│   │   └── rtl.css
│   ├── js/
│   │   ├── main.js
│   │   ├── dashboard.js
│   │   └── plugins/
│   ├── images/
│   └── fonts/
├── pages/
│   ├── index.html (home)
│   ├── about.html
│   ├── services.html
│   ├── service-details.html
│   ├── blog.html
│   ├── blog-details.html
│   ├── contact.html
│   ├── dashboard.html
│   ├── 404.html
│   ├── pricing.html
│   ├── login.html
│   └── coming-soon.html
├── documentation/
└── README.md
```

## Quick Start

### Local Development
1. Clone or download the template
2. Open `pages/index.html` in your browser
3. Or use a local development server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (with http-server)
   npx http-server
   
   # Using VS Code Live Server
   # Right-click index.html > Open with Live Server
   ```

### Customization

#### Colors
Edit CSS variables in `assets/css/style.css`:
```css
:root {
    --primary-color: #2c5282;
    --secondary-color: #38a169;
    --accent-color: #ed8936;
    /* ... */
}
```

#### Fonts
Replace Google Fonts in each HTML file:
```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@400;600;700&display=swap" rel="stylesheet">
```

#### Logo
Replace the brand element in the navbar:
```html
<a class="navbar-brand" href="index.html">
    <i class="bi bi-building"></i>
    <span>Your Brand</span>
</a>
```

## Integrations Ready

### Contact Form
- Formspree: Add your Formspree endpoint to the form action
- Netlify: Add `netlify` attribute to the form tag

### Newsletter
- Mailchimp: Replace form action with your Mailchimp URL
- ConvertKit: Add your form action URL

### Maps
- Google Maps: Add your API key and configure the map

### Charts
- Chart.js: Already included in dashboard.html

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License
This template is licensed under MIT License.

## Support
For questions or issues, please open an issue on our repository or contact support.
