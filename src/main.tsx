import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./index.tsx";
import { store } from "./store/index.ts";

import "normalize.css";
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
