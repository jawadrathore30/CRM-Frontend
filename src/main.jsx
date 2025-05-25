import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ThemeProvider from "./components/theme-provider";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store.js";

createRoot(document.getElementById("root")).render(
	<PersistGate loading={null} persistor={persistor}>
		<Provider store={store}>
			<StrictMode>
				<ThemeProvider />
				<App />
			</StrictMode>
		</Provider>
	</PersistGate>
);
