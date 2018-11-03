import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './App.css';



var foursquare = require('react-foursquare')({
clientID: 'OVXN3KG3ITFHVC2XKVARXSTXTSHRLL0OVRIUQCQE53WMPOUO',
clientSecret: 'DFKG33VIWQSY5ARPP0QNYVYWPGMDDFHHWML5MUBIE4W134OM'
});

class AppMap extends Component {

  state = {
    markers: [],
    markerVenuesInfo: [],
    map: null,
    activeMarker: [],
    activeMarkerVenuesInfo: null,
    showingInfoWindow: false,
    venues: [],
    center: [],
    venuesInfo: [],
    queryLocation: {
      "near": "Auckland, NZ",
      "query": "coffee"
  }
}

  // Requests info from foursquare
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
              pos: `{"lat": ${venue.location.lat}, "lng": ${venue.location.lng}}`
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

        console.log("at mapReady")
        this.addMarkers(this.props.venuesInfo)

  }


  addMarkers = (venuesInfo) => {

    // check there are values coming from venuesInfo props
    if(!venuesInfo) {
      return console.log("no venue info")
    }

    // removes any markers on the page
    this.state
         .markers
         .forEach(marker => marker.setMap(null))

    // Creates array for each mapped venue ready to be added to its corresponding
    // state
    let markerVenuesInfo = []

    // maps over markervenues to create instances for each marker and
    // separating them into an array which can be saved in the markers state
    let markers = venuesInfo.map((info, index) => {
      markerVenuesInfo.push(info)
      console.log(markerVenuesInfo)
      // create marker using google maps react
      let marker = new this.props.google.maps.Marker({
        position: markerVenuesInfo.pos,
        map: this.state.map
      })
      return marker
    })
    this.setState({markers, markerVenuesInfo})

  }


  render() {
    let activeInfo = this.state.activeMarkerVenuesInfo
    // console.log(this.props.venuesInfo)
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
        >
        </Map>

    )
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyBJ39aLUnpQEi-Ewf6EIIKguFlX-z_SNbw")
})(AppMap)
