$('.buildingListProperties').on('click', function () {
    let organNum = $(this).find('#buildingNum').text();
    let buildingName = $(this).find('#buildingName').text();
    window.location.href="/devices/?organNum=" + organNum + "&buildingName=" + encodeURIComponent(buildingName) 
});
    