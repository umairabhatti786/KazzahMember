import {Linking, Platform, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, View} from 'ui';
import React from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import {useNavigation, useTheme} from '@react-navigation/native';
import MessageIcon from '../../assets/MessageIcon.svg';
import EmailIcon from '../../assets/EmailIcon.svg';
import CallIcon from '../../assets/CallIcon.svg';
import textStyle from 'theme/typoGraphy';

type Props = {
  number: any;
  email: any;
  navigateData: any;
};

const CommunicationType = ({number, email, navigateData}: Props) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const navigation = useNavigation();

  const dialCall = () => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  };

  const sentEmail = async () => {
    const url = `mailto:${email}`;
    await Linking.openURL(url);
  };
  const onMessage = () => {
    navigation.navigate('ChatScreen', {
      data: navigateData,
    });
  };
  return (
    <View
      style={{
        ...styles.rowContainer,
        width: '65%',
        height: verticalScale(60),
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: verticalScale(20),
      }}
    >
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={dialCall}
        style={styles.mediaContainer}
      >
        <CallIcon width={22} height={22} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.mediaContainer}>
        <EmailIcon onPress={sentEmail} width={22} height={22} />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={onMessage}
        style={styles.mediaContainer}
      >
        <MessageIcon width={22} height={22} />
      </TouchableOpacity>
    </View>
  );
};

const makeStyles = (colors: any) =>
  StyleSheet.create({
    rowContainer: {flexDirection: 'row', alignItems: 'center'},
    mediaContainer: {
      width: scale(50),
      height: scale(50),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.background,
      borderRadius: 100,
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

export default CommunicationType;
