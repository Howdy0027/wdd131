document.addEventListener('DOMContentLoaded', () => {
    // Attach event listeners
    document.getElementById('logoutButton').addEventListener('click', handleLogout);
    document.getElementById('hamburger').addEventListener('click', toggleNavbar);
});

// Function to handle user logout
function handleLogout() {
    // Clear user session data if any (e.g., local storage, cookies)
    console.log('Logging out...');
    alert('You have been logged out.');
    window.location.href = '/final/html/login.html'; // Redirect to the login page
}

// Function to toggle the navigation bar
function toggleNavbar() {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('collapsed');
}