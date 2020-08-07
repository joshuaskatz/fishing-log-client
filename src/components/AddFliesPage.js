import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

import MainNavbar from './navigation/MainNavbar';
import AddFlyForm from './forms/AddFlyForm';
import FliesList from './query-lists/FliesList';

export const AddFliesPage = () => {
	return (
		<div>
			<MainNavbar />
			<Container fluid className="my-4 my-sm-3 my-md-5">
				<Row>
					<Col md={4} lg={6}>
						<AddFlyForm />
					</Col>
					<Col className="my-4 my-md-0" md={8} lg={6}>
						<FliesList />
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export { AddFliesPage as default };
