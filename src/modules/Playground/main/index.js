import {connect} from 'react-redux';
import reducer from '../reducer';
import component from './screen';

export default connect(
	state => ({}),
	dispatch => ({
		onClose: () => {
			dispatch(reducer.close());
		},
	}),
)(component);
