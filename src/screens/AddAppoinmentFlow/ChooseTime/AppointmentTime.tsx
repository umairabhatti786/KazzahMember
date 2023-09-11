import {
  StyleSheet,
  PermissionsAndroid,
  Platform,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {View, Text} from 'ui';
import {scale, verticalScale} from 'react-native-size-matters';
import textStyle from 'theme/typoGraphy';
import {useTheme} from '@react-navigation/native';
import TimeList from 'newComponents/TimeList';
import TimeCounter from 'newComponents/TimeCounter';
import {useSelector} from 'react-redux';
import {getTimeSlots} from 'reducers/addAppointmentReducer';

const AppointmentTime = () => {
  const {colors} = useTheme();
  const [timeIndex, setTimeIndex] = useState({});

  const timeSlots = useSelector(getTimeSlots);

  return (
    <View>
      <ScrollView>
        <View height={verticalScale(20)} />
        <Text style={[textStyle.h3, {color: colors.black}]}>
          Available times
        </Text>
        <View height={verticalScale(10)} />
        <View
          style={{
            paddingBottom: scale(300),
            backgroundColor: 'white',
            width: '100%',
          }}
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            numColumns={3}
            data={timeSlots}
            ListEmptyComponent={() => (
              <View
                style={{
                  height: scale(350),
                  justifyContent: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={[textStyle.b3, {color: colors.black}]}>
                  No time slots available
                </Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <TimeList
                  timeIndex={timeIndex}
                  setTimeIndex={setTimeIndex}
                  item={item}
                  index={index}
                />
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default AppointmentTime;

const styles = StyleSheet.create({});
