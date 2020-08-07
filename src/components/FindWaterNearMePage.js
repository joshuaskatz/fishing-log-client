import React from 'react';

import MainNavbar from './navigation/MainNavbar';
import MapBox from './MapBox';

const FindWaterNearMePage = () => {
	return (
		<div>
			<MainNavbar />
			<MapBox className="my-2 my-md-3" />
		</div>
	);
};
export { FindWaterNearMePage as default };
