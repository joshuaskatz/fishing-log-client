import React, { useState, useEffect } from 'react';
import { Col } from 'react-bootstrap';
import { useQuery } from '@apollo/react-hooks';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, {
	textFilter,
	selectFilter
} from 'react-bootstrap-table2-filter';
import paginationFactory, {
	PaginationProvider,
	PaginationListStandalone
} from 'react-bootstrap-table2-paginator';

import { GET_FLIES } from '../../graphql-gql/query';

const FliesList = () => {
	const { data, loading } = useQuery(GET_FLIES, {
		pollInterval: 500
	});

	const [ flies, setFlies ] = useState([]);

	useEffect(
		() => {
			!loading && setFlies(data.flies);
		},
		[ loading, data ]
	);

	const selectOptions = [
		{ value: 'Dry', label: 'Dry' },
		{ value: 'Nymph', label: 'Nymph' },
		{ value: 'Streamer', label: 'Streamer' },
		{ value: 'Wet', label: 'Wet' }
	];

	const columns = [
		{
			dataField: 'id',
			text: 'ID',
			hidden: true
		},
		{
			dataField: 'type',
			text: 'Type',
			formatter: (cell) =>
				selectOptions.find((opt) => opt.value === cell).label,
			filter: selectFilter({
				options: selectOptions
			})
		},
		{
			dataField: 'name',
			text: 'Name',
			filter: textFilter()
		},
		{
			dataField: 'color',
			text: 'Color',
			filter: textFilter()
		}
	];

	const paginationOption = {
		custom: true,
		totalSize: flies.length,
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

	return (
		<div>
			<Col xs={{ span: 10, offset: 1 }}>
				<h2 className="text-center page-header mb-4">
					Flies In The Database
				</h2>
				<PaginationProvider
					pagination={paginationFactory(paginationOption)}
				>
					{({ paginationProps, paginationTableProps }) => {
						return (
							<div>
								<BootstrapTable
									keyField="id"
									data={flies}
									columns={columns}
									filter={filterFactory()}
									bordered={false}
									hover
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

export default FliesList;
