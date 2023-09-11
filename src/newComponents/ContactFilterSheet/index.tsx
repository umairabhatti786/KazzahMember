import React, {useEffect, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {Pressable, Text, View} from 'ui';
import {scale} from 'react-native-size-matters';
import {BottomSheet} from 'react-native-btr';
import CrossIcon from '../../assets/CrossIcon.svg';
import textStyle from 'theme/typoGraphy';
import AppointmentSelectIcon from '../../assets/AppointmentSelectIcon.svg';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {getContactFilterType} from 'utils';
type Props = {
  isVisible?: boolean;
  checkboxState?: any;
  setCheckboxState?: any;
  setVisible?: any;
  setSelectedFilter?: any;
  setFilterName?: any;
};

type ContactFilterType = {
  type: 'All' | 'Friends' | 'Providers' | 'Favorites';
};

const ContactType = [
  {
    type: 'All',
  },
  {
    type: 'Friends',
  },
  {
    type: 'Providers',
  },
  {
    type: 'Favourites',
  },
] as ContactFilterType[];

const ContactFilterSheet = ({
  isVisible,
  setVisible,
  setSelectedFilter,
  setFilterName,
  setCheckboxState,
  checkboxState,
}: Props) => {
  const dispatch = useDispatch();
  const {colors} = useTheme();
  const onCloseModal = () => {
    setVisible?.(false);
  };
  return (
    <View>
      <BottomSheet
        visible={isVisible}
        onBackButtonPress={onCloseModal}
        onBackdropPress={onCloseModal}>
        <View
          flexDirection={'column'}
          backgroundColor={'white'}
          alignSelf="center"
          height={'42%'}
          width={'100%'}
          borderTopLeftRadius={scale(15)}
          borderTopRightRadius={scale(15)}
          padding={'xxl'}
          overflow="hidden">
          <Pressable
            width={scale(30)}
            height={scale(30)}
            onPress={() => {
              setVisible();
            }}>
            <CrossIcon
              onPress={() => {
                setVisible();
              }}
              style={{color: colors.black}}
            />
          </Pressable>

          <View marginVertical={'xxl'} marginHorizontal={'m'}>
            <Text
              style={[
                textStyle.h3,
                {color: colors.black, marginBottom: scale(10)},
              ]}>
              Type
            </Text>

            {ContactType.map((item, index) => {
              return (
                <Pressable
                  key={index.toString()}
                  onPress={() => {
                    setCheckboxState(index);
                    setVisible(false);
                    setSelectedFilter(getContactFilterType(item.type));
                    setFilterName(item.type);
                  }}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View flex={1} justifyContent={'center'} height={scale(43)}>
                    {checkboxState == index ? (
                      <AppointmentSelectIcon
                        style={{start: scale(-25), bottom: -5}}
                        width={scale(75)}
                        height={scale(75)}
                      />
                    ) : (
                      <View
                        style={{borderColor: colors.black, borderWidth: 2}}
                        height={scale(25)}
                        width={scale(25)}
                        borderRadius={scale(50)}
                      />
                    )}
                  </View>
                  <View flex={7} justifyContent={'center'} height={scale(43)}>
                    <Text style={[textStyle.b3, {color: colors.black}]}>
                      {item.type}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  proBtn: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 5,
    alignSelf: 'center',
  },
});

export default ContactFilterSheet;
