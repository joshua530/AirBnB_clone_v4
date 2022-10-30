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
}))
