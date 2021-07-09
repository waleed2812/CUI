// Defaults
import React from "react";

// Installs
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

// Custom
import Routing from "./views/index/routing";
import { alertOptions } from "./constants/options";

function App() {
	return (
		<AlertProvider template={AlertTemplate} {...alertOptions}>
			<Routing />
		</AlertProvider>
	);
}

export default App;
