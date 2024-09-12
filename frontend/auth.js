$(document).ready(function () {
    $('#showRegister').click(function () {
        $('#auth-form').hide();
        $('#register-form').show();
    });

    $('#showLogin').click(function () {
        $('#register-form').hide();
        $('#auth-form').show();
    });

    $('#loginForm').submit(function (e) {
        e.preventDefault();
        const loginData = {
            login: $('#login').val(),
            password: $('#password').val(),
        };
        $.ajax({
            type: 'POST',
            url: '/api/auth/login',
            data: JSON.stringify(loginData),
            credentials: 'include',
            contentType: 'application/json',
            success: function () {
                showMainApp();
            },
            error: function () {
                alert('Login failed');
            },
        });
    });

    $('#registerForm').submit(function (e) {
        e.preventDefault();
        const registerData = {
            login: $('#newLogin').val(),
            password: $('#newPassword').val(),
        };
        $.ajax({
            type: 'POST',
            url: '/api/auth/register',
            data: JSON.stringify(registerData),
            credentials: 'include',
            contentType: 'application/json',
            success: function (response) {
                showMainApp();
            },
            error: function () {
                alert('Registration failed');
            },
        });
    });

    $('#logoutButton').click(function () {
        localStorage.removeItem('token');
        $('#main-app').hide();
        $('#auth-form').show();
    });

    function showMainApp() {
        $('#auth-form').hide();
        $('#register-form').hide();
        $('#main-app').show();
        loadOperations();
    }

});
