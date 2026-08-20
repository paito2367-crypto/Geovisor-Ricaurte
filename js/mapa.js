const map = L.map('map').setView([5.35, -72.99], 12);
document.getElementById("Consulta-territorial").style.display = "block";

const OpenStreetMap = L.tileLayer('https://{s}.tile.OpenStreetMap.org/{z}/{x}/{y}.png', 
    {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19
    }
);

const Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    maxZoom: 19
    }
);

const EsriHibrido = L.layerGroup([
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', 
        {attribution: '&copy; Esri, Maxar, Earthstar Geographics'
        }
),
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
        {attribution: '&copy; Esri'
        }
)
]);
OpenStreetMap.addTo(map);

let Vereda; 
fetch('datos/Vereda.geojson')
.then(response => response.json())
.then(data => {
    Vereda = L.geoJSON(data, {
        style: {
            color: 'black',
            weight: 10,
            opacity: 1,
            fillOpacity: 0,
        },

        onEachFeature: function (feature, layer) {
            layer.bindTooltip("Vereda Ricaurte", {
                permanent: true,
                direction: 'center',
                className: 'tooltip-vereda'
            });
        }
    }).addTo(map);
    map.fitBounds(Vereda.getBounds());
})
.catch(error => {
    console.error('Error al cargar el archivo Vereda:', error);
});

let RedDrenaje;
fetch('datos/RedDrenaje.geojson')
.then(response => response.json())
.then(data => {
    RedDrenaje = L.geoJSON(data, {
        style: {
            color: 'blue',
            weight: 2,
            opacity: 1,
        }
    });
})
.catch(error => {
    console.error('Error al cargar el archivo RedDrenaje:', error);
});

let Zonificacion;
fetch('datos/Zonificacion.geojson')
.then(response => response.json())
.then(data => {
    Zonificacion = L.geoJSON(data, {
        style: function (feature) {
            switch (feature.properties.Sensibilidad) {
                case 'Muy Alta':
                    return { color: 'red', weight: 1, fillColor: 'red', fillOpacity: 1.0 };
                case 'Alta':
                    return { color: 'orange', weight: 2, fillColor: 'orange', fillOpacity: 1.0 };
                case 'Moderada':
                    return { color: 'yellow', weight: 2, fillColor: 'yellow', fillOpacity: 1.0 };
                case 'Baja':
                    return { color: 'darkgreen', weight: 2, fillColor: 'darkgreen', fillOpacity: 1.0 };
                case 'Muy Baja':
                    return { color: 'lightgreen', weight: 2, fillColor: 'lightgreen', fillOpacity: 1.0 }; 
            
                default:
                    return { color: 'lightgray', weight: 2, fillColor: 'lightgray', fillOpacity: 10 };
                  }
        },
        onEachFeature: function (feature, layer) {
            layer.on('click', function (e) {
                document.getElementById('Consulta-territorial').style.display = 'none';
                L.DomEvent.stopPropagation(e);
                const Zonificacion = feature.properties.Sensibilidad;
                const lat = e.latlng.lat.toFixed(5);
                const lng = e.latlng.lng.toFixed(5);
                layer.bindPopup(`
                    <div>
                    <h3> &#127807; Consulta Zonificación Ambiental</h3>
                    <b> Variable: </b> Sensibilidad Ambiental<br>
                    <b> Clasificación: </b> ${Zonificacion}<br></br>
                    &#128205; <b> Ubicación: </b><br>
                    Latitud: ${lat}<br>
                    Longitud: ${lng}
                    </div>
                    `).openPopup(e.latlng);

                   });
            }
    });
})
.catch(error => {
    console.error('Error al cargar el archivo Zonificacion:', error);
});

let OfertaH; 
fetch('datos/OfertaH.geojson')
.then(response => response.json())
.then(data => {
    OfertaH = L.geoJSON(data, {
        style: function (feature) {
            switch (feature.properties.Categoria) {
                case 'Muy Alta':
                    return { color: 'rgb(156, 156, 156)', weight: 1, fillColor: 'rgb(156, 156, 156)', fillOpacity: 1 };
                case 'Alta':
                    return { color: 'rgb(190, 232, 255)', weight: 2, fillColor: 'rgb(190, 232, 255)', fillOpacity: 1 };
                case 'Moderada':
                    return { color: 'rgb(115, 178, 255)', weight: 2, fillColor: 'rgb(115, 178, 255)', fillOpacity: 1 };
                case 'Baja':
                    return { color: 'rgb(190, 232, 255)', weight: 2, fillColor: 'rgb(190, 232, 255)', fillOpacity: 0.5 };
                case 'Muy Baja':
                    return { color: 'rgb(156, 156, 156)', weight: 2, fillColor: 'rgb(156, 156, 156)', fillOpacity: 1 }; 
            
                default:
                    return { color: 'lightgray', weight: 2, fillColor: 'lightgray', fillOpacity: 1 };
            }
        },
        onEachFeature: function (feature, layer) {
            layer.on('click', function (e) {
                document.getElementById('Consulta-territorial').style.display = 'none';
                L.DomEvent.stopPropagation(e);
                const Categoria = feature.properties.Categoria;
                const lat = e.latlng.lat.toFixed(5);
                const lng = e.latlng.lng.toFixed(5);
                layer.bindPopup(`
                    <div>
                    <h3> &#128166; Consulta Potencial Hídrico</h3>
                    <b> Variable: </b> Disponibilidad de agua<br>
                    <b> Clasificación: </b> ${Categoria}<br></br>
                    &#128205; <b> Ubicación: </b><br>
                    Latitud: ${lat}<br>
                    Longitud: ${lng}
                    </div>
                    `).openPopup(e.latlng);

                   });
            }
    });
})
.catch(error => {      
    console.error('Error al cargar el archivo OfertaH:', error);
});

let AptitudH;
fetch('datos/AptitudH.geojson')
.then(response => response.json())
.then(data => {
    AptitudH = L.geoJSON(data, {
        style: function (feature) {
            switch (feature.properties.Aptitud) {
                                case 'Muy Alta':
                    return { color: 'rgb(3, 9, 72)', weight: 2, fillColor: 'rgb(3, 9, 72)', fillOpacity: 1.0 };
                case 'Alta':
                    return { color: 'rgb(190, 232, 255)', weight: 2, fillColor: 'rgb(190, 232, 255)', fillOpacity: 1.0 };
                case 'Moderada':
                    return { color: 'rgb(115, 178, 255)', weight: 2, fillColor: 'rgb(115, 178, 255)', fillOpacity: 1.0 };
                case 'Baja':
                    return { color: 'rgb(0,112,255)', weight: 2, fillColor: 'rgb(0,112,255)', fillOpacity: 1.0 };
                         
                default:
                    return { color: 'lightgray', weight: 1, fillColor: 'lightgray', fillOpacity: 0.3 };
            }
        },
        onEachFeature: function (feature, layer) {
            layer.on('click', function (e) {
                document.getElementById('Consulta-territorial').style.display = 'none';
                L.DomEvent.stopPropagation(e);
                const aptitud = feature.properties.Aptitud;
                const lat = e.latlng.lat.toFixed(5);
                const lng = e.latlng.lng.toFixed(5);
                layer.bindPopup(`
                    <div>
                    <h3> &#127758; Consulta Territorial</h3>
                    <b> Variable: </b> Aptitud Territorial<br>
                    <b> Clasificación: </b> ${aptitud}<br></br>
                    &#128205 <b> Ubicación: </b><br>
                    Latitud: ${lat}<br>
                    Longitud: ${lng}
                    </div>
                    `).openPopup(e.latlng);

                   });
            }
    });
})
.catch(error => {
    console.error('Error al cargar el archivo AptitudH:', error);
});

let Cuenca;
fetch('datos/Cuenca.geojson')
.then(response => response.json())
.then(data => { 
    Cuenca = L.geoJSON(data, {
        style: {
            fillColor: 'RoyalBlue',
            color: 'Navy',
            weight: 2,
            fillOpacity: 0.4
        },
        onEachFeature: function (feature, layer) {
            layer.bindTooltip("Cuenca del Río Lengupá", {
                permanent: true,
                direction: 'center',
                offset: [0,-40],
                className: 'tooltip-cuenca'
            });
        }
    });
})
.catch(error => {
    console.error('Error al cargar el archivo Cuenca:', error);
});

let Vias;
fetch('datos/Vias.geojson')
.then(response => response.json())
.then(data => {
    Vias = L.geoJSON(data, {
        style: function (feature) {
            switch (feature.properties.TIPO_VIA) {
                case 1:
                    return { color: 'FireBrick', weight: 5, opacity: 1  

                    };
                case 4:
                    return { color: 'Darkorange', weight: 4, opacity: 1 

                    };
                case 5:
                    return { color: 'Goldenrod', weight: 3, opacity: 1 

                    };        
                case 6:
                    return { color: 'Dimgray', weight: 2, opacity: 1 

                    };
                case 7:
                    return { color: 'Black', weight: 1, opacity: 1 

                    };
                default:
                    return { color: 'gray', weight: 1, opacity: 1 

                    };
            }
         },
        onEachFeature: function (feature, layer) {
            layer.on('click', function (e) {
                document.getElementById('Consulta-territorial').style.display = 'none';
                L.DomEvent.stopPropagation(e);
                const TipoVia = feature.properties.TipoVia;
                const lat = e.latlng.lat.toFixed(5);
                const lng = e.latlng.lng.toFixed(5);
                layer.bindPopup(`
                    <div>
                    <h3> &#128739; Consulta Red Vial</h3>
                    <b> Variable: </b> Tipo de Vía<br>
                    <b> Clasificación: </b> ${TipoVia}<br></br>
                    &#128205 <b> Ubicación: </b><br>
                    Latitud: ${lat}<br>
                    Longitud: ${lng}
                    </div>
                    `).openPopup(e.latlng);

                   });
            }
    });
})
.catch(error => {
    console.error('Error al cargar el archivo Vias:', error);
});

let Distancia;
fetch('datos/Distancia.geojson')
.then(response => response.json())
.then(data => {
    Distancia = L.geoJSON(data, {
        style: function (feature) {
            switch (feature.properties.Categoria) {
                 case 'Muy Alta':
                    return { color: 'rgb(0, 77, 168)', weight: 0.3, fillColor: 'rgb(0, 77, 168)', fillOpacity: 0.9 };
                case 'Alta':
                    return { color: 'rgb(0, 112, 255)', weight: 0.3, fillColor: 'rgb(0, 112, 255)', fillOpacity: 0.9 };
                case 'Moderada':
                    return { color: 'rgb(115, 178, 255)', weight: 0.3, fillColor: 'rgb(115, 178, 255)', fillOpacity: 0.9 };
                case 'Baja':
                    return { color: 'rgb(190, 232, 255)', weight: 0.3, fillColor: 'rgb(190, 232, 255)', fillOpacity: 0.9 };
                           
                default:
                    return { color: 'lightgray', weight: 1, fillColor: 'lightgray', fillOpacity: 0.3 };
            }
         },
        onEachFeature: function (feature, layer) {
            layer.on('click', function (e) {
                document.getElementById('Consulta-territorial').style.display = 'none';
                L.DomEvent.stopPropagation(e);
                const Distancia = feature.properties.Categoria;
                const lat = e.latlng.lat.toFixed(5);
                const lng = e.latlng.lng.toFixed(5);
                layer.bindPopup(`
                    <div>
                    <h3> &#128167; Consulta Distancia a la Red de Drenaje</h3>
                    <b> Variable: </b> Distancia drenajes superficiales<br>
                    <b> Clasificación: </b> ${Distancia}<br></br>
                    &#128205 <b> Ubicación: </b><br>
                    Latitud: ${lat}<br>
                    Longitud: ${lng}
                    </div>
                    `).openPopup(e.latlng);

                   });
            }
    });
})
.catch(error => {
    console.error('Error al cargar el archivo Distancia:', error);
});

let Demografia;
fetch('datos/Demografia.geojson')
.then(response => response.json())
.then(data => {
    Demografia = L.geoJSON(data, {
        style: function (feature) {
            switch (feature.properties.Descripcion) {
                 case 'Área Urbana':
                    return { color: 'rgb(255, 0, 208)', weight: 0.3, fillColor: 'rgb(255, 0, 208)', fillOpacity: 0.7 };
                case 'Área Rural':
                    return { color: 'rgb(225, 0, 255)', weight: 0.3, fillColor: 'rgb(225, 0, 255)', fillOpacity: 0.5 };
                case 'Sin Información':
                    return { color: 'hsl(60, 1%, 52%)', weight: 0.3, fillColor: 'hsl(60, 1%, 52%)', fillOpacity: 1 };
                                           
                default:
                    return { color: 'lightgray', weight: 1, fillColor: 'lightgray', fillOpacity: 0.3 };
            }
         },
        onEachFeature: function (feature, layer) {
            layer.on('click', function (e) {
                document.getElementById('Consulta-territorial').style.display = 'none';
                L.DomEvent.stopPropagation(e);
                const Demografia = feature.properties.Descripcion;
                const lat = e.latlng.lat.toFixed(5);
                const lng = e.latlng.lng.toFixed(5);
                layer.bindPopup(`
                    <div>
                    <h3> &#128101; Consulta Demográfica</h3>
                    <b> Variable: </b> Distribución de la Población<br>
                    <b> Clasificación: </b> ${Demografia}<br></br>
                    &#128205 <b> Ubicación: </b><br>
                    Latitud: ${lat}<br>
                    Longitud: ${lng}
                    </div>
                    `).openPopup(e.latlng);

                   });
            }
    });
})
.catch(error => {
    console.error('Error al cargar el archivo Demografia:', error);
});

let mapaBase = {
    "OpenStreetMap": OpenStreetMap,
    "Esri_WorldImagery": Esri_WorldImagery,
    "EsriHibrido": EsriHibrido
};

L.control.layers(mapaBase, null, {
    position: 'topleft'
}).addTo(map);

L.control.scale({ 
    position: 'bottomleft',
    imperial: false,
 }).addTo(map);

 const Coordenadas = L.control({ 
    position: 'bottomleft'
 });

 Coordenadas.onAdd = function () {
    this._div = L.DomUtil.create('div', 'Coordenadas');
    this._div.innerHTML = 'Mueve el cursor para consultar las coordenadas';
    return this._div;
 };
 Coordenadas.update = function (latlng) {

    this._div.innerHTML = 
    "Coordenadas<br>" + 
    "Latitud: " + latlng.lat.toFixed(5) + "<br>" +
    "Longitud: " + latlng.lng.toFixed(5);
 };

Coordenadas.addTo(map);
map.on('mousemove', function (e) {
    Coordenadas.update(e.latlng);
 }); 

 function mostrarSoloCapa(capa) {
    if (!capa) {
        console.error('La capa no está definida.');
        return;
    }
    console.log("función activa");
    console.log(capa);
    [AptitudH, OfertaH, Distancia, RedDrenaje, Vias, Cuenca, Zonificacion, Demografia]
    .filter(c=> c)
    .forEach(function(c){
        if(map.hasLayer(c)){
            map.removeLayer(c);
        }
    });
    map.addLayer(capa);
        if(capa === Zonificacion ){
        document.getElementById ("Convenciones").style.display ="block";
        document.getElementById ("convgeneral").style.display ="block";
        document.getElementById ("ConOferta").style.display ="none";
        document.getElementById ("conDistancia").style.display ="none";
        document.getElementById ("conVias").style.display ="none";
        document.getElementById ("conAptitud").style.display ="none";
        document.getElementById ("conDemografia").style.display ="none";

        }
        
        else if (capa === AptitudH){
        document.getElementById("Convenciones").style.display ="block";
        document.getElementById ("convgeneral").style.display ="none";
        document.getElementById ("ConOferta").style.display ="none";
        document.getElementById ("conDistancia").style.display ="none";
        document.getElementById ("conVias").style.display ="none";
        document.getElementById ("conAptitud").style.display ="block";
        document.getElementById ("conDemografia").style.display ="none";
        }   

        else if (capa === OfertaH){
        document.getElementById("Convenciones").style.display ="block";
        document.getElementById ("convgeneral").style.display ="none";
        document.getElementById ("ConOferta").style.display ="block";
        document.getElementById ("conDistancia").style.display ="none";
        document.getElementById ("conVias").style.display ="none";
        document.getElementById ("conAptitud").style.display ="none";
        document.getElementById ("conDemografia").style.display ="none";
        }

        else if (capa === Distancia){
        document.getElementById("Convenciones").style.display ="block";
        document.getElementById ("convgeneral").style.display ="none";
        document.getElementById ("ConOferta").style.display ="none";
        document.getElementById ("conDistancia").style.display ="block";
        document.getElementById ("conVias").style.display ="none";
        document.getElementById ("conAptitud").style.display ="none";
        document.getElementById ("conDemografia").style.display ="none";
        }

        else if (capa === Vias){
        document.getElementById("Convenciones").style.display ="block";
        document.getElementById ("convgeneral").style.display ="none";
        document.getElementById ("ConOferta").style.display ="none";
        document.getElementById ("conDistancia").style.display ="none";
        document.getElementById ("conVias").style.display ="block";
        document.getElementById ("conAptitud").style.display ="none";
        document.getElementById ("conDemografia").style.display ="none";
        }

        else if (capa === Demografia){
        document.getElementById("Convenciones").style.display ="block";
        document.getElementById ("convgeneral").style.display ="none";
        document.getElementById ("ConOferta").style.display ="none";
        document.getElementById ("conDistancia").style.display ="none";
        document.getElementById ("conVias").style.display ="none";
        document.getElementById ("conAptitud").style.display ="none";
        document.getElementById ("conDemografia").style.display ="block";
        }
    

        else{
        document.getElementById ("Convenciones").style.display ="none";    
        }
        
}

document.getElementById('checkAptitudH').onclick = function () {
    mostrarSoloCapa(AptitudH);
}   
document.getElementById('checkOfertaH').onclick = function () {
    mostrarSoloCapa(OfertaH);
}
document.getElementById('checkDistancia').onclick = function () {
    mostrarSoloCapa(Distancia);
}  
document.getElementById('checkRedDrenaje').onclick = function () {
    mostrarSoloCapa(RedDrenaje);
}
document.getElementById('checkVereda').onclick = function () {
    mostrarSoloCapa(Vereda);
}
document.getElementById('checkVias').onclick = function () {
    mostrarSoloCapa(Vias);
}
document.getElementById('checkCuenca').onclick = function () {
    mostrarSoloCapa(Cuenca);
}
document.getElementById('checkZonificacion').onclick = function () {
    mostrarSoloCapa(Zonificacion);
}
document.getElementById('checkDemografia').onclick = function () {
    mostrarSoloCapa(Demografia);
}
const botonCapas= document.getElementById("btnCapas");
const contenidoCapas= document.getElementById("contenido-capas");

botonCapas.addEventListener("click",function(){
    contenidoCapas.classList.toggle("mostrar");
    if(contenidoCapas.classList.contains("mostrar")){

    } else{
        botonCapas.textContent="▼"
    }
});

if (Vereda && map.hasLayer(Vereda)) {
    Vereda.bringToFront();
}

function consultarCapa(latlng, capa, campo) {
    let resultado = "Sin Información";
    if (!capa) return resultado;
    const punto = turf.point ([latlng.lng, latlng.lat
    ]);
    capa.eachLayer(function (layer) {
        if (!layer.feature) return;
        try {
            const dentro = turf.booleanPointInPolygon(
            punto, layer.feature);
            if (dentro) {
                resultado = layer.feature.properties[campo];
            }
        } catch (error) {
            console.error("Error al consultar la capa:", error);
        }
    });
    return resultado;
}

function valorCategoria(valor) {
    if (!valor) return 0;

    valor = valor.toString().trim().toLowerCase();

    if (valor === "muy alta") return 5;
    if (valor === "alta") return 4;
    if (valor === "moderada") return 3;
    if (valor === "baja") return 2;
    if (valor === "muy baja") return 1;

    return 0;
}
map.on('click', function (e) {
    let dentroAreaEstudio = false;

    const punto = turf.point ([
        e.latlng.lng,
        e.latlng.lat
    ]);

    Vereda.eachLayer(function(layer){ 
        if (layer.feature && layer.feature.geometry){
            try{
                if(turf.booleanPointInPolygon(
                    punto,
                    layer.feature
                )){
                    dentroAreaEstudio = true;
                }
            } catch (error) {
                console.error("Error verificando area de estudio:", 
                    error
                );
            }
        }
    });
    if (!dentroAreaEstudio){
        document.getElementById('Consulta-territorial').style.display = 'none';
        return;
    }
   
    
    //Si esta dentro del area//

    
    document.getElementById('Consulta-territorial').style.display = 'block';
    //Consultar capas//
    const resultadoZonificacion = consultarCapa(e.latlng, Zonificacion, 'Sensibilidad');
    const resultadoOfertaH = consultarCapa(e.latlng, OfertaH, 'Categoria');
    const resultadoAptitudH = consultarCapa(e.latlng, AptitudH, 'Aptitud');
    const resultadoDistancia = consultarCapa(e.latlng, Distancia, 'Categoria');
    const resultadoDemografia = consultarCapa(e.latlng, Demografia, 'Descripcion'

    );

    //Convertir categorias a valores//
    const pZonificacion =valorCategoria(resultadoZonificacion);
    const pOfertaH =valorCategoria(resultadoOfertaH);
    const pAptitudH =valorCategoria(resultadoAptitudH);
    const pDistancia =valorCategoria(resultadoDistancia);


    //Calcular indice//
    const indice = 
    (pZonificacion +
    pOfertaH +
    pAptitudH +
    pDistancia)/4;

    //Determinar prioridad//
    let prioridad;
    if (indice >= 4.5){
    prioridad = "Muy Alta";
    } else if (indice >= 3.5){
    prioridad = "Alta"
   } else if (indice >= 2.5){
    prioridad = "Moderada"
    } else if (indice >= 1.5){
    prioridad = "Baja"
    } else {
    prioridad = "Muy Baja" 
}

let colorPrioridad;
if (prioridad === "Muy Alta"){
    colorPrioridad = "#006400";
} else if(prioridad === "Alta"){
    colorPrioridad = "#228B22"; 
} else if(prioridad === "Moderada"){
    colorPrioridad = "#FFD700"; 
} else if(prioridad === "Baja"){
    colorPrioridad = "#FFA500"; 
} else {
    colorPrioridad = "#D32F1F"
}




    //Diagnostico y recomeciones//
    let diagnostico;
    let recomendacion;

    if (prioridad === "Muy Alta"){
    diagnostico = "Zona con condiciones muy favorables para el aprovechamiento del recurso hídrico"
    recomendacion = "Se recomienda dar prioridad a esta zona para análisis de abastecimiento de acuducto rural"
    } else if (prioridad === "Alta"){
    diagnostico = "Zona con condiciones favorables para abastecimiento de agua"
    recomendacion = "Se recomienda complementar con estudios técnicos"
    }else if (prioridad === "Moderada"){
    diagnostico = "Zona con algunas condiciones limitadas para abastecimiento hídrico"
    recomendacion = "Se recomienda analizar detalladamente esta zona, antes de ser utilizada para aprovechamiento del recurso hídrico"
    } else {
    diagnostico = "Las condiciones de la zona limitan el aprovechamiento hídrico"
    recomendacion = "Se recomienda utilizar otras zonas con mejores condiciones"
    }

    //Mostrar resultado//

        document.getElementById('consulta').innerHTML = `
        <p>&#127807; <b> Zonificación Ambiental: </b> ${resultadoZonificacion}</p>
        <p>&#128166; <b> Potencial Hídrico: </b> ${resultadoOfertaH}</p>
        <p>&#127758; <b> Aptitud Territorial: </b> ${resultadoAptitudH}</p>
        <p>&#128167; <b> Distancia a la Red de Drenaje: </b> ${resultadoDistancia}</p>
        <p>&#128101; <b> Distribución de la Población: </b> ${resultadoDemografia}</p>

    <hr>

    <p>&#128506; <b>Prioriodad territorial:</b> 
    <span style = "color:${colorPrioridad}; font-weight:bold;">
    ${prioridad}
     </span>
     </p>

     <p>&#128202;<b>Diagnóstico:</b><br>
     ${diagnostico}</p>
      <p>&#128221; <b>Recomendación:</b><br>
     ${recomendacion}</p>
    `;
});


const consultaControl = L.control({ position: 'topleft' });
consultaControl.onAdd = function (map) {
    return document.getElementById('Consulta-territorial');
};
consultaControl.addTo(map);
const consulta = document.getElementById('Consulta-territorial');
L.DomEvent.disableClickPropagation(consulta);
L.DomEvent.disableScrollPropagation(consulta);
document.querySelectorAll('#contenido-capas input[type="checkbox"]').forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
        document.getElementById('Consulta-territorial').style.display = 'none';
    });
});

//Actualizar// 

























    