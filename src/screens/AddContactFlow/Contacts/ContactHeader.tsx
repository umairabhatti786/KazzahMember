import {Image, StyleSheet} from 'react-native';
import React from 'react';
import {Pressable, View, Text} from 'ui';
import AlphabetSort from '../../../../src/assets/AlphabetSort.svg';
import {scale} from 'react-native-size-matters';
import textStyle from 'theme/typoGraphy';
import {useTheme} from '@react-navigation/native';
import Down from '../../../../src/assets/Down.svg';
import AlphabetOrder from 'newComponents/AlphabetOrder';

const ContactHeader = (props: any) => {
  const {colors} = useTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <Pressable
      // onPress={onPress}
      >
        <AlphabetOrder onPress={props.onPress} sortOrder={props.sortOrder} />
      </Pressable>

      <Pressable
        flexDirection={'row'}
        alignItems="center"
        onPress={props.filterContact}>
        <Text
          style={[
            textStyle.cta1,
            {
              color: colors.black,
            },
          ]}>
          {props.filterName}
        </Text>
        <Down
          style={{marginLeft: scale(2)}}
          width={scale(10)}
          height={scale(10)}
        />
      </Pressable>
    </View>
  );
};

export default ContactHeader;

const styles = StyleSheet.create({});
