import React from 'react';
import {View} from '../../../View';
import {Theme} from '../../../../Theme';
import Styles from './styles';

type Props = {};

const DummyItem = (props: Props) => {
	const styles = Theme.createStyles(Styles);

	return <View wave style={styles.storyView} />;
};

export default DummyItem;
