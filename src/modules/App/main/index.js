import {connect} from 'react-redux';
import reducer from '../reducer';
import component from './screen';

export default connect(
	state => ({}),
	dispatch => ({
		onInit: () => {
			dispatch(reducer.init());
		},
		onOpenOnboarding: () => {
			dispatch(reducer.openOnboarding());
		},
		onOpenPlayground: () => {
			dispatch(reducer.openPlayground());
		},
	}),
)(component);
