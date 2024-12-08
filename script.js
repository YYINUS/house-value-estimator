// Selectors
const titleContainer = document.getElementById('title-container');
const formContainer = document.getElementById('form-container');
const startBtn = document.getElementById('start-btn');
const slides = document.querySelectorAll('.slide');
const nextBtns = document.querySelectorAll('.next-btn');
const prevBtns = document.querySelectorAll('.prev-btn');
const finalValue = document.getElementById('final-value');

let currentSlide = 0; // Tracks current slide

// Function to show a specific slide
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}


// Add event listener for basement selection
document.getElementById('BsmtQual').addEventListener('change', function () {
    const bsmtSFContainer = document.getElementById('bsmtSF-container');
    const nextButton = document.querySelector('.next-btn');

    if (this.value === '1') {
        // Show square footage input for "Yes"
        bsmtSFContainer.classList.remove('hidden');
        nextButton.disabled = true; // Disable "Next" until valid input is provided
    } else {
        // Hide square footage input for "No"
        bsmtSFContainer.classList.add('hidden');
        document.getElementById('BsmtSF').value = ''; // Clear input
        nextButton.disabled = false; // Enable "Next" for "No"
    }
});

// Add event listener for square footage input validation
document.getElementById('BsmtSF').addEventListener('input', function () {
    const nextButton = document.querySelector('.next-btn');
    if (this.value && parseInt(this.value) >= 0) {
        nextButton.disabled = false; // Enable "Next" if valid input
    } else {
        nextButton.disabled = true; // Disable "Next" if invalid input
    }
});


document.querySelector('.next-btn').addEventListener('click', function () {
    const yearInput = document.getElementById('yearRemodAdd');
    const errorSpan = document.getElementById('yearError');
    const year = parseInt(yearInput.value, 10);

    // Check if the input value is within the valid range
    if (year < 1900 || year > 2025 || isNaN(year)) {
        errorSpan.textContent = 'Please enter a year between 1900 and 2025.';
    } else {
        errorSpan.textContent = ''; // Clear the error message if valid
        // Proceed to the next slide (if you have a slide navigation function)
    }
});


// Start button handler
startBtn.addEventListener('click', () => {
    titleContainer.classList.add('hidden'); // Hide the title container
    formContainer.classList.remove('hidden'); // Show the form
    showSlide(currentSlide); // Show the first slide
});

// Next button handlers
nextBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        if (currentSlide < slides.length - 1) {
            currentSlide++;
            showSlide(currentSlide);
        }
    });
});

// Previous button handlers
prevBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            showSlide(currentSlide);
        }
    });
});

// Handle form submission and show the final result
document.getElementById('houseForm').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission

    // Calculate the result (basic calculation)
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    const estimatedValue = 310895;

    // Show the result
    finalValue.textContent = `$${estimatedValue.toLocaleString()}`;
    showSlide(slides.length - 1); // Go to the final slide
});
