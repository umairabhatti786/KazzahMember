import {
  StyleSheet,
  Image,
  TouchableOpacityBase,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import {Text, View} from 'ui';
import React, {useEffect, useState} from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import textStyle from 'theme/typoGraphy';
import {useTheme} from '@react-navigation/native';
import {SvgUri} from 'react-native-svg';
import SelectIcon from '../../../../src/assets/SelectIcon.svg';
import {useDispatch} from 'react-redux';
import {
  fetchMemberServiceList,
  getAllMemberServices,
  getAllMemberServicesloading,
  setMemberServiceList,
} from 'reducers/contactReducer';
import {useSelector} from 'react-redux';
import {useToast} from 'react-native-toast-notifications';
const ContactTeamItem = (props: any) => {
  const {colors} = useTheme();
  const toast = useToast();

  const dispatch = useDispatch();

  const memberServices = useSelector(getAllMemberServices);
  const memberServicesLoading = useSelector(getAllMemberServicesloading);

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          // console.log(props?.item?.id);
          dispatch(fetchMemberServiceList(props?.item?.id))
            .unwrap()
            .then(originalPromiseResult => {
              // let SubCategoryList = [];
              // originalPromiseResult.forEach(element => {
              //   SubCategoryList.push({label: element.name, value: element.id});
              // });
              setMemberServiceList(originalPromiseResult[0]);
            })
            .catch(rejectedValueOrSerializedError => {
              dispatch(setMemberServiceList([]));

              toast.show('No service found in this channel', {
                type: 'error_custom',
                placement: 'bottom',
                duration: 4000,
                animationType: 'slide-in',
              });
            });

          if (props.selectTeam == props?.item?.teamId) {
            props.setSelectTeam(0);
            props.setselectTeamService(0);
          } else {
            props.setSelectTeam(props?.item?.teamId);
          }
        }}
        style={{
          borderBottomColor: colors.gallery,
          borderBottomWidth: 1,
          backgroundColor: colors.background,
          borderTopColor: colors.gallery,
          borderTopWidth: 1,
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          height: verticalScale(50),
        }}>
        <View
          style={{
            width: scale(30),
            height: scale(30),
            borderRadius: scale(10),
          }}>
          <SvgUri
            width={scale(30)}
            height={scale(30)}
            uri={props?.item?.icon}
          />
        </View>

        <View
          marginLeft={'s'}
          alignItems={'center'}
          justifyContent={'space-between'}
          flexDirection={'row'}>
          <View width={'70%'} flexDirection={'column'}>
            <Text
              numberOfLines={1}
              style={[textStyle.b3, {color: colors.black}]}
              ellipsizeMode={'tail'}>
              {props.item?.name}
            </Text>

            <Text
              numberOfLines={1}
              style={[textStyle.b5, {color: colors.doveGray}]}>
              {`${props?.item?.providerCount} Pro`}
            </Text>
          </View>

          {props.selectTeam == props?.item?.teamId ? (
            <SelectIcon width={scale(50)} height={scale(50)} />
          ) : null}
        </View>
      </TouchableOpacity>
      {memberServices && props.selectTeam == props?.item?.teamId
        ? !memberServicesLoading &&
          memberServices.map(item => {
            return (
              <>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    props.setselectTeamService(item?.id);
                  }}
                  style={{
                    borderBottomColor: colors.gallery,
                    borderBottomWidth: 1,
                    backgroundColor: colors.background,
                    borderTopColor: colors.gallery,
                    borderTopWidth: 1,
                    flexDirection: 'row',
                    width: '90%',
                    alignSelf: 'center',
                    alignItems: 'center',
                    height: verticalScale(50),
                  }}>
                  <View
                    style={{
                      width: scale(30),
                      height: scale(30),
                      borderRadius: scale(15),
                      borderWidth: 1,
                    }}>
                    <SvgUri
                      width={scale(30)}
                      height={scale(30)}
                      uri={item?.icon}
                    />
                  </View>

                  <View
                    marginLeft={'s'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    flexDirection={'row'}>
                    <View width={'70%'} flexDirection={'column'}>
                      <Text
                        numberOfLines={1}
                        style={[textStyle.b3, {color: colors.black}]}
                        ellipsizeMode={'tail'}>
                        {item?.name}
                      </Text>
                    </View>

                    {props.selectTeamService == item?.id ? (
                      <SelectIcon width={scale(50)} height={scale(50)} />
                    ) : null}
                  </View>
                </TouchableOpacity>
              </>
            );
          })
        : null}
    </>
  );
};

export default ContactTeamItem;
