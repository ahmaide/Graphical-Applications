document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const url = card.getAttribute('data-url');
            
            // Add a quick "active" scale effect
            card.style.transform = "scale(0.95)";
            
            // Short delay to let the animation play, then redirect
            setTimeout(() => {
                window.location.href = url;
            }, 150);
        });
    });
});