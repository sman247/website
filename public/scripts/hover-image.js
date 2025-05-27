// public/scripts/hover-image.js
document.addEventListener('DOMContentLoaded', () => {
    // Check if the image container already exists (it should be added by BaseLayout.astro)
    let imageContainer = document.getElementById('image-hover-container');
    let imagePreview;

    // If the container doesn't exist, create and append it.
    // This is a fallback, ideally it's in BaseLayout.astro
    if (!imageContainer) {
        console.warn('Image hover container not found in HTML, creating it dynamically. Consider adding it to your Astro layout for better structure.');
        imageContainer = document.createElement('div');
        imageContainer.id = 'image-hover-container';
        
        const img = document.createElement('img');
        img.id = 'hover-image-preview';
        img.alt = 'Project Preview';
        imageContainer.appendChild(img);
        
        document.body.appendChild(imageContainer);
    }
    
    imagePreview = document.getElementById('hover-image-preview');

    // Safety check: ensure the image preview element exists
    if (!imagePreview) {
        console.error('Image preview element (#hover-image-preview) not found. Please ensure it is part of the #image-hover-container in your HTML or layout.');
        return;
    }
    
    // Select all elements that should trigger an image hover
    const triggers = document.querySelectorAll('.project-link');

    triggers.forEach(trigger => {
        const imageUrl = trigger.dataset.image; // Get the image path from the data-image attribute

        // Safety check: ensure data-image attribute exists
        if (!imageUrl) {
            console.warn('Element found with class "project-link" but no "data-image" attribute:', trigger);
            return; // Skip this trigger if it has no image URL
        }

        trigger.addEventListener('mouseenter', () => {
            if (imagePreview && imageContainer) { // Ensure elements are still valid
                imagePreview.src = imageUrl; // Set the image source
                imageContainer.classList.add('visible'); // Make the container visible with fade
            }
        });

        trigger.addEventListener('mouseleave', () => {
            if (imageContainer) { // Ensure element is still valid
                imageContainer.classList.remove('visible'); // Hide the container with fade
            }
            // Optional: Clear the image src after hiding
            // setTimeout(() => {
            //    if (imagePreview && imageContainer && !imageContainer.classList.contains('visible')) {
            //        imagePreview.src = ''; 
            //    }
            // }, 200); // Match CSS transition time
        });
    });
});
