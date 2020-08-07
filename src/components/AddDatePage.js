import React from 'react';
import { Col } from 'react-bootstrap';

import MainNavbar from './navigation/MainNavbar';
import AddDateForm from './forms/AddDateForm';

const AddDatePage = () => {
	return (
		<div>
			<MainNavbar />
			<Col
				className="my-3"
				xs={{ span: 10, offset: 1 }}
				md={{ span: 10, offset: 1 }}
				lg={{ span: 8, offset: 2 }}
			>
				<AddDateForm />
			</Col>
		</div>
	);
};

export default AddDatePage;
