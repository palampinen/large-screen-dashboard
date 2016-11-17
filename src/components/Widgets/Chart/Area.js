import React, { PropTypes } from 'react'
import { VictoryArea } from 'victory';
import _ from 'lodash';

const Area = ({ data }) => {

	const min = _.min(data);
	const max = _.max(data);

	return (
		<VictoryArea
			height={500}
			data={data}
			x="month"
			padding={0}
			interpolation="natural"
			domain={{y: [ min < 0 ? min * 1.5 : min * 0.5, max > 0 ? max * 1.5 : max * 0.5 ]}}
			style={{
				data: { fill: '#FFF', opacity: 0.3 }
			}}
		/>
	);
}

Area.propTypes = {
  data: PropTypes.array
};

export default Area;