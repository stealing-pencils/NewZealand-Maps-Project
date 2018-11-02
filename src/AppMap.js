import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './App.css';

class AppMap extends Component {

  state = {
    map: null,
  }

  // initialize map
  mapReady = (props, map) => {
        // Save the map reference in state and prepare the location markers
        this.setState({map});
        this.updateMarkers(this.props.locations);
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
