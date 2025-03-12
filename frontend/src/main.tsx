import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { store } from "./store/store.ts";
import { Provider } from "react-redux";

const root = createRoot(document.getElementById("root")!);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
