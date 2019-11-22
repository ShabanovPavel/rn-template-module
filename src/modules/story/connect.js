import methods from './methods';
import component from './components';
import registerConnect from '../../core/containers';
import {slStory} from '../../core/selectors';

export default registerConnect(
	state => ({
		story: slStory(state),
		storyId: state.playground.storyId,
	}),
	methods,
)(component);
