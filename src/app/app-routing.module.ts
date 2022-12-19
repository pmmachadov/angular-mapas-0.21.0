import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

  {
    path: 'mapas', // Ruta principal
    loadChildren: () => import('./mapas/mapas.module').then( m => m.MapasModule ) // Lazy load . Su funcion es la de cargar el modulo de mapas cuando se necesite.
  },
  {
    path: '**', // Ruta por defecto
    redirectTo: 'mapas' // Redirecciona a la ruta principal
  }

];

@NgModule({ // Decorador
  imports: [RouterModule.forRoot(routes)],  // Importa el modulo de rutas
  exports: [RouterModule] // Exporta el modulo de rutas
})
export class AppRoutingModule { } // Exporta la clase AppRoutingModule
