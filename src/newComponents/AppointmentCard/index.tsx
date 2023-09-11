import React from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Pressable, Text, View} from 'ui';
import {scale, verticalScale} from 'react-native-size-matters';
import moment from 'moment';
import {useNavigation, useTheme} from '@react-navigation/native';
import textStyle from 'theme/typoGraphy';
import MessageIcon from '../../assets/MessageIcon.svg';
import MapIcon from '../../assets/MapIcon.svg';
import AppointmentViewType from 'newComponents/AppointmentViewType';
import InitialNameLetters from 'newComponents/InitialNameLetters';
import {getAppointmentStatusText, getStatusColor} from 'utils';
import Button from 'newComponents/Button';
import {useDispatch} from 'react-redux';
import {setProviderId} from 'reducers/providerReducer';
import {setSelectedConnectionId, setUserType} from 'reducers/chatReducer';

type Props = {
  item: any;
  index: any;
  onPressRebook: (item: any) => void;
};

const AppointmentCard = ({item, index, onPressRebook}: Props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {colors} = useTheme();
  let date = moment(item?.appointmentDate).format('MMMM DD, YYYY');
  if (!item.provider) {
    return <></>;
  }

  return (
    <View style={styles.largeContainer}>
      <View
        width={'100%'}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <View flex={1.8}>
          <Text style={[textStyle.h3, {color: colors.black}]}>{date}</Text>
        </View>
        {index === 0 && (
          <View flex={1}>
            <AppointmentViewType />
          </View>
        )}
      </View>

      <TouchableOpacity
        onPress={() => {
          // AppointmentDetail
          navigation.navigate('AppointmentDetail', {
            id: item.id,
            isDetailOnly: true,
          });
        }}
        activeOpacity={0.6}
      >
        <View
          style={[
            styles.container,
            {
              backgroundColor: colors.background,
            },
          ]}
        >
          <View style={styles.innerContainer}>
            <View
              style={{
                flexDirection: 'row',
                width: '75%',
              }}
            >
              <Pressable
                onPress={() => {
                  dispatch(setProviderId(item?.provider?.id));
                  navigation.navigate('ConnectedProviderProStack', {
                    data: item?.provider,
                  });
                }}
              >
                {item?.provider?.profileImage ? (
                  <Image
                    source={{uri: item?.provider?.profileImage}}
                    style={styles.image}
                  />
                ) : (
                  <InitialNameLetters
                    index={index}
                    borderRadius={8}
                    firstName={`${item?.provider?.firstName}`}
                    lastName={`${item?.provider?.lastName}`}
                  />
                )}
              </Pressable>
              <Pressable
                onPress={() => {
                  dispatch(setProviderId(item?.provider?.id));
                  navigation.navigate('ConnectedProviderProStack', {
                    data: item?.provider,
                  });
                }}
                style={{
                  // marginTop: scale(4),
                  height: scale(40),
                }}
                flexDirection={'column'}
              >
                <Text
                  style={[
                    textStyle.b3,
                    {
                      width: scale(130),
                      color: colors.black,
                    },
                  ]}
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                >
                  {item?.provider?.firstName} {item?.provider?.lastName}
                </Text>
                <View style={{height: verticalScale(2)}} />
                <View
                  style={{
                    flexDirection: 'row',
                    width: scale(150),
                  }}
                >
                  <Text
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                    style={{width: 160}}
                  >
                    {(item?.services || []).reduce(
                      (accumulator, date, index) => {
                        const serviceLength =
                          index === item?.services.length - 1;

                        return [
                          ...accumulator,
                          <Text
                            key={date.id}
                            numberOfLines={1}
                            ellipsizeMode={'tail'}
                            style={[
                              textStyle.label,
                              {
                                color: colors.silverChalice,
                                marginLeft: scale(3),
                                marginTop: scale(2),
                              },
                            ]}
                          >
                            {`${date.service?.name}`}
                            {serviceLength ? '' : ','}
                          </Text>,
                        ];
                      },
                      [],
                    )}
                  </Text>
                </View>
              </Pressable>
            </View>

            <View>
              {item.status == 'declineByProvider' ? (
                <Button
                  height={scale(30)}
                  width={scale(81)}
                  onPress={() => onPressRebook(item)}
                  label="Rebook"
                />
              ) : (
                <>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                    style={[
                      textStyle.b4,
                      {
                        color: colors.black,
                        alignSelf: 'center',
                      },
                    ]}
                  >
                    {moment(item?.startTime, 'hh:mm:ss')
                      .format('hh:mm a')
                      .replace('m', '')}
                  </Text>
                  <View style={{height: verticalScale(2)}} />

                  <Text
                    textTransform={'capitalize'}
                    style={{
                      color: getStatusColor(item.status),
                      width: scale(45),
                      alignSelf: 'center',
                      textAlign: 'center',
                      // backgroundColor: 'red',
                    }}
                    fontSize={scale(10)}
                    ellipsizeMode={'tail'}
                    numberOfLines={1}
                  >
                    {getAppointmentStatusText(item)}
                  </Text>
                </>
              )}
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'space-between',
            }}
          >
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MapIcon
                style={{marginTop: scale(-2)}}
                height={scale(12)}
                width={scale(12)}
              />
              <View width={scale(5)} />
              {item?.appointmentAddress ? (
                <Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={[
                    textStyle.label,
                    {
                      color: colors.silverChalice,
                      width: scale(180),
                    },
                  ]}
                >
                  {item?.appointmentAddress}
                </Text>
              ) : (
                <Text
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  style={[
                    textStyle.label,
                    {color: colors.silverChalice, width: scale(180)},
                  ]}
                >
                  {`${item?.provider?.street} ${item?.provider?.city} ${item?.provider?.state} ${item?.provider?.zip}`}
                </Text>
              )}
            </View>

            <TouchableOpacity
              onPress={() => {
                dispatch(setSelectedConnectionId(item.provider?.id));
                dispatch(setUserType('provider'));

                navigation.navigate('ChatDetailScreen', {
                  userId: item.provider?.id,
                  userType: 'provider',
                });
                // const provider = item?.provider;
                // const providerData = {
                //   id: provider?.id,
                //   firstName: provider?.firstName,
                //   lastName: provider?.lastName,
                //   image: {
                //     uri: provider.profileImage,
                //   },
                //   name: item.name,
                //   isPro: 'provider',
                //   isSelected: false,
                // };
                // navigation.navigate('ChatDetail', {
                //   userId: providerData?.id,
                //   userType: providerData?.isPro,
                // });
              }}
              style={{
                height: scale(32),
                width: scale(50),
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}
            >
              <MessageIcon width={16} height={16} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AppointmentCard;

const styles = StyleSheet.create({
  largeContainer: {
    width: '90%',
    height: scale(150),
    alignSelf: 'center',
  },
  container: {
    padding: verticalScale(15),
    //  paddingHorizontal:scale(10),
    marginVertical: scale(10),
    borderRadius: scale(8),
    width: scale(310),
    height: scale(100),
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },

    shadowOpacity: 0.13,
    shadowRadius: 10,
    elevation: 3,
  },
  image: {
    borderRadius: scale(8),
    height: scale(33),
    width: scale(33),
    marginRight: scale(10),
  },
  search_image: {
    width: scale(9),
    height: scale(11),
    tintColor: 'gray',
  },
  innerContainer: {
    flexDirection: 'row',
    height: '55%',
    justifyContent: 'space-between',
    marginTop: verticalScale(5),
  },
});
