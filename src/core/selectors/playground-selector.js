import {createSelector} from 'reselect';

/** Список стори */
export const slStoryList = createSelector(
	state => state.playground.storyList,
	stories => {
		if (Object.keys(stories).length > 0) {
			return stories;
		}
		return {
			id: {items: []},
			id1: {items: []},
			id2: {items: []},
			id3: {items: []},
			id4: {items: []},
		};
	},
);

/** Открытие сторис */
export const slStory = createSelector(
	state => state.playground.storyList,
	stories => {
		if (Object.keys(stories).length > 0) {
			return stories;
		}
		return {
			id: {items: []},
			id1: {items: []},
			id2: {items: []},
			id3: {items: []},
			id4: {items: []},
		};
	},
);
