import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Container, Col, Form, Button, Alert } from 'react-bootstrap';
import Select from 'react-select';
import { useMutation } from '@apollo/react-hooks';

import { toTitleCase } from '../../utils/toTitleCase';
import { CREATE_FLY } from '../../graphql-gql/mutation';

const options = [
	{ value: 'Dry', label: 'Dry' },
	{ value: 'Nymph', label: 'Nymph' },
	{ value: 'Streamer', label: 'Streamer' },
	{ value: 'Wet', label: 'Wet' }
];

const AddFlyForm = () => {
	const { register, handleSubmit, control, errors, reset } = useForm();

	const [ createFlies ] = useMutation(CREATE_FLY);

	const onSubmit = (values) => {
		createFlies({
			variables: {
				type: values.type.value,
				name: toTitleCase(values.name),
				color: toTitleCase(values.color)
			}
		});
		reset();
	};

	return (
		<div>
			<h2 className="text-center page-header">Add Flies</h2>
			<Container>
				<Col
					xs={{ span: 10, offset: 1 }}
					md={12}
					lg={{ span: 9, offset: 1 }}
				>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<Form.Group className="mb-1">
							<Form.Label htmlFor="type">Type</Form.Label>
							<Controller
								control={control}
								as={<Select />}
								options={options}
								id="type"
								name="type"
								isClearable
								rules={{
									required: 'Required Field'
								}}
							/>
							{errors.type && (
								<Alert variant="danger">
									{errors.type.message}
								</Alert>
							)}
						</Form.Group>
						<Form.Group>
							<Form.Label htmlFor="name">Name</Form.Label>
							<Form.Control
								id="name"
								name="name"
								ref={register({
									required: 'Required Field',
									pattern: {
										value: /^[A-Za-z\s]+$/,
										message:
											'Must enter valid name for a fly.'
									}
								})}
							/>
							{errors.name && (
								<Alert variant="danger">
									{errors.name.message}
								</Alert>
							)}
						</Form.Group>
						<Form.Group>
							<Form.Label htmlFor="color">Color</Form.Label>
							<Form.Control
								id="color"
								name="color"
								ref={register({
									required: 'Required Field',
									pattern: {
										value: /^[A-Za-z\s]+$/,
										message:
											'Must enter valid color for a fly.'
									}
								})}
							/>
							{errors.color && (
								<Alert variant="danger">
									{errors.color.message}
								</Alert>
							)}
						</Form.Group>
						<div className=" my-3 d-flex justify-content-center">
							<Button variant="outline-dark-blue" type="submit">
								Add The Fly!
							</Button>
						</div>
					</Form>
				</Col>
			</Container>
		</div>
	);
};

export default AddFlyForm;
