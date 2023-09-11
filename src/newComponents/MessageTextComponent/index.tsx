import React, {useState} from 'react';
import {Text, theme, View} from 'ui';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {useTheme} from '@react-navigation/native';
import textStyle from 'theme/typoGraphy';
import ImageView from 'react-native-image-viewing';

const windowwidth = Dimensions.get('window').width;

const dwonload = require('../../../src/assets/DownloadIcon.png');
const messageImage = require('../../../src/assets/MessageImage.png');

const MessageTextComponent = ({item, uid, time}: any) => {
  const [showImage, setShowImage] = useState(false);
  const {colors} = useTheme();
  let isUser = item.uid.toString() == uid;

  return (
    <View
      style={{
        flexDirection: 'column',
        alignSelf: isUser ? 'flex-end' : 'flex-start',
        width: '100%',
      }}>
      {item.isMedia ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: scale(10),
            marginVertical: scale(10),
            overflow: 'hidden',
          }}>
            {
              isUser?(
                <View style={{flexDirection:"row",alignItems:"center"}}>
                <Image
            style={{width: scale(20), height: scale(20), marginEnd: 10}}
            source={dwonload}
          />
          <Pressable
            onPress={() => setShowImage(true)}
            style={{
              width: scale(290),
              height: verticalScale(200),
              borderRadius: scale(10),
            }}>
            <Image
              style={{
                width: scale(290),
                height: verticalScale(200),
                borderRadius: scale(10),
              }}
              resizeMode="cover"
              source={{uri: item.mediaUrl}}
            />
          </Pressable>

                </View>
              
              ):
              <View style={{flexDirection:"row",alignItems:"center"}}>
        
        <Pressable
          onPress={() => setShowImage(true)}
          style={{
            width: scale(270),
            height: verticalScale(200),
            borderRadius: scale(10),
          }}>
          <Image
            style={{
              width: scale(270),
              height: verticalScale(200),
              borderRadius: scale(10),
            }}
            resizeMode="cover"
            source={{uri: item.mediaUrl}}
          />
        </Pressable>
        <Image
          style={{width: scale(20), height: scale(20),marginLeft:scale(10)}}
          source={dwonload}
        />

              </View>
            }
       

          <View
            style={{
              alignSelf: 'flex-end',
              position: 'absolute',
              bottom: verticalScale(10),
              right: scale(20),
            }}>
            <Text
              style={[
                textStyle.label,
                {
                  color: colors.background,
                  marginLeft: scale(20),
                  marginTop: verticalScale(5),
                },
              ]}>
              {time}
            </Text>
          </View>
        </View>
      ) : (
        <View
          style={{
            flexDirection: 'column',
            alignSelf: isUser ? 'flex-end' : 'flex-start',
            justifyContent: 'space-between',
            marginVertical: scale(10),
            borderWidth: isUser ? 1 : 0,
            backgroundColor: isUser ? colors.background : colors.black,
            paddingVertical: scale(10),
            paddingHorizontal: scale(12),
            maxWidth: scale(280),
            borderRadius: moderateScale(10),
          }}>
          <View>
            <Text
              style={[
                textStyle.b4,
                {
                  color: isUser ? colors.black : colors.background,
                  textAlign: 'left',
                },
              ]}>
              {item.message}
            </Text>
          </View>
          <View style={{alignSelf: 'flex-end'}}>
            <Text
              style={[
                textStyle.label,
                {
                  color: isUser ? colors.black : colors.background,
                  marginLeft: scale(20),
                  marginTop: verticalScale(5),
                },
              ]}>
              {time}
            </Text>
          </View>
        </View>
      )}
      <ImageView
        images={[{uri: item.mediaUrl}]}
        imageIndex={0}
        visible={showImage}
        onRequestClose={() => setShowImage(false)}
      />
    </View>
  );
};

export default MessageTextComponent;

const styles = StyleSheet.create({});
