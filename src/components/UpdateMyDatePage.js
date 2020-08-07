import React from 'react';
import { Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import MainNavbar from './navigation/MainNavbar';
import UpdateMyDateForm from './forms/UpdateMyDateForm';

const UpdateMyDatePage = (props) => {
	return (
		<div>
			<MainNavbar />
			<Col className="my-4 my-sm-3">
				<UpdateMyDateForm />
			</Col>
		</div>
	);
};

export default withRouter(UpdateMyDatePage);
