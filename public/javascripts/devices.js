/* device properties */
$('.deviceListProperties').on('click', async function () {
    let deviceNum = $(this).find('#frontDeviceNum').text();
    let device = $(this).find('#frontDevice').text();

    $.ajax({
        type: "POST",
        crossDomain: true,
        url: "/devices/deviceData",
        data: {
            deviceNum: deviceNum,
            device: encodeURIComponent(device)
        },
        success: (result) => {
            if (result.msg == "성공") {
                $('#device').text(device);
                $('#deviceNum').text(deviceNum);
                $('#deviceCapacity').text(result.data.deviceCapacity);
                $('#deviceFunction').text(result.data.deviceFunction);
                $('#deviceInstallCompany').text(result.data.installcompany);
                $('#deviceInstallContact').text(result.data.installcontact);
                $('#deviceLocation').text(result.data.deviceLocation);
                $('#deviceName').text(result.data.deviceName);
                $('#deviceSize').text(result.data.deviceSize);
                $('#deviceTexture').text(result.data.deviceTexture);
                $('#deviceType').text(result.data.deviceType);
                $('#deviceImg').attr("src", "https://sos-homepage-s3.s3.ap-northeast-2.amazonaws.com/" + decodeURIComponent(result.img[1]));
                $('.modal').css('display', 'block');
                $('#content1').css('display', 'block');
                $('#content2').css('display', 'none');
            }
            else if (result.msg == "실패") {
                alert('다시 시도해 주십시오\n', result.data)
            }
            else if (result.msg == "에러") {
                alert('에러발생\n', result.data)
            }
        },
        error: (request, status, error) => {
            console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error)
            alert('문의바랍니다\n', error)
        }
    });
});

/* modal close */
$('.close').on('click', function () {
    $('.modal').css('display', 'none');
});

/* error list */
$('#showErrorList').on('click', function() {
    $('#content1').css('display', 'none');
    $('#content2').css('display', 'block');
});

/* update data from */
$('#setUpdateData').on('click', function () {
    // 버튼 교체
    $('#donotUpdate').css('display', 'block');
    $('#doUpdate').css('display', 'block');
    $('#showErrorList').css('display', 'none');
    $('#setUpdateData').css('display', 'none');

    // table 값 가져오기
    let capacity = $('#deviceCapacity').text();
    let capacityId = $('#deviceCapacity').attr('id');
    let functions =  $('#deviceFunction').text();
    let functionsId =  $('#deviceFunction').attr('id');
    let installCompany =  $('#deviceInstallCompany').text();
    let installCompanyId =  $('#deviceInstallCompany').attr('id');
    let installContact =  $('#deviceInstallContact').text();
    let installContactId =  $('#deviceInstallContact').attr('id');
    let location =  $('#deviceLocation').text();
    let locationId =  $('#deviceLocation').attr('id');
    let name =  $('#deviceName').text();
    let nameId =  $('#deviceName').attr('id');
    let size =  $('#deviceSize').text();
    let sizeId =  $('#deviceSize').attr('id');
    let texture =  $('#deviceTexture').text();
    let textureId =  $('#deviceTexture').attr('id');
    let type =  $('#deviceType').text();
    let typeId =  $('#deviceType').attr('id');

    // input으로 바꾸기
    $('#deviceCapacity').replaceWith($('<input type="text" value="' + capacity + '" id="' + capacityId + '">'));
    $('#deviceFunction').replaceWith($('<input type="text" value="' + functions + '" id="' + functionsId + '">'));
    $('#deviceInstallCompany').replaceWith($('<input type="text" value="' + installCompany + '" id="' + installCompanyId + '">'));
    $('#deviceInstallContact').replaceWith($('<input type="text" value="' + installContact + '" id="' + installContactId + '">'));
    $('#deviceLocation').replaceWith($('<input type="text" value="' + location + '" id="' + locationId + '">'));
    $('#deviceName').replaceWith($('<input type="text" value="' + name + '" id="' + nameId + '">'));
    $('#deviceSize').replaceWith($('<input type="text" value="' + size + '" id="' + sizeId + '">'));
    $('#deviceTexture').replaceWith($('<input type="text" value="' + texture + '" id="' + textureId + '">'));
    $('#deviceType').replaceWith($('<input type="text" value="' + type + '" id="' + typeId + '">'));

});

/* do update */
$('#doUpdate').on('click', function() {
    // input 값 가져오기
    let capacity = $('#deviceCapacity').val();
    let functions =  $('#deviceFunction').val();
    let installCompany =  $('#deviceInstallCompany').val();
    let installContact =  $('#deviceInstallContact').val();
    let location =  $('#deviceLocation').val();
    let name =  $('#deviceName').val();
    let size =  $('#deviceSize').val();
    let texture =  $('#deviceTexture').val();
    let type =  $('#deviceType').val();
    let device = $('#device').text();
    let deviceNum = $('#deviceNum').text();

    $.ajax({
        type: "POST",
        crossDomain: true,
        url: "/devices/updateDate",
        data: {
            device: device,
            deviceNum: deviceNum,
            deviceCapacity: capacity,
            deviceFunction: functions,
            installCompany: installCompany,
            installContact: installContact,
            deviceLocation: location,
            deviceName: name,
            deviceSize: size,
            deviceTexture: texture,
            deviceType: type,
        },
        success: (result) => {
            if (result.msg == "성공") {
                alert('성공적으로 변경되었습니다!')
                window.location.reload();
            }
            else if (result.msg == "실패") {
                alert('다시 시도해 주세요!')
            }
            else if (result.msg == "에러") {
                alert('에러가 발생했습니다!')
            }
        },
        error: (request, status, error) => {
            console.log("code:" + request.status + "\n" + "message:" + request.responseText + "\n" + "error:" + error)
            alert('문의바랍니다\n', error)
        }
    });

});

/* do not update */
$('#donotUpdate').on('click', function() {
     // value 값 가져오기
     let capacity = $('#deviceCapacity').val();
     let capacityId = $('#deviceCapacity').attr('id');
     let functions =  $('#deviceFunction').val();
     let functionsId =  $('#deviceFunction').attr('id');
     let installCompany =  $('#deviceInstallCompany').val();
     let installCompanyId =  $('#deviceInstallCompany').attr('id');
     let installContact =  $('#deviceInstallContact').val();
     let installContactId =  $('#deviceInstallContact').attr('id');
     let location =  $('#deviceLocation').val();
     let locationId =  $('#deviceLocation').attr('id');
     let name =  $('#deviceName').val();
     let nameId =  $('#deviceName').attr('id');
     let size =  $('#deviceSize').val();
     let sizeId =  $('#deviceSize').attr('id');
     let texture =  $('#deviceTexture').val();
     let textureId =  $('#deviceTexture').attr('id');
     let type =  $('#deviceType').val();
     let typeId =  $('#deviceType').attr('id');

      // span으로 바꾸기
    $('#deviceCapacity').replaceWith($('<td id="' + capacityId + '"></td>'));
    $('#deviceFunction').replaceWith($('<td id="' + functionsId + '"></td>'));
    $('#deviceInstallCompany').replaceWith($('<td id="' + installCompanyId + '"></td>'));
    $('#deviceInstallContact').replaceWith($('<span id="' + installContactId + '"></span>'));
    $('#deviceLocation').replaceWith($('<td id="' + locationId + '"></td>'));
    $('#deviceName').replaceWith($('<span id="' + nameId + '"></span>'));
    $('#deviceSize').replaceWith($('<span id="' + sizeId + '"></span>'));
    $('#deviceTexture').replaceWith($('<span id="' + textureId + '"></span>'));
    $('#deviceType').replaceWith($('<span id="' + typeId + '"></span>'));

    // 버튼 교체
    $('#donotUpdate').css('display', 'none');
    $('#doUpdate').css('display', 'none');
    $('#showErrorList').css('display', 'block');
    $('#setUpdateData').css('display', 'block');

    // 값 넣기
    $('#deviceCapacity').text(capacity);
    $('#deviceFunction').text(functions);
    $('#deviceInstallCompany').text(installCompany);
    $('#deviceInstallContact').text(installContact);
    $('#deviceLocation').text(location);
    $('#deviceName').text(name);
    $('#deviceSize').text(size);
    $('#deviceTexture').text(texture);
    $('#deviceType').text(type);
});