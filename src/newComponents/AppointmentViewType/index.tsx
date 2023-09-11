import React, {useEffect, useState} from 'react';
import {View} from 'ui';
import {moderateScale, scale} from 'react-native-size-matters';
import FilterIcon from '../../assets/FilterIcon.svg';
import CalendarIcon from '../../assets/CalendarIcon.svg';
import ThreeDotIcon from '../../assets/ThreeDotIcon.svg';
import {useTheme} from '@react-navigation/native';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {BottomSheet} from 'react-native-btr';
import FilterSheet from 'newComponents/FilterSheet';
import {visible} from '@shopify/restyle';
import {useDispatch} from 'react-redux';
import {
  getAppointmentView,
  setAppointmentView,
} from 'reducers/appoinmentReducer';
import {useSelector} from 'react-redux';

type Props = {
  showFilters?: boolean;
  UserEvent?: any;
  showPages?: boolean;
  setCalenderType?: any;
};

const AppointmentViewType = ({
  showFilters = false,
  UserEvent = [],
  showPages = true,
  setCalenderType,
}: Props) => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const isCalendar = useSelector(getAppointmentView).isList;

  const [visible, setVisible] = useState(false);
  const [CalendarType, setCalenderTypeView] = useState('');

  useEffect(() => {
    CalendarType && setCalenderType(CalendarType);
  }, [CalendarType]);

  const styles = makeStyles(colors);
  return (
    <View style={styles.containerStyle}>
      <FilterSheet
        isVisible={visible}
        setVisible={setVisible}
        setCalenderType={setCalenderTypeView}
      />
      <TouchableOpacity
        onPress={() => {
          dispatch(setAppointmentView(true));
        }}>
        <FilterIcon
          style={{color: isCalendar ? colors.black : colors.silverChalice}}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          dispatch(setAppointmentView(false));
        }}>
        <CalendarIcon
          style={{color: !isCalendar ? colors.black : colors.silverChalice}}
          height={scale(20)}
          width={scale(20)}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setVisible(!visible);
        }}>
        <ThreeDotIcon
          style={{top: scale(5), right: scale(15)}}
          height={scale(40)}
          width={scale(50)}
        />
      </TouchableOpacity>
    </View>
  );
};

const makeStyles = (colors: any) =>
  StyleSheet.create({
    containerStyle: {
      //   position: 'absolute',
      //   top: scale(135),
      //   right: 0,
      //   zIndex: 100,
      width: scale(130),
      height: scale(22),

      alignItems: 'center',
      backgroundColor: colors.background,
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
  });

export default AppointmentViewType;
