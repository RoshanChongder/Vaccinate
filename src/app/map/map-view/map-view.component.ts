import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl' ; 
import 'mapbox-gl/dist/mapbox-gl.css' ;
import { DataServiceUNService } from '../data-service-un.service';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit {

  data: any = undefined ;
  map: mapboxgl.Map | undefined ; 
  marker: mapboxgl.Marker | undefined ;
  prevSelected: number | undefined ;

  constructor( private dataService: DataServiceUNService ) { }

  /*
  * On load of the component, first load the map using the loadMap method.
  * Then call the dataservice to get covidData from the specefic end point and 
  * storing the data in the this.data local variable to use it place marker and show popup
  */

  ngOnInit(): void {
    this.map = loadmap();
    this.dataService.getCovidDate().subscribe( (response) =>{
      this.data = response.features ;
    } , ( error ) => {
      // log the error in some file 
    } ) ;
  }

  /*
  * This method mainly locates a country and places a marker in the center pos of that country 
  * It takes the name of the country and the id associated with the country name so that it can 
  * highlight the country name in the left nav and palce a marker on that country in the map
  */

  locate(country: any, id: number) {
    
    let element: HTMLElement | null = document.getElementById( "selected" );
    if(this.prevSelected != undefined && element != null) {
      element.id = this.prevSelected.toString();
    }

    this.prevSelected = id ; 
    element = document.getElementById( id.toString() );
    if(element){
      element.id = "selected";
    }
    
    // first to remove any previous marker 
    removeMarker(this.marker);

    // then to add a new marker in the selected area 
    this.marker = addMarker(country, this.map);

  }
}

/*
*  This method will load the map on the load of the component 
*  It creates a new map instance using MapBox GL and adds some layers to the map 
*  It also adds some events like mouse hover 
*/

function loadmap(): mapboxgl.Map {

  const map = new mapboxgl.Map({
    accessToken : 'pk.eyJ1Ijoicm9zaGFuMTk5NyIsImEiOiJja3ZkbnlxbGgydXp4MzNva3kyZnk4amU2In0.EGtcImaxj-mUEnlhgjAYrg' ,
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    zoom: 0,
    center: [0,0],
    bearing : 0 , 
    pitch : 0 
  });

  map.on('load' , () => {

      map.addSource('country-boundaries' , {
        type : 'vector' , 
        url  : 'mapbox://mapbox.country-boundaries-v1'
      });

      map.addLayer(
        {
          "id": "undisputed country boundary fill",
          "source": "country-boundaries",
          "source-layer": "country_boundaries",
          "type": "fill",
          "filter": [
              "==",
              [
                "get",
                "disputed"
              ],
            "false"
          ],
          "paint": {
              "fill-color": "rgba(66,100,251, 0.3)",
              "fill-outline-color": "#0000ff"
          }
        }
      );

      map.addLayer({
        "id": "disputed area boundary fill",
        "source": "country-boundaries",
        "source-layer": "country_boundaries",
        "type": "fill",
        "filter": [
          "==",
          [
            "get",
            "disputed"
          ],
          "true"
        ],
        "paint": {
          "fill-color": "rgba(200,100,251, 0.3)",
          "fill-outline-color": "#ff0000"
        }
      });

      map.resize();

  });
  return map;

}

/*
*  This method mainly adds a marke to given location and flies to that location    
*  It takes the location as the first parameter and the map as the second parameter 
*  where the marker needs to be added.
*  After placng a marker, it flies to that location and creates a popup to show the stats about that 
*  country.
*/

function addMarker( location: any , map: mapboxgl.Map | undefined ): mapboxgl.Marker {
    
  let loc: [ number, number ] = [ location.geometry.x, location.geometry.y  ] ;
  let marker: mapboxgl.Marker = new mapboxgl.Marker({
    color: "red",
    draggable: false
  }).setLngLat(loc) ; 
  
  if( map != undefined ){
    marker.addTo(map) ; 
    map.flyTo({
      center: loc ,
      zoom: 4 , 
      speed: 0.3 
    });
  }
  addPopUp(location, marker, map);
  return marker;
}

/*
* This method will construct the payload for the popup with different stats
* Then the payload will be added in the popup and the popup is added to a marker and return the marker 
* @param - data , json with the stats of covid for that country
* @param - marker to which the popup needs to be added
* @param - map to which the marker is added
*/

function addPopUp( data: any, marker: mapboxgl.Marker,  map: mapboxgl.Map | undefined ): mapboxgl.Marker {

  let content =  "<div class='content container'>" + 
    "Confirmed Cases : " +  data.attributes.Confirmed.toFixed(2)      + "<br>" +
    "Total Deaths : "    +  data.attributes.Deaths.toFixed(2)         + "<br>" + 
    "Mortality Rate : "  +  data.attributes.Mortality_Rate.toFixed(2) + "<br>" +
    "Incident Rate : "   +  data.attributes.Incident_Rate.toFixed(2)  + "<br>" +
    "</div>" ;
  if( map != undefined ) {
    let popup = new mapboxgl.Popup().setHTML(content).addTo(map);
    marker.setPopup(popup);
  }
  return marker ;

}


/*
*  This method will remove a marker
* @param - marker instance that will be removed  
*/

function removeMarker( marker : mapboxgl.Marker | undefined ){
  
  if( marker != undefined ){
    marker.remove();
  }

}