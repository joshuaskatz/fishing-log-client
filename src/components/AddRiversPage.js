import React from 'react';
import { Container } from 'react-bootstrap';

import MainNavbar from './navigation/MainNavbar';
import AddRiverForm from './forms/AddRiverForm';

export const AddRiversPage = () => {
	return (
		<div>
			<MainNavbar />

			<Container lg={{ span: 10, offset: 1 }} className="my-4 my-sm-3">
				<AddRiverForm />
			</Container>
		</div>
	);
};

export { AddRiversPage as default };
