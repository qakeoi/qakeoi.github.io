// This code validates the input data and sends an email when the form is submitted.
$(document).ready(function() {
  $('#submit').click(function() {
    var name = $('#name').val();
    var email = $('#email').val();
    var subject = $('#subject').val();
    var message = $('#message').val();

    if (name == '') {
      alert('Please enter your name.');
      return false;
    }

    if (email == '') {
      alert('Please enter your email address.');
      return false;
    }

    if (!validateEmail(email)) {
      alert('Please enter a valid email address.');
      return false;
    }

    if (subject == '') {
      alert('Please enter a subject.');
      return false;
    }

    if (message == '') {
      alert('Please enter your message.');
      return false;
    }

    // Send the email
    var ajax = new XMLHttpRequest();
    ajax.open('POST', 'mail.php');
    ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    ajax.send('name=' + name + '&email=' + email + '&subject=' + subject + '&message=' + message);

    ajax.onload = function() {
      if (ajax.status == 200) {
        alert('Your message has been sent.');
      } else {
        alert('An error occurred.');
      }
    };
  });
});

// This function validates the email address.
function validateEmail(email) {
  var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}
