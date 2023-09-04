window.onload = function() {
    document.getElementById("contact-form").addEventListener("submit", function(event){
      event.preventDefault(); // Prevent form submission
      sendEmail(); // Call function to send email
    });
  }
  
  function sendEmail() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;
    
    // Send the form data to send-email.php using AJAX request
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "send-email.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // Display success message or handle any errors
        if (xhr.responseText) {
          alert(xhr.responseText);
        } else {
          alert("Email sent successfully!");
        }
      }
    };
    xhr.send("name=" + name + "&email=" + email + "&message=" + message);
  }
