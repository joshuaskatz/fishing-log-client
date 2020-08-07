import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect
} from 'react-router-dom';
import { useApolloClient } from '@apollo/react-hooks';

import LoginPage from '../components/LoginPage';
import SignUpPage from '../components/SignUpPage';
import HomePage from '../components/HomePage';
import AddDatePage from '../components/AddDatePage';
import AddTacklePage from '../components/AddTacklePage';
import FindWaterNearMePage from '../components/FindWaterNearMePage';
import AddFishPage from '../components/AddFishPage';
import AddFliesPage from '../components/AddFliesPage';
import AddRiversPage from '../components/AddRiversPage';
import ProfilePage from '../components/ProfilePage';
import UpdateMyDatePage from '../components/UpdateMyDatePage';
import UpdateMyTacklePage from '../components/UpdateMyTacklePage';
import NotFoundPage from '../components/NotFoundPage';

import { isAuth } from '../utils/isAuth';

//user can only view pages when logged in
const AppRouter = () => {
	const client = useApolloClient();

	return (
		<Router>
			<Switch>
				<Route path="/signup" component={SignUpPage} exact={true} />
				<Route path="/" component={LoginPage} exact={true} />
				<Route
					path="/home"
					render={() =>
						isAuth(client) ? <HomePage /> : <Redirect to="/" />}
				/>
				<Route
					path="/adddates"
					render={() =>
						isAuth(client) ? <AddDatePage /> : <Redirect to="/" />}
				/>
				<Route
					path="/addtackle"
					render={() =>
						isAuth(client) ? (
							<AddTacklePage />
						) : (
							<Redirect to="/" />
						)}
				/>
				<Route
					path="/findwaternearme"
					render={() =>
						isAuth(client) ? (
							<FindWaterNearMePage />
						) : (
							<Redirect to="/" />
						)}
				/>
				<Route
					path="/createfish"
					render={() =>
						isAuth(client) ? <AddFishPage /> : <Redirect to="/" />}
				/>
				<Route
					path="/createflies"
					render={() =>
						isAuth(client) ? <AddFliesPage /> : <Redirect to="/" />}
				/>
				<Route
					path="/createrivers"
					render={() =>
						isAuth(client) ? (
							<AddRiversPage />
						) : (
							<Redirect to="/" />
						)}
				/>
				<Route
					path="/profile"
					render={() =>
						isAuth(client) ? <ProfilePage /> : <Redirect to="/" />}
				/>
				<Route
					path="/updatemydate/:id"
					render={() =>
						isAuth(client) ? (
							<UpdateMyDatePage />
						) : (
							<Redirect to="/" />
						)}
				/>
				<Route
					path="/updatemytackle/:id"
					render={() =>
						isAuth(client) ? (
							<UpdateMyTacklePage />
						) : (
							<Redirect to="/" />
						)}
				/>
				<Route component={NotFoundPage} />
			</Switch>
		</Router>
	);
};

export { AppRouter as default };
