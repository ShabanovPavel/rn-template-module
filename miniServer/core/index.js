const settings = require('../options');

const sleep = ms => new Promise(r => setTimeout(r, ms));

const descriptionCopy = {
	description: 'Все будет хорошо! Но даже если что-то случится, то ваш кредит будет погашен.',
	urlDetailInfo: 'https://ilibrary.ru/text/11/index.html',
	title: 'Страхование жизни',
};

const db = {
	'1': {
		'1_1': {
			background: 'https://xage.ru/media/posts/2013/9/16/10-greatest-cars-of-the-past-20-years.jpg',
			...descriptionCopy,
			id: '1_1',
			storyId: '1',
			uri: 'https://fainaidea.com/wp-content/uploads/2017/06/camaro.jpg',
		},
		'1_2': {
			background: 'http://top10x.ru/wp-content/uploads/2013/04/Lamborghini-Veneno-810x495.jpg',
			...descriptionCopy,
			id: '1_2',
			storyId: '1',
			uri: 'https://klike.net/uploads/posts/2019-05/medium/1559021804_2.jpg',
		},
		'1_3': {
			background: 'https://avtonovostidnya.ru/wp-content/uploads/2019/03/BMW-M2-1024x682.jpg',
			...descriptionCopy,
			id: '1_3',
			storyId: '1',
			uri:
				'http://atlanticexpress.com.ua/wp-content/uploads/2017/08/pokupka-bu-avto-v-ukraine-i-v-ssha-kak-pravilno-podobrat-bu-avto-na-chto-stoit-obrashhat-vnimanie.jpg',
		},
	},
	'2': {
		'2_1': {
			background: 'https://xage.ru/media/posts/2013/9/16/10-greatest-cars-of-the-past-20-years.jpg',
			...descriptionCopy,
			id: '2_1',
			storyId: '2',
			uri:
				'https://www.zses.com.ua/wp-content/uploads/2018/12/%D0%B0%D0%B2%D1%82%D0%BE-768x512.jpg',
		},
		'2_2': {
			background: 'http://top10x.ru/wp-content/uploads/2013/04/Lamborghini-Veneno-810x495.jpg',
			...descriptionCopy,
			id: '2_2',
			storyId: '2',
			uri: 'https://vesti.ua/img/article/1074/66_main.jpg',
		},
		'2_3': {
			background: 'https://avtonovostidnya.ru/wp-content/uploads/2019/03/BMW-M2-1024x682.jpg',
			...descriptionCopy,
			id: '2_3',
			storyId: '2',
			uri: 'https://bipbap.ru/wp-content/uploads/2017/09/92830063_0031-2.jpg',
		},
	},
	'3': {
		'3_1': {
			background: 'https://xage.ru/media/posts/2013/9/16/10-greatest-cars-of-the-past-20-years.jpg',
			...descriptionCopy,
			id: '3_1',
			storyId: '3',
			uri: 'https://ya-korolev.ru/wp-content/uploads/2017/11/Avtomobili-bez-probega-po-RF-1.jpg',
		},
		'3_2': {
			background: 'http://top10x.ru/wp-content/uploads/2013/04/Lamborghini-Veneno-810x495.jpg',
			...descriptionCopy,
			id: '3_2',
			storyId: '3',
			uri: 'http://fonday.ru/images/tmp/16/9/original/16927rzwmQGMTuicnvaEVBdKYLqeO.jpg',
		},
		'3_3': {
			background: 'https://avtonovostidnya.ru/wp-content/uploads/2019/03/BMW-M2-1024x682.jpg',
			...descriptionCopy,
			id: '3_3',
			storyId: '3',
			uri: 'https://www.ural56.ru/photos/2013/march2013/tron_lamborghini_aventador-HD.jpg',
		},
	},
	'4': {
		'4_1': {
			background: 'https://xage.ru/media/posts/2013/9/16/10-greatest-cars-of-the-past-20-years.jpg',
			...descriptionCopy,
			id: '4_1',
			storyId: '4',
			uri:
				'https://www.zses.com.ua/wp-content/uploads/2018/12/%D0%B0%D0%B2%D1%82%D0%BE-768x512.jpg',
		},
		'4_2': {
			background: 'http://top10x.ru/wp-content/uploads/2013/04/Lamborghini-Veneno-810x495.jpg',
			...descriptionCopy,
			id: '4_2',
			storyId: '4',
			uri: 'https://vesti.ua/img/article/1074/66_main.jpg',
		},
		'4_3': {
			background: 'https://avtonovostidnya.ru/wp-content/uploads/2019/03/BMW-M2-1024x682.jpg',
			...descriptionCopy,
			id: '4_3',
			storyId: '4',
			uri: 'https://bipbap.ru/wp-content/uploads/2017/09/92830063_0031-2.jpg',
		},
	},
	'5': {
		'5_1': {
			background: 'https://xage.ru/media/posts/2013/9/16/10-greatest-cars-of-the-past-20-years.jpg',
			...descriptionCopy,
			id: '5_1',
			storyId: '5',
			uri: 'https://fainaidea.com/wp-content/uploads/2017/06/camaro.jpg',
		},
		'5_2': {
			background: 'http://top10x.ru/wp-content/uploads/2013/04/Lamborghini-Veneno-810x495.jpg',
			...descriptionCopy,
			id: '5_2',
			storyId: '5',
			uri: 'https://klike.net/uploads/posts/2019-05/medium/1559021804_2.jpg',
		},
		'5_3': {
			background: 'https://avtonovostidnya.ru/wp-content/uploads/2019/03/BMW-M2-1024x682.jpg',
			...descriptionCopy,
			id: '5_3',
			storyId: '5',
			uri:
				'http://atlanticexpress.com.ua/wp-content/uploads/2017/08/pokupka-bu-avto-v-ukraine-i-v-ssha-kak-pravilno-podobrat-bu-avto-na-chto-stoit-obrashhat-vnimanie.jpg',
		},
	},
};

const core = {
	getInfoStory: id => db[id] || {},
	getInfoListStory: () => ({
		'1': {
			items: [],
			label: 'Купить авто у друга',
			uri: 'https://st2.zr.ru/_ah/img/iwGhkZo0NBD3il4BuDcHsg=s800',
			visibility: false,
		},
		'2': {
			items: [],
			label: 'Как выйграть ааааавтомобиль!!',
			uri: 'https://versiya.info/uploads/posts/2019-07/1563432444_lelekovice_lada_2104.jpg',
			visibility: false,
		},
		'3': {
			items: [],
			label: 'Тачку на прокачку',
			uri:
				'https://img.rg.ru/img/content/122/13/30/bugatti2313253-bugatti-vision-gran-turismo-ctk_d_850.jpg',
			visibility: false,
		},
		'4': {
			items: [],
			label: 'Лучшие насосы и другое',
			uri: 'https://autoreview.ru/images/Article/1593/Article_159376_860_575.jpg',
			visibility: false,
		},
		'5': {
			items: [],
			label: 'Расточить цилидры',
			uri: 'http://zap-online.ru/info/sites/default/files/styles/lightbox/public/200.jpg',
			visibility: false,
		},
	}),
};

module.exports = core;
