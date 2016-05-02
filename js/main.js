$(document).ready(function(){

	$('.window').click(function (e) {
	  $(this).tab('show')
	})

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
