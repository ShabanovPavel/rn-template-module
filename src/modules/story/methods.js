import {} from '../../library';
import {STORY_CLOSE, STORY_LOAD_NEXT} from './actions';
import {Request} from '../../core/rest';

/**
 * @module Story/Methods
 * @description логика модуля
 * @private
 */
const story = {};

/** Закрыть стори */
story.onClose = params => async (dispatch, getState) => {
	dispatch({type: STORY_CLOSE});
};
/**
 * Прогрузка следйбщей истории
 */
story.onLoadNext = params => (dispatch, getState) => {
	const {storyId} = params;

	Request(
		'getStory',
		{idStory: storyId},
		res => {
			const {storyList} = getState().playground;
			const stories = [];
			Object.values(res).forEach(e => {
				stories.push(e);
			});
			storyList[storyId].items = stories;
			dispatch({
				type: STORY_LOAD_NEXT,
				payload: {
					stories: storyList,
				},
			});
		},
		() => {},
	);
};

export default story;
