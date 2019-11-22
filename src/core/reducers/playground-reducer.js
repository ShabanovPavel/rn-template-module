import {
	PLAYGROUND_LOAD_STORY,
	PLAYGROUND_LOAD_ONE_STORY,
	STORY_LOAD_NEXT,
	PLAYGROUND_STORY_OPEN,
} from '../../modules';

/**
 * @module Reducers/Playground
 * @description ''
 * @export
 * @param {*} [state={}]
 * @param {*} [action={}]
 * @returns новое состояние хранилища
 * @private
 */
// eslint-disable-next-line
export function playground(
	state = {
		storyList: {},
		storyId: undefined,
	},
	action = {},
) {
	switch (action.type) {
		case STORY_LOAD_NEXT:
		case PLAYGROUND_LOAD_ONE_STORY:
		case PLAYGROUND_LOAD_STORY: {
			const {stories = {}} = action.payload;
			return {...state, storyList: {...stories}};
		}

		case PLAYGROUND_STORY_OPEN: {
			const {storyId = {}} = action.payload;
			return {...state, storyId};
		}

		default:
			return state;
	}
}
