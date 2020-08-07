export const fishOptions = (query) => {
	const optionsFish =
		!query.loading &&
		query.data.fish.map((fish) => {
			if (fish.subspecies) {
				return {
					value: `${fish.species} (Subspecies: ${fish.subspecies})`,
					label: `${fish.species} (Subspecies: ${fish.subspecies})`
				};
			}

			return {
				value: `${fish.species} `,
				label: `${fish.species} `
			};
		});

	return optionsFish;
};

export const flyOptions = (query) => {
	const optionsFly =
		!query.loading &&
		query.data.flies.map((fly) => {
			return {
				value: `${fly.color} ${fly.name}`,
				label: `${fly.color} ${fly.name}`
			};
		});

	return optionsFly;
};

export const myTackleOptions = (query) => {
	const optionsMyTackle =
		!query.loading &&
		query.data.myTackle.map((tackle) => {
			return {
				value: `${tackle.rod}, ${tackle.rodWeight} wt, ${tackle.rodLengthFeet}'${tackle.rodLengthInches}"`,
				label: `${tackle.rod}, ${tackle.rodWeight} wt, ${tackle.rodLengthFeet}'${tackle.rodLengthInches}" `
			};
		});

	return optionsMyTackle;
};

export const riverOptions = (query) => {
	const optionsRiver =
		!query.loading &&
		query.data.rivers.map((river) => {
			return {
				value: `${river.name}`,
				label: `${river.name}`
			};
		});

	return optionsRiver;
};
