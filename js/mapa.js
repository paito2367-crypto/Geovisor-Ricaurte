const map = L.map('map').setView([5.35, -72.99], 12);

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
            weight: 3,
            fillColor: 'false',
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
                    return { color: 'red', weight: 1, fillColor: 'red', fillOpacity: 0.5 };
                case 'Alta':
                    return { color: 'orange', weight: 2, fillColor: 'orange', fillOpacity: 0.5 };
                case 'Moderada':
                    return { color: 'yellow', weight: 2, fillColor: 'yellow', fillOpacity: 0.5 };
                case 'Baja':
                    return { color: 'darkgreen', weight: 2, fillColor: 'darkgreen', fillOpacity: 0.5 };
                case 'Muy Baja':
                    return { color: 'lightgreen', weight: 2, fillColor: 'lightgreen', fillOpacity: 0.5 }; 
            
                default:
                    return { color: 'lightgray', weight: 2, fillColor: 'lightgray', fillOpacity: 0.3 };
            }
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
                    return { color: 'darkblue', weight: 1, fillColor: 'darkblue', fillOpacity: 0.5 };
                case 'Alta':
                    return { color: 'royalblue', weight: 2, fillColor: 'royalblue', fillOpacity: 0.5 };
                case 'Moderada':
                    return { color: 'dodgerblue', weight: 2, fillColor: 'dodgerblue', fillOpacity: 0.5 };
                case 'Baja':
                    return { color: 'lightskyblue', weight: 2, fillColor: 'lightskyblue', fillOpacity: 0.5 };
                case 'Muy Baja':
                    return { color: 'aliceblue', weight: 2, fillColor: 'aliceblue', fillOpacity: 0.5 }; 
            
                default:
                    return { color: 'lightgray', weight: 2, fillColor: 'lightgray', fillOpacity: 0.3 };
            }
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
            switch (feature.properties.Clasificacion) {
                case 'Muy Alta':
                    return { color: 'darkgreen', weight: 1, fillColor: 'darkgreen', fillOpacity: 0.5 };
                case 'Alta':
                    return { color: 'forestgreen', weight: 2, fillColor: 'forestgreen', fillOpacity: 0.5 };
                case 'Moderada':
                    return { color: 'yellow', weight: 2, fillColor: 'yellow', fillOpacity: 0.5 };
                case 'Baja':
                    return { color: 'orange', weight: 2, fillColor: 'orange', fillOpacity: 0.5 };
                case 'Muy Baja':
                    return { color: 'firebrick', weight: 2, fillColor: 'firebrick', fillOpacity: 0.5 }; 
            
                default:
                    return { color: 'lightgray', weight: 1, fillColor: 'lightgray', fillOpacity: 0.3 };
            }
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
                    return { color: 'Red', weight: 1, opacity: 0.5 };
                case 'Alta':
                    return { color: 'Orange', weight: 1, opacity: 0.5 };
                case 'Media':
                    return { color: 'Yellow', weight: 1, opacity: 0.5 };
                case 'Baja':
                    return { color: 'Green', weight: 1, opacity: 0.5 };
                default:
                    return { color: 'Gray', weight: 1, opacity: 0.5 };
            }
        }
    });
})
.catch(error => {
    console.error('Error al cargar el archivo Distancia:', error);
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
    [AptitudH, OfertaH, Distancia, RedDrenaje, Vias, Cuenca, Zonificacion]
    .filter(c=> c)
    .forEach(function(c){
        if(map.hasLayer(c)){
            map.removeLayer(c);
        }
    });
    map.addLayer(capa);
        if(capa === Zonificacion || capa === AptitudH){
        document.getElementById ("Convenciones").style.display ="block";
        document.getElementById ("convgeneral").style.display ="block";
        document.getElementById ("ConOferta").style.display ="none";
        document.getElementById ("conDistancia").style.display ="none";
        document.getElementById ("conVias").style.display ="none";

        } 
        else if (capa === OfertaH){
        document.getElementById("Convenciones").style.display ="block";
        document.getElementById ("convgeneral").style.display ="none";
        document.getElementById ("ConOferta").style.display ="block";
        document.getElementById ("conDistancia").style.display ="none";
        document.getElementById ("conVias").style.display ="none";

        }

        else if (capa === Distancia){
        document.getElementById("Convenciones").style.display ="block";
        document.getElementById ("convgeneral").style.display ="none";
        document.getElementById ("ConOferta").style.display ="none";
        document.getElementById ("conDistancia").style.display ="block";
         document.getElementById ("conVias").style.display ="none";

        }

        else if (capa === Vias){
        document.getElementById("Convenciones").style.display ="block";
        document.getElementById ("convgeneral").style.display ="none";
        document.getElementById ("ConOferta").style.display ="none";
        document.getElementById ("conDistancia").style.display ="none";
         document.getElementById ("conVias").style.display ="block";

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
const botonCapas= document.getElementById("btnCapas");
const contenidoCapas= document.getElementById("contenido-capas");

botonCapas.addEventListener("click",function(){
    contenidoCapas.classList.toggle("mostrar");
    if(contenidoCapas.classList.contains("mostrar")){

    } else{
        botonCapas.textContent="▼"
    }
});
