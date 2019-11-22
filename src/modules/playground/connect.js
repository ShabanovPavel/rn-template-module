import methods from './methods';
import component from './components';
import registerConnect from '../../core/containers';
import {slStoryList} from '../../core/selectors';

export default registerConnect(
	state => ({
		data: slStoryList(state),
	}),
	methods,
)(component);
