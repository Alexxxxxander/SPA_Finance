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
        $.ajax({
            type: 'GET',
            url: '/api/auth/logout',
            credentials: 'include',
            error: function (){
                alert('Logout failed ');
            }
        });
        $('#main-app').hide();
        $('#auth-form').show();
    });

    function showMainApp() {
        $('#auth-form').hide();
        $('#register-form').hide();
        $('#main-app').show();
        loadOperations();
    }

    $.ajax({
        type: 'GET',
        url: '/api/operations',
        success: function () {
            showMainApp();
        },
        error: function (xhr) {
            if (xhr.status === 401) {
                const Cookies = document.cookie.split(';');
                console.log(Cookies[0]);
                if(Cookies[0].length !== 0){
                    alert('Session expired. Please login again.');
                    window.location.href = '/';
                }
                else{
                }
            } else {
                alert('Error ');
            }
        },
    });

});
