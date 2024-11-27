// Scroll to specific section
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// Simple form handling (Example, can be extended for further backend integration)
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you for contacting us!');
});

// DOM Elements
const groceryForm = document.getElementById('groceryForm');
const groceryItemInput = document.getElementById('groceryItem');
const groceryQuantityInput = document.getElementById('groceryQuantity');
const groceryList = document.getElementById('groceryList');

// Load items from localStorage
document.addEventListener('DOMContentLoaded', loadGroceries);

// Handle Form Submission
groceryForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const item = groceryItemInput.value;
    const quantity = groceryQuantityInput.value;

    if (item && quantity) {
        const groceryItem = {
            id: Date.now(),
            item,
            quantity
        };
        
        // Save the new item
        addGrocery(groceryItem);

        // Clear inputs
        groceryItemInput.value = '';
        groceryQuantityInput.value = '';
    }
});

// Add grocery item to the list and localStorage
function addGrocery(groceryItem) {
    const li = document.createElement('li');
    li.dataset.id = groceryItem.id;
    li.innerHTML = `
        ${groceryItem.item} (x${groceryItem.quantity})
        <span>
            <button class="edit-btn" onclick="editGrocery(${groceryItem.id})">Edit</button>
            <button class="delete-btn" onclick="deleteGrocery(${groceryItem.id})">Delete</button>
        </span>
    `;
    
    groceryList.appendChild(li);

    saveGroceryToLocalStorage(groceryItem);
}

// Save grocery item to localStorage
function saveGroceryToLocalStorage(groceryItem) {
    let groceries = JSON.parse(localStorage.getItem('groceries')) || [];
    groceries.push(groceryItem);
    localStorage.setItem('groceries', JSON.stringify(groceries));
}

// Load groceries from localStorage
function loadGroceries() {
    const groceries = JSON.parse(localStorage.getItem('groceries')) || [];
    groceries.forEach(groceryItem => addGrocery(groceryItem));
}

// Delete grocery item
function deleteGrocery(id) {
    const li = document.querySelector(`li[data-id='${id}']`);
    groceryList.removeChild(li);

    let groceries = JSON.parse(localStorage.getItem('groceries'));
    groceries = groceries.filter(groceryItem => groceryItem.id !== id);
    localStorage.setItem('groceries', JSON.stringify(groceries));
}

// Edit grocery item
function editGrocery(id) {
    const groceries = JSON.parse(localStorage.getItem('groceries'));
    const groceryItem = groceries.find(item => item.id === id);

    groceryItemInput.value = groceryItem.item;
    groceryQuantityInput.value = groceryItem.quantity;

    deleteGrocery(id); // Remove from list so it can be added again after editing
}