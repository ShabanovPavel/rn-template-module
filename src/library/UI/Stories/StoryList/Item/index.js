import React from 'react';
import {Text} from '../../../Text';
import {Theme} from '../../../../Theme';

import {LinearGradient} from '../../../LinearGradient';
import {Image} from '../../../Image';

import Styles from './styles';
import {View} from '../../../View';
import {ScaleButton} from '../../../ScaleButton';

type Props = {
	onOpenStories: Function,
	id: String,
	uri: String,
	label?: String,
	visibility?: Boolean,
};

const Item = (props: Props) => {
	const {onOpenStories, id, visibility, uri, label} = props;
	const styles = Theme.createStyles(Styles);
	const color = Theme.getColors();

	const handleonOpenStory = () => {
		onOpenStories({storyId: id, onOpenStories});
	};

	return (
		<ScaleButton onAction={handleonOpenStory} style={styles.storyView}>
			<LinearGradient
				start={{x: 0, y: 0}}
				end={{x: 1, y: 0}}
				colors={
					visibility ? ['#0000', '#0000'] : [color.GRADIENT_STORY_ITEM1, color.GRADIENT_STORY_ITEM2]
				}
				style={[styles.storyImageView, visibility && styles.itemVisibility]}>
				<View>
					<Image isFast resizeMode="cover" uri={{uri}} style={styles.storyImage} />
					<LinearGradient
						start={{x: 0, y: 1}}
						end={{x: 0, y: 0}}
						colors={[color.GRADIENT, '#0000']}
						style={styles.internalGradient}
					/>
					<Text
						numberOfLines={2}
						ellipsizeMode="tail"
						style={[styles.storyText, visibility && {opacity: Theme.opacity.normal}]}>
						{label}
					</Text>
				</View>
			</LinearGradient>
		</ScaleButton>
	);
};

Item.defaultProps = {
	label: '',
	visibility: false,
};

export default Item;
