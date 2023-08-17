<script>
  document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from submitting
    if (validateForm()) {
      this.submit(); // If form is valid, submit the form
    }
  });

  function validateForm() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;
    var isValid = true;

    if (name === "") {
      isValid = false;
      alert("Name field is required");
    }

    if (email === "") {
      isValid = false;
      alert("Email field is required");
    } else if (!isValidEmail(email)) {
      isValid = false;
      alert("Please enter a valid email address");
    }

    if (message === "") {
      isValid = false;
      alert("Message field is required");
    }

    return isValid;
  }

  function isValidEmail(email) {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
</script>
