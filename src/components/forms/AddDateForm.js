import React, { useState } from 'react';
import {
	Form,
	Button,
	Container,
	Row,
	Col,
	InputGroup,
	Alert
} from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/react-hooks';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Select from 'react-select';
import { withRouter } from 'react-router-dom';

import { CREATE_DATE } from '../../graphql-gql/mutation';

import {
	GET_FLIES,
	GET_FISH,
	GET_MY_TACKLE,
	GET_RIVER
} from '../../graphql-gql/query';

import {
	fishOptions,
	flyOptions,
	myTackleOptions,
	riverOptions
} from '../../utils/options';

const AddDateForm = (props) => {
	const [ startDate, setStartDate ] = useState(new Date());

	const [ createDate ] = useMutation(CREATE_DATE);

	const fliesQuery = useQuery(GET_FLIES);
	const fishQuery = useQuery(GET_FISH);
	const myTackleQuery = useQuery(GET_MY_TACKLE);
	const riverQuery = useQuery(GET_RIVER);

	const optionsFish = fishOptions(fishQuery);
	const optionsFly = flyOptions(fliesQuery);
	const optionsMyTackle = myTackleOptions(myTackleQuery);
	const optionsRiver = riverOptions(riverQuery);

	const { register, handleSubmit, errors, control } = useForm();

	const onSubmit = (values) => {
		const dateValue = moment(values.date).format('MMMM Do, YYYY');
		const fishValues = values.fish && values.fish.map((f) => f.value);
		const fliesValues = values.flies.map((fly) => fly.value);

		createDate({
			variables: {
				date: dateValue,
				amountCaught: values.amount,
				averageSize: values.average,
				largestSize: values.largest,
				fish: fishValues,
				flies: fliesValues,
				river: values.river.value,
				tackle: values.tackle.value
			}
		});
		props.history.push('/profile');
	};

	return (
		<div>
			<h2 className="text-center page-header my-sm-2 my-md-5">
				Add Date
			</h2>
			<Container>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Row>
						<Col xs={12} sm={6}>
							<Form.Group>
								<div className="">
									<Form.Label htmlFor="date">Date</Form.Label>
								</div>
								<div className="customDatePickerWidth">
									<Controller
										as={<DatePicker />}
										selected={startDate}
										onSelect={(date) => {
											setStartDate(date);
										}}
										control={control}
										id="date"
										name="date"
										className=" form-control"
										placeholderText="Select date"
										rules={{
											required: true
										}}
									/>
								</div>
							</Form.Group>

							<Form.Group>
								<Form.Label htmlFor="amount">
									Amount of Fish Caught
								</Form.Label>
								<Form.Control
									type="number"
									id="amount"
									name="amount"
									ref={register({
										required: 'Required Field',
										pattern: {
											value: /^[+]?\d*\.?\d*$/,
											message:
												'Must enter valid value for amount of fish caught.'
										}
									})}
								/>
								{errors.amount && (
									<Alert variant="danger">
										{errors.amount.message}
									</Alert>
								)}
							</Form.Group>

							<Form.Group>
								<Form.Label htmlFor="average">
									Average Size of Fish
								</Form.Label>
								<InputGroup>
									<Form.Control
										type="number"
										id="average"
										name="average"
										className="form-control-input-group-prepend"
										ref={register({
											pattern: {
												value: /^[+]?\d*\.?\d*$/,
												message:
													'Must enter valid value for average size of fish caught.'
											}
										})}
									/>
									<InputGroup.Append>
										<InputGroup.Text className="input-group-text-prepend">
											In.
										</InputGroup.Text>
									</InputGroup.Append>
								</InputGroup>
								{errors.average && (
									<Alert variant="danger">
										{errors.average.message}
									</Alert>
								)}
							</Form.Group>

							<Form.Group>
								<Form.Label htmlFor="largest">
									Largest Fish Caught
								</Form.Label>
								<InputGroup>
									<Form.Control
										type="number"
										id="largest"
										name="largest"
										className="form-control-input-group-prepend"
										ref={register({
											pattern: {
												value: /^[+]?\d*\.?\d*$/,
												message:
													'Must enter valid value for largest size of fish caught.'
											}
										})}
									/>
									<InputGroup.Append>
										<InputGroup.Text className="input-group-text-prepend">
											In.
										</InputGroup.Text>
									</InputGroup.Append>
								</InputGroup>
								{errors.largest && (
									<Alert variant="danger">
										{errors.largest.message}
									</Alert>
								)}
							</Form.Group>
						</Col>

						<Col xs={12} sm={6}>
							<Form.Group className="mb-1">
								<Form.Label htmlFor="fish">Fish</Form.Label>
								<Controller
									control={control}
									as={<Select />}
									isMulti
									options={optionsFish}
									id="fish"
									name="fish"
									isClearable
								/>
							</Form.Group>
							<Form.Group className="mb-1">
								<Form.Label htmlFor="flies">Flies</Form.Label>
								<Controller
									control={control}
									as={<Select />}
									isMulti
									options={optionsFly}
									id="flies"
									name="flies"
									isClearable
									rules={{ required: 'Required Field' }}
								/>
								{errors.flies && (
									<Alert variant="danger">
										{errors.flies.message}
									</Alert>
								)}
							</Form.Group>
							<Form.Group className="mb-1">
								<Form.Label htmlFor="tackle">Tackle</Form.Label>
								<Controller
									control={control}
									as={<Select />}
									options={optionsMyTackle}
									id="tackle"
									name="tackle"
									isClearable
									rules={{ required: 'Required Field' }}
								/>
								{errors.tackle && (
									<Alert variant="danger">
										{errors.tackle.message}
									</Alert>
								)}
							</Form.Group>
							<Form.Group className="mb-1">
								<Form.Label htmlFor="river">River</Form.Label>
								<Controller
									control={control}
									as={<Select />}
									options={optionsRiver}
									id="river"
									name="river"
									isClearable
									rules={{ required: 'Required Field' }}
								/>
								{errors.river && (
									<Alert variant="danger">
										{errors.river.message}
									</Alert>
								)}
							</Form.Group>
						</Col>
					</Row>
					<div className=" my-3 d-flex justify-content-center">
						<Button variant="outline-dark-blue" type="submit">
							Add a Date!
						</Button>
					</div>
				</Form>
			</Container>
		</div>
	);
};

export default withRouter(AddDateForm);
