/**
 * Commercial Roofing Contractor Template - Dashboard JavaScript
 * Version: 1.0.0
 * 
 * This file handles all dashboard functionality including
 * drone inspection galleries, warranty tracking, and repair approvals.
 */

(function () {
    'use strict';

    // ============================================================
    // Configuration
    // ============================================================
    const CONFIG = {
        animationDuration: 300,
        galleryItemsPerPage: 12,
        warrantyWarningDays: 30
    };

    // ============================================================
    // Sidebar Toggle
    // ============================================================
    const Sidebar = {
        /**
         * Initialize sidebar functionality
         */
        init: function () {
            this.toggleBtn = document.getElementById('sidebar-toggle');
            this.sidebar = document.querySelector('.sidebar');
            this.mainContent = document.querySelector('.main-content');

            if (this.toggleBtn && this.sidebar) {
                this.toggleBtn.addEventListener('click', () => this.toggle());

                // Close sidebar on outside click (mobile)
                document.addEventListener('click', (e) => {
                    if (window.innerWidth <= 1024 &&
                        this.sidebar.classList.contains('open') &&
                        !this.sidebar.contains(e.target) &&
                        !this.toggleBtn.contains(e.target)) {
                        this.close();
                    }
                });
            }
        },

        /**
         * Toggle sidebar
         */
        toggle: function () {
            this.sidebar.classList.toggle('open');
            this.toggleBtn.classList.toggle('active');
        },

        /**
         * Close sidebar
         */
        close: function () {
            this.sidebar.classList.remove('open');
            this.toggleBtn.classList.remove('active');
        }
    };

    // ============================================================
    // Dashboard Statistics
    // ============================================================
    const DashboardStats = {
        /**
         * Initialize statistics animations
         */
        init: function () {
            const counters = document.querySelectorAll('.stat-number');

            if (counters.length === 0) return;

            const observerOptions = {
                threshold: 0.5
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            counters.forEach(counter => {
                observer.observe(counter);
            });
        },

        /**
         * Animate counter value
         * @param {HTMLElement} counter - Counter element
         */
        animateCounter: function (counter) {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const timer = setInterval(() => {
                current += step;

                if (current >= target) {
                    counter.textContent = target.toLocaleString();
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.floor(current).toLocaleString();
                }
            }, 16);
        }
    };

    // ============================================================
    // Drone Inspection Gallery
    // ============================================================
    const InspectionGallery = {
        /**
         * Initialize inspection gallery
         */
        init: function () {
            this.galleryGrid = document.getElementById('inspection-gallery');
            this.filterButtons = document.querySelectorAll('.gallery-filter-btn');
            this.lightbox = document.getElementById('gallery-lightbox');

            if (this.galleryGrid) {
                this.renderGallery();
                this.setupFilters();
                this.setupLightbox();
            }
        },

        /**
         * Render gallery items
         */
        renderGallery: function () {
            const items = this.getSampleInspections();

            this.galleryGrid.innerHTML = items.map(item => `
                <div class="gallery-item" data-category="${item.category}" data-inspection-id="${item.id}">
                    <img src="${item.thumbnail}" alt="${item.title}" loading="lazy">
                    <div class="gallery-overlay">
                        <div>
                            <h4 class="text-white mb-1">${item.title}</h4>
                            <p class="text-white-50 small mb-2">${item.date}</p>
                            <button class="btn btn-light btn-sm" onclick="InspectionGallery.viewDetails(${item.id})">
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        },

        /**
         * Get sample inspection data
         * @returns {Array} Inspection items
         */
        getSampleInspections: function () {
            return [
                { id: 1, title: 'Commercial Building A', date: '2024-01-15', category: 'inspection', thumbnail: 'https://via.placeholder.com/400x300?text=Inspection+1' },
                { id: 2, title: 'Warehouse Roof B', date: '2024-01-14', category: 'repair', thumbnail: 'https://via.placeholder.com/400x300?text=Repair+1' },
                { id: 3, title: 'Office Complex C', date: '2024-01-13', category: 'inspection', thumbnail: 'https://via.placeholder.com/400x300?text=Inspection+2' },
                { id: 4, title: 'Retail Store D', date: '2024-01-12', category: 'maintenance', thumbnail: 'https://via.placeholder.com/400x300?text=Maintenance+1' },
                { id: 5, title: 'Industrial Plant E', date: '2024-01-11', category: 'inspection', thumbnail: 'https://via.placeholder.com/400x300?text=Inspection+3' },
                { id: 6, title: 'Shopping Mall F', date: '2024-01-10', category: 'repair', thumbnail: 'https://via.placeholder.com/400x300?text=Repair+2' },
                { id: 7, title: 'Hotel Roof G', date: '2024-01-09', category: 'inspection', thumbnail: 'https://via.placeholder.com/400x300?text=Inspection+4' },
                { id: 8, title: 'School Building H', date: '2024-01-08', category: 'maintenance', thumbnail: 'https://via.placeholder.com/400x300?text=Maintenance+2' }
            ];
        },

        /**
         * Setup gallery filters
         */
        setupFilters: function () {
            this.filterButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Update active state
                    this.filterButtons.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');

                    // Filter items
                    const category = btn.getAttribute('data-filter');
                    this.filterItems(category);
                });
            });
        },

        /**
         * Filter gallery items
         * @param {string} category - Filter category
         */
        filterItems: function (category) {
            const items = this.galleryGrid.querySelectorAll('.gallery-item');

            items.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                    item.classList.add('fade-in');
                } else {
                    item.style.display = 'none';
                    item.classList.remove('fade-in');
                }
            });
        },

        /**
         * Setup lightbox functionality
         */
        setupLightbox: function () {
            if (!this.lightbox) return;

            const closeBtn = this.lightbox.querySelector('.lightbox-close');
            const prevBtn = this.lightbox.querySelector('.lightbox-prev');
            const nextBtn = this.lightbox.querySelector('.lightbox-next');

            if (closeBtn) {
                closeBtn.addEventListener('click', () => this.closeLightbox());
            }

            if (prevBtn) {
                prevBtn.addEventListener('click', () => this.navigateLightbox(-1));
            }

            if (nextBtn) {
                nextBtn.addEventListener('click', () => this.navigateLightbox(1));
            }

            // Close on backdrop click
            this.lightbox.addEventListener('click', (e) => {
                if (e.target === this.lightbox) {
                    this.closeLightbox();
                }
            });

            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (!this.lightbox.classList.contains('show')) return;

                if (e.key === 'Escape') this.closeLightbox();
                if (e.key === 'ArrowLeft') this.navigateLightbox(-1);
                if (e.key === 'ArrowRight') this.navigateLightbox(1);
            });
        },

        /**
         * Open lightbox
         * @param {number} id - Inspection ID
         */
        viewDetails: function (id) {
            const inspection = this.getSampleInspections().find(i => i.id === id);

            if (!inspection || !this.lightbox) return;

            const image = this.lightbox.querySelector('.lightbox-image');
            const title = this.lightbox.querySelector('.lightbox-title');
            const date = this.lightbox.querySelector('.lightbox-date');
            const description = this.lightbox.querySelector('.lightbox-description');

            image.src = inspection.thumbnail;
            title.textContent = inspection.title;
            date.textContent = `Date: ${inspection.date}`;
            description.textContent = `Inspection ID: ${inspection.id} - Detailed drone inspection report for ${inspection.title}.`;

            this.lightbox.classList.add('show');
            document.body.style.overflow = 'hidden';
        },

        /**
         * Close lightbox
         */
        closeLightbox: function () {
            this.lightbox.classList.remove('show');
            document.body.style.overflow = '';
        },

        /**
         * Navigate lightbox
         * @param {number} direction - Navigation direction
         */
        navigateLightbox: function (direction) {
            // Implementation for navigating between gallery items
            console.log('Navigating lightbox:', direction);
        }
    };

    // ============================================================
    // Warranty Tracking
    // ============================================================
    const WarrantyTracker = {
        /**
         * Initialize warranty tracking
         */
        init: function () {
            this.warrantyTable = document.getElementById('warranty-table');
            this.statusBadges = document.querySelectorAll('.warranty-status');

            if (this.warrantyTable) {
                this.renderWarranties();
                this.checkExpiringWarranties();
            }
        },

        /**
         * Render warranty table
         */
        renderWarranties: function () {
            const warranties = this.getSampleWarranties();

            this.warrantyTable.querySelector('tbody').innerHTML = warranties.map(w => {
                const statusClass = this.getStatusClass(w.status);
                const daysRemaining = this.getDaysRemaining(w.expiryDate);

                return `
                    <tr>
                        <td class="fw-medium">${w.id}</td>
                        <td>${w.client}</td>
                        <td>${w.project}</td>
                        <td>${w.type}</td>
                        <td class="text-nowrap">${w.startDate}</td>
                        <td class="text-nowrap">${w.expiryDate}</td>
                        <td><span class="badge ${statusClass}">${w.status}</span></td>
                        <td class="fw-bold">${daysRemaining} days</td>
                        <td class="text-center">
                            <div class="btn-group btn-group-sm">
                                <button class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#warrantyDetailsModal">
                                    <i class="bi bi-eye"></i>
                                </button>
                                <button class="btn btn-outline-secondary" onclick="WarrantyTracker.downloadCertificate('${w.id}')">
                                    <i class="bi bi-download"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `;
            }).join('');
        },

        /**
         * Get sample warranty data
         * @returns {Array} Warranty items
         */
        getSampleWarranties: function () {
            return [
                { id: 'WRT-001', client: 'ABC Corporation', project: 'Main Office Building', type: 'Material', startDate: '2023-01-15', expiryDate: '2028-01-15', status: 'Active' },
                { id: 'WRT-002', client: 'XYZ Industries', project: 'Warehouse Complex', type: 'Labor', startDate: '2023-06-01', expiryDate: '2025-06-01', status: 'Active' },
                { id: 'WRT-003', client: 'Tech Park LLC', project: 'Data Center', type: 'Comprehensive', startDate: '2022-03-20', expiryDate: '2024-03-20', status: 'Expiring Soon' },
                { id: 'WRT-004', client: 'Retail Group', project: 'Shopping Center', type: 'Material', startDate: '2021-08-10', expiryDate: '2024-02-10', status: 'Expired' },
                { id: 'WRT-005', client: 'Healthcare Inc', project: 'Medical Center', type: 'Comprehensive', startDate: '2023-09-01', expiryDate: '2028-09-01', status: 'Active' }
            ];
        },

        /**
         * Get status badge class
         * @param {string} status - Warranty status
         * @returns {string} Badge class
         */
        getStatusClass: function (status) {
            switch (status) {
                case 'Active': return 'badge-success';
                case 'Expiring Soon': return 'badge-warning';
                case 'Expired': return 'badge-danger';
                default: return 'badge-info';
            }
        },

        /**
         * Calculate days remaining until expiry
         * @param {string} date - Expiry date
         * @returns {number} Days remaining
         */
        getDaysRemaining: function (date) {
            const expiry = new Date(date);
            const today = new Date();
            const diffTime = expiry - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays;
        },

        /**
         * Check and highlight expiring warranties
         */
        checkExpiringWarranties: function () {
            const warningElement = document.getElementById('warranty-warning');

            if (!warningElement) return;

            const expiringCount = this.getSampleWarranties().filter(w => {
                const days = this.getDaysRemaining(w.expiryDate);
                return days > 0 && days <= CONFIG.warrantyWarningDays;
            }).length;

            if (expiringCount > 0) {
                warningElement.textContent = `${expiringCount} warranty${expiringCount > 1 ? 'ies' : ''} expiring soon!`;
                warningElement.classList.remove('d-none');
            }
        },

        /**
         * View warranty details
         * @param {string} id - Warranty ID
         */
        viewDetails: function (id) {
            console.log('Viewing warranty details:', id);
            // Implementation for modal/view details
        },

        /**
         * Download warranty certificate
         * @param {string} id - Warranty ID
         */
        downloadCertificate: function (id) {
            console.log('Downloading certificate:', id);
            // Implementation for PDF download
        }
    };

    // ============================================================
    // Repair Estimate Approval
    // ============================================================
    const RepairApprovals = {
        /**
         * Initialize repair approval functionality
         */
        init: function () {
            this.approvalTable = document.getElementById('approval-table');
            this.approvalModal = document.getElementById('approval-modal');

            if (this.approvalTable) {
                this.renderApprovals();
                this.setupApprovalActions();
            }
        },

        /**
         * Render approval requests
         */
        renderApprovals: function () {
            const approvals = this.getSampleApprovals();

            this.approvalTable.querySelector('tbody').innerHTML = approvals.map(a => {
                const statusClass = this.getStatusClass(a.status);
                const priorityClass = this.getPriorityClass(a.priority);

                return `
                    <tr>
                        <td>${a.id}</td>
                        <td>${a.client}</td>
                        <td>${a.address}</td>
                        <td>${a.description}</td>
                        <td>$${a.amount.toLocaleString()}</td>
                        <td><span class="badge ${priorityClass}">${a.priority}</span></td>
                        <td><span class="badge ${statusClass}">${a.status}</span></td>
                        <td>${a.submittedDate}</td>
                        <td>
                            ${a.status === 'Pending' ? `
                                <div class="btn-group btn-group-sm">
                                    <button class="btn btn-success" onclick="RepairApprovals.approve('${a.id}')">
                                        <i class="bi bi-check"></i>
                                    </button>
                                    <button class="btn btn-danger" onclick="RepairApprovals.reject('${a.id}')">
                                        <i class="bi bi-x"></i>
                                    </button>
                                    <button class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#warrantyDetailsModal">
                                        <i class="bi bi-eye"></i>
                                    </button>
                                </div>
                            ` : `
                                <button class="btn btn-outline-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#warrantyDetailsModal">
                                    <i class="bi bi-eye"></i> View
                                </button>
                            `}
                        </td>
                    </tr>
                `;
            }).join('');
        },

        /**
         * Get sample approval data
         * @returns {Array} Approval items
         */
        getSampleApprovals: function () {
            return [
                { id: 'REP-001', client: 'John Smith', address: '123 Main St, City', description: 'Roof leak repair - missing shingles', amount: 2500, priority: 'High', status: 'Pending', submittedDate: '2024-01-15' },
                { id: 'REP-002', client: 'Jane Doe', address: '456 Oak Ave, Town', description: 'Complete roof replacement', amount: 15000, priority: 'Medium', status: 'Approved', submittedDate: '2024-01-14' },
                { id: 'REP-003', client: 'ABC Company', address: '789 Business Blvd', description: 'Storm damage assessment', amount: 800, priority: 'High', status: 'Pending', submittedDate: '2024-01-13' },
                { id: 'REP-004', client: 'XYZ Retail', address: '321 Shopping Center', description: 'HVAC platform repair', amount: 3200, priority: 'Low', status: 'Rejected', submittedDate: '2024-01-12' },
                { id: 'REP-005', client: 'Tech Startup', address: '555 Innovation Way', description: 'Green roof maintenance', amount: 5000, priority: 'Medium', status: 'Pending', submittedDate: '2024-01-11' }
            ];
        },

        /**
         * Get status badge class
         * @param {string} status - Approval status
         * @returns {string} Badge class
         */
        getStatusClass: function (status) {
            switch (status) {
                case 'Approved': return 'badge-success';
                case 'Pending': return 'badge-warning';
                case 'Rejected': return 'badge-danger';
                default: return 'badge-info';
            }
        },

        /**
         * Get priority badge class
         * @param {string} priority - Priority level
         * @returns {string} Badge class
         */
        getPriorityClass: function (priority) {
            switch (priority) {
                case 'High': return 'badge-danger';
                case 'Medium': return 'badge-warning';
                case 'Low': return 'badge-info';
                default: return 'badge-secondary';
            }
        },

        /**
         * Setup approval action handlers
         */
        setupApprovalActions: function () {
            // Additional setup if needed
        },

        /**
         * Approve a repair estimate
         * @param {string} id - Repair ID
         */
        approve: function (id) {
            if (confirm('Are you sure you want to approve this repair estimate?')) {
                console.log('Approving repair:', id);
                this.updateStatus(id, 'Approved');
            }
        },

        /**
         * Reject a repair estimate
         * @param {string} id - Repair ID
         */
        reject: function (id) {
            const reason = prompt('Please enter a reason for rejection:');
            if (reason !== null) {
                console.log('Rejecting repair:', id, 'Reason:', reason);
                this.updateStatus(id, 'Rejected');
            }
        },

        /**
         * View repair details
         * @param {string} id - Repair ID
         */
        viewDetails: function (id) {
            console.log('Viewing repair details:', id);
            // Implementation for modal/view details
        },

        /**
         * Update repair status
         * @param {string} id - Repair ID
         * @param {string} status - New status
         */
        updateStatus: function (id, status) {
            // Update UI
            const row = this.approvalTable.querySelector(`tr:has(td:first-child:contains("${id}"))`);
            if (row) {
                const statusCell = row.querySelector('td:nth-child(7)');
                statusCell.innerHTML = `<span class="badge ${this.getStatusClass(status)}">${status}</span>`;

                const actionsCell = row.querySelector('td:last-child');
                actionsCell.innerHTML = `
                    <button class="btn btn-outline-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#warrantyDetailsModal">
                        <i class="bi bi-eye"></i> View
                    </button>
                `;
            }

            // Show notification
            this.showNotification(`Repair ${id} has been ${status.toLowerCase()}.`);
        },

        /**
         * Show notification
         * @param {string} message - Notification message
         */
        showNotification: function (message) {
            const notification = document.createElement('div');
            notification.className = 'alert alert-success alert-dismissible fade show position-fixed bottom-0 end-0 m-3';
            notification.innerHTML = `
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            `;
            document.body.appendChild(notification);

            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        }
    };

    // ============================================================
    // Charts Initialization (using Chart.js)
    // ============================================================
    const Charts = {
        /**
         * Initialize dashboard charts
         */
        init: function () {
            if (typeof Chart === 'undefined') {
                console.warn('Chart.js is not loaded');
                return;
            }

            this.initRevenueChart();
            this.initServiceChart();
            this.initMonthlyTrendChart();
        },

        /**
         * Initialize revenue chart
         */
        initRevenueChart: function () {
            const ctx = document.getElementById('revenue-chart');
            if (!ctx) return;

            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [{
                        label: 'Revenue ($)',
                        data: [65000, 72000, 85000, 78000, 92000, 105000, 115000, 108000, 125000, 140000, 155000, 170000],
                        borderColor: '#1e3a8a',
                        backgroundColor: 'rgba(30, 58, 138, 0.1)',
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function (value) {
                                    return '$' + value.toLocaleString();
                                }
                            }
                        }
                    }
                }
            });
        },

        /**
         * Initialize service distribution chart
         */
        initServiceChart: function () {
            const ctx = document.getElementById('service-chart');
            if (!ctx) return;

            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Installation', 'Repair', 'Maintenance', 'Inspection', 'Emergency'],
                    datasets: [{
                        data: [35, 25, 20, 12, 8],
                        backgroundColor: [
                            '#1e3a8a',
                            '#059669',
                            '#f97316',
                            '#8b5cf6',
                            '#ef4444'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        },

        /**
         * Initialize monthly trend chart
         */
        initMonthlyTrendChart: function () {
            const ctx = document.getElementById('trend-chart');
            if (!ctx) return;

            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [
                        {
                            label: 'Completed Jobs',
                            data: [45, 52, 48, 61, 55, 68],
                            backgroundColor: '#38a169'
                        },
                        {
                            label: 'Pending Jobs',
                            data: [12, 15, 18, 14, 16, 12],
                            backgroundColor: '#ed8936'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }
    };

    // ============================================================
    // Data Tables
    // ============================================================
    const DataTables = {
        /**
         * Initialize data tables
         */
        init: function () {
            // Check if DataTables is available
            if (typeof $.fn.DataTable === 'undefined') {
                console.warn('DataTables is not loaded');
                return;
            }

            // Initialize tables with sorting, searching, and pagination
            $('.data-table').DataTable({
                responsive: true,
                pageLength: 10,
                language: {
                    search: 'Search:',
                    lengthMenu: 'Show _MENU_ entries per page',
                    info: 'Showing _START_ to _END_ of _TOTAL_ entries',
                    infoEmpty: 'No entries available',
                    infoFiltered: '(filtered from _MAX_ total entries)'
                }
            });
        }
    };

    // ============================================================
    // File Upload Handler
    // ============================================================
    const FileUpload = {
        /**
         * Initialize file upload functionality
         */
        init: function () {
            this.dropzones = document.querySelectorAll('.file-dropzone');

            this.dropzones.forEach(zone => {
                this.setupDropzone(zone);
            });
        },

        /**
         * Setup dropzone functionality
         * @param {HTMLElement} zone - Dropzone element
         */
        setupDropzone: function (zone) {
            const input = zone.querySelector('input[type="file"]');
            const preview = zone.querySelector('.dropzone-preview');

            if (!input) return;

            zone.addEventListener('dragover', (e) => {
                e.preventDefault();
                zone.classList.add('dragover');
            });

            zone.addEventListener('dragleave', () => {
                zone.classList.remove('dragover');
            });

            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                zone.classList.remove('dragover');

                const files = e.dataTransfer.files;
                this.handleFiles(files, input, preview);
            });

            input.addEventListener('change', () => {
                this.handleFiles(input.files, input, preview);
            });
        },

        /**
         * Handle file selection
         * @param {FileList} files - Selected files
         * @param {HTMLElement} input - File input element
         * @param {HTMLElement} preview - Preview container
         */
        handleFiles: function (files, input, preview) {
            if (!preview) return;

            preview.innerHTML = '';

            Array.from(files).forEach(file => {
                if (!file.type.startsWith('image/')) return;

                const reader = new FileReader();
                reader.onload = (e) => {
                    const item = document.createElement('div');
                    item.className = 'dropzone-item';
                    item.innerHTML = `
                        <img src="${e.target.result}" alt="${file.name}">
                        <span class="text-muted small">${file.name}</span>
                    `;
                    preview.appendChild(item);
                };
                reader.readAsDataURL(file);
            });
        }
    };

    // ============================================================
    // Initialize All Dashboard Modules
    // ============================================================
    const DashboardApp = {
        /**
         * Initialize the dashboard
         */
        init: function () {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
            } else {
                this.onDOMReady();
            }
        },

        /**
         * Called when DOM is ready
         */
        onDOMReady: function () {
            Sidebar.init();
            DashboardStats.init();

            // Check if we're on the gallery page
            if (document.getElementById('inspection-gallery')) {
                InspectionGallery.init();
            }

            // Check if we're on the warranty page
            if (document.getElementById('warranty-table')) {
                WarrantyTracker.init();
            }

            // Check if we're on the approvals page
            if (document.getElementById('approval-table')) {
                RepairApprovals.init();
            }

            // Initialize charts
            Charts.init();

            // Initialize data tables
            DataTables.init();

            // Initialize file upload
            FileUpload.init();

            console.log('Dashboard initialized successfully');
        }
    };

    // ============================================================
    // Theme & RTL Manager
    // ============================================================
    const ThemeManager = {
        init: function () {
            this.themeToggle = document.getElementById('theme-toggle');
            this.rtlToggle = document.getElementById('rtl-toggle');
            this.html = document.documentElement;

            this.loadSettings();
            this.bindEvents();
        },

        loadSettings: function () {
            // Theme
            const savedTheme = localStorage.getItem('theme-preference') || 'light';
            this.setTheme(savedTheme);

            // Direction
            const savedDir = localStorage.getItem('dir-preference') || 'ltr';
            this.setDir(savedDir);
        },

        bindEvents: function () {
            if (this.themeToggle) {
                this.themeToggle.addEventListener('click', () => {
                    const currentTheme = this.html.getAttribute('data-bs-theme');
                    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                    this.setTheme(newTheme);
                });
            }

            if (this.rtlToggle) {
                this.rtlToggle.addEventListener('click', () => {
                    const currentDir = this.html.getAttribute('dir') || 'ltr';
                    const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
                    this.setDir(newDir);
                });
            }
        },

        setTheme: function (theme) {
            this.html.setAttribute('data-bs-theme', theme);
            localStorage.setItem('theme-preference', theme);

            if (this.themeToggle) {
                const icon = this.themeToggle.querySelector('i');
                if (theme === 'dark') {
                    icon.classList.remove('bi-moon');
                    icon.classList.add('bi-sun');
                } else {
                    icon.classList.remove('bi-sun');
                    icon.classList.add('bi-moon');
                }
            }
        },

        setDir: function (dir) {
            this.html.setAttribute('dir', dir);
            localStorage.setItem('dir-preference', dir);

            if (this.rtlToggle) {
                // RTL toggle button styling is handled via CSS or class toggling
                // No longer swapping bi-text icons as we use bi-translate
            }
        }
    };

    // Initialize Theme Manager
    ThemeManager.init();

    // Start the dashboard
    DashboardApp.init();

    // Export to global scope for external use
    window.DashboardApp = {
        Sidebar: Sidebar,
        InspectionGallery: InspectionGallery,
        WarrantyTracker: WarrantyTracker,
        RepairApprovals: RepairApprovals
    };

})();
