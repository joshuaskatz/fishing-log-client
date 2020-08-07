import React, { useState, useEffect } from 'react';
import { Col, Button } from 'react-bootstrap';
import { useQuery } from '@apollo/react-hooks';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
import paginationFactory, {
	PaginationProvider,
	PaginationListStandalone
} from 'react-bootstrap-table2-paginator';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import { GET_MY_DATES } from '../../graphql-gql/query';

const MyDatesList = (props) => {
	const { data, loading } = useQuery(GET_MY_DATES, {
		pollInterval: 500
	});

	const [ dates, setMyDates ] = useState([]);

	useEffect(
		() => {
			!loading &&
				setMyDates(
					data.myDates.map((date) => {
						if (date.amountCaught === '0') {
							return {
								...date,
								amountCaught: 'None',
								averageSize: 'N/A',
								largestSize: 'N/A',
								fish: 'N/A',
								flies: date.flies.map((fly) => {
									return (
										<p key={fly} className="fly">
											{fly}
										</p>
									);
								}),
								edit: (
									<Button
										className="btn-blue"
										variant="outline-blue"
										onClick={() => {
											props.history.push(
												`/updatemydate/${date.id}`
											);
										}}
									>
										<FontAwesomeIcon icon={faEdit} />
									</Button>
								)
							};
						}
						return {
							...date,
							fish: date.fish.map((f) => {
								return (
									<p key={f} className="fish">
										{f}
									</p>
								);
							}),
							flies: date.flies.map((fly) => {
								return (
									<p key={fly} className="fly">
										{fly}
									</p>
								);
							}),
							averageSize: `${date.averageSize} In.`,
							largestSize: `${date.largestSize} In.`,
							edit: (
								<Button
									className="btn-blue"
									variant="outline-blue"
									onClick={() => {
										props.history.push(
											`/updatemydate/${date.id}`
										);
									}}
								>
									<FontAwesomeIcon icon={faEdit} />
								</Button>
							)
						};
					})
				);
		},
		[ loading, data, props.history ]
	);

	const columns = [
		{
			dataField: 'id',
			text: 'ID',
			hidden: true
		},
		{
			dataField: 'date',
			text: 'Date',

			sort: true,
			sortFunc: (a, b, order, dataField) => {
				if (order === 'asc') {
					return (
						moment(b, 'MMMM Do, YYYY').valueOf() -
						moment(a, 'MMMM Do, YYYY').valueOf()
					);
				}
				return (
					moment(a, 'MMMM Do, YYYY').valueOf() -
					moment(b, 'MMMM Do, YYYY').valueOf()
				);
			},

			headerStyle: { whiteSpace: 'nowrap' },
			style: { whiteSpace: 'nowrap' }
		},
		{
			dataField: 'river',
			text: 'River',
			headerStyle: { whiteSpace: 'nowrap' },
			style: { whiteSpace: 'nowrap' }
		},
		{
			dataField: 'tackle',
			text: 'Tackle Used',
			headerStyle: { whiteSpace: 'nowrap' },
			style: { whiteSpace: 'nowrap' }
		},
		{
			dataField: 'flies',
			text: 'Flies Used',
			headerStyle: { whiteSpace: 'nowrap' },
			style: { whiteSpace: 'nowrap' }
		},
		{
			dataField: 'fish',
			text: 'Species of Fish Caught',
			headerStyle: { whiteSpace: 'nowrap' },
			style: { whiteSpace: 'nowrap' }
		},
		{
			dataField: 'amountCaught',
			text: 'Amount of Fish Caught',
			headerStyle: { whiteSpace: 'nowrap' },
			style: { whiteSpace: 'nowrap' }
		},
		{
			dataField: 'averageSize',
			text: 'Average Size of Fish',
			headerStyle: { whiteSpace: 'nowrap' },
			style: { whiteSpace: 'nowrap' }
		},
		{
			dataField: 'largestSize',
			text: 'Largest Fish Caught',
			headerStyle: { whiteSpace: 'nowrap' },
			style: { whiteSpace: 'nowrap' }
		},
		{
			dataField: 'edit',
			text: ''
		}
	];

	const paginationOption = {
		custom: true,
		totalSize: dates.length,
		sizePerPageList: [
			{
				text: '5th',
				value: 5
			}
		],
		firstPageText: 'First',
		prePageText: 'Prev',
		nextPageText: 'Next',
		lastPageText: 'Last'
	};

	const defaultSorted = [
		{
			dataField: 'date',
			order: 'asc'
		}
	];

	return (
		<div>
			<Col>
				<h3 className="text-center page-header">My Dates</h3>
				<PaginationProvider
					pagination={paginationFactory(paginationOption)}
				>
					{({ paginationProps, paginationTableProps }) => {
						return (
							<div>
								<BootstrapTable
									keyField="id"
									data={dates}
									columns={columns}
									filter={filterFactory()}
									bootstrap4
									bordered={false}
									hover
									filterPosition="top"
									defaultSorted={defaultSorted}
									wrapperClasses="table-responsive"
									{...paginationTableProps}
								/>
								<PaginationListStandalone
									{...paginationProps}
								/>
							</div>
						);
					}}
				</PaginationProvider>
			</Col>
		</div>
	);
};

export default withRouter(MyDatesList);
