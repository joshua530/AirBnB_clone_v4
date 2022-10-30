$(document).ready((function () {
    let amenities = []
    $('input[type=checkbox]').click(function() {
        let checked = $(this).is(':checked')
        let name = $(this).attr('data-name')
        if (checked) {
            amenities.push(name)
        } else {
            amenities = amenities.filter(a => a !== name)
        }
        $('.amenities h4').text(amenities.join(', '))
    })

    $.ajax({
        type: 'GET',
        url: 'http://0.0.0.0:5001/api/v1/status/',
        success: function(data) {
            if (data.status == 'OK') {
                $('#api_status').addClass('available')
            } else {
                $('#api_status').removeClass('available')
            }
        }
    })
}))
