import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarcadorColor { // Se crea la interfaz para los marcadores con color
  color: string; // Se establece el color
  marker?: mapboxgl.Marker; // Se establece el marcador
  centro?: [number, number] // Se establece el centro
}

@Component({  // Se crea el componente
  selector: 'app-marcadores', // Se establece el selector
  templateUrl: './marcadores.component.html', // Se establece el template
  styles: [
    `
    .mapa-container {
      height: 100%;
      width: 100%;
    }

    .list-group {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 99;
    }
    li {
      cursor: pointer;
    }
    `
  ]
})
export class MarcadoresComponent implements AfterViewInit { // Se implementa el AfterViewInit para que se ejecute el código después de que se haya renderizado el componente

  @ViewChild('mapa') divMapa!: ElementRef;  // Referencia al elemento html del mapa
  mapa!: mapboxgl.Map;  // Se crea el mapa
  zoomLevel: number = 15; // Se establece el nivel de zoom
  center: [number, number] = [ -75.921029433568, 45.28719674822362 ]; // Se establece el centro

  // Arreglo de marcadores
  marcadores: MarcadorColor[] = []; // Se crea el arreglo de marcadores

  constructor() { } // Se crea el constructor

  ngAfterViewInit(): void { // Se ejecuta después de que se haya renderizado el componente

    this.mapa = new mapboxgl.Map({  // Se crea el mapa
      container: this.divMapa.nativeElement,  // Se establece el contenedor
      style: 'mapbox://styles/mapbox/streets-v11',  // Se establece el estilo
      center: this.center,  // Se establece el centro
      zoom: this.zoomLevel  // Se establece el nivel de zoom
    });

    this.leerLocalStorage();

    // const markerHtml: HTMLElement = document.createElement('div');
    // markerHtml.innerHTML = 'Hola Mundo';

    // new mapboxgl.Marker()
    //   .setLngLat( this.center )
    //   .addTo( this.mapa );

  }


  agregarMarcador() { // Se crea el método para agregar marcadores

    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16)); // Se genera un color aleatorio. g es global, y es cada uno de los caracteres de la cadena. 16 es el número de caracteres que se van a generar. toString(16) es para convertirlo a hexadecimal. #xxxxxx es el formato del color hexadecimal. y es cada uno de los caracteres de la cadena. Math.random() es para generar un número aleatorio. |0 es para convertirlo a entero. replace es para reemplazar los caracteres x por el número aleatorio.

    const nuevoMarcador = new mapboxgl.Marker({ // Se crea el marcador
      draggable: true,  // Se establece que el marcador sea arrastrable
      color // Se establece el color
    })
      .setLngLat( this.center ) // Se establece el centro
      .addTo( this.mapa );  // Se agrega al mapa

    this.marcadores.push({  // Se agrega el marcador al arreglo de marcadores
      color,  // Se establece el color
      marker: nuevoMarcador // Se establece el marcador
    });

    this.guardarMarcadoresLocalStorage()  // Se guarda el marcador en el local storage

    nuevoMarcador.on('dragend', () => { // Se crea el evento para cuando se suelta el marcador
      this.guardarMarcadoresLocalStorage(); // Se guarda el marcador en el local storage
    });

  }

  irMarcador( marker: mapboxgl.Marker ) { // Se crea el método para ir al marcador
    this.mapa.flyTo({ // Se crea el evento para ir al marcador
      center: marker.getLngLat()  // Se establece el centro
    });
  }


  guardarMarcadoresLocalStorage() { // Se crea el método para guardar los marcadores en el local storage

    const lngLatArr: MarcadorColor[] = [];  // Se crea el arreglo de marcadores

    this.marcadores.forEach( m => { // Se recorre el arreglo de marcadores

      const color = m.color;  // Se establece el color
      const { lng, lat } = m.marker!.getLngLat(); // Se establece el centro

      lngLatArr.push({  // Se agrega el marcador al arreglo de marcadores
        color: color, // Se establece el color
        centro: [ lng, lat ]  // Se establece el centro
      });
    })

    localStorage.setItem('marcadores', JSON.stringify(lngLatArr) ); // Se guarda el marcador en el local storage

  }

  leerLocalStorage() {  // Se crea el método para leer los marcadores del local storage

    if ( !localStorage.getItem('marcadores') ) {  // Si no hay marcadores en el local storage
      return; // Se retorna
    }

    const lngLatArr: MarcadorColor[] = JSON.parse( localStorage.getItem('marcadores')! ); // Se lee el marcador del local storage

    lngLatArr.forEach( m => { // Se recorre el arreglo de marcadores

      const newMarker = new mapboxgl.Marker({ // Se crea el marcador
        color: m.color, // Se establece el color
        draggable: true // Se establece que el marcador sea arrastrable
      })
        .setLngLat( m.centro! ) // Se establece el centro
        .addTo( this.mapa );  // Se agrega al mapa

      this.marcadores.push({  // Se agrega el marcador al arreglo de marcadores
        marker: newMarker,  // Se establece el marcador
        color: m.color // Se establece el color. m es cada uno de los marcadores del arreglo de marcadores.
      });

      newMarker.on('dragend', () => { // Se crea el evento para cuando se suelta el marcador. on es para escuchar un evento.
        this.guardarMarcadoresLocalStorage(); // Se guarda el marcador en el local storage
      });


    });

  }

  borrarMarcador( i: number ) { // Se crea el método para borrar el marcador

    this.marcadores[i].marker?.remove();  // Se borra el marcador
    this.marcadores.splice( i, 1);  // Se borra el marcador del arreglo de marcadores
    this.guardarMarcadoresLocalStorage(); // Se guarda el marcador en el local storage
  }

}
