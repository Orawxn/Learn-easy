// Get the container that holds the forms
const container = document.querySelector('.container');

// Toggle to show register form
document.querySelector('.register-btn').addEventListener('click', function() {
    container.classList.add('active'); // Add class to show register form
});

// Toggle to show login form
document.querySelector('.login-btn').addEventListener('click', function() {
    container.classList.remove('active'); // Remove class to show login form
});

// Handle registration
document.querySelector('.form-box.register .btn').addEventListener('click', async function(event) {
    event.preventDefault();
    const email = document.querySelector('.form-box.register input[type="email"]').value;
    const username = document.querySelector('.form-box.register input[type="text"]').value;
    const password = document.querySelector('.form-box.register input[type="password"]').value;

    const response = await fetch('https://urban-tribble-5ggp94qwvvq5fvxj-3000.app.github.dev/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password }),
    });

    const data = await response.json();
    if (response.ok) {
        alert(data.message);
        container.classList.remove('active'); // Switch back to login form after registration
    } else {
        alert(data.message);
    }
});

// Handle login
document.querySelector('.form-box.login .btn').addEventListener('click', async function(event) {
    event.preventDefault();
    const username = document.querySelector('.form-box.login input[type="text"]').value;
    const password = document.querySelector('.form-box.login input[type="password"]').value;

    const response = await fetch('https://urban-tribble-5ggp94qwvvq5fvxj-3000.app.github.dev/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
        alert(data.message);
        window.location.href = 'course.html'; // Navigate to course.html
    } else {
        alert(data.message);
    }
});