import ReactDOM from 'react-dom/client';

import App from './App.tsx';

import "./main.scss";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import { BrowserRouter } from 'react-router-dom';

export const client = new ApolloClient({

  uri: 'http://localhost:8080/graphql',

  cache: new InMemoryCache(),

});

ReactDOM.createRoot(document.getElementById('root')!).render(

  <BrowserRouter>

    <ApolloProvider client={ client }>

      <App />

    </ApolloProvider>

  </BrowserRouter>

);
