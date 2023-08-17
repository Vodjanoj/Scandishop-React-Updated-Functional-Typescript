import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ApolloProvider } from "@apollo/client";
import { client } from "./graphql/queries";
import "./index.css";
import App from "./App";
import store, { persistor } from "./store/index";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <BrowserRouter>
        <React.StrictMode>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
        </React.StrictMode>
      </BrowserRouter>
    </Provider>
  </ApolloProvider>
);
