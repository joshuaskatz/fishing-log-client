import React, { useState, useEffect } from 'react';
import { Col } from 'react-bootstrap';
import { useQuery } from '@apollo/react-hooks';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory, {
	PaginationProvider,
	PaginationListStandalone
} from 'react-bootstrap-table2-paginator';

import { GET_FISH } from '../../graphql-gql/query';

const FishList = () => {
	const { data, loading } = useQuery(GET_FISH, {
		pollInterval: 500
	});

	const [ fish, setFish ] = useState([]);

	useEffect(
		() => {
			!loading &&
				setFish(
					data.fish.map((f) => {
						if (f.subspecies === '') {
							return {
								...f,
								subspecies: 'N/A'
							};
						}

						return {
							...f
						};
					})
				);
		},
		[ loading, data ]
	);

	const columns = [
		{
			dataField: 'id',
			text: 'ID',
			hidden: true
		},
		{
			dataField: 'species',
			text: 'Species',
			filter: textFilter()
		},
		{
			dataField: 'subspecies',
			text: 'Subspecies',
			filter: textFilter()
		}
	];

	const paginationOption = {
		custom: true,
		totalSize: fish.length,
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
					Fish In The Database
				</h2>
				<PaginationProvider
					pagination={paginationFactory(paginationOption)}
				>
					{({ paginationProps, paginationTableProps }) => {
						return (
							<div>
								<BootstrapTable
									keyField="id"
									data={fish}
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

export default FishList;
