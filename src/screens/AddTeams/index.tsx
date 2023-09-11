import {Screen, View} from 'ui';
import React from 'react';
import {StyleSheet} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import AppBackHeader from 'newComponents/AppBackHeader';
import {useTheme} from '@react-navigation/native';
import ContactForm from '../AddProFlow/AddContactFlow/AddContacts/ContactForm';
import Button from 'newComponents/Button';
import YourTeamsList from './AddTeam';
import AddTeam from './AddTeam';

const AddTeams = (props: any) => {
  return (
    <Screen edges={['right', 'top', 'left']}>
      <View
        style={{
          flex: 1,
        }}>
        <AppBackHeader navigation={props.navigation} label="Add teams" />
        <View height={verticalScale(10)} />
        <View style={{paddingHorizontal: '6%'}}>
          <AddTeam />
        </View>
      </View>
    </Screen>
  );
};

export default AddTeams;
