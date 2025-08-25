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
            image: './images/orange.jpg',
            description: 'This interactive dashboard provides comprehensive sales analytics with key performance indicators, regional performance breakdowns, and trend analysis. The solution helped the sales team identify underperforming regions and optimize their strategies.',
            features: [
                'Dynamic KPI cards with most important sales indicators',
                'Top selling products based on the product category',
                'Sales breakdown based on product category',
                'Product category performance breakdown',
                'Top customers and their information based on the total number of orders'
            ],
            demoLink: 'https://app.powerbi.com/your-dashboard-link'
        },
        project2: {
            title: 'Annual Financial Dashboard',
            image: './images/snap1.jpg',
            description: 'A comprehensive financial reporting solution that consolidates data from multiple systems to provide real-time insights into revenue, orders, number of customers, and cost. The dashboard helped reduce financial reporting time by 70%.',
            features: [
                'Consolidated P&L statement with variance analysis',
                'Cash flow tracking with forecasting',
                'Budget vs. actual comparisons',
                'comparison of key financial indicators with previous month',
                'Automated data refresh from ERP system'
            ],
            demoLink: 'https://app.powerbi.com/your-dashboard-link'
        },
        project3: {
            title: 'Summarized sales analytics',
            image: './images/digikala1.jpg',
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
            image: './images/baam1.jpg',
            description: 'End-to-end supply chain visibility solution that tracks inventory levels, supplier performance, logistics metrics, and demand forecasting. The dashboard helped reduce inventory carrying costs by 15% and improve on-time deliveries.',
            features: [
                'Inventory turnover and days on hand analysis',
                'breakdown of customers based on occupation',
                'Top customers based on orders',
                'Demand forecasting visualization',
                'breakdown of sales based on country'
            ],
            demoLink: 'https://app.powerbi.com/your-dashboard-link'
        },
        project5: {
            title: 'Executive Dashboard',
            image: './images/bazaar1.jpg',
            description: 'This dashboard gives a broad overview of top business indicator which in this case is a app platform called Bazaar. The dashboard helps executives get the general idea of diffrent part of the business performance.',
            features: [
                'Top business Indicators including Downloads, Revenue, Cost and Profit',
                'Conversion of customers',
                'Segmentation of downloads per country',
                'Total downloads per month and year',
                'Marketing Campaign performance tracking'
            ],
            demoLink: 'https://app.powerbi.com/your-dashboard-link'
        },
        project6: {
            title: 'Customer Analytics',
            image: './images/hiweb1.jpg',
            description: 'Customer analytics that tracks total custoemrs, total orders, profits and average order value. The dashboard provided executives with a single view of enterprise customer analysis.',
            features: [
                'Customer trends per month and per year',
                'Tracking total orders and customers',
                'Tracking total orders and customers',
                'Filtering total customers and toral order per month and per year',
                'Filtering total profit and average order per month and per year'
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