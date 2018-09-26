# Binance Front-end using React, Redux 

Order books and trade history viewer web app. Front-End implementation of Binance Websockets and REST APIs using React and Redux. Live demo: [https://binance-front-end-web-app.firebaseapp.com/](https://binance-front-end-web-app.firebaseapp.com/)

### Features:

* Home Page - list of market pairs
* Trade Page - shows the order book (buys/sells) and list of trades for a one market pair

### Built using:

* React
* Redux (via react-redux)
* React-router (via react-router-dom)
* Bootstrap 4 (CSS only) for styling and responsiveness
* cors-anywhere web proxy for surpassing REST API CORS in browser
* Websocket implementation of Binance web-socket-streams 
* Axios for cross-browser XMLHttpRequests
* Bignumber.js for precision number display and calculations
* Bootstrapped with Create React App