document.getElementById("contactForm").onsubmit = function(event) {
    // event.preventDefault(); // Prevent actual form submission
    alert("Thank you, Your message has been sent.");
    // Get form data
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;

    // Here, you can send this data to your server using an AJAX request (not shown in this simple example)
    

    // Clear the form
    document.getElementById("contactForm").reset();
}