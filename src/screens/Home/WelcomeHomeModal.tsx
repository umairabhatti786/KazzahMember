import React from 'react';
import {Text, View} from 'ui';
import {StyleSheet, Dimensions, Platform, Image} from 'react-native';
import SettingUP from '../../assets/SettingUP.svg';
import textStyle from 'theme/typoGraphy';
import {useTheme} from '@react-navigation/native';
import Modal from 'react-native-modal';
import Button from 'newComponents/Button';
import {scale, verticalScale} from 'react-native-size-matters';

type Props = {
  toggleModal?: any;
  isModalVisible?: any;
  onPressStart?: any;
};

const HomeWelcomeModal = ({
  toggleModal,
  isModalVisible,
  onPressStart,
}: Props) => {
  const {colors} = useTheme();
  return (
    <Modal
      style={{
        backgroundColor: 'transparent',
        margin: 0,
        alignItems: 'center',
        flex: 1,
      }}
      onBackButtonPress={() => {
        toggleModal();
      }}
      onBackdropPress={toggleModal}
      isVisible={isModalVisible}
    >
      <View
        style={{
          borderRadius: verticalScale(20),
          width: '90%',
          height: Platform.OS == 'ios' ? '75%' : '80%',

          backgroundColor: 'white',
        }}
      >
        <View style={{alignItems: 'center', marginTop: 20}}>
          <Image
            style={{height: scale(280), width: scale(280)}}
            source={require('../../assets/welcomeImage.png')}
          />
          <Text
            style={[
              textStyle.h1,
              textStyle.center,
              {color: colors.black, width: '60%'},
            ]}
          >
            Welcome to Kazzah.
          </Text>
        </View>

        <View style={{alignItems: 'center', marginTop: 20}}>
          <Button
            onPress={() => {
              toggleModal();
              onPressStart();
            }}
            variant="primary"
            label="Take a tour"
            width={'90%'}
          />

          <Button
            onPress={toggleModal}
            variant="secondary"
            label="No, thanks"
            width={'90%'}
          />

          <Text
            style={[
              textStyle.b5,
              textStyle.center,
              {color: colors.silverChalice, width: '80%'},
            ]}
          >
            If you skip the tour, you can always take another time by visiting
            your Profile.
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    position: 'absolute',
    top: '20%',
    start: '13%',
  },
  textContainer: {
    position: 'absolute',
    top: '55%',
    start: '20%',
  },
  proBtn: {
    alignItems: 'center',
    width: '100%',
  },
});

export default HomeWelcomeModal;
