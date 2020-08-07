import gql from 'graphql-tag';

export const GET_ME = gql`
	query Me {
		me {
			id
			name
		}
	}
`;

export const GET_MY_DATES = gql`
	query GetMyDates($query: String) {
		myDates(query: $query) {
			id
			date
			amountCaught
			averageSize
			largestSize
			fish
			flies
			tackle
			river
		}
	}
`;

export const GET_FISH = gql`
	query GetFish($query: String) {
		fish(query: $query) {
			id
			species
			subspecies
		}
	}
`;

export const GET_FLIES = gql`
	query GetFlies($query: String) {
		flies(query: $query) {
			id
			type
			name
			color
		}
	}
`;

export const GET_RIVER = gql`
	query GetRiver($query: String) {
		rivers(query: $query) {
			id
			name
			latitude
			longitude
			regulation
			overgrown
			size
		}
	}
`;

export const GET_MY_TACKLE = gql`
	query GetMyTackle {
		myTackle {
			id
			rod
			rodWeight
			rodLengthFeet
			rodLengthInches
			overcharged
			leaderLengthFeet
			leaderLengthInches
			tippetSize
		}
	}
`;
