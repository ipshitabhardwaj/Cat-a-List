document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = loginForm.username.value.trim();
        const password = loginForm.password.value.trim();

        // Check if username and password match any stored user
        const users = getUsersFromStorage();
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            // Store the logged-in user in localStorage
            localStorage.setItem('loggedInUser', JSON.stringify(user));

            // Redirect to index.html or display welcome message
            alert(`Welcome ${user.username} to Cat-a-List!`);
            // Redirect to the main application page (index.html)
            window.location.href = 'index.html';
        } else {
            alert('Invalid username or password. Please try again.');
            loginForm.reset();
        }
    });

    function getUsersFromStorage() {
        // Retrieve users from local storage (if any)
        const usersJson = localStorage.getItem('users');
        return usersJson ? JSON.parse(usersJson) : [];
    }
});
