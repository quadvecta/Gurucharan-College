/**
 * Fluid Page Navigation Logic
 * Handles the fade-out -> switch -> fade-in sequence.
 */
function switchPage(targetId, event) {
    if (event) event.preventDefault();

    const activePage = document.querySelector('.page-content:not(.hidden)');
    const targetPage = document.getElementById(targetId);

    if (activePage === targetPage) return;

    if (activePage) {
        activePage.classList.add('opacity-0', 'translate-y-4');
        
        setTimeout(() => {
            activePage.classList.add('hidden');
            if (targetPage) {
                targetPage.classList.remove('hidden');
                requestAnimationFrame(() => {
                    void targetPage.offsetWidth; 
                    targetPage.classList.remove('opacity-0', 'translate-y-4');
                });
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }, 500); 
    } else {
        if (targetPage) {
            targetPage.classList.remove('hidden', 'opacity-0', 'translate-y-4');
        }
    }
}

/**
 * Modal Logic
 */
function toggleModal(show, event) {
    if (event) event.preventDefault();
    
    const modal = document.getElementById('info-modal');
    const modalContent = document.getElementById('modal-content');

    if (show) {
        modal.classList.remove('pointer-events-none');
        modal.classList.remove('opacity-0');
        modalContent.classList.remove('scale-95');
        modalContent.classList.add('scale-100');
    } else {
        modal.classList.add('opacity-0');
        modal.classList.add('pointer-events-none');
        modalContent.classList.remove('scale-100');
        modalContent.classList.add('scale-95');
    }
}

