import React, { createContext } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './style.scss'


import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";

const client = new ApolloClient({
  uri: 'http://localhost:8080/query',
  cache: new InMemoryCache()
});

window.addEventListener("load", () => {
  navigator.serviceWorker
    .register("./serviceWorker.js")
    .then(res => console.log("service worker registered"))
    .catch(err => console.log("service worker not registered", err));
});

ReactDOM.render(

  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>,
  document.getElementById('root'),
)
