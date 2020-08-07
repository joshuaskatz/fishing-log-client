import React from 'react';
import { useForm } from 'react-hook-form';
import { Col, Form, Button, Alert, Container } from 'react-bootstrap';
import { useMutation } from '@apollo/react-hooks';

import { toTitleCase } from '../../utils/toTitleCase';
import { CREATE_FISH } from '../../graphql-gql/mutation';

const AddFishForm = () => {
	const { register, handleSubmit, errors, reset } = useForm();

	const [ createFish ] = useMutation(CREATE_FISH);

	const onSubmit = (values) => {
		createFish({
			variables: {
				species: toTitleCase(values.species),
				subspecies: toTitleCase(values.subspecies)
			}
		});
		reset();
	};

	return (
		<div>
			<h2 className="text-center page-header">Add Fish</h2>
			<Container>
				<Col
					xs={{ span: 10, offset: 1 }}
					md={12}
					lg={{ span: 9, offset: 1 }}
				>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<Form.Group>
							<Form.Label htmlFor="species">Species</Form.Label>
							<Form.Control
								id="species"
								name="species"
								ref={register({
									required: 'Required Field',
									pattern: {
										value: /^[A-Za-z\s]+$/,
										message:
											'Must enter valid name for a river.'
									}
								})}
							/>
							{errors.species && (
								<Alert variant="danger">
									{errors.species.message}
								</Alert>
							)}
						</Form.Group>
						<Form.Group>
							<Form.Label htmlFor="subspecies">
								Subspecies{' '}
								<Form.Text className="d-inline">
									(optional)
								</Form.Text>
							</Form.Label>
							<Form.Control
								id="subspecies"
								name="subspecies"
								ref={register({
									pattern: {
										value: /^[A-Za-z\s]+$/,
										message:
											'Must enter valid name for a river.'
									}
								})}
							/>
							{errors.subspecies && (
								<Alert variant="danger">
									{errors.subspecies.message}
								</Alert>
							)}
						</Form.Group>
						<div className=" my-3 d-flex justify-content-center">
							<Button variant="outline-dark-blue" type="submit">
								Add Fish!
							</Button>
						</div>
					</Form>
				</Col>
			</Container>
		</div>
	);
};

export default AddFishForm;
