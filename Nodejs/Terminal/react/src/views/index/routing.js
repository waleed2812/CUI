// Defaults
import React from "react";

// Installs
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

// Custom Components
import NotFound from "./notfound";
import Index from "../../components/Index";
import AddCandidate from "../../components/AddCandidate";

function Routing() {

	return (
		<Router>
			<Switch>
				<Route path="/" exact>
					<Index/>
				</Route>
				<Route path="/add" exact>
					<AddCandidate/>
				</Route>
				<Route component={NotFound} />
			</Switch>
		</Router>
	);
}

export default Routing;
