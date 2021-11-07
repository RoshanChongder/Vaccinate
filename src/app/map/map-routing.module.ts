import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MapViewComponent } from './map-view/map-view.component';
const routes: Routes = [
    { path : "mapview" , component : MapViewComponent } 
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MapRoutingModule { }