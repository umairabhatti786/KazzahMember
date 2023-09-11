import React, {useState, useMemo, useEffect} from 'react';
import {Button, Screen, Input, Pressable, View, Text, theme} from 'ui';
import {scale} from 'react-native-size-matters';
import {FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useIsFocused, useTheme} from '@react-navigation/native';
import _ from 'lodash';
import AppInnerHeader from 'newComponents/AppHeader';
import {Title} from 'newComponents/TextComponents';
import CustomSearch from 'newComponents/CustomSearch';
import {CalendarView} from 'screens/CalendarView';
import AddAppointment from 'newComponents/AddAppointment';
import { EmptyContacts } from './EmptyContacts';
import AppBackHeader from 'newComponents/AppBackHeader';
import BackButtonHeader from 'newComponents/BackButtonHeader';
import ContactTypeContainer from './ContactTypeContainer';

export const ChooseType = (props:any) => {
  const dispatch = useDispatch();
  const {colors} = useTheme();

  return (
    <>
      <Screen edges={['top']} backgroundColor={colors.background}>
            <BackButtonHeader showPages={false}/>
            

            <Title
              title={'Choose type'}
            />
                    <View style={{paddingHorizontal:"6%"}}>
                    <ContactTypeContainer navigation={props.navigation} />


                    </View>
      </Screen>

    </>
  );
};
