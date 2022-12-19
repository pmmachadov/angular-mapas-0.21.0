import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mini-mapa',
  templateUrl: './mini-mapa.component.html',
  styles: [
    `
      div {
        width: 100%;
        height: 150px;
        margin: 0px;
      }
    `
  ]
})
export class MiniMapaComponent implements AfterViewInit { // Se implementa el AfterViewInit para que se ejecute el código después de que se haya renderizado el componente
  @Input() lngLat: [number, number] = [0,0];  // Se establece el valor por defecto
  @ViewChild('mapa') divMapa!: ElementRef;  // Referencia al elemento html

  constructor() { } // Se crea el constructor

  ngAfterViewInit(): void { // Se ejecuta después de que se haya renderizado el componente
    const mapa = new mapboxgl.Map({ // Se crea el mapa
      container: this.divMapa.nativeElement,  // Se establece el contenedor
      style: 'mapbox://styles/mapbox/streets-v11',  // Se establece el estilo
      center: this.lngLat,  // Se establece el centro
      zoom: 15, // Se establece el nivel de zoom
      interactive: false  // Se desactiva la interacción con el mapa
    });

    new mapboxgl.Marker() // Se crea el marcador
        .setLngLat( this.lngLat ) // Se establece la posición
        .addTo( mapa ); // Se agrega al mapa
  }

}
