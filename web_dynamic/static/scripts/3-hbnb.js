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

    $.ajax({
        type: 'POST',
        data: JSON.stringify({}),
        contentType: 'application/json',
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        success: function(data) {
            for (let i = 0; i < data.length; ++i) {
                let place = data[i]
                $('.places').append(
                    `<article>
                        <div class="title_box">
                        <h2>${ place.name }</h2>
                        <div class="price_by_night">${ place.price_by_night }</div>
                        </div>
                        <div class="information">
                        <div class="max_guest">
                            ${ place.max_guest } Guest${place.max_guest != 1 ? 's': ''}</div>
                            <div class="number_rooms">
                                ${ place.number_rooms } Bedroom${ place.number_rooms != 1 ? 's':''}
                            </div>
                            <div class="number_bathrooms">
                                ${ place.number_bathrooms } Bathroom${ place.number_bathrooms != 1 ?'s':''}
                            </div>
                        </div>
                        <div class="description">
                            ${ place.description || 'no description'}
                        </div>
                    </article>`
                )
            }
        }
    })
}))
/*
	<!-- <h1>Places</h1> -->
	{% for place in places %}
	<article>
	  <div class="title_box">
	    <h2>{{ place.name }}</h2>
	    <div class="price_by_night">${{ place.price_by_night }}</div>
	  </div>
	  <div class="information">
	    <div class="max_guest">{{ place.max_guest }} Guest{% if place.max_guest != 1 %}s{% endif %}</div>
            <div class="number_rooms">{{ place.number_rooms }} Bedroom{% if place.number_rooms != 1 %}s{% endif %}</div>
            <div class="number_bathrooms">{{ place.number_bathrooms }} Bathroom{% if place.number_bathrooms != 1 %}s{% endif %}</div>
	  </div>
	  <div class="user">
            <b>Owner:</b> {{ place.user.first_name }} {{ place.user.last_name }}
          </div>
          <div class="description">
	    {{ place.description | safe }}
          </div>
	</article>
	{% endfor %}
    */
