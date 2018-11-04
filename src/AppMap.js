import React, { Component } from 'react';
import {Map, InfoWindow, GoogleApiWrapper} from 'google-maps-react';
import './App.css';




class InfowindowDisplay extends Component {


  render() {

    return (

      <InfoWindow
        marker = {this.props.activeMarker}
        visible = {this.props.showingInfoWindow}
        onClose = {this.props.closeInfoWindow}
      >
        <div className="infoWindow-content">
          <h2>{this.props.activeMarkerInfo.name}</h2>
          <p className="location-details">
          <strong>Address:</strong> {this.props.activeMarkerInfo.address}<br/>
          </p>
        </div>
      </InfoWindow>

    )
  }
}

export default InfowindowDisplay
