$(document).ready(function() {
  $('#loginButton').click(function() {
    var username = $('#username').val();
    var password = $('#password').val();

    if (username === "admin" && password === "pass") {
      $('#content').removeClass("hidden");
    } else {
      alert("Username or password is incorrect!");
    }
  });
});
