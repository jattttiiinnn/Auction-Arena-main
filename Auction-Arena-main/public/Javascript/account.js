document.getElementById('loginForm').addEventListener('submit', function(event) {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simple client-side validation
    if (!email || !password) {
        alert('Please fill in both fields');
        event.preventDefault(); // prevent form submission if validation fails
    }

    // Further backend validation will happen after form submission
});
