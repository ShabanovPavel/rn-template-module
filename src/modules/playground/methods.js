import {Log} from '../../library';
import {
	PLAYGROUND_CLICK,
	PLAYGROUND_STORY_OPEN,
	PLAYGROUND_LOAD_STORY,
	PLAYGROUND_LOAD_ONE_STORY,
} from './actions';
import {Request} from '../../core/rest';

/**
 * @module Playground/Methods
 * @description логика модуля
 * @private
 */
const playground = {};

/** Тестовый метод который печатает в консоль */
playground.onClick = params => async (dispatch, getState) => {
	dispatch({type: PLAYGROUND_CLICK, payload: {...params}});
};

playground.onLoadStories = () => dispatch => {
	Request(
		'getStoryList',
		{},
		res => {
			dispatch({type: PLAYGROUND_LOAD_STORY, payload: {stories: res}});
		},
		res => {},
	);
};

/** Open one story  */
playground.onOpenStories = (params = {}) => (dispatch, getState) => {
	const {storyId} = params;
	// console.log('params', params);

	Request(
		'getStory',
		{idStory: storyId},
		res => {
			Log('getStory res', res);
			const {storyList} = getState().playground;
			const stories = [];
			Object.values(res || {}).forEach(e => {
				stories.push(e);
			});
			storyList[storyId].items = stories;
			dispatch({
				type: PLAYGROUND_LOAD_ONE_STORY,
				payload: {
					stories: {...storyList},
				},
			});
		},
		() => {},
	);
	dispatch({type: PLAYGROUND_STORY_OPEN, payload: {storyId}});
};

export default playground;
