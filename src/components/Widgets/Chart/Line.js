import React, { PropTypes } from 'react'
import { VictoryLine } from 'victory';
import _ from 'lodash';

const Line = ({ data }) => {

	const min = _.min(data);
	const max = _.max(data);

	return (
		<VictoryLine
			height={400}
			data={data}
			x="month"
			padding={0}
			interpolation="natural"
			domain={{ y: [min < 0 ? min * 1.5 : min * 0.5, max < 0 ? max * 0.5 : max * 1.5 ]}}
			style={{
				data: { stroke: '#FFF', opacity: 0.6 }
			}}
		/>
	);
}

Line.propTypes = {
  data: PropTypes.array
};

export default Line;