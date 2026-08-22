// Gallery page functionality

// Burger menu toggle
const burgerToggle = document.getElementById('burgerToggle');
const burgerNav = document.getElementById('burgerNav');

if (burgerToggle) {
    burgerToggle.addEventListener('click', function() {
        burgerToggle.classList.toggle('active');
        burgerNav.classList.toggle('active');
    });
}

// Close burger menu when a link is clicked
document.querySelectorAll('.burger-menu-items a').forEach(link => {
    link.addEventListener('click', function() {
        if (burgerToggle) burgerToggle.classList.remove('active');
        if (burgerNav) burgerNav.classList.remove('active');
    });
});

// Close burger menu when clicking outside
document.addEventListener('click', function(event) {
    if (!event.target.closest('.burger-toggle') && !event.target.closest('.burger-nav')) {
        if (burgerToggle && burgerNav) {
            burgerToggle.classList.remove('active');
            burgerNav.classList.remove('active');
        }
    }
});

// Create modal HTML
function initializeModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'imageModal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <span class="modal-nav modal-prev">&#10094;</span>
            <img class="modal-image" src="" alt="">
            <div class="modal-info">
                <h4 id="modalTitle"></h4>
                <p id="modalDescription"></p>
            </div>
            <span class="modal-nav modal-next">&#10095;</span>
        </div>
    `;
    document.body.appendChild(modal);
    return modal;
}

const modal = initializeModal();
const modalImage = modal.querySelector('.modal-image');
const modalTitle = modal.querySelector('#modalTitle');
const modalDescription = modal.querySelector('#modalDescription');
const closeBtn = modal.querySelector('.modal-close');
const prevBtn = modal.querySelector('.modal-prev');
const nextBtn = modal.querySelector('.modal-next');

let currentImageIndex = 0;
let galleryImages = [];

// Get all gallery items
function initializeGallery() {
    galleryImages = Array.from(document.querySelectorAll('.gallery-item')).filter(item => 
        item.style.display !== 'none' && getComputedStyle(item).display !== 'none'
    );
    
    // Remove old listeners
    galleryImages.forEach((item) => {
        item.removeEventListener('click', handleGalleryClick);
    });
    
    // Add click listeners to all visible gallery items
    galleryImages.forEach((item, index) => {
        item.addEventListener('click', handleGalleryClick);
    });
}

// Handle gallery item click
function handleGalleryClick(e) {
    e.preventDefault();
    const index = galleryImages.indexOf(this);
    openModal(index);
}

// Open modal with image
function openModal(index) {
    currentImageIndex = index;
    const item = galleryImages[index];
    const img = item.querySelector('.gallery-img');
    const title = item.querySelector('.image-info h4').textContent;
    const description = item.querySelector('.image-info p').textContent;
    
    modalImage.src = img.src;
    modalImage.alt = img.alt;
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Navigate to next image
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    openModal(currentImageIndex);
}

// Navigate to previous image
function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    openModal(currentImageIndex);
}

// Event listeners
closeBtn.addEventListener('click', closeModal);
nextBtn.addEventListener('click', nextImage);
prevBtn.addEventListener('click', prevImage);

// Close modal when clicking outside the image
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeModal();
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (!modal.classList.contains('active')) return;
    
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'Escape') closeModal();
});

// Initialize gallery on page load
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const tabLinks = document.querySelectorAll('.tab-link');
    const galleryContainer = document.querySelector('.gallery-container');
    const galleryItems = document.querySelectorAll('.gallery-item');

    // --- Hide sketches by default and show only the default tab's items ---
    // Find the default active tab (or fallback to first tab)
    let defaultTab = document.querySelector('.tab-link.active') || tabLinks[0];
    if (defaultTab) {
        const section = defaultTab.getAttribute('data-section');
        tabLinks.forEach(function(t) { t.classList.remove('active'); });
        defaultTab.classList.add('active');
        galleryItems.forEach(function(item) {
            const type = item.getAttribute('data-type');
            if (section === 'illustrations') {
                if (type === 'illustrations' || type === 'illustration') {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            } else if (section === 'sketches' || section === 'kstech') {
                if (type === section || type === section + 's') {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            } else {
                if (type === section || type === section + 's') {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            }
        });
        if (section === 'sketches' || section === 'kstech') {
            galleryContainer.classList.add('sketch-view');
        } else {
            galleryContainer.classList.remove('sketch-view');
        }
    }

    initializeGallery();
    
    tabLinks.forEach(function(tab) {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabLinks.forEach(function(t) { t.classList.remove('active'); });
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Get the section to show
            const section = this.getAttribute('data-section');
            
            // Filter gallery items
            const galleryItems = document.querySelectorAll('.gallery-item');
            galleryItems.forEach(function(item) {
                const type = item.getAttribute('data-type');
                // Show only items matching the tab, with special logic for illustrations and sketches
                if (section === 'illustrations') {
                    // Only show items with data-type exactly 'illustrations' or 'illustration'
                    
                    if (type === 'illustrations' || type === 'illustration') {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                } else if (section === 'sketches' || section === 'kstech') {
                    // Only show items with data-type exactly 'sketches' or 'kstech'
                    if (type === section || type === section + 's') {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                } else {
                    // Default fallback: show items matching section or section+'s'
                    if (type === section || type === section + 's') {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
            
            // Add sketch-view class if sketch tab is active
            if (section === 'sketches' || section === 'kstech') {
                galleryContainer.classList.add('sketch-view');
            } else {
                galleryContainer.classList.remove('sketch-view');
            }
            
            // Reinitialize gallery for modal
            initializeGallery();
        });
    });
    
    // Initialize IKT sections (if present)
    const iktSections = document.querySelectorAll('.ikt-section');
    if (iktSections.length) {
        iktSections.forEach(function(section) {
            const toggle = section.querySelector('.ikt-toggle');
            toggle.addEventListener('click', function() {
                // toggle active on clicked, remove from others
                const isActive = section.classList.contains('active');
                iktSections.forEach(function(s) { s.classList.remove('active'); });
                if (!isActive) section.classList.add('active');
            });
        });
        // Optionally open first by default
        iktSections[0].classList.add('active');
    }
});

// Add scroll animations
window.addEventListener('scroll', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        const itemBottom = item.getBoundingClientRect().bottom;
        
        if (itemTop < window.innerHeight && itemBottom > 0) {
            item.style.opacity = '1';
        }
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
