import React, {useState} from 'react';
import {Text, theme, View} from 'ui';
import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {useTheme} from '@react-navigation/native';
import textStyle from 'theme/typoGraphy';
import {useSelector} from 'react-redux';
import {getMessage, setMessage} from 'reducers/chatReducer';
import {useDispatch} from 'react-redux';
const attachment = require('../../../src/assets/AttachmentIcon.png');
const send = require('../../../src/assets/SendIcon.png');

const SendMessage = ({addChat, onOpenGallery, onPressSend,textMessage}: any) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);

  const message = useSelector(getMessage);
  const dispatch = useDispatch();

  return (
    <View
      style={{
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
      }}
    >
      <TextInput
        style={{...styles.input, width: addChat ? '80%' : '70%'}}
        multiline={true}
        placeholder="Type something..."
        placeholderTextColor={colors.silverChalice}
        value={message}
        onChangeText={text => {
          dispatch(setMessage(text));
        }}
      />

      <View width={scale(10)} />
      {addChat ? (
        <></>
      ) : (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={onOpenGallery}
          style={styles.upload}
        >
          <Image
            style={styles.uploadImage}
            source={attachment}
            resizeMode="cover"
          />
        </TouchableOpacity>
      )}

      <View width={scale(10)} />

      <TouchableOpacity
        activeOpacity={0.6}
        disabled={textMessage?false:true}
        onPress={() => onPressSend()}
        style={styles.send}
      >
        <Image style={styles.sendImage} source={send} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SendMessage;
const makeStyles = (colors: any) =>
  StyleSheet.create({
    fCenter: {
      flex: 1,
      alignItems: 'center',
    },
    upload: {
      width: scale(40),
      height: scale(40),
      borderRadius: 50,
      backgroundColor: colors.concrete,
      alignItems: 'center',
      justifyContent: 'center',
    },
    send: {
      width: scale(42),
      height: scale(42),
      borderRadius: 50,
      backgroundColor: colors.black,
      alignItems: 'center',
      justifyContent: 'center',
    },
    uploadImage: {
      height: moderateScale(25),
      width: moderateScale(25),
    },
    sendImage: {
      height: moderateScale(20),
      width: moderateScale(20),
      marginLeft: 5,
    },
    f1: {
      flex: 1,
    },
    input: {
      borderRadius: moderateScale(20),
      minHeight: scale(40),
      maxHeight: scale(180),
      padding: scale(8),
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.concrete,
      fontFamily: 'Calibre',
      fontSize: 18,
      paddingTop: Platform.OS === 'ios' ? scale(15) : scale(5),

      fontWeight: '400', // paddingTop: Platform.OS === 'ios' ? scale(10) : scale(5),
    },
  });
