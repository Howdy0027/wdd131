// Function to open the password reset popup modal
function openPasswordResetPopup(event) {
    event.preventDefault(); // Prevent default link behavior
    const modal = document.getElementById('passwordResetPopup');
    modal.style.display = 'flex'; // Show the modal
}

// Function to close the password reset popup modal
function closePasswordResetPopup() {
    const modal = document.getElementById('passwordResetPopup');
    modal.style.display = 'none'; // Hide the modal
}

// Function to handle password reset requests
async function handlePasswordResetRequest(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Retrieve the email address from the form
    const email = document.getElementById('email').value.trim();

    // Check if an email was provided
    if (!email) {
        alert('Please enter your email address.');
        return;
    }

    // Create request options for sending a POST request to the backend API
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }), // Convert email to JSON
    };

    try {
        // Send a POST request to the backend API endpoint
        const response = await fetch('/api/password-reset', requestOptions);

        // Parse the JSON response from the server
        const data = await response.json();

        // Check if the response was successful
        if (response.ok) {
            // Display a success message
            alert(data.message);
            // Close the password reset popup
            closePasswordResetPopup();
        } else {
            // Display an error message
            alert(data.error || 'Failed to send password reset request.');
        }
    } catch (error) {
        // Handle any errors that occurred during the fetch request
        console.error('Error handling password reset request:', error);
        alert('An error occurred while sending the password reset request. Please try again later.');
    }
}

// Attach event listener to the "Forgot Password?" link
document.getElementById('forgotPasswordLink').addEventListener('click', openPasswordResetPopup);

// Attach event listener to the form submission
document.getElementById('passwordResetForm').addEventListener('submit', handlePasswordResetRequest);