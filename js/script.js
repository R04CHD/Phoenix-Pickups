document.addEventListener('DOMContentLoaded', () => {
    const acquireButtons = document.querySelectorAll('.btn-metal');
    // Targeting the correct name attribute from your HTML
    const contactSelect = document.querySelector('select[name="pickup-model"]');

    acquireButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Check if button is inside a card (to avoid triggering on the form submit button)
            const card = button.closest('.card');
            if (!card) return; 

            e.preventDefault();

            // 1. Get the pickup name and scrub it for bulletproof matching
            // We remove apostrophes and trim spaces to avoid mismatching "SCREAMIN' SEAMAN"
            const rawName = card.querySelector('h3').innerText;
            const cleanPickupName = rawName.replace(/'/g, "").trim().toUpperCase();

            // 2. Find the contact section
            const contactSection = document.getElementById('contact');
            
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });

                // 3. Update the select menu
                if (contactSelect) {
                    for (let i = 0; i < contactSelect.options.length; i++) {
                        // Scrub the option text the same way as the pickup name
                        const optionText = contactSelect.options[i].text.replace(/'/g, "").toUpperCase();
                        
                        if (optionText.includes(cleanPickupName)) {
                            contactSelect.selectedIndex = i;
                            
                            // Optional: Flash the select box to show the user it changed
                            contactSelect.style.borderColor = 'var(--electric-red)';
                            setTimeout(() => {
                                contactSelect.style.borderColor = '#222';
                            }, 1000);
                            
                            break;
                        }
                    }
                }
            }
        });
    });
});