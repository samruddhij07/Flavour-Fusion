document.getElementById('dietForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const dietInput = document.getElementById('diet-input').value.trim();
    if (dietInput) {
        // Retrieve existing restrictions, or create a new array if none exist
        const existingRestrictions = JSON.parse(localStorage.getItem('dietaryRestrictions')) || [];
        
        // Add the new restriction to the array if it's not already included
        if (!existingRestrictions.includes(dietInput)) {
            existingRestrictions.push(dietInput);
            localStorage.setItem('dietaryRestrictions', JSON.stringify(existingRestrictions));
            alert('Your dietary restriction has been saved!');
        } else {
            alert('This dietary restriction is already saved.');
        }

        // Clear the input field
        document.getElementById('diet-input').value = '';

        // Update the displayed dietary restrictions
        displayDietaryRestrictions();
    } else {
        alert('Please enter a dietary restriction.');
    }
});

// Function to retrieve dietary restrictions when needed
function getDietaryRestrictions() {
    return JSON.parse(localStorage.getItem('dietaryRestrictions')) || [];
}

// Function to display dietary restrictions on the page
function displayDietaryRestrictions() {
    const restrictions = getDietaryRestrictions();
    const displayElement = document.getElementById('restrictions-display');

    if (restrictions.length > 0) {
        displayElement.innerHTML = `<strong>Your dietary restrictions:</strong><ul>${restrictions.map((restriction, index) => `
            <li>
                ${restriction} 
                <button onclick="deleteRestriction(${index})">Delete</button>
            </li>`).join('')}</ul>`;
    } else {
        displayElement.textContent = 'No dietary restrictions saved.';
    }
}

// Function to delete a dietary restriction
function deleteRestriction(index) {
    const restrictions = getDietaryRestrictions();
    restrictions.splice(index, 1); // Remove the restriction at the specified index
    localStorage.setItem('dietaryRestrictions', JSON.stringify(restrictions)); // Update localStorage
    displayDietaryRestrictions(); // Refresh the displayed list
}

// Call the display function when the page loads to show any existing restrictions
window.onload = function() {
    displayDietaryRestrictions();
};