function startCountdown(element) {
    // Parse hours, minutes, seconds from element's innerHTML
    const [hours, minutes, seconds] = element.innerHTML.split(':').map(Number);
    let remainingTime = hours * 3600 + minutes * 60 + seconds;
  
    function updateTimer() {
      if (remainingTime <= 0) {
        element.innerHTML = "00:00:00";
        clearInterval(intervalId);
        return;
      }
  
      // Calculate hours, minutes, and seconds
      const hrs = Math.floor(remainingTime / 3600);
      const mins = Math.floor((remainingTime % 3600) / 60);
      const secs = remainingTime % 60;
  
      // Update element's innerHTML with formatted time
      element.innerHTML = `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  
      remainingTime -= 1;
    }
  
    // Update the timer every second
    const intervalId = setInterval(updateTimer, 1000);
    updateTimer(); // Initial call to set immediate display
  }
  
  // Initialize all timers
document.querySelectorAll(".bid-timer").forEach(startCountdown);
  