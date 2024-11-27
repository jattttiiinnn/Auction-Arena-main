function showBidInput(productId) {
    const bidInputContainer = document.getElementById(`bid-input-container-${productId}`);
    bidInputContainer.style.display = 'block';
}

// Function to place a bid
function placeBid(productId) {
    const productElement = document.getElementById(`product-${productId}`);
    const currentBidElement = productElement.querySelector('.current-bid');
    const bidInput = document.getElementById(`bid-input-${productId}`);
    const errorMessage = productElement.querySelector('.error-message');

    // Get the current bid and user input
    const currentBid = parseFloat(currentBidElement.textContent);
    const newBid = parseFloat(bidInput.value);

    // Validate the bid
    if (newBid > currentBid) {
        // Update the current bid
        currentBidElement.textContent = newBid.toFixed(2);
        errorMessage.style.display = 'none';
        alert('Bid placed successfully!');
    } else {
        // Show error message
        errorMessage.style.display = 'block';
    }

    // Clear the input field
    bidInput.value = '';
}