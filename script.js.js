// ==========================================
// NAVIGATION FUNCTIONALITY
// ==========================================

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Sticky Navigation
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==========================================
// MENU FILTERING
// ==========================================

const filterBtns = document.querySelectorAll('.filter-btn');
const menuCards = document.querySelectorAll('.menu-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        
        menuCards.forEach(card => {
            if (filterValue === 'all') {
                card.classList.remove('hidden');
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 10);
            } else {
                if (card.getAttribute('data-category') === filterValue) {
                    card.classList.remove('hidden');
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.classList.add('hidden');
                    }, 300);
                }
            }
        });
    });
});

// ==========================================
// CART FUNCTIONALITY
// ==========================================

const cartPopup = document.getElementById('cartPopup');
const closeCartBtn = document.getElementById('closeCart');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotalElement = document.getElementById('cartTotal');
const addToCartBtns = document.querySelectorAll('.add-to-cart');
const orderBtns = document.querySelectorAll('.order-btn, .btn-offer, .checkout-btn');

let cart = [];

// Add to Cart
addToCartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const name = btn.getAttribute('data-name');
        const price = parseFloat(btn.getAttribute('data-price'));
        
        // Check if item already exists in cart
        const existingItem = cart.find(item => item.name === name);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        
        updateCart();
        showCart();
        
        // Visual feedback
        btn.innerHTML = '<i class="fas fa-check"></i> Added!';
        btn.style.background = '#4CAF50';
        
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-shopping-cart"></i> Add to Order';
            btn.style.background = '';
        }, 1500);
    });
});

// Update Cart Display
function updateCart() {
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartTotalElement.textContent = '$0.00';
        return;
    }
    
    let cartHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        cartHTML += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>Qty: ${item.quantity} × $${item.price.toFixed(2)}</p>
                </div>
                <div>
                    <p class="cart-item-price">$${itemTotal.toFixed(2)}</p>
                    <button class="remove-item" onclick="removeFromCart(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });
    
    cartItemsContainer.innerHTML = cartHTML;
    cartTotalElement.textContent = `$${total.toFixed(2)}`;
}

// Remove from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Show Cart
function showCart() {
    cartPopup.classList.add('active');
}

// Close Cart
closeCartBtn.addEventListener('click', () => {
    cartPopup.classList.remove('active');
});

// Order Now Buttons
orderBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        showCart();
    });
});

// ==========================================
// CONTACT FORM VALIDATION
// ==========================================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (!name || !email || !message) {
        alert('Please fill in all required fields!');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address!');
        return;
    }
    
    // Success message
    alert(`Thank you, ${name}! Your message has been sent successfully. We'll get back to you soon!`);
    
    // Reset form
    contactForm.reset();
});

// ==========================================
// BACK TO TOP BUTTON
// ==========================================

const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('active');
    } else {
        backToTopBtn.classList.remove('active');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==========================================
// SCROLL ANIMATIONS
// ==========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.6s ease';
    observer.observe(section);
});

// ==========================================
// SMOOTH SCROLLING FOR ALL LINKS
// ==========================================

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

// ==========================================
// INITIALIZE ON PAGE LOAD
// ==========================================

window.addEventListener('load', () => {
    // Animate hero content
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        heroContent.style.transition = 'all 1s ease';
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }, 100);
});

console.log('🎉 Brew & Bean Café - Website Loaded Successfully!');
console.log('☕ Enjoy your virtual coffee experience!');