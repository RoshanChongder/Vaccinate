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

  data : any = undefined ;
  map : mapboxgl.Map | undefined ; 
  marker : mapboxgl.Marker | undefined ;
  prevSelected : number | undefined ;

  constructor( private dataService : DataServiceUNService ) { }

  ngOnInit(): void {
    
    this.map = loadmap();

    // calling for service - testing purpose 
    this.dataService.getCovidDate().subscribe( (response) =>{
      console.log("Data Received " , response.features );
      this.data = response.features ;
    } , ( error ) => {
      console.log("Some error occured");
    } ) ;
  }

  // method to locat a country on the map using a marker 
  locate( country : any , id : number ) {
    console.log( "Locate - " , country , id , typeof id );
    
    let element : HTMLElement | null = document.getElementById( "selected" ) ;
    if( this.prevSelected != undefined && element != null ){
      element.id = this.prevSelected.toString() ; 
    }

    this.prevSelected = id ; 
    element = document.getElementById( id.toString() ) ;
    if( element ){
      element.id = "selected" ;
    }
    
    // first to remove any previous marker 
    removeMarker( this.marker ) ;

    // then to add a new marker in the selected area 
    this.marker = addMarker( country , this.map ) ;

  }

}

/*
*  Method that will load the map and the layers to it  
*/

function loadmap() : mapboxgl.Map {

  // need to load the vetor tile set here 
  const map = new mapboxgl.Map({
    accessToken : 'pk.eyJ1Ijoicm9zaGFuMTk5NyIsImEiOiJja3ZkbnlxbGgydXp4MzNva3kyZnk4amU2In0.EGtcImaxj-mUEnlhgjAYrg' ,
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    zoom: 0,
    center: [0,0],
    bearing : 0 , 
    pitch : 0 
  });

  // on loading of the map do the following 
  map.on('load' , () => {
      
    //on loading of the map , add the vector tileset 
      map.addSource('country-boundaries' , {
        type : 'vector' , 
        url  : 'mapbox://mapbox.country-boundaries-v1'
      });

      //adding layer 1
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

      //adding layer 2 
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

      // on mouse hover over a country , it will log it's name 
      map.on('mousemove' , 'undisputed country boundary fill' , (e)=>{
          map.getCanvas().style.cursor = 'pointer';
          if( e.features?.length !=undefined && e.features?.length > 0 ) {
            console.log( e?.features[0].properties?.name_en );          
          }
      });

      map.on('mouseleave' , 'undisputed country boundary fill' , ()=> {
        map.getCanvas().style.cursor = '' ;
      });

      map.resize();

  });
  return map;

}

/*
*   Method that adds adds a marker and flys to the that location where the 
*   marker is added and then returns the add marker 
*/

function addMarker( location : any , map : mapboxgl.Map | undefined ) : mapboxgl.Marker {
    
  let loc : [ number , number ] = [ location.geometry.x , location.geometry.y  ] ;
  let marker : mapboxgl.Marker = new mapboxgl.Marker({
    color : "red" ,
    draggable : false
  }).setLngLat( loc ) ; 
  
  if( map != undefined ){
    marker.addTo( map ) ; 
    map.flyTo( {
      center : loc ,
      zoom : 4 , 
      speed : 0.3 
    }) ;
  }
  addPopUp( location , marker , map ) ;
  return marker ;
}

/*
* This method will add a popup to a marker and return the marker 
*/

function addPopUp( data : any , marker : mapboxgl.Marker ,  map : mapboxgl.Map | undefined ) : mapboxgl.Marker {

  let content =  "<div class='content container'>" + 
    "Confirmed Cases : " +  data.attributes.Confirmed.toFixed(2)      + "<br>" +
    "Total Deaths : "    +  data.attributes.Deaths.toFixed(2)         + "<br>" + 
    "Mortality Rate : "  +  data.attributes.Mortality_Rate.toFixed(2) + "<br>" +
    "Incident Rate : "   +  data.attributes.Incident_Rate.toFixed(2)  + "<br>" +
    "</div>" ;
  console.log( content );
  if( map != undefined ) {
    let popup = new mapboxgl.Popup().setHTML(content).addTo(map);
    marker.setPopup(popup);
  }
  
  return marker ;
}


/*
*  Method to remove a makrer from a map 
*/

function removeMarker( marker : mapboxgl.Marker | undefined ){
  console.log("Removing marker - " , marker );
  
  if( marker != undefined ){
    marker.remove();
  }
}