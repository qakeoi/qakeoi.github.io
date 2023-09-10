document.getElementById('loginForm').addEventListener('submit', function(event) {
	event.preventDefault();

	var username = document.getElementById('username').value;
	var password = document.getElementById('password').value;

	// Simpan username dan password yang diinginkan di bawah ini
	var targetUsername = 'admin';
	var targetPassword = '123456';

	if (username === targetUsername && password === targetPassword) {
		document.getElementById('premiumContent').style.display = 'block';
	} else {
		alert('Invalid username or password.');
	}
});


