// Script.js

// Tab functionality
function showTab(tabId) {
    const tabs = document.querySelectorAll('.tab');
    const buttons = document.querySelectorAll('.tab-btn');
  
    tabs.forEach(tab => tab.classList.remove('active'));
    buttons.forEach(btn => btn.classList.remove('active'));
  
    document.getElementById(tabId).classList.add('active');
    document.querySelector(`[onclick="showTab('${tabId}')"]`).classList.add('active');
  }
  
  // Profile Picture Upload
  const editPhotoBtn = document.getElementById('edit-photo-btn');
  const uploadPhotoInput = document.getElementById('upload-photo');
  const profileImg = document.getElementById('profile-img');
  
  editPhotoBtn.addEventListener('click', () => {
    uploadPhotoInput.click();
  });
  
  uploadPhotoInput.addEventListener('change', () => {
    const file = uploadPhotoInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        profileImg.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  });

// Function to handle "Change Password"
function changePassword() {
    // Redirect to Change Password page or open a modal
    window.location.href = "/change-password"; // Example route
  }
  
  // Function to handle "Manage Payment Methods"
  function managePaymentMethods() {
    // Redirect to Manage Payment Methods page or open a modal
    window.location.href = "/payment-methods"; // Example route
  }
  
  // Function to handle "Notification Preferences"
  function notificationPreferences() {
    // Redirect to Notification Preferences page or open a modal
    window.location.href = "/notification-preferences"; // Example route
  }
  
  // Function to handle "Logout"
  function logout() {
    // Perform logout logic, e.g., API call to logout endpoint
    fetch('/logout', {
      method: 'POST',
      credentials: 'include', // Send cookies with the request
    })
      .then(response => {
        if (response.ok) {
          // Redirect to login page
          window.location.href = "/login";
        } else {
          alert("Logout failed. Please try again.");
        }
      })
      .catch(error => console.error('Error:', error));
  }
  