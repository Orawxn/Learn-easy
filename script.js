// User data storage (in a real app, you'd use a database)
let users = [];

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
document.querySelector('.form-box.register .btn').addEventListener('click', function(event) {
    event.preventDefault();
    const email = document.querySelector('.form-box.register input[type="email"]').value;
    const username = document.querySelector('.form-box.register input[type="text"]').value;
    const password = document.querySelector('.form-box.register input[type="password"]').value;

    if (users.some(user => user.username === username)) {
        alert('Username already taken.');
    } else {
        users.push({ email, username, password });
        alert('Registered Successfully!');
        container.classList.remove('active'); // Switch back to login form after registration
    }
});

// Handle login
document.querySelector('.form-box.login .btn').addEventListener('click', function(event) {
    event.preventDefault();
    const username = document.querySelector('.form-box.login input[type="text"]').value;
    const password = document.querySelector('.form-box.login input[type="password"]').value;

    const user = users.find(user => user.username === username);

    if (user && user.password === password) {
        alert('Login Successfully!');
        window.location.href = 'course.html'; // Navigate to course.html
    } else {
        alert('Invalid username or password.');
    }
});