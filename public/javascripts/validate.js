function validation() {
	var first_name = document.getElementById('first_name').value
	var last_name = document.getElementById('last_name').value
	var username = document.getElementById('username').value
	var email = document.getElementById('email').value;
	var password = document.getElementById('password').value;

	var invalid = 0;

	var errorValidate = "Errors in Creating your Account:\n";

	if(username == "") {
		errorValidate += "Username is Required\n"
	}
	else if(username.length <= 7) {
		errorValidate += "Please input 8 or more Characters to Username\n"
	}
	else {
		invalid++;
	}

	if (username != "") {
		if(checkUserName() == false) {
			errorValidate += "Please input letters only to Username\n";
		}
		else {
			invalid++;	
		}	
	}
	else {
		invalid++;
	}

	if(invalid == 2) {
		return true;
		invalid = 0;
	}
	else {
		alert(errorValidate);
		return false;
		invalid = 0;
		errorValidate = "Please fill out all the Required fields\n";
	}
}

function checkUserName() {
    var username = document.getElementById("username").value;
    var pattern = new RegExp(/[~.`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?0123456789]/); //unacceptable chars
    if (pattern.test(username)) {
        return false;
    }
    return true; //good user input
}

if (window.location.pathname === '/tedtalkslist') {

	fetch('api/v1/list/count').then(function(res){
				res.json().then(function(count){
					console.log('count', count)
					var banner = document.getElementById('banner-description');
					banner.innerHTML = 'There are ' + count.count + ' tutorials available to watch!';
				});
			});
	}
