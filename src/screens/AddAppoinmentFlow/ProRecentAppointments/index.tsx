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
import ProTeamServicesList from '../ProService/ProTeamServicesList';
import {getCurrentAppointments} from 'services/common';
import moment from 'moment';
import _ from 'lodash';
import {useLoading} from 'components/Loader';
import RecentAppointmentCard from 'newComponents/RecentAppointmentCard';
import {useDispatch} from 'react-redux';
import {
  fetchRecentAppointmentsList,
  getRecentAppointmentsList,
} from 'reducers/addAppointmentReducer';

const ProRecentAppointments = ({navigation, route}: any) => {
  const [activeService, setActiveService] = useState();
  const [recentAppointments, setRecentAppointments] = useState([]);
  const authState = useSelector(authSelector);
  const [loading, setLoading] = useState(false);

  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const AppointmentsList = useSelector(getRecentAppointmentsList);
  const dispatch = useDispatch();
  const {id} = useSelector(authSelector).currentUser;

  useEffect(() => {
    dispatch(fetchRecentAppointmentsList());
  }, []);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {/* <View style={{paddingHorizontal: '6%'}}> */}
      <View height={verticalScale(20)} />

      <FlatList
        showsVerticalScrollIndicator={false}
        data={AppointmentsList}
        renderItem={({item, index}) => {
          return <RecentAppointmentCard item={item} index={index} />;
        }}
        keyExtractor={(item, index) => item + index.toString()}
      />

      {/* </View> */}
    </View>
  );
};

export default ProRecentAppointments;

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
