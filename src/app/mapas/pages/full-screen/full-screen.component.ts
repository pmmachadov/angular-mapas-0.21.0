import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [
    `
    #mapa {
      height: 100%;
      width: 100%;
    }
    `
  ]
})
export class FullScreenComponent implements OnInit {  // Se implementa el OnInit para que se ejecute el código después de que se haya renderizado el componente

  constructor() { }

  ngOnInit(): void {  // Se ejecuta después de que se haya renderizado el componente

    var map = new mapboxgl.Map({  // Se crea el mapa
      container: 'mapa',  // Se establece el contenedor
      style: 'mapbox://styles/mapbox/streets-v11',  // Se establece el estilo
      center: [ -75.921029433568, 45.28719674822362 ],  // Se establece el centro
      zoom: 18  // Se establece el nivel de zoom
    });

  }

}
