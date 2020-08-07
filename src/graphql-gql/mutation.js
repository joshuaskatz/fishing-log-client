import gql from 'graphql-tag';

export const CREATE_USER = gql`
	mutation CreateUser($name: String!, $email: String!, $password: String!) {
		createUser(data: { name: $name, email: $email, password: $password }) {
			token
		}
	}
`;

export const LOGIN = gql`
	mutation Login($email: String!, $password: String!) {
		login(data: { email: $email, password: $password }) {
			token
		}
	}
`;

export const CREATE_DATE = gql`
	mutation CreateDate(
		$date: String!
		$amountCaught: String!
		$averageSize: String
		$largestSize: String
		$fish: [String]
		$flies: [String!]!
		$river: String!
		$tackle: String!
	) {
		createDate(
			data: {
				date: $date
				amountCaught: $amountCaught
				averageSize: $averageSize
				largestSize: $largestSize
				fish: $fish
				flies: $flies
				river: $river
				tackle: $tackle
			}
		) {
			id
			date
		}
	}
`;

export const CREATE_FISH = gql`
	mutation CreateFish($species: String!, $subspecies: String) {
		createFish(data: { species: $species, subspecies: $subspecies }) {
			id
			species
			subspecies
		}
	}
`;

export const CREATE_FLY = gql`
	mutation CreateFly($type: String!, $name: String!, $color: String!) {
		createFlies(data: { type: $type, name: $name, color: $color }) {
			id
			type
			name
			color
		}
	}
`;

export const CREATE_RIVER = gql`
	mutation CreateRiver(
		$latitude: Float!
		$longitude: Float!
		$name: String!
		$overgrown: String
		$size: String
		$regulation: String!
	) {
		createRiver(
			data: {
				latitude: $latitude
				longitude: $longitude
				name: $name
				overgrown: $overgrown
				size: $size
				regulation: $regulation
			}
		) {
			id
			regulation
		}
	}
`;

export const CREATE_TACKLE = gql`
	mutation CreateTackle(
		$rod: String!
		$rodWeight: Int!
		$rodLengthFeet: Int!
		$rodLengthInches: Int!
		$overcharged: String!
		$leaderLengthFeet: Int!
		$leaderLengthInches: Int!
		$tippetSize: Int!
	) {
		createTackle(
			data: {
				rod: $rod
				rodWeight: $rodWeight
				rodLengthFeet: $rodLengthFeet
				rodLengthInches: $rodLengthInches
				overcharged: $overcharged
				leaderLengthFeet: $leaderLengthFeet
				leaderLengthInches: $leaderLengthInches
				tippetSize: $tippetSize
			}
		) {
			id
			overcharged
		}
	}
`;

export const DELETE_DATE = gql`
	mutation DeleteDate($id: ID!) {
		deleteDate(id: $id) {
			id
		}
	}
`;

export const DELETE_TACKLE = gql`
	mutation DeleteTackle($id: ID!) {
		deleteTackle(id: $id) {
			id
		}
	}
`;

export const UPDATE_DATE = gql`
	mutation UpdateDate(
		$id: ID!
		$date: String
		$amountCaught: String
		$averageSize: String
		$largestSize: String
		$fish: [String]
		$flies: [String]
		$river: String
		$tackle: String
	) {
		updateDate(
			id: $id
			data: {
				date: $date
				amountCaught: $amountCaught
				averageSize: $averageSize
				largestSize: $largestSize
				fish: $fish
				flies: $flies
				river: $river
				tackle: $tackle
			}
		) {
			id
			date
		}
	}
`;

export const UPDATE_TACKLE = gql`
	mutation UpdateTackle(
		$id: ID!
		$rod: String
		$rodWeight: Int
		$rodLengthFeet: Int
		$rodLengthInches: Int
		$overcharged: String
		$leaderLengthFeet: Int
		$leaderLengthInches: Int
		$tippetSize: Int
	) {
		updateTackle(
			id: $id
			data: {
				rod: $rod
				rodWeight: $rodWeight
				rodLengthFeet: $rodLengthFeet
				rodLengthInches: $rodLengthInches
				overcharged: $overcharged
				leaderLengthFeet: $leaderLengthFeet
				leaderLengthInches: $leaderLengthInches
				tippetSize: $tippetSize
			}
		) {
			id
			overcharged
		}
	}
`;
