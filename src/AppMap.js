import React, { Component } from 'react';
import {Map, InfoWindow, GoogleApiWrapper} from 'google-maps-react';
import './App.css';
import ResultsList from './ResultsList.js';


var foursquare = require('react-foursquare')({
clientID: 'OVXN3KG3ITFHVC2XKVARXSTXTSHRLL0OVRIUQCQE53WMPOUO',
clientSecret: 'DFKG33VIWQSY5ARPP0QNYVYWPGMDDFHHWML5MUBIE4W134OM'
});


class AppMap extends Component {

  state = {
    markers: [],
    map: null,
    activeMarker: {},
    activeMarkerInfo: [],
    showingInfoWindow: false,
    venues: [],
    center: [],
    venuesInfo: [],
    queryLocation: {
      "near": "Auckland, NZ",
      "query": "coffee"
    }
  }

 componentDidMount() {
      foursquare.venues.getVenues(this.state.queryLocation)
        .then(res=> {
          const {venues} = res.response
          const {center} = res.response.geocode.feature.geometry
          const venuesInfo = venues.map(venue => {
            return {
              name: venue.name,
              id: venue.id,
              address: venue.location.address,
              pos: {"lat": venue.location.lat, "lng": venue.location.lng}
            }
          })

          this.setState({venues, center, venuesInfo})

          this.addMarkers(this.state.venuesInfo)

        });
    }

  // initialize map
  mapReady = (props, map) => {
        // Save the map reference in state and prepare the location markers
        this.setState({map});
  }

  closeInfoWindow = () => {
    this.state.activeMarker && 
    this.setState({ showingInfoWindow: false, activeMarker: null})
  }

  onClickMarker = (marker) => {
    console.log(marker)

    this.closeInfoWindow()

    this.state.venuesInfo.forEach(info => {
      if(info.id === marker.id) {
        this.setState({ activeMarkerInfo : info })
      }
    })
    console.log(this.state.activeMarkerInfo)
    // marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
    this.setState({ showingInfoWindow: true, activeMarker: marker })
  }

  addMarkers = (venuesInfo) => {
    // check there are values coming from venuesInfo props
    if(!venuesInfo) {
      return console.log("no venue info")
    }

    // removes any markers on the page
    this.state.markers.forEach(marker => marker.setMap(null))

    // maps over markervenues to create instances for each marker and
    // separating them into an array which can be saved in the markers state
    let markers = venuesInfo.map((info, index) => {
      // create marker using google maps react
      let marker = new this.props.google.maps.Marker({
        position: info.pos,
        map: this.state.map,
        animation: this.props.google.maps.Animation.DROP,
        id: info.id
      })

      marker.addListener('click', () => {
        this.onClickMarker(marker)
      })

      //
      // let infoWindow = new this.props.google.maps.InfoWindow({
      //           content: `<div class="location-data">
      //             <h2>${info.name}</h2>
      //             <p class="location-details">
      //             <strong>Address:</strong> ${info.address}<br/>
      //             </p>
      //           </div>`,
      //           maxWidth: 300
      //         });

       // marker.addListener('click', () => {
       //    infoWindow.open(this.state.map, marker);
       //    console.log(marker)
       //     // this.setState({ markers : Object.assign(this.state.markers, marker)})
       //     marker.setAnimation(window.google.maps.Animation.BOUNCE);
       //     setTimeout(() => {
       //       marker.setAnimation(null);
       //     }, 1500);
       //  });

      return marker
    })
    this.setState({markers})
  }


  render() {

    console.log(this.state.venuesInfo)
    window.states = this.state;

    if (!this.props.loaded) {
      return <div>Loading...</div>
    }

    return (
        <Map
        onReady = {this.mapReady}
        google={this.props.google}
        style={{width: '100%', height: '100%'}}
        className={'map'}
        zoom={13}
        initialCenter={{
          lat: -36.848461,
          lng: 174.763336
        }}
        onClick = {this.closeInfoWindow}
        >
          <InfoWindow
            marker = {this.state.activeMarker}
            visible = {this.state.showingInfoWindow}
            onClose = {this.closeInfoWindow}
          >
            <div className="infoWindow-content">
              <h2>{this.state.activeMarkerInfo.name}</h2>
              <p className="location-details">
              <strong>Address:</strong> {this.state.activeMarkerInfo.address}<br/>
              </p>
            </div>
          </InfoWindow>
        </Map>
    )
  }
}
export default GoogleApiWrapper({
  apiKey: ("AIzaSyBJ39aLUnpQEi-Ewf6EIIKguFlX-z_SNbw")
})(AppMap)
