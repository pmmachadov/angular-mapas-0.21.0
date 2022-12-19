import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
    .mapa-container {
      height: 100%;
      width: 100%;
    }

    .row {
      background-color: white;
      border-radius: 5px;
      bottom: 50px;
      left: 50px;
      padding: 10px;
      position: fixed;
      z-index: 999;
      width: 400px;
    }
    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  @ViewChild('mapa') divMapa!: ElementRef;  // Referencia al elemento html
  mapa!: mapboxgl.Map;  // Instancia del mapa
  zoomLevel: number = 10; // Zoom inicial
  center: [number, number] = [ -75.921029433568, 45.28719674822362 ]; // Centro inicial

  constructor() {}

  ngOnDestroy(): void {
    this.mapa.off('zoom', () => {});
    this.mapa.off('zoomend', () => {});
    this.mapa.off('move', () => {});
  }

  ngAfterViewInit(): void {

    this.mapa = new mapboxgl.Map({  // Se crea el mapa
      container: this.divMapa.nativeElement,  // Se establece el contenedor
      style: 'mapbox://styles/mapbox/streets-v11',  // Se establece el estilo
      center: this.center,  // Se establece el centro
      zoom: this.zoomLevel  // Se establece el nivel de zoom
    });

    this.mapa.on('zoom', (ev) => {  // Evento de zoom
      this.zoomLevel = this.mapa.getZoom(); // Se obtiene el nivel de zoom
    });

    this.mapa.on('zoomend', (ev) => { // Evento de zoom
      if ( this.mapa.getZoom() > 18 ) { // Si el nivel de zoom es mayor a 18
        this.mapa.zoomTo( 18 ); // Se establece el nivel de zoom en 18
      }
    });


    // Movimiento del mapa - Este es un listener que se ejecuta cada vez que se mueve el mapa

    this.mapa.on('move', (event) => { // Evento de movimiento del mapa. move se encuentra en la documentacion de mapbox en www.mapbox.com/mapbox-gl-js/api/map/
      const target = event.target;  // Se obtiene el target
      const { lng, lat } = target.getCenter();  // Se obtiene la latitud y longitud del centro del mapa
      this.center = [lng, lat]; // Se establece el centro del mapa
    });


  }

  zoomOut() { // Funcion para hacer zoom out
    this.mapa.zoomOut(); // Se hace zoom out
  }

  zoomIn() {  // Funcion para hacer zoom in
    this.mapa.zoomIn(); // Se hace zoom in
  }

  zoomCambio( valor: string ) { // Funcion para cambiar el zoom
    this.mapa.zoomTo( Number(valor) );  // Se establece el nivel de zoom. Valor viene de zoom-range.component.html linea 10
  }

}
