import React, {version} from 'react';
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
import Button from 'newComponents/Button';

type Props = {
  item: any;
  index: any;
};

const RecentAppointmentCard = ({item, index}: Props) => {
  console.log('AppOintmentTime', item?.startTime);
  const navigation = useNavigation();
  const {colors} = useTheme();
  let date = moment(item?.appointmentDate).format('MMMM DD, YYYY');
  if (!item.provider) {
    return <></>;
  }

  return (
    <View style={styles.largeContainer}>
      <Text
        style={[textStyle.h3, {marginLeft: scale(10), color: colors.black}]}
      >
        {date}
      </Text>
      <TouchableOpacity
        onPress={() => {
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
          <Pressable
            onPress={() => {
              navigation.navigate('ProviderProfile', {
                data: item?.provider,
                arrow: 'arrow',
              });
            }}
            style={{marginTop: scale(15)}}
            flex={1}
            alignItems={'flex-end'}
          >
            {item?.provider?.profileImage ? (
              <Image
                source={{uri: item?.provider?.profileImage}}
                style={styles.image}
              />
            ) : (
              <InitialNameLetters
                firstName={`${item?.provider?.firstName}`}
                lastName={`${item?.provider?.lastName}`}
              />
            )}
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate('ProviderProfile', {
                data: item?.provider,
                arrow: 'arrow',
              });
            }}
            style={{
              marginTop: scale(14),
              height: scale(40),
            }}
            flex={2}
            flexDirection={'column'}
            alignItems={'flex-start'}
          >
            <Text
              style={[
                textStyle.b3,
                {
                  width: scale(130),
                },
              ]}
              numberOfLines={1}
              ellipsizeMode={'tail'}
            >
              {item?.provider?.firstName} {item?.provider?.lastName}
            </Text>

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
                {(item?.services || []).reduce((accumulator, data, index) => {
                  const serviceLength = index === item?.services.length - 1;
                  console.log('ItemService', serviceLength);
                  return [
                    ...accumulator,

                    <Text
                      key={data.id}
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
                      {`${data.service?.name}`}
                      {serviceLength ? '' : ','}
                    </Text>,
                  ];
                }, [])}
              </Text>
            </View>
          </Pressable>

          <View
            flex={1.5}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'flex-end'}
          >
            <Button
              height={verticalScale(27)}
              label="Rebook"
              width={scale(70)}
            />

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ChatDetail', {
                  userId: item?.provider?.id,
                  userType: 'provider',
                });
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
        <View
          style={{
            position: 'absolute',
            flexDirection: 'row',
            width: scale(190),
            top: '65%',
            start: '11%',
          }}
        >
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
              {`${item?.provider?.street} ${item?.provider?.city}`}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default RecentAppointmentCard;

const styles = StyleSheet.create({
  largeContainer: {
    width: '100%',
    height: scale(150),
    paddingHorizontal: scale(10),
    alignSelf: 'center',
  },
  container: {
    paddingRight: scale(15),
    paddingLeft: scale(5),
    paddingTop: scale(5),
    marginVertical: scale(10),
    flexDirection: 'row',
    borderRadius: scale(8),
    marginHorizontal: scale(10),
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
});
