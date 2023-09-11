import React, {useState, useEffect, useRef} from 'react';
import {
  Image,
  TextInput,
  Dimensions,
  PermissionsAndroid,
  Platform,
  Alert,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
} from 'react-native';
import {Button, Screen, Input, Pressable, View, Text, theme} from 'ui';

import Modal from 'react-native-modal';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

import RNFetchBlob from 'rn-fetch-blob';
import {addMediaToFavourite} from 'services/Explore';
import Video from 'react-native-video';

const windowwidth = Dimensions.get('window').width;
const windowheight = Dimensions.get('window').height;

const {height, width} = Dimensions.get('screen');

const ImageSelection = ({modalVisible, setModalVisible, currentMedia}: any) => {
  const [hideImage, setShowImage] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 0,
      useNativeDriver: true,
    }).start();
  }, [modalVisible]);

  const HandlePress = () => {
    if (hideImage) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start();
      setShowImage(false);
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }).start();
      setShowImage(true);
    }
  };

  const [media, setMedia] = useState();

  const getMediaDetails = () => {
    setMedia(currentMedia);
  };

  useEffect(() => {
    if (currentMedia !== null) {
      getMediaDetails();
    }
  }, [JSON.stringify(currentMedia)]);

  const getExtention = (filename: any) => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  const [isLoading, setIsLoading] = useState(false);

  const isVideo = media?.type == 'video';

  const ImageWrapper = ({children}: any) => {
    const isVideoMedia = media?.type == 'video';
    if (isVideoMedia) {
      return <>{children}</>;
    } else {
      return (
        <TouchableWithoutFeedback onPress={() => HandlePress()}>
          <ImageBackground
            style={{
              height: '100%',
              width: '100%',
            }}
            source={{
              uri: media?.url,
            }}
            resizeMode="contain">
            {children}
          </ImageBackground>
        </TouchableWithoutFeedback>
      );
    }
  };

  return (
    <Modal
      isVisible={modalVisible}
      onBackdropPress={() => setModalVisible(!modalVisible)}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
      style={{
        flex: 1,
        margin: 0,
      }}>
      <View
        backgroundColor={'black'}
        style={{height: Platform.OS == 'ios' ? '90%' : '100%', width: '100%'}}
        // marginBottom={'xxs'}
        overflow="hidden"
        // marginHorizontal="l"
      >
        <View flex={1}>
          {!isLoading && (
            <View
              alignItems={'center'}
              top={verticalScale(250)}
              start={scale(150)}
              position={'absolute'}>
              <ActivityIndicator color={'white'} size={'large'} />
            </View>
          )}
          <TouchableWithoutFeedback
            style={{zIndex: 10}}
            onPress={() => HandlePress()}>
            <>
              {isVideo && (
                <TouchableWithoutFeedback onPress={() => HandlePress()}>
                  <Video
                    fullscreen={true}
                    resizeMode="cover"
                    repeat
                    source={{uri: media?.url}}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                    }}
                  />
                </TouchableWithoutFeedback>
              )}

              <ImageWrapper>
                <>
                  <Pressable
                    style={{
                      height: scale(30),
                      width: scale(30),
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: theme.colors.grey3,
                      borderRadius: scale(50),
                      left: scale(15),
                      top: scale(15),
                    }}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                    }}>
                    <Image
                      source={require('../../../assets/cross.png')}
                      resizeMode="cover"
                      style={{
                        tintColor: theme.colors.black,
                        height: moderateScale(15),
                        width: moderateScale(15),
                      }}
                    />
                  </Pressable>

                  {/* <Animated.View
                    style={[
                      styles.show,
                      {opacity: fadeAnim, borderRadius: scale(15)},
                    ]}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '90%',
                        marginTop: 10,
                      }}>
                      <Pressable
                        style={{flex: 1}}
                        onPress={() => {
                          onClose();
                          setModalVisible(!modalVisible);
                        }}>
                        <Image
                          source={require('../../../assets/cross.png')}
                          resizeMode="cover"
                          style={{
                            height: scale(20),
                            width: scale(20),
                            tintColor: 'white',
                          }}
                        />
                      </Pressable>
                      <Text
                        style={{flex: 1.5}}
                        textAlign={'center'}
                        fontWeight="bold"
                        color="white"
                        fontSize={scale(20)}>
                        {media?.tags?.length
                          ? media?.tags[0]?.service?.name
                          : ''}
                      </Text>
                    </View>
                    <View
                      flexDirection={'row'}
                      alignItems="center"
                      justifyContent={'space-between'}
                      marginTop={'s'}>
                      <View
                        alignItems={'center'}
                        justifyContent={'space-between'}
                        flexDirection={'row'}>
                        <View
                          flex={1}
                          marginStart={'m'}
                          alignItems={'center'}
                          flexDirection={'row'}>
                          <Image
                            style={{
                              height: scale(44),
                              width: scale(44),
                              borderRadius: scale(22),
                              marginBottom: 6,
                              marginEnd: 10,
                            }}
                            source={{
                              uri: media?.provider?.profile_image
                                ? media?.provider?.profile_image
                                : 'https://i.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68',
                            }}
                          />
                          <View alignItems={'center'}>
                            <Text style={{color: 'white', fontSize: scale(14)}}>
                              {media?.provider?.first_name}
                            </Text>
                            <Text style={{color: 'white', fontSize: scale(14)}}>
                              {media?.provider?.last_name}
                            </Text>
                          </View>
                        </View>
                        <View
                          flexDirection={'row'}
                          justifyContent={'center'}
                          flex={1.5}>
                          <Image
                            style={{
                              height: scale(15),
                              width: scale(13),
                            }}
                            source={require('../../../assets/map.png')}
                          />
                          <Text
                            textAlign={'center'}
                            color={'white'}
                            marginLeft="xs"
                            fontSize={scale(12)}
                            style={{width: '80%'}}>
                            {media?.location}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </Animated.View> */}
                  {/* <View
                    alignSelf={'flex-end'}
                    width={'20%'}
                    height={'84%'}
                    flexDirection="column"
                    alignItems={'center'}>
                    <View height={'10%'} />
                    <View>
                      <TouchableOpacity onPress={addToFav}>
                        <Image
                          style={{
                            height: scale(30),
                            width: scale(30),
                            tintColor: media?.mediaLike === 0 ? 'white' : 'red',
                          }}
                          resizeMode="contain"
                          source={require('../../../assets/heart.png')}
                        />
                      </TouchableOpacity>
                      <Text style={{color: 'white'}}>100K</Text>
                    </View>
                    <View height={'5%'} />
                    <View>
                      <Pressable onPress={checkPermission}>
                        <Image
                          style={{
                            height: scale(30),
                            width: scale(30),
                            tintColor: 'white',
                          }}
                          resizeMode="contain"
                          source={require('../../../assets/download.png')}
                        />
                      </Pressable>
                      <Text style={{color: 'white'}}>Save</Text>
                    </View>
                    <View height={'5%'} />
                    <View>
                      <Pressable
                        onPress={() => {
                          setModalVisibleSharePost(true);
                        }}>
                        <Image
                          style={{
                            height: scale(30),
                            width: scale(30),
                            tintColor: 'white',
                          }}
                          resizeMode="contain"
                          source={require('../../../assets/share.png')}
                        />
                      </Pressable>
                      <Text style={{color: 'white'}}>Share</Text>
                    </View>
                  </View> */}
                  {media?.caption ? (
                    <Animated.View
                      style={[
                        {
                          backgroundColor: '#00000090',
                          padding: scale(7),
                          justifyContent: 'flex-start',
                          alignItems: 'flex-start',
                          top: Platform.OS == 'ios' ? '81%' : '81%',
                          height: scale(100),
                          width: '100%',
                        },
                        {
                          opacity: fadeAnim,
                          borderTopRightRadius: scale(15),
                          borderTopLeftRadius: scale(15),
                        },
                      ]}>
                      <Text
                        numberOfLines={3}
                        ellipsizeMode={'tail'}
                        color={'grey4'}
                        fontSize={scale(16)}>
                        {media?.caption}
                      </Text>
                    </Animated.View>
                  ) : null}
                </>
              </ImageWrapper>
            </>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </Modal>
  );
};
export default ImageSelection;

const styles = StyleSheet.create({
  show: {
    backgroundColor: '#00000090',
    height: '16%',
    alignItems: 'center',
  },
  hide: {
    opacity: 0,
    backgroundColor: '#00000090',
    height: '16%',
    alignItems: 'center',
  },
  showCaption: {
    backgroundColor: '#00000090',
    paddingHorizontal: scale(14),
    paddingVertical: scale(8),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    bottom: -560,
    height: '16%',
    width: '100%',
  },
  hideCaption: {
    opacity: 0,
    backgroundColor: '#00000090',
    paddingHorizontal: scale(14),
    paddingVertical: scale(8),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    bottom: scale(70),
    height: scale(70),
    width: '100%',
  },
  input3: {
    height: windowheight / 15,
    marginRight: moderateScale(12),
    marginLeft: moderateScale(12),
    marginBottom: moderateScale(12),
    paddingTop: moderateScale(10),
    paddingBottom: moderateScale(10),
    paddingLeft: moderateScale(20),
    width: windowwidth / 1.3,
    borderRadius: moderateScale(10),
    backgroundColor: 'white',
    borderWidth: moderateScale(1),
    borderColor: 'black',
  },
  container: {padding: 16},
  dropdown: {
    paddingLeft: moderateScale(20),
    borderRadius: moderateScale(10),
    backgroundColor: 'white',
    borderWidth: moderateScale(1),
    borderColor: 'black',
    width: windowwidth / 1.3,
    height: windowheight / 15,
    alignSelf: 'center',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#BABABA',
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 30,
    height: 30,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 12,
  },
  // header styles
  imagestyle: {
    height: scale(50),
    width: scale(50),
  },
  header: {
    padding: moderateScale(15),
    flexDirection: 'row',
    marginTop: moderateScale(5),
    backgroundColor: '#000',
    // height: windowheight / 12,
    height: verticalScale(50),
    width: windowwidth,
    alignItems: 'center',
    borderBottomWidth: moderateScale(2),
    borderColor: '#626262',
  },
  profilePhoto: {
    height: moderateScale(30),
    width: moderateScale(30),
    borderRadius: moderateScale(20),
  },
  profilePhoto2: {
    height: moderateScale(30),
    width: moderateScale(30),
    borderRadius: moderateScale(20),
  },
  inputStyle: {
    fontSize: 14,
    fontWeight: 'bold',
    //  marginBottom: 10,
    height: windowwidth / 10,
    marginTop: 10,
    paddingLeft: 20,
    width: windowwidth / 1.5,
    borderRadius: 15,
    backgroundColor: '#fff',
  },
  bottomPart: {
    height: '100%',
    backgroundColor: 'black',
    paddingHorizontal: moderateScale(10),
  },

  dollarInput: {
    color: '#33d8b6',
    fontSize: moderateScale(10),
    textAlign: 'center',
    marginTop: moderateScale(-5),
    padding: 0,
  },

  containerSecond: {
    flexDirection: 'row',
    marginTop: moderateScale(10),
    padding: moderateScale(10),
  },
  FlexSix: {
    flex: 4,
  },
  FlexFour: {
    flex: 4,
  },
  catDiv: {
    width: scale(100),
    height: verticalScale(100),
    marginRight: moderateScale(5),
    marginBottom: moderateScale(5),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    backgroundColor: '#F3F2F1',
  },
  BTitle: {
    fontSize: moderateScale(14),
    marginTop: moderateScale(5),
    fontWeight: 'bold',
    color: 'black',
  },
  arrowImg: {
    height: moderateScale(20),
    width: moderateScale(20),
  },
  mRight: {
    marginRight: moderateScale(15),
  },
  arrowImgBack: {
    height: moderateScale(15),
    width: moderateScale(15),
  },
  menuImg: {
    height: moderateScale(20),
    width: moderateScale(20),
    marginLeft: 'auto',
  },

  //----
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    height: windowheight / 1.4,
    width: windowwidth / 1.1,
    marginTop: 25,
    backgroundColor: 'white',
    // borderRadius: 20,
    //  padding: 35,
    borderTopRightRadius: moderateScale(20),
    borderTopLeftRadius: moderateScale(20),
    paddingTop: moderateScale(20),
    paddingLeft: moderateScale(10),
    paddingRight: moderateScale(10),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalView2: {
    height: windowheight / 1.2,
    width: windowwidth / 1.07,
    marginTop: 25,
    backgroundColor: 'white',
    // borderRadius: 20,
    //  padding: 35,
    borderTopRightRadius: moderateScale(20),
    borderTopLeftRadius: moderateScale(20),
    marginHorizontal: moderateScale(10),
    paddingTop: 0,
    // paddingLeft: 10,
    // paddingRight: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: moderateScale(20),
    padding: moderateScale(15),
    elevation: 2,
    marginTop: moderateScale(10),
    backgroundColor: 'green',
  },
  flexRowSc: {
    flexDirection: 'row',
    //  paddingRight: 10,
    //  paddingLeft: 10,
    //  justifyContent: "space-between",
    // height: windowheight/5,
    // alignItems: 'center',
  },
  modal2View: {
    justifyContent: 'center',
    alignItems: 'center',
    height: windowheight / 6,
    margin: moderateScale(3),
    borderWidth: moderateScale(2),
    paddingTop: moderateScale(4),
    paddingLeft: moderateScale(12),
    borderColor: 'white',
    backgroundColor: '#F3F2F1',
    flex: 4,
  },
  modal1suggestion: {
    flexDirection: 'row',
    paddingRight: moderateScale(10),
    paddingLeft: moderateScale(10),
    marginTop: moderateScale(10),
    marginBottom: moderateScale(5),
  },
  modal1fpp: {
    flexDirection: 'row',
    paddingRight: moderateScale(10),
    paddingLeft: moderateScale(10),
  },
  modal1fppm: {
    flexDirection: 'row',
    paddingRight: moderateScale(10),
    paddingLeft: moderateScale(10),

    marginBottom: moderateScale(5),
  },
  modal1mfa: {
    marginTop: moderateScale(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: moderateScale(10),
    paddingLeft: moderateScale(10),
  },
  modal1Txthead: {
    paddingLeft: moderateScale(4),
    fontWeight: '600',
  },
  container10: {
    flex: 1,
    alignItems: 'center',
  },
  pic1: {
    height: windowheight / 4,
    width: windowwidth / 2.1,
  },

  pic2: {
    height: windowheight / 3,
    width: windowwidth / 2.3,
  },
  FlexTwo: {
    flex: 2,
  },
  flexRow: {
    flexDirection: 'row',
    padding: moderateScale(10),
  },

  paddingAround: {
    paddingRight: moderateScale(10),
    paddingLeft: moderateScale(10),
  },

  mainSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: windowwidth,
    alignItems: 'center',
    borderRadius: moderateScale(5),
    paddingRight: moderateScale(20),
    paddingLeft: moderateScale(20),
    marginTop: moderateScale(15),
  },
  jaCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  hwSixty: {
    height: moderateScale(25),
    width: moderateScale(25),
  },
  input: {
    // fontSize:12,
    marginBottom: moderateScale(10),
    height: windowwidth / 10,
    marginTop: moderateScale(10),
    //   paddingLeft: 20,
    width: windowwidth / 1.5,
    borderRadius: moderateScale(15),
    backgroundColor: '#fff',
  },
  body: {
    backgroundColor: '#000',
    width: windowwidth,
  },
  hwSixtyy: {
    height: moderateScale(100),
    width: moderateScale(100),
    marginRight: moderateScale(10),
    borderRadius: moderateScale(10),
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#4C5661',
    tintColor: 'red',
  },

  input2: {
    marginBottom: moderateScale(10),
    height: windowwidth / 10,
    marginTop: moderateScale(10),
    width: windowwidth / 1.2,
    borderRadius: moderateScale(15),
    backgroundColor: '#fff',
  },

  // modal 2
  saveBtnSc: {
    fontWeight: '500',
    color: '#39E3BF',
  },
  serviceIcon: {
    height: scale(65),
    width: scale(65),
    borderRadius: 70,
  },
  serviceText: {
    color: theme.colors.black,
    fontSize: scale(22),
  },
  serviceTextContainer: {
    height: scale(48),
    width: scale(48),
    borderRadius: scale(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  topperSc: {
    margin: 0,
    paddingHorizontal: moderateScale(20),
    flexDirection: 'row',
    marginTop: moderateScale(0),
    paddingVertical: moderateScale(10),
    width: '100%',
    alignItems: 'center',
    textAlign: 'center',
  },
  ScDate: {
    fontSize: moderateScale(12),
  },

  mlAuto: {
    marginLeft: 'auto',
  },
  mrAuto: {
    marginRight: 'auto',
  },

  pr11: {
    paddingRight: 11,
  },

  inputSearch: {
    height: windowheight / 15,
    marginRight: moderateScale(12),
    marginLeft: moderateScale(12),
    marginBottom: moderateScale(12),
    paddingTop: moderateScale(10),
    paddingBottom: moderateScale(10),
    paddingLeft: moderateScale(20),
    width: windowwidth / 1.3,
    borderRadius: moderateScale(20),
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'rgb(95, 213, 190)',
  },
  body3: {
    flex: 1,
    backgroundColor: '#000',
    width: windowwidth,
  },
  bodyflatlist: {
    flexDirection: 'row',
    paddingTop: moderateScale(10),
    backgroundColor: '#000',
    height: verticalScale(45),
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyflatInner: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: scale(35),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(10),
  },
  imageCross: {
    paddingLeft: moderateScale(40),
    height: moderateScale(15),
    width: moderateScale(15),
    resizeMode: 'contain',
  },
  inputCross: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    //  marginBottom: 10,
    //   width:
    height: scale(35),
    marginTop: 0,
    paddingLeft: moderateScale(20),
    width: windowwidth / 1.5,
    borderRadius: moderateScale(15),
    backgroundColor: '#fff',
  },
  bodyhalf: {
    flex: 0.5,
    backgroundColor: '#000',
    width: windowwidth,
  },
  VCenter: {
    alignItems: 'center',
  },

  txtTitle: {
    color: 'rgb(95, 213, 190)',
  },
  fontWeight: {
    fontWeight: '400',
  },
  f12: {
    fontSize: moderateScale(14),
    color: '#999',
  },
  recentFlat: {
    width: scale(100),
    padding: moderateScale(10),
  },
  padright: {
    paddingRight: 11,
  },
  spacer: {
    height: moderateScale(10),
    backgroundColor: '#000',
  },
});
