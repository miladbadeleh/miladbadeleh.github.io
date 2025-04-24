document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('show');
    });
    
    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('show');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Sticky header on scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Modal functionality
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalDescription = document.getElementById('modalDescription');
    const modalFeatures = document.getElementById('modalFeatures');
    const liveDemoBtn = document.getElementById('liveDemoBtn');
    const closeModal = document.querySelector('.close-modal');
    const viewButtons = document.querySelectorAll('.view-btn');
    
    // Project data - replace with your actual project details
    const projects = {
        project1: {
            title: 'Sales Performance Dashboard',
            image: './images/supply-chain-dashboard.svg',
            description: 'This interactive dashboard provides comprehensive sales analytics with key performance indicators, regional performance breakdowns, and trend analysis. The solution helped the sales team identify underperforming regions and optimize their strategies.',
            features: [
                'Dynamic KPI cards with YTD comparisons',
                'Interactive map visualization for regional analysis',
                'Sales trend analysis with forecasting',
                'Product category performance breakdown',
                'Drill-through capabilities for detailed analysis'
            ],
            demoLink: 'https://app.powerbi.com/your-dashboard-link'
        },
        project2: {
            title: 'Financial Analysis Dashboard',
            image: './images/supply-chain-dashboard.svg',
            description: 'A comprehensive financial reporting solution that consolidates data from multiple systems to provide real-time insights into profit/loss, cash flow, and budget variance. The dashboard helped reduce financial reporting time by 70%.',
            features: [
                'Consolidated P&L statement with variance analysis',
                'Cash flow tracking with forecasting',
                'Budget vs. actual comparisons',
                'Interactive financial ratios analysis',
                'Automated data refresh from ERP system'
            ],
            demoLink: 'https://app.powerbi.com/your-dashboard-link'
        },
        project3: {
            title: 'HR Analytics Dashboard',
            image: './images/supply-chain-dashboard.svg',
            image: './images/supply-chain-dashboard.svg',
            description: 'Workforce analytics solution that tracks key HR metrics including employee turnover, recruitment funnel, training completion, and diversity statistics. The dashboard helped HR identify retention risks and optimize hiring processes.',
            features: [
                'Employee turnover analysis with predictive indicators',
                'Recruitment funnel visualization',
                'Training and development tracking',
                'Diversity and inclusion metrics',
                'Headcount planning with scenario modeling'
            ],
            demoLink: 'https://app.powerbi.com/your-dashboard-link'
        },
        project4: {
            title: 'Supply Chain Dashboard',
            image: './images/supply-chain-dashboard.svg',
            description: 'End-to-end supply chain visibility solution that tracks inventory levels, supplier performance, logistics metrics, and demand forecasting. The dashboard helped reduce inventory carrying costs by 15% and improve on-time deliveries.',
            features: [
                'Inventory turnover and days on hand analysis',
                'Supplier performance scorecards',
                'Logistics and delivery tracking',
                'Demand forecasting visualization',
                'Automated alerts for stockouts and overstocks'
            ],
            demoLink: 'https://app.powerbi.com/your-dashboard-link'
        },
        project5: {
            title: 'Customer Analytics Dashboard',
            image: './images/supply-chain-dashboard.svg',
            description: 'Customer segmentation and analytics platform that provides insights into customer lifetime value, churn risk, and purchasing patterns. The dashboard helped marketing improve campaign targeting and increase customer retention.',
            features: [
                'RFM (Recency, Frequency, Monetary) segmentation',
                'Customer lifetime value calculation',
                'Churn risk prediction model',
                'Purchase pattern analysis',
                'Campaign performance tracking'
            ],
            demoLink: 'https://app.powerbi.com/your-dashboard-link'
        },
        project6: {
            title: 'Risk Management Dashboard',
            image: './images/supply-chain-dashboard.svg',
            description: 'Enterprise risk management solution that tracks risk assessments, mitigation actions, and compliance status across the organization. The dashboard provided executives with a single view of enterprise risks and their mitigation progress.',
            features: [
                'Risk heat map visualization',
                'Mitigation action tracking',
                'Compliance status monitoring',
                'Risk appetite indicators',
                'Automated risk reporting'
            ],
            demoLink: 'https://app.powerbi.com/your-dashboard-link'
        }
    };
    
    // Open modal with project details
    viewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const projectId = this.getAttribute('data-project');
            const project = projects[projectId];
            
            if (project) {
                modalTitle.textContent = project.title;
                modalImage.src = project.image;
                modalImage.alt = project.title;
                modalDescription.textContent = project.description;
                
                // Clear existing features
                modalFeatures.innerHTML = '';
                
                // Add new features
                project.features.forEach(feature => {
                    const li = document.createElement('li');
                    li.textContent = feature;
                    modalFeatures.appendChild(li);
                });
                
                
                
                // Show modal
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal when clicking outside
    liveDemoBtn.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
});