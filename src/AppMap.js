import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './App.css';

class AppMap extends Component {


  render() {


    return (
        <Map
        google={this.props.google}
        style={{width: '100%', height: '100%'}}
        className={'map'}
        zoom={14}
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
