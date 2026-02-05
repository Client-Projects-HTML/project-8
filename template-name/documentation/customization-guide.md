# Customization Guide

## Colors

### Primary Colors
Edit in `assets/css/style.css`:
```css
:root {
    --primary-color: #2c5282;    /* Main brand color */
    --primary-dark: #1a365d;     /* Darker shade */
    --primary-light: #4299e1;    /* Lighter shade */
    
    --secondary-color: #38a169;  /* Secondary brand */
    --secondary-dark: #276749;
    --secondary-light: #68d391;
    
    --accent-color: #ed8936;     /* Call-to-action color */
    --accent-dark: #c05621;
    --accent-light: #f6ad55;
}
```

## Typography

### Changing Fonts
1. Replace Google Fonts import in HTML:
```html
<link href="https://fonts.googleapis.com/css2?family=NewFont:wght@400;600;700&display=swap" rel="stylesheet">
```

2. Update CSS variables:
```css
:root {
    --font-primary: 'NewFont', sans-serif;
    --font-heading: 'NewFontHeading', sans-serif;
}
```

## Logo

### Update Logo
Edit the navbar brand in each HTML file:
```html
<a class="navbar-brand" href="index.html">
    <i class="bi bi-building"></i>
    <span>Your Brand Name</span>
</a>
```

For image logo:
```html
<a class="navbar-brand" href="index.html">
    <img src="assets/images/logo.png" alt="Your Brand" height="30">
</a>
```

## Images

### Replacing Placeholders
Search for placeholder URLs and replace with your images:
- `https://via.placeholder.com/` - Replace with local images
- Update `alt` attributes for accessibility

### Image Optimization
- Use WebP format for better performance
- Compress images before uploading
- Add proper dimensions to img tags

## Contact Form

### Formspree Integration
1. Create account at formspree.io
2. Create a new form
3. Replace form action:
```html
<form action="https://formspree.io/YOUR_FORM_ID" method="POST">
```

### Netlify Forms
Add `netlify` attribute:
```html
<form name="contact" method="POST" netlify>
```

## Google Maps

### Adding Your Map
1. Get API key from Google Cloud Console
2. Replace the map placeholder with:
```html
<iframe 
    src="https://www.google.com/maps/embed?key=YOUR_API_KEY&pb=..." 
    width="100%" 
    height="400" 
    style="border:0;" 
    allowfullscreen="" 
    loading="lazy">
</iframe>
```

## Newsletter

### Mailchimp
Replace form action with your Mailchimp URL:
```html
<form action="YOUR_MAILCHIMP_URL" method="POST">
```

## Dashboard Features

### Updating Inspection Gallery
Edit `getSampleInspections()` in `assets/js/dashboard.js`:
```javascript
getSampleInspections: function() {
    return [
        { id: 1, title: 'Your Project', date: '2024-01-15', thumbnail: 'your-image.jpg' },
        // Add more items...
    ];
}
```

### Modifying Warranty Data
Edit `getSampleWarranties()` in `assets/js/dashboard.js`:
```javascript
getSampleWarranties: function() {
    return [
        { id: 'WRT-001', client: 'Client Name', project: 'Project', /* ... */ },
        // Add more items...
    ];
}
```

## RTL Support

### Enabling RTL
RTL is automatically enabled based on the `dir` attribute:
```html
<html dir="rtl" lang="ar">
```

Or toggle via JavaScript:
```javascript
RTLManager.toggle();
```

## Dark Mode

### Customizing Dark Mode Colors
Edit `assets/css/dark-mode.css`:
```css
[data-bs-theme="dark"] {
    --bs-body-bg: #0d1117;
    --bs-body-color: #c9d1d9;
}
```

## Deployment

### Static Hosting
This template works with:
- GitHub Pages
- Netlify
- Vercel
- AWS S3
- Any static hosting provider

### Build for Production
1. Minify CSS/JS (optional)
2. Optimize images
3. Test all pages
4. Upload to hosting
