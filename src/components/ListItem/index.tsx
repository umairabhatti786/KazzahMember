import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Text, View} from 'ui';
import {SvgUri} from 'react-native-svg';
import textStyle from 'theme/typoGraphy';
import {useTheme} from '@react-navigation/native';
import { scale } from 'react-native-size-matters';

const ListItem = props => {
  const {colors} = useTheme();
  return (
    <TouchableOpacity
      key={props?.index}
      style={props?.cardStyle}
      onPress={() => props?.onPress(props?.item)}>
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <SvgUri width={scale(36)} height={scale(36)} uri={props?.item?.icon} />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            numberOfLines={1}
            ellipsizeMode={'tail'}
            style={[
              textStyle.b5,
              {color: colors.black, width: '75%'},
              textStyle.center,
            ]}>
            {props?.item?.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;
