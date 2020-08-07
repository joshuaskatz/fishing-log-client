import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

import MainNavbar from './navigation/MainNavbar';
import AddFishForm from './forms/AddFishForm';
import FishList from './query-lists/FishList';

export const AddFishPage = () => {
	return (
		<div>
			<MainNavbar />
			<Container fluid className="my-4 my-sm-3 my-md-5">
				<Row>
					<Col md={4} lg={6}>
						<AddFishForm />
					</Col>
					<Col className="my-4 my-md-0" md={8} lg={6}>
						<FishList />
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export { AddFishPage as default };
