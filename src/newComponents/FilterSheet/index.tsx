import React, {useEffect, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {Pressable, Text, View} from 'ui';
import {scale, verticalScale} from 'react-native-size-matters';
import {BottomSheet} from 'react-native-btr';
import CrossIcon from '../../assets/CrossIcon.svg';
import textStyle from 'theme/typoGraphy';
import Button from 'newComponents/Button';
import AppointmentSelectIcon from '../../assets/AppointmentSelectIcon.svg';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getActiveAppointmentList,
  getAllAppointmentList,
  getAllAppointmentLists,
  getAppointmentFilter,
  getAppointmentView,
  getDeclinedAppointmentList,
  getPastAppointmentList,
  getPendingAppointmentList,
  setAppointmentFilter,
  setAppointmentView,
} from 'reducers/appoinmentReducer';
type Props = {
  isVisible?: boolean;
  setVisible?: any;
  setCalenderType?: any;
};

type AppointmentFilterType = {
  type: 'All' | 'Active' | 'Pending' | 'Declined' | 'Past';
};

const appointmentType = [
  {
    type: 'All',
  },
  {
    type: 'Active',
  },
  {
    type: 'Pending',
  },
  {
    type: 'Declined',
  },
  {
    type: 'Past',
  },
] as AppointmentFilterType[];
const CalendarType = [
  {
    type: 'List',
  },
  {
    type: 'Daily',
  },
  {
    type: 'Weekly',
  },
  {
    type: 'Monthly',
  },
];

const FilterSheet = ({isVisible, setVisible, setCalenderType}: Props) => {
  const dispatch = useDispatch();
  const allAppointments = useSelector(getAllAppointmentList);
  const activeAppointments = useSelector(getActiveAppointmentList);
  const pendingAppointments = useSelector(getPendingAppointmentList);
  const declinedAppointments = useSelector(getDeclinedAppointmentList);
  const pastAppointments = useSelector(getPastAppointmentList);

  const appointments = useSelector(getAllAppointmentLists);

  const {colors} = useTheme();
  const [checkboxState, setCheckboxState] = useState(1);
  const onCloseModal = () => {
    setVisible?.(false);
  };

  const isCalendar = useSelector(getAppointmentView).isList;

  const selectedFilterStore = useSelector(getAppointmentFilter);

  const [selectedFilter, setSelectedFilter] = useState(selectedFilterStore);

  useEffect(() => {
    setSelectedFilter(selectedFilterStore);
  }, [isVisible]);

  return (
    <View>
      <BottomSheet
        visible={isVisible}
        onBackButtonPress={onCloseModal}
        onBackdropPress={onCloseModal}
      >
        <View
          flexDirection={'column'}
          backgroundColor={'white'}
          alignSelf="center"
          maxHeight={!isCalendar ? '38%' : '55%'}
          minHeight={'52%'}
          width={'100%'}
          borderTopLeftRadius={scale(15)}
          borderTopRightRadius={scale(15)}
          padding={'xxl'}
          overflow="hidden"
        >
          <CrossIcon
            hitSlop={30}
            onPress={() => {
              setVisible(false);
            }}
            style={{color: colors.black}}
          />

          <View marginHorizontal={'m'}>
            <Text
              style={[
                textStyle.h3,
                {color: colors.black, marginVertical: scale(15)},
              ]}
            >
              Type
            </Text>
            {!isCalendar
              ? CalendarType.map((item, index) => {
                  return (
                    <Pressable
                      key={index.toString()}
                      onPress={() => {
                        item.type == 'List' &&
                          dispatch(setAppointmentView(true));
                        setCalenderType(item.type);
                        setCheckboxState(index);
                        setVisible(false);
                      }}
                      style={{flexDirection: 'row', alignItems: 'center'}}
                    >
                      <View
                        flex={1}
                        justifyContent={'center'}
                        height={scale(43)}
                      >
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
                      <View
                        flex={7}
                        justifyContent={'center'}
                        height={scale(43)}
                      >
                        <Text style={[textStyle.b3, {color: colors.black}]}>
                          {item.type}
                        </Text>
                      </View>
                    </Pressable>
                  );
                })
              : appointmentType.map((item, index) => {
                  return (
                    <Pressable
                      key={index.toString()}
                      onPress={() => {
                        setSelectedFilter(item.type);
                      }}
                      style={{flexDirection: 'row', alignItems: 'center'}}
                    >
                      <View
                        flex={1}
                        justifyContent={'center'}
                        height={scale(43)}
                      >
                        {selectedFilter == item.type ? (
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
                      <View
                        alignItems={'center'}
                        flex={7}
                        flexDirection={'row'}
                        height={scale(43)}
                      >
                        <Text style={[textStyle.b3, {color: colors.black}]}>
                          {item.type}
                        </Text>
                        <Text
                          style={[
                            textStyle.b3,
                            {color: colors.black, paddingLeft: '2%'},
                          ]}
                        >
                          ({appointments[item.type].length})
                        </Text>
                      </View>
                    </Pressable>
                  );
                })}
          </View>
          {isCalendar && (
            <View style={styles.proBtn}>
              <Button
                label="Show appointments"
                width={'90%'}
                onPress={() => {
                  dispatch(setAppointmentFilter(selectedFilter));
                  setVisible(false);
                }}
              />
            </View>
          )}
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
    bottom: verticalScale(30),
    alignSelf: 'center',
  },
});

export default FilterSheet;
