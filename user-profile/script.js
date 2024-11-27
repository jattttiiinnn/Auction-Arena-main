document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById("logout-btn");

    logoutBtn.addEventListener("click", () => {
        // Add logout functionality here
        alert("You have successfully logged out!");
        window.location.href = "login.html"; // Redirect to the login page
    });
});