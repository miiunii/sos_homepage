$('#loginButton').on('click', () => {
    let userId = $('#idPlace').val();
    let userPassword = $('#passwordPlace').val();
    
    if (userId.length == 0 || userPassword.length == 0) {
        alert('ID나 비밀번호를 입력하지 않았습니다!')
    }
    else {
        $.ajax({
            headers: {
                "Content-Type": "application/json"
            },
            url: "https://lgri839rll.execute-api.ap-northeast-2.amazonaws.com/complete/building/login",
            dataType: "json",
            data: {
                "id": userId
            },
            type: "POST",
            success: (result) => {
              console.log(result)
            },
            error: (request, status, error) => {
                console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error)
            }
        })
    }
})