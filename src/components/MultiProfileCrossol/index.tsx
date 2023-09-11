import React from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Text, View} from 'ui';
import {scale, verticalScale} from 'react-native-size-matters';
import moment from 'moment';
const search_Icon = require('../../../assets/map.png');
import {useNavigation, useTheme} from '@react-navigation/native';
import textStyle from 'theme/typoGraphy';
import MessageIcon from '../../assets/MessageIcon.svg';
import SwiperFlatList from 'react-native-swiper-flatlist';
import InitialNameLetters from 'newComponents/InitialNameLetters';
import {getAppointmentStatusText, getStatusColor} from 'utils';
import {setSelectedConnectionId, setUserType} from 'reducers/chatReducer';
import {useDispatch} from 'react-redux';
const AppointmentsCards = ({data}: any) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  type Props = {
    item: any;
    index: any;
  };
  const {colors} = useTheme();
  const ProfileCards: React.FC<Props> = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{marginBottom: scale(20), marginTop: scale(10)}}
        activeOpacity={0.6}
        onPress={() => {
          if (
            item.status === 'pending' ||
            item.status === 'rescheduleByMember'
          ) {
            navigation.navigate('Pending', {event: 'Pending'});
          } else {
            navigation.navigate('Pending', {
              event: 'PRO_CONFIRM_APPOINTMENT',
            });
          }
        }}>
        <View
          style={[
            styles.container,
            {
              backgroundColor: colors.background,
            },
          ]}
          key={index}>
          <View style={styles.innerContainer}>
            <View style={{flexDirection: 'row', width: '75%'}}>
              <View alignItems={'center'}>
                {item.imgUrl ? (
                  <Image source={{uri: item.imgUrl}} style={styles.image} />
                ) : (
                  <View
                    style={{
                      borderRadius: scale(8),
                      height: scale(35),
                      width: scale(35),
                    }}
                    padding="xs"
                    justifyContent="center"
                    alignItems={'center'}>
                    <InitialNameLetters
                      width={scale(35)}
                      height={scale(35)}
                      firstName={`${item?.firstName?.charAt(0).toUpperCase()}`}
                      lastName={`${item?.lastName?.charAt(0).toUpperCase()}`}
                    />
                  </View>
                )}
              </View>
              <View
                flexDirection={'column'}
                style={{marginTop: verticalScale(3), marginLeft: scale(7)}}>
                <Text
                  style={[
                    textStyle.b3,
                    {
                      width: scale(120),
                    },
                  ]}
                  numberOfLines={1}
                  ellipsizeMode={'tail'}>
                  {item.firstName} {item.lastName}
                </Text>
                <View style={{height: verticalScale(2)}} />
                <Text
                  style={[
                    textStyle.b5,
                    {
                      width: scale(120),
                      color: colors.doveGray,
                    },
                  ]}
                  numberOfLines={1}
                  ellipsizeMode={'tail'}
                  fontSize={scale(8)}>
                  {item.largetextsub}
                </Text>
              </View>
            </View>

            <View
              style={{marginTop: verticalScale(3)}}
              flexDirection={'column'}>
              <Text
                numberOfLines={1}
                ellipsizeMode={'tail'}
                style={[
                  textStyle.b3,
                  {
                    color: colors.black,
                  },
                ]}>
                {moment(item?.largetext, 'hh:mm:ss')
                  .format('h:mm a')
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
                }}
                fontSize={scale(10)}
                ellipsizeMode={'tail'}
                numberOfLines={1}>
                {getAppointmentStatusText(item)}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={search_Icon} style={styles.search_image} />
              <View width={scale(5)} />
              <Text
                numberOfLines={2}
                style={[
                  textStyle.label,
                  {color: colors.silverChalice, width: scale(110)},
                ]}>
                {item.home}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                dispatch(setSelectedConnectionId(item.provider?.id));
                dispatch(setUserType('provider'));

                navigation.navigate('ChatDetailScreen', {
                  userId: item.provider?.id,
                  userType: 'provider',
                });
              }}
              style={{
                height: scale(32),
                width: scale(50),
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <MessageIcon width={16} height={16} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const reversedStackData = [...data].reverse();
  return (
    <View>
      <SwiperFlatList
        nestedScrollEnabled={true}
        vertical={false}
        horizontal={true}
        data={reversedStackData}
        renderItem={ProfileCards}
      />
    </View>
  );
};

export default AppointmentsCards;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(10),
    borderRadius: scale(8),
    width: scale(310),
    height: scale(100),
    marginHorizontal: scale(20),
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
    height: scale(35),
    width: scale(35),
  },
  search_image: {
    width: scale(9),
    height: scale(11),
    tintColor: 'gray',
  },
  innerContainer: {
    flexDirection: 'row',
    height: '60%',
    justifyContent: 'space-between',
    marginTop: verticalScale(5),
  },
});
