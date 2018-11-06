import React, { Component } from 'react';
import {Map, InfoWindow, GoogleApiWrapper} from 'google-maps-react';
import ReactDOM from 'react-dom';
import ResultsList from './ResultsList.js';
import './App.css';


var foursquare = require('react-foursquare')({
clientID: 'OVXN3KG3ITFHVC2XKVARXSTXTSHRLL0OVRIUQCQE53WMPOUO',
clientSecret: 'DFKG33VIWQSY5ARPP0QNYVYWPGMDDFHHWML5MUBIE4W134OM'
});


class App extends Component {


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
      },
      query: '',
      filteredVenues: []
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
                pos: {"lat": venue.location.lat, "lng": venue.location.lng},
                visibility: true
              }
            })
            this.setState({venues, center, venuesInfo, filteredVenues: venuesInfo})
            this.addMarkers(this.state.venuesInfo)
          });
      }

    // initialize map
    mapReady = (props, map) => {
          // Save the map reference in state and prepare the location markers
          this.setState({map});
    }

    updateQuery = (query) => {
      this.setState({query});
    }

    userQuery = (query) => {
        let matchingVenues = this.state.venuesInfo.filter(venue => {
          const queryMatch = venue.name.toLowerCase().includes(query.toLowerCase())
          const userVenues = this.state.markers.find(marker => marker.id === venue.id)
          userVenues.setMap(null)
          userVenues.visibility = false

          if(queryMatch){
            userVenues.setMap(this.state.map)
            userVenues.visiblity = true
          }
          return queryMatch
        })
        this.setState({
        filteredVenues : matchingVenues,
        query : query })
      }

    // this.setState({ filteredVenues : matchingVenues })


    //
    // updateQuery = (query) => {
    //   this.setState({ query : query })
    //   this.state.venuesInfo.map(venue => {
    //     if(venue.name.toLowerCase().includes(query.toLowerCase())) {
    //       console.log(venue.name)
    //       this.setState({ filteredVenues : venue.name })
    //       // return venue.name
    //     } else {
    //       // this.setState({ filteredVenues : })
    //       console.log("no match")
    //     }
    //     return venue
    //   })
    // }
    //     // console.log(foundMatch)
    //     const updateMarker = this.state.markers.find(marker => marker.id === venue.id)
    //     if(foundMatch){
    //       // this.closeInfoWindow()
    //       this.setState({ activeMarker : venue })
    //       this.setState({ showingInfoWindow : true })
    //     } else {
    //       this.setState({ activeMarker : {} })
    //       this.closeInfoWindow()
    //       // this.setState({ showingInfoWindow : false })
    //     }
    //     return updateMarker
    //   })
    // }

    //   this.state.venuesInfo.map(venue => {
    //     const queryMatch = venue.name.toLowerCase().includes(query.toLowerCase())
    //     const userQueryMarker = this.state.markers.find(marker => marker.id === venue.id)
    //     if(queryMatch) {
    //       console.log(venue)
    //       this.logResultsListClick(venue)
    //     } else {
    //       console.log("no match")
    //     }
    //     return userQueryMarker
    //   })
    // }


    //
    // // Takes details of click from ResultsList component
    logResultsListClick = (result) => {
       console.log(result)
       // maps over markers to find the correct marker
       this.state.markers.forEach((marker => {
         if(marker.id === result.id) {
           // then matches up the venue info to update the infowindow
           this.state.venuesInfo.forEach(info => {
             if(info.id === marker.id) {
               this.closeInfoWindow()
               this.setState({ activeMarkerInfo: info,
                 showingInfoWindow: true,
                 activeMarker: marker})
                 this.animateMarker(marker)
             }
           })
         }
       }))
    }

    // If any marker infowindows are open this will close them all
    closeInfoWindow = () => {
      this.state.activeMarker &&
      this.setState({ showingInfoWindow: false, activeMarker: null})
    }

    animateMarker = (marker) => {
      this.state.markers.forEach(marker => marker.setAnimation(null))
      marker.setAnimation(window.google.maps.Animation.BOUNCE);
    }
    // Opens infoWindow once marker is clicked
    onClickMarker = (marker) => {
      this.closeInfoWindow()
      this.animateMarker(marker)
      this.state.venuesInfo.forEach(info => {
        if(info.id === marker.id) {
          this.setState({ activeMarkerInfo : info })
        }
      })
      // updates information for infowindow
      console.log(this.state.activeMarkerInfo)
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
        return marker
      })
      this.setState({markers})
    }


  render() {
    console.log(this.state.filteredVenues)

    // window.states = this.state;
    return (
      <div className="App">

        <header className="App-header">
          Eat New Zealand
        </header>
        <div className = "search-bar-body">
          <div className = "search-bar-title">
            <h2>find what you fancy</h2>
          </div>
          <div className = 'search-field'>
            <input
              id="search-location-text"
              type="search"
              placeholder="Enter your favorite area!"
              value={this.state.query}
              onChange={(event) => this.userQuery(event.target.value)}
              />
            <input id="search-location-button" type="button" value="Zoom"/>
          </div>
        </div>

        <div className= 'map-body'>
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
        </div>

        <div className = "list-body">
          <ResultsList
            {...this.state}
            logResultsListClick = {this.logResultsListClick}
          />
        </div>
        <footer className="App-footer">
        </footer>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyBJ39aLUnpQEi-Ewf6EIIKguFlX-z_SNbw")
})(App)
