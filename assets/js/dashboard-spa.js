// Dashboard SPA - Dynamic Content Switching
document.addEventListener('DOMContentLoaded', function () {
    const pageTitle = document.querySelector('.dashboard-header h1');
    const pageDescription = document.querySelector('.dashboard-header p');

    // Section metadata
    const sectionMeta = {
        'dashboard': {
            title: 'Welcome back, John!',
            description: "Here's what's happening with your roofing projects."
        },
        'drone-inspections': {
            title: 'Drone Inspections',
            description: 'View and manage drone inspection reports.'
        },
        'warranty-tracking': {
            title: 'Warranty Tracking',
            description: 'Monitor active warranties and expiration dates.'
        },
        'repair-approvals': {
            title: 'Repair Approvals',
            description: 'Review and approve repair estimates.'
        },
        'my-projects': {
            title: 'My Projects',
            description: 'Manage all your ongoing roofing projects.'
        },
        'schedule': {
            title: 'Schedule',
            description: 'View upcoming inspections and appointments.'
        },
        'messages': {
            title: 'Messages',
            description: 'Communicate with your project managers.'
        },
        'settings': {
            title: 'Settings',
            description: 'Manage your account and preferences.'
        }
    };

    // Function to show a specific section
    function showSection(sectionId) {
        // Hide all sections
        const sections = document.querySelectorAll('[data-section-content]');
        sections.forEach(section => {
            section.style.display = 'none';
        });

        // Show the selected section
        const targetSection = document.querySelector(`[data-section-content="${sectionId}"]`);
        if (targetSection) {
            targetSection.style.display = 'block';
        }

        // Update active state on sidebar links
        const sidebarLinks = document.querySelectorAll('.sidebar-link[data-section]');
        sidebarLinks.forEach(link => {
            link.classList.remove('active');
        });
        const activeLink = document.querySelector(`.sidebar-link[data-section="${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        // Update page header
        if (sectionMeta[sectionId]) {
            if (pageTitle) pageTitle.textContent = sectionMeta[sectionId].title;
            if (pageDescription) pageDescription.textContent = sectionMeta[sectionId].description;
        }

        // Update URL hash without scrolling
        history.pushState(null, null, `#${sectionId}`);
    }

    // Add click event listeners to ALL elements with data-section attribute
    function attachNavigationListeners() {
        const navigationElements = document.querySelectorAll('[data-section]');
        navigationElements.forEach(element => {
            element.addEventListener('click', function (e) {
                e.preventDefault();
                const sectionId = this.getAttribute('data-section');
                showSection(sectionId);
            });
        });
    }

    // Initial attachment
    attachNavigationListeners();

    // Handle initial load based on URL hash
    const initialHash = window.location.hash.substring(1);
    if (initialHash && document.querySelector(`[data-section-content="${initialHash}"]`)) {
        showSection(initialHash);
    } else {
        showSection('dashboard'); // Default to dashboard
    }

    // Handle browser back/forward buttons
    window.addEventListener('popstate', function () {
        const hash = window.location.hash.substring(1) || 'dashboard';
        showSection(hash);
    });
});
