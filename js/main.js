var alojamientos;
var Lpopup=[];
var marcadores=[];
var mostrando;

function deletethis(lat,lon){
	var layer;
	console.log( Lpopup.length);
	for (var i = 0; i < Lpopup.length; i++) {

		if (Lpopup[i]._latlng.lat == lat & Lpopup[i]._latlng.lon == lon) {
			layer = Lpopup[i];
			Lpopup.splice(i,1);
		}
	}

	for (var i = 0; i < marcadores.length; i++) {
		if (marcadores[i].lat == lat & marcadores[i].lon == lon) {
			marcadores.splice(i,1);
		}
	}

 	mymap.removeLayer(layer);

}

function addmarker(lat,lon){
	var aparece = false;
	var marcador={};
	marcador.lat = lat;
	marcador.lon = lon;
	if (marcadores.length == 0) {
		marcadores.push(marcador);
	}else{
		for (var i = 0; i < marcadores.length; i++) {
			if (marcadores[i].lon == lon & marcadores[i].lat == lat) {
				aparece = true;
				break;
			}
		}
		if (!aparece) {
			marcadores.push(marcador);
		}
	}
}

function show_accomodation(numero){
	if ($(this).attr('numero') !== undefined) {
		var numero = $(this).attr('numero');
	}
	mostrando = numero
	var accomodation = alojamientos[numero];
	var lat = accomodation.geoData.latitude;
	var lon = accomodation.geoData.longitude;
	var url = accomodation.basicData.web;
	var name = accomodation.basicData.name;
	var desc = accomodation.basicData.body;

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
	var subcat = accomodation.extradata.categorias.categoria.subcategorias.subcategoria.item[1]['#text'];

	addmarker(lat,lon);

	var popup = L.marker([lat, lon]);
	popup._latlng.lon = lon;
	Lpopup.push(popup);

	popup.addTo(mymap)
	 .bindPopup('<a title="' + numero + '" href="' + url + '">' + name + '</a><button class="glyphicon glyphicon-trash" onClick="deletethis(\''+lat+'\',\''+lon+'\');" ></button>')
	 .openPopup();

	mymap.setView([lat, lon], 15);

	inner = "";
	inner += "<h2>" + name + "</h2>" +  "<h3>" + cat + " - " +
						subcat + "</h3>" + desc + carousel;

	$("#info").html(inner);

};

$(document).ready(function(){

	mymap = L.map('mapid').setView([40.419578500000, -3.698562600000], 13);

	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(mymap);

	$('.window').click(function (e) {
	  $(this).tab('show')
	});

	mymap.on('popupopen', function() {
		if (mostrando != $(this._popup._content).attr('title')) {
			show_accomodation($(this._popup._content).attr('title'));
		}
	});

  $("#cargarJ").click(function() {
    $.getJSON("json/alojamientos.json").done(function(data){

			alojamientos = data.serviceList.service;

			$("#listahoteles").empty();
			var inner = $("#listahoteles").html();

			inner += "<div id='list'>";
			var length = '<p>Hoteles encontrados: ' + alojamientos.length +'</p><ul id ="sortable">';

			inner += length;
			alojamientos.forEach(function(el,i){
				inner += '<li class="ui-state-default draggable" numero=' + i + '>' + alojamientos[i].basicData.title + '</li>';
			});
			inner += "</ul></div>";
			$("#listahoteles").html(inner);
			$('li').click(show_accomodation);

			$('.draggable').draggable({
				revert: "invalid",
				helper: "clone"
			});
    });
  });

	$("#crearC").click(function() {
		var colection = prompt("Nombre de la coleccion", "Hoteles 4 estrellas");
		if (colection != null) {

				inner = $("#listacolecciones").html()
				inner += '<div class="dropdown droppable ui-state-default ui-droppable">'+
								 '<button class="btn btn-secondary dropdown-toggle " data-toggle="dropdown">' +
				 			    colection + '</button><div class="dropdown-menu" ></div></div>';
				$("#listacolecciones").html(inner);

				$(".droppable" ).droppable({
					hoverClass: "ui-state-hover",
					drop: function( event, ui ) {
						var hotel = alojamientos[ui.draggable.context.getAttribute('numero')].basicData.name
						var str = $(this).html();
						var len = str.length;
						var res = str.substring(0,(len - 6));
						res += "<a>" + hotel +"</a></div>"
						$(this).html(res);
					}
				});
		}else{
			alert("Nombre no valido")
		}
	});

	$("#borrarC").click(function(){
		$("#listacolecciones *").click(function(){
			if ($(this).html().contains("button")) {
				$(this).empty();
			}
		});
	});
});
