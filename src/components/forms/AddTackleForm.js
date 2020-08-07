import React from 'react';
import {
	Form,
	Button,
	Container,
	Col,
	InputGroup,
	Row,
	Alert
} from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import Select from 'react-select';

import { toTitleCase } from '../../utils/toTitleCase';
import { CREATE_TACKLE } from '../../graphql-gql/mutation';

const options = [
	{ value: 'Yes', label: 'Overcharged' },
	{ value: 'No', label: 'Not Overcharged' }
];

const AddTackleForm = (props) => {
	const { register, handleSubmit, errors, control } = useForm();

	const [ createTackle ] = useMutation(CREATE_TACKLE);

	const onSubmit = (values) => {
		createTackle({
			variables: {
				rod: toTitleCase(values.rod),
				rodWeight: values.rodWeight,
				rodLengthFeet: values.rodLengthFeet,
				rodLengthInches: values.rodLengthInches,
				overcharged: values.overcharged.value,
				leaderLengthFeet: values.leaderLengthFeet,
				leaderLengthInches: values.leaderLengthInches,
				tippetSize: values.tippetSize
			}
		});
		props.history.push('/profile');
	};

	return (
		<div>
			<h2 className="text-center page-header my-sm-2 my-md-5">
				Add Tackle
			</h2>
			<Container>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Row>
						<Col xs={12} sm={6}>
							<Form.Group>
								<Form.Label htmlFor="rod">Rod Name</Form.Label>
								<Form.Control
									id="rod"
									name="rod"
									ref={register({
										required: 'Required Field',
										pattern: {
											value: /^[A-Za-z\s]+$/,
											message:
												'Must enter valid name for rod.'
										}
									})}
								/>
								{errors.rod && (
									<Alert variant="danger">
										{errors.rod.message}
									</Alert>
								)}
							</Form.Group>
							<Form.Group className="mb-1">
								<Form.Label htmlFor="rodLengthFeet">
									Rod Length
								</Form.Label>
								<Row>
									<Col>
										<InputGroup>
											<Form.Control
												id="rodLengthFeet"
												type="number"
												name="rodLengthFeet"
												className="form-control-input-group-prepend"
												ref={register({
													required: 'Required Field'
												})}
											/>

											<InputGroup.Append>
												<InputGroup.Text className="input-group-text-prepend">
													Ft.
												</InputGroup.Text>
											</InputGroup.Append>
										</InputGroup>
										{errors.rodLengthFeet && (
											<Alert variant="danger">
												{errors.rodLengthFeet.message}
											</Alert>
										)}
									</Col>
									<Col>
										<InputGroup>
											<Form.Control
												id="rodLengthInches"
												type="number"
												name="rodLengthInches"
												className="form-control-input-group-prepend"
												ref={register({
													required: 'Required Field'
												})}
											/>

											<InputGroup.Append>
												<InputGroup.Text className="input-group-text-prepend">
													In.
												</InputGroup.Text>
											</InputGroup.Append>
										</InputGroup>
										{errors.rodLengthInches && (
											<Alert variant="danger">
												{errors.rodLengthInches.message}
											</Alert>
										)}
									</Col>
								</Row>
							</Form.Group>

							<Form.Group className="mb-1">
								<Form.Label htmlFor="rodWeight">
									Rod Weight
								</Form.Label>
								<InputGroup>
									<Form.Control
										type="number"
										id="rodWeight"
										name="rodWeight"
										className="form-control-input-group-prepend"
										ref={register({
											required: 'Required Field'
										})}
									/>

									<InputGroup.Append>
										<InputGroup.Text className="input-group-text-prepend">
											Wt.
										</InputGroup.Text>
									</InputGroup.Append>
								</InputGroup>
								{errors.rodWeight && (
									<Alert variant="danger">
										{errors.rodWeight.message}
									</Alert>
								)}
							</Form.Group>
						</Col>
						<Col xs={12} sm={6}>
							<Form.Group className="mb-1">
								<Form.Label htmlFor="overcharged">
									Overcharged
								</Form.Label>
								<Controller
									control={control}
									as={<Select />}
									options={options}
									id="overcharged"
									name="overcharged"
									isClearable
									rules={{ required: 'Required Field' }}
								/>
								{errors.overcharged && (
									<Alert variant="danger">
										{errors.overcharged.message}
									</Alert>
								)}
							</Form.Group>
							<Form.Group className="mb-1">
								<Form.Label htmlFor="leaderLengthFeet">
									Leader Length
								</Form.Label>
								<Row>
									<Col>
										<InputGroup>
											<Form.Control
												id="leaderLengthFeet"
												name="leaderLengthFeet"
												type="number"
												className="form-control-input-group-prepend"
												ref={register({
													required: 'Required Field'
												})}
											/>
											<InputGroup.Append>
												<InputGroup.Text className="input-group-text-prepend">
													Ft.
												</InputGroup.Text>
											</InputGroup.Append>
										</InputGroup>
										{errors.leaderLengthFeet && (
											<Alert variant="danger">
												{
													errors.leaderLengthFeet
														.message
												}
											</Alert>
										)}
									</Col>
									<Col>
										<InputGroup>
											<Form.Control
												id="leaderLengthInches"
												name="leaderLengthInches"
												type="number"
												className="form-control-input-group-prepend"
												ref={register({
													required: 'Required Field'
												})}
											/>
											<InputGroup.Append>
												<InputGroup.Text className="input-group-text-prepend">
													In.
												</InputGroup.Text>
											</InputGroup.Append>
										</InputGroup>
										{errors.leaderLengthInches && (
											<Alert variant="danger">
												{
													errors.leaderLengthInches
														.message
												}
											</Alert>
										)}
									</Col>
								</Row>
							</Form.Group>
							<Form.Group className="mb-1">
								<Form.Label htmlFor="tippetSize">
									Tippet Size
								</Form.Label>
								<InputGroup>
									<Form.Control
										id="tippetSize"
										type="number"
										name="tippetSize"
										className="form-control-input-group-prepend"
										ref={register({
											required: 'Required Field'
										})}
									/>
									<InputGroup.Append>
										<InputGroup.Text className="input-group-text-prepend">
											X
										</InputGroup.Text>
									</InputGroup.Append>
								</InputGroup>
								{errors.tippetSize && (
									<Alert variant="danger">
										{errors.tippetSize.message}
									</Alert>
								)}
							</Form.Group>
						</Col>
					</Row>
					<div className=" my-3 d-flex justify-content-center">
						<Button variant="outline-dark-blue" type="submit">
							Add My Tackle!
						</Button>
					</div>
				</Form>
			</Container>
		</div>
	);
};

export default withRouter(AddTackleForm);
