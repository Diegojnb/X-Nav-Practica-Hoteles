$(document).ready(function(){

	$('.window').click(function (e) {
	  $(this).tab('show')
	})

  $.getJSON( "json/alojamientos.json")
	.done(function(data){
		var inner = "";
		timeline = data;
		timeline.forEach(function(el,i){
			nmensajes += i;
			inner += "<div class ='container'><div class='row'><div class='col-md-3'>";
				inner += "<img class='avatar' src='"+el.Avatar+"'></img></div>";
				inner += "<div class='col-md-7'><p> Autor: "+el.Autor+"</p>";
				inner += "<p> Titulo: "+el.Titulo+"</p></br>";
				inner += "<p> Fecha: "+el.Fecha+"</p></div>";
				inner += "<div class='col-md-2'></br><button type='button' data-toggle='collapse' data-target='#expandir"+nmensajes+"' class='btn btn-success'>";
				inner += "Expandir</button></div></div><div class='row'>";
				inner += "<div class='collapse' id='expandir"+nmensajes+"'><div class='well'>";
				inner += "<p class='contenido'>"+el.Contenido+"<p></div></div></div>";
			inner += "</div></div></div></br>";

		});
		$("#home").html(inner)
	});

});
