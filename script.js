/**
 * Fluid Page Navigation Logic
 * Handles the fade-out -> switch -> fade-in sequence.
 */
function switchPage(targetId, event) {
    if (event) event.preventDefault();

    // 1. Find the currently active page
    const activePage = document.querySelector('.page-content:not(.hidden)');
    const targetPage = document.getElementById(targetId);

    // If clicking the link for the page we are already on, do nothing
    if (activePage === targetPage) return;

    // 2. FADE OUT Current Page
    if (activePage) {
        // Add opacity-0 and translate to trigger the CSS transition
        activePage.classList.add('opacity-0', 'translate-y-4');
        
        // Wait for transition to finish (500ms matches CSS duration)
        setTimeout(() => {
            activePage.classList.add('hidden');
            
            // 3. SHOW & FADE IN Target Page
            if (targetPage) {
                targetPage.classList.remove('hidden');
                
                // Slight delay to ensure the browser registers the removal of 'hidden'
                // before removing opacity-0, triggering the fade-in
                requestAnimationFrame(() => {
                    // Force a reflow
                    void targetPage.offsetWidth; 
                    targetPage.classList.remove('opacity-0', 'translate-y-4');
                });
                
                // Scroll to top smoothly
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }, 500); 
    } else {
        // Fallback for initial load if no page is active (rare)
        if (targetPage) {
            targetPage.classList.remove('hidden', 'opacity-0', 'translate-y-4');
        }
    }
}

/**
 * Modal Logic
 * Handles smooth backdrop fade and content scaling
 */
function toggleModal(show, event) {
    if (event) event.preventDefault();
    
    const modal = document.getElementById('info-modal');
    const modalContent = document.getElementById('modal-content');

    if (show) {
        // Show container
        modal.classList.remove('pointer-events-none');
        modal.classList.remove('opacity-0');
        // Scale up content
        modalContent.classList.remove('scale-95');
        modalContent.classList.add('scale-100');
    } else {
        // Fade out container
        modal.classList.add('opacity-0');
        modal.classList.add('pointer-events-none');
        // Scale down content
        modalContent.classList.remove('scale-100');
        modalContent.classList.add('scale-95');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.spotlight-card');

    cards.forEach(card => {
        card.onmousemove = e => {
            // Get the bounding rectangle of the card
            const rect = card.getBoundingClientRect();
            
            // Calculate mouse position relative to the card
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Set the CSS variables for this specific card
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        };
    });
});
