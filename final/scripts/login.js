// Path to the CSV file containing user credentials
const csvFilePath = '/final/files/credentials.csv';

// Function to fetch user data from the CSV file and parse it
async function fetchUsers() {
    try {
        const response = await fetch(csvFilePath); // Fetch the CSV file
        if (!response.ok) {
            throw new Error(`Failed to fetch user credentials CSV file at path ${csvFilePath}`);
        }
        const text = await response.text();

        // Split text into lines
        const lines = text.trim().split('\n');
        const headers = lines[0].split(',');

        // Remove header line
        lines.shift();

        // Parse CSV data into user objects
        const users = lines.map(line => {
            const values = line.trim().split(',');
            const user = {};
            headers.forEach((header, index) => {
                user[header.trim()] = values[index].trim();
            });
            return user;
        });

        return users; // Return parsed user data
    } catch (error) {
        console.error(`Error fetching users from CSV file: ${error.message}`);
        return [];
    }
}

// Function to handle the login form submission
async function handleLogin(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Retrieve form values
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const rememberMe = document.getElementById('rememberMe').checked;

    // Fetch user data from the CSV file
    const users = await fetchUsers();

    // Find a user with matching username, password, and active status
    const user = users.find(user =>
        user.username === username &&
        user.password === password &&
        user.active.toLowerCase() === 'active'
    );

    if (user) {
        console.log('Login successful for user:', user);

        // Remember Me: Store credentials in local storage if checked
        if (rememberMe) {
            localStorage.setItem('rememberMe', 'true');
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
        } else {
            localStorage.removeItem('rememberMe');
            localStorage.removeItem('username');
            localStorage.removeItem('password');
        }

        // Redirect to homepage.html
        window.location.href = '/final/html/homepage.html';

        // Token feature (Commented Out)
        /*
        // Send token to user's phone
        const sendTokenResponse = await sendTokenToUser(user.phoneNumber);
        if (sendTokenResponse.ok) {
            // Hide login form and show token form
            document.getElementById('loginForm').style.display = 'none';
            document.getElementById('tokenForm').style.display = 'block';
        } else {
            alert('Failed to send token. Please try again.');
        }
        */
    } else {
        alert('Invalid username or password.');
    }
}

// Token feature (Commented Out)
/*
// Function to send token to user's phone
async function sendTokenToUser(phoneNumber) {
    const response = await fetch('/api/send-token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }), // Convert phone number to JSON
    });
    return response;
}

// Function to handle the token form submission
async function handleTokenVerification(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Retrieve token value
    const token = document.getElementById('token').value.trim();

    // Verify the token
    const response = await fetch('/api/verify-token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }), // Convert token to JSON
    });

    const data = await response.json();
    if (response.ok) {
        window.location.href = '/html/homepage.html'; // Redirect to homepage on successful token verification
    } else {
        alert('Invalid token. Please try again.');
    }
}
*/

// Function to toggle password visibility
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    const icon = togglePassword.querySelector('img');
    icon.src = type === 'password' ? '/final/images/eye_slash_icon.svg' : '/final/images/eye_icon.svg';
}

// Function to load remembered credentials
function loadRememberedCredentials() {
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    if (rememberMe) {
        const username = localStorage.getItem('username');
        const password = localStorage.getItem('password');
        document.getElementById('username').value = username;
        document.getElementById('password').value = password;
        document.getElementById('rememberMe').checked = true;
    }
}

// Attach event listeners
document.getElementById('loginForm').addEventListener('submit', handleLogin);
document.getElementById('togglePassword').addEventListener('click', togglePasswordVisibility);
document.addEventListener('DOMContentLoaded', loadRememberedCredentials);

// Token feature (Commented Out)
// document.getElementById('tokenForm').addEventListener('submit', handleTokenVerification);

// Forgot Password feature (Commented Out)
// document.getElementById('forgotPasswordLink').addEventListener('click', openPasswordResetPopup);
// document.getElementById('passwordResetForm').addEventListener('submit', handlePasswordResetRequest);