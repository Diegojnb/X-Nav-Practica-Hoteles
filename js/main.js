$(document).ready(function(){

	/*popup = L.popup();*/
	mymap = L.map('mapid').setView([40.419578500000, -3.698562600000], 13);

	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(mymap);

	/*mymap.locate({setView: true, maxZoom: 16});*/

	$('.window').click(function (e) {
	  $(this).tab('show')
	})

  function show_accomodation(){
    var accomodation = alojamientos[$(this).attr('numero')];
    var lat = accomodation.geoData.latitude;
    var lon = accomodation.geoData.longitude;
    var url = accomodation.basicData.web;
    var name = accomodation.basicData.name;
    var desc = accomodation.basicData.body;

		console.log(lat);
		console.log(lon);

		var imgs = new Array();

		accomodation.multimedia.media.forEach(function(el,index){
			imgs[index] = accomodation.multimedia.media[index].url;
		});
		var carousel = "";
		if (imgs.length > 0) {
			carousel += '<div id="myCarousel" class="carousel slide" data-interval="3000" data-ride="carousel">' +
											'<ol class="carousel-indicators">';
			imgs.forEach(function(el,index){
				if (index == 0) {
					carousel += '<li data-target="#myCarousel" data-slide-to="' + index + '" class="active"></li>';
				}else{
					carousel += '<li data-target="#myCarousel" data-slide-to="' + index + '"</li>';
				}
			});
			carousel += '</ol><div class="carousel-inner">';
			imgs.forEach(function(el,index){
				if (index == 0) {
					carousel += '<div class="item active"><img src="' + el +'"></div>';
				}else{
					carousel += '<div class="item"><img src="' + el +'"></div>';
				}
			});
			carousel += '<a class="carousel-control left" href="#myCarousel" data-slide="prev"><span class="glyphicon glyphicon-chevron-left"></span></a><a class="carousel-control right" href="#myCarousel" data-slide="next"><span class="glyphicon glyphicon-chevron-right"></span></a>';
		}

    var cat = accomodation.extradata.categorias.categoria.item[1]['#text'];
    var subcat = accomodation.extradata.categorias.categoria
     .subcategorias.subcategoria.item[1]['#text'];

    L.marker([lat, lon]).addTo(mymap)
  	 .bindPopup('<a href="' + url + '">' + name + '</a><br/>')
  	 .openPopup();

    mymap.setView([lat, lon], 15);

		inner = "";
		inner += "<h2>" + name + "</h2>" +  "<h3>" + cat + " - " +
			subcat + "</h3>" + desc + carousel;

		$("#info").html(inner);
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
      $("#listahoteles").html(inner)
			$('li').click(show_accomodation);
    });
  });
});
