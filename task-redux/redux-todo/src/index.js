import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import combinedReducers from "./reducers";
import App from "./components/App";
import { unregister } from "./serviceWorker";

const store = createStore(combinedReducers);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

unregister();
