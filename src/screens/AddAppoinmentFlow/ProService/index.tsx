import {FlatList, StyleSheet} from 'react-native';
import {Screen, View, Text, Pressable} from 'ui';
import React, {useState, useEffect} from 'react';
import BackButtonHeader from 'newComponents/BackButtonHeader';
import {scale, verticalScale} from 'react-native-size-matters';
import {Title} from 'newComponents/TextComponents';
import {useTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {authSelector, getSelectedPro} from 'reducers/authReducer';
import Button from 'newComponents/Button';
import ProInfo from 'newComponents/ProInfo';
import textStyle from 'theme/typoGraphy';
import ProServices from 'newComponents/ProServices';
import ProTeamList from '../ProTeams/ProTeamList';
import ProServicesList from 'newComponents/ProServices';
import ProTeamServicesList from './ProTeamServicesList';
const ProService = ({navigation, route}: any) => {
  const [activeService, setActiveService] = useState();
  const {token} = useSelector(authSelector).currentUser;

  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const pros = useSelector(getSelectedPro);

  // const currentUser = useSelector(authSelector).currentUser;
  useEffect(() => {
    // getProServices()
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <View style={{paddingHorizontal: '6%'}}>
        <View height={verticalScale(10)} />
        <ProTeamServicesList />
      </View>
    </View>
  );
};

export default ProService;

const makeStyles = (colors: any) =>
  StyleSheet.create({
    proBtn: {
      position: 'absolute',
      bottom: verticalScale(20),
      alignItems: 'center',
      width: '100%',
      left: 0,
    },
  });
