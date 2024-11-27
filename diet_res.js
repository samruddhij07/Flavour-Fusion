document.getElementById('dietForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const dietInput = document.getElementById('diet-input').value;
    // Save the dietary restrictions (you can use localStorage, a database, etc.)
    localStorage.setItem('dietaryRestrictions', dietInput);

    alert('Your dietary restrictions have been saved!');
    
    document.getElementById('diet-input').value = '';
});

// Function to retrieve dietary restrictions when needed
function getDietaryRestrictions() {
    return localStorage.getItem('dietaryRestrictions') || '';
}