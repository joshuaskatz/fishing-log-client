import React, { useState, useEffect } from 'react';
import { Col, Button } from 'react-bootstrap';
import { useQuery } from '@apollo/react-hooks';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
import paginationFactory, {
	PaginationProvider
} from 'react-bootstrap-table2-paginator';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

import { GET_MY_TACKLE } from '../../graphql-gql/query';

const MyTackleList = (props) => {
	const { data, loading } = useQuery(GET_MY_TACKLE, {
		pollInterval: 500
	});

	const [ tackle, setMyTackle ] = useState([]);

	useEffect(
		() => {
			!loading &&
				setMyTackle(
					data.myTackle.map((tackle) => {
						return {
							id: tackle.id,
							rod: `${tackle.rod}, ${tackle.rodWeight} wt`,
							rodLength: `${tackle.rodLengthFeet}'${tackle.rodLengthInches}"
							`,
							leaderLength: `${tackle.leaderLengthFeet}'${tackle.leaderLengthInches}"
							`,
							tippetSize: `${tackle.tippetSize}X`,
							overcharged: tackle.overcharged,
							edit: (
								<Button
									className="btn-blue"
									variant="outline-blue"
									onClick={() => {
										props.history.push(
											`/updatemytackle/${tackle.id}`
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
			dataField: 'rod',
			text: 'Rod',
			headerStyle: { whiteSpace: 'nowrap' },
			style: { whiteSpace: 'nowrap' }
		},
		{
			dataField: 'rodLength',
			text: 'Rod Length',
			headerStyle: { whiteSpace: 'nowrap' },
			style: { whiteSpace: 'nowrap' }
		},
		{
			dataField: 'leaderLength',
			text: 'Leader Length',
			headerStyle: { whiteSpace: 'nowrap' },
			style: { whiteSpace: 'nowrap' }
		},
		{
			dataField: 'tippetSize',
			text: 'Tippet Size',
			headerStyle: { whiteSpace: 'nowrap' },
			style: { whiteSpace: 'nowrap' }
		},
		{
			dataField: 'overcharged',
			text: 'Overcharged',
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
		totalSize: tackle.length,
		sizePerPageList: [
			{
				text: '10th',
				value: 10
			}
		]
	};

	return (
		<div>
			<Col>
				<h3 className="text-center page-header">My Tackle</h3>
				<PaginationProvider
					pagination={paginationFactory(paginationOption)}
				>
					{({ paginationProps, paginationTableProps }) => {
						return (
							<div>
								<BootstrapTable
									keyField="id"
									data={tackle}
									columns={columns}
									filter={filterFactory()}
									bordered={false}
									hover
									bootstrap4
									wrapperClasses="table-fit table-responsive"
									{...paginationTableProps}
								/>
							</div>
						);
					}}
				</PaginationProvider>
			</Col>
		</div>
	);
};

export default withRouter(MyTackleList);
