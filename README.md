## Neighborhood Map (React) Project [FEND]

The purpose of this project was to built a single page application featuring a map of my neighborhood or a neighborhood I would like to visit. I chose Auckland, New Zealand, because my family live nearby and we might be moving there soon!  As New Zealanders take their coffee very seriously, the map displays favorite coffee spots in the city.

We were asked to add functionality to the map including highlighted locations, third-party data about those locations and various ways to browse the content.

## The Challenge

The neighborhood map application was complex and incorporated a variety of data points that could have easily have let it become unwieldy to manage. It incorporates a number of frameworks, libraries and APIs, which have to be successfully negotiated.

### To start the Application

* [clone](https://github.com/kedevked/webinar-map-react) or [download](https://github.com/stealing-pencils/NewZealand-Maps-Project/archive/master.zip) this repository
* using your terminal (or equivalent), cd into the directory that this application can be found in  
* run `npm install` to install the project dependencies
* start the application by inputting `npm start`
* the App can be viewed in your preferred browser at `localhost:3000`

## The Application Includes

```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with the app.
├── package.json # npm package manager file.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── App.css # Styles for the app.
    ├── App.js # This is the root of your app. Includes much of the app code including links to all components to allow easy styling with CSS Grid. This is the home page for the App.  
    |       |
    |       |___ResultsList.js #Displays results sidebar for  app home page.
    │
    ├── App.test.js # Used for testing. Provided with Create React App.
    ├── ApiIndex.js # A FourSquare API request for backend
    │
    |__ serviceWorker.js # To support the app's serviceworker
    |  
    ├── index.css # Global styles.
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
```

## Contributing

This project was started from scratch, but the project rubric and testing came from Udacity.

# Library used:
* [google-maps-react] (https://www.npmjs.com/package/google-maps-react)

# I used the help of:
* Huge thank you to the Udacity community, particularly on Slack
* [Neighborhood Map Walk-Thru by Forrest Walker  -  YouTube](https://www.youtube.com/playlist?list=PL4rQq4MQP1crXuPtruu_eijgOUUXhcUCP)
* [Webinar: Neighborhood Map (P7) Oct-27 walk-thru with @DougBrown.ProjectCoach](https://www.youtube.com/watch?v=NVAVLCJwAAo&feature=youtu.be)
* Troubleshooting assistance from StackOverflow and the Udacity Mentors and Community

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
