$('#loginButton').on('click', () => {
    let userId = $('#idPlace').val();
    let userPassword = $('#passwordPlace').val();
    
    if (userId.length == 0 || userPassword.length == 0) {
        alert('ID나 비밀번호를 입력하지 않았습니다!')
    }
    else {
        $.ajax({
            type: "POST",
            crossDomain: true,
            url: "/login/loginProcess",
            data: {
                "id": userId,
                "password": userPassword
            },
            success: (result) => {
                if (result == "success") {
                    window.location.href = '/buildings'
                }
                else if (result == "no data") {
                    alert('회원정보가 없습니다.\n회원가입을 먼저 해주세요!')
                }
                else if (result == "check again") {
                    alert('정보가 일치하지 않습니다!')
                }
            },
            error: (request, status, error) => {
                console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error)
            }
        })
    }
})