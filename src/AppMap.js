import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './App.css';

class AppMap extends Component {

  state = {
    markers: [],
    markerVenuesInfo: [],
    map: null,
    activeMarker: [],
    activeMarkerVenuesInfo: null,
    showingInfoWindow: false
  }

  // initialize map
  mapReady = (props, map) => {
        // Save the map reference in state and prepare the location markers
        this.setState({map});
        this.addMarkers(this.props.venuesInfo);
    }

  addMarkers = (venuesInfo) => {
    // check there are values coming from venuesInfo props
    if(! venuesInfo) {
      return
    }

    this.state
         .markers
         .forEach(marker => marker.setMap(null))

    let markerVenuesInfo = []
    let markers = venuesInfo.map((info, index) => {
      let markerInfo = {
        key: index,
        id: info.id,
        name: info.name,
        address: info.address,
        pos: info.pos
      }
      this.markerVenuesInfo.push(markerInfo)
    })

    let marker = new this.props.google.maps.Marker({
      position: venuesInfo.pos,
      map: this.state.map
    })

    this.setState({markers, markerVenuesInfo})

  }


  render() {




    return (
        <Map
        onready = {this.mapReady}
        google={this.props.google}
        style={{width: '100%', height: '100%'}}
        className={'map'}
        zoom={13}
        initialCenter={{
          lat: -36.848461,
          lng: 174.763336
        }}
        >
        </Map>

    )
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyBJ39aLUnpQEi-Ewf6EIIKguFlX-z_SNbw")
})(AppMap)
