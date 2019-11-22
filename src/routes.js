import {Theme} from './library';

export const settingsDefault = {
	layout: {
		direction: 'ltr', // Supported directions are: 'rtl', 'ltr'
		backgroundColor: 'white',
		orientation: ['portrait'],
	},
	statusBar: {
		drawBehind: true,
		translucent: true,
		// hideWithTopBar: false,
		style: 'light',
		backgroundColor: 'rgba(255,255,255,0)',
	},
	topBar: {
		visible: false,
		drawBehind: true,
		height: 0,
	},
	overlay: {
		interceptTouchOutside: false,
		handleKeyboardEvents: true,
	},
};

export const rootLoadApp = {
	root: {
		stack: {
			id: 'appStack',
			children: [
				{
					component: {
						id: 'initApp',
						name: 'initApp',
					},
				},
			],
			options: {
				topBar: {
					visible: false,
					height: 0,
				},
			},
		},
	},
};

export const rootMainApp = {
	root: {
		stack: {
			id: 'playgroundStack',
			children: [
				{
					component: {
						id: 'playground',
						name: 'playground',
						options: {
							statusBar: {
								drawBehind: true, // нарисует экран позади StatusBar
								translucent: true,
							},
							bottomTab: {
								text: 'Playground',
								// icon: require('../images/two.png'),
							},
						},
					},

					// bottomTabs: {
					// 	children: [
					// 		{
					// 			component: {
					// 				name: 'playground',
					// 				options: {
					// 					bottomTab: {
					// 						text: 'Playground',
					// 						// icon: require('../images/two.png'),
					// 					},
					// 				},
					// 			},
					// 		},
					// 		{
					// 			stack: {
					// 				id: 'presentationStack',
					// 				children: [
					// 					{
					// 						component: {
					// 							name: 'main',
					// 							options: {
					// 								bottomTab: {
					// 									text: 'Presentation',
					// 									// icon: require('../images/two.png'),
					// 								},
					// 							},
					// 						},
					// 					},
					// 				],
					// 			},
					// 		},
					// 	],
					// 	options: {},
					// },
				},
			],
			options: {
				topBar: {
					visible: false,
					height: 0,
				},
			},
		},
	},
};
