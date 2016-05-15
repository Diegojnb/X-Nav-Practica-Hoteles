$(document).ready(function(){

	/*popup = L.popup();*/
	mymap = L.map('mapid').setView([40.2838, -3.8215], 13);

	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(mymap);
/*
	function onMapClick(e) {
			    popup
							.setLatLng(e.latlng)
			        .setContent("You clicked the map at " + e.latlng.toString())
			        .openOn(mymap);
		}mymap.on('click', onMapClick);

	function onLocationFound(e) {

		var radius = e.accuracy / 2;
		L.marker(e.latlng).addTo(mymap)
			.bindPopup("You are within " + radius + " meters from this point").openPopup();
		L.circle(e.latlng, radius).addTo(mymap);
	}mymap.on('locationfound', onLocationFound);

	function onLocationError(e) {
		alert(e.message);
	}

	mymap.on('locationerror', onLocationError);
	mymap.on('click', onMapClick);*/
	mymap.locate({setView: true, maxZoom: 16});

	$('.window').click(function (e) {
	  $(this).tab('show')
	})

  function show_accomodation(){
    var accomodation = accomodations[$(this).attr('no')];
    var lat = accomodation.geoData.latitude;
    var lon = accomodation.geoData.longitude;
    var url = accomodation.basicData.web;
    var name = accomodation.basicData.name;
    var desc = accomodation.basicData.body;
    var img = accomodation.multimedia.media[0].url;
    var cat = accomodation.extradata.categorias.categoria.item[1]['#text'];
    var subcat = accomodation.extradata.categorias.categoria
     .subcategorias.subcategoria.item[1]['#text'];
    L.marker([lat, lon]).addTo(map)
  	 .bindPopup('<a href="' + url + '">' + name + '</a><br/>')
  	 .openPopup();
    map.setView([lat, lon], 15);
    $('#desc').html('<h2>' + name + '</h2>'
     + '<p>Type: ' + cat + ', subtype: ' + subcat + '</p>'
     + desc + '<img src="' + img + '"">');
  };

  $("#cargarJ").click(function() {
    $.getJSON("json/alojamientos.json")
    .done(function(data){
      alojamientos = data.serviceList.service;

      $("#listahoteles").empty();
      var inner = $("#listahoteles").html();

      inner += "<div id='list'>";
      var length = '<p>Hoteles encontrados: ' + alojamientos.length +'</p><ul>';

      inner += length;
      alojamientos.forEach(function(el,i){
        inner += '<li numero=' + i + '>' + alojamientos[i].basicData.title + '</li>';
      });
      inner += "</ul></div>";
      console.log(inner)
      $("#listahoteles").html(inner)
    });
  });

});
