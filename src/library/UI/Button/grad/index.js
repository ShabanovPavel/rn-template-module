import React from 'react';
import {Theme} from '../../../Theme';

import {LinearGradient} from '../../LinearGradient';

import Styles from './styles';
import {ScaleButton} from '../../ScaleButton';

type Props = {
	onAction: Function,
	visibility?: Boolean,
};

const Gradient = (props: Props) => {
	const {onAction, visibility, children, visibilityColors, colors, style} = props;
	const styles = Theme.createStyles(Styles);
	const color = Theme.getColors();

	const vColors = visibilityColors || ['#0000', '#0000'];
	const sColors = colors || [color.GRADIENT_STORY_ITEM1, color.GRADIENT_STORY_ITEM2];

	return (
		<ScaleButton onAction={onAction}>
			<LinearGradient
				start={{x: 0, y: 0}}
				end={{x: 1, y: 0}}
				colors={visibility ? vColors : sColors}
				style={[styles.gradView, visibility && styles.itemVisibility, style]}>
				{children}
			</LinearGradient>
		</ScaleButton>
	);
};

Gradient.defaultProps = {
	visibility: false,
};

export default Gradient;
