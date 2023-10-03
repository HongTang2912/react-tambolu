import React from "react";
import { Provider } from "react-redux";
import store from "../store"; // Import your Redux store

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
