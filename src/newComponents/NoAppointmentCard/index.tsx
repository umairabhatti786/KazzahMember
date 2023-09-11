import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text, View} from 'ui';
import {scale} from 'react-native-size-matters';
import CalendarsIcon from '../../assets/CalendarsIcon.svg';
import textStyle from 'theme/typoGraphy';
import {useNavigation, useTheme} from '@react-navigation/native';

const NoAppointmentCard = () => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Pending');
      }}
      style={styles.container}>
      <CalendarsIcon />
      <View flexDirection={'column'} marginLeft={'s'}>
        <Text
          style={[
            textStyle.b3,
            {color: colors.black, marginVertical: scale(2)},
          ]}>
          No appointments today.
        </Text>
        <Text style={[textStyle.b5, {color: colors.silverChalice}]}>
          + Connect with your Pros and book
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NoAppointmentCard;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: scale(25),
    flexDirection: 'row',
    borderRadius: scale(8),
    backgroundColor: 'white',
    width: scale(310),
    alignSelf: 'center',
    height: scale(100),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.13,
    shadowRadius: 10,
    elevation: 3,
  },
});
