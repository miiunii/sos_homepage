$('#loginButton').on('click', () => {
    let userId = $('#idPlace').val();
    let userPassword = $('#passwordPlace').val();
    
    if (userId.length == 0 || userPassword.length == 0) {
        alert('ID나 비밀번호를 입력하지 않았습니다!')
    }
    else {
        $.ajax({
            url: "login/loginProcess",
            dataType: "json",
            data: {
                "id": userId,
                "password": userPassword
            },
            type: "POST",
            success: (result) => {
                if (result.msg == 'success') {
                    window.location.href = '/buildings'
                }
                else {
                    console.log('login proceess error', result.msg)
                    alert('ID나 비밀번호가 다릅니다!')
                }
            },
            error: (request, status, error) => {
                console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error)
            }
        })
    }
})