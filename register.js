document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const newUsername = registerForm['new-username'].value.trim();
        const newPassword = registerForm['new-password'].value.trim();

        // Check if the username is already taken (in a real application, this would query a database)
        if (isUsernameTaken(newUsername)) {
            alert('Username is already taken. Please choose another.');
            registerForm.reset();
            return;
        }

        // Save new user in local storage (for demo purposes, use a secure storage solution in production)
        const newUser = { username: newUsername, password: newPassword };
        saveUser(newUser);

        alert('Registration successful! You can now login.');
        registerForm.reset();
        // Optionally redirect to login page
        window.location.href = 'login.html';
    });

    function isUsernameTaken(username) {
        // Check if username is already stored in local storage (for demo purposes)
        const users = getUsersFromStorage();
        return users.some(user => user.username === username);
    }

    function saveUser(user) {
        // Retrieve existing users from storage (if any) and add the new user
        const users = getUsersFromStorage();
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }

    function getUsersFromStorage() {
        // Retrieve users from local storage (if any)
        const usersJson = localStorage.getItem('users');
        return usersJson ? JSON.parse(usersJson) : [];
    }
});
