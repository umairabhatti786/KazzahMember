import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, View} from 'ui';
import React from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import textStyle from 'theme/typoGraphy';
import {useNavigation, useTheme} from '@react-navigation/native';
import SwitchToggle from 'react-native-switch-toggle';

const NotificationList = (props: any) => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const [on, setOn] = React.useState(true);

  return (
    <React.Fragment>
      <TouchableOpacity
        key={props.index}
        activeOpacity={0.6}
        onPress={() => {}}
        style={{
          borderBottomColor: colors.gallery,
          borderBottomWidth: 1,
          backgroundColor: colors.background,
          borderTopColor: colors.gallery,
          borderTopWidth: 1,
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          height: verticalScale(55),
        }}>
        <Image
          style={styles.imageStyle}
          resizeMode="cover"
          source={props.item?.icon}
        />
        <View
          marginLeft={'s'}
          width={'88%'}
          alignItems={'center'}
          justifyContent={'space-between'}
          flexDirection={'row'}>
          <View width={'80%'} flexDirection={'column'}>
            <Text
              numberOfLines={1}
              style={[textStyle.b3, {color: colors.black}]}
              ellipsizeMode={'tail'}>
              {props.item?.name}
            </Text>
          </View>
          <SwitchToggle
            switchOn={on ? true : false}
            onPress={() => setOn(!on)}
            circleColorOn={colors.background}
            circleColorOff={colors.background}
            backgroundColorOn={colors.black}
            backgroundColorOff={colors.gallery}
            containerStyle={{
              width: scale(42),
              height: scale(25),
              borderRadius: scale(25),
              padding: scale(5),
            }}
            circleStyle={{
              width: scale(18),
              height: scale(18),
              borderRadius: scale(50),
            }}
          />
        </View>
      </TouchableOpacity>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    height: scale(20),
    width: scale(20),
  },
});

export default NotificationList;
