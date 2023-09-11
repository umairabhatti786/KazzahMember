import {
  PermissionsAndroid,
  Platform,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {check, PERMISSIONS} from 'react-native-permissions';
import {useSelector} from 'react-redux';
import {authSelector, getProviderContacts} from 'reducers/authReducer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {scale, verticalScale} from 'react-native-size-matters';
import {Pressable, View, Text} from 'ui';
import _ from 'lodash';
import AlphabetSort from '../../../../src/assets/AlphabetSort.svg';
import {ActivityIndicator} from 'react-native-paper';
import {useTheme} from '@react-navigation/native';
import ProsList from 'newComponents/ProsList';
import * as Animatable from 'react-native-animatable';
import {GetAllConnections} from 'services/Connections';
import Accordion from 'react-native-collapsible/Accordion';
import ProsTeamHeader from 'newComponents/ProsTeamHeader';
import textStyle from 'theme/typoGraphy';
import FastImage from 'react-native-fast-image';
import {useDispatch} from 'react-redux';
import {
  fetchServicesList,
  fetchServicesProsList,
  fetchTeamProsList,
  getServicesList,
} from 'reducers/addAppointmentReducer';
import AlphabetOrder from 'newComponents/AlphabetOrder';

const ProTeamServicesList = () => {
  const [prosIndex, setProsIndex] = useState();
  const currentUser = useSelector(authSelector).currentUser;
  const [selectPros, setSelectPros] = useState();
  const [activeSections, setActiveSections] = useState([]);
  const serviceList = useSelector(getServicesList);
  const [sortOrder, setSortOrder] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchServicesList(sortOrder));
  }, [sortOrder]);

  const {colors} = useTheme();

  const getAllPros = (id: any) => {
    dispatch(fetchServicesProsList(id));
  };

  const onPress = () => {
    setSortOrder(!sortOrder);
  };

  return (
    <React.Fragment>
      <AlphabetOrder onPress={onPress} sortOrder={sortOrder} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingBottom: scale(200),
            backgroundColor: 'white',
            width: '100%',
          }}>
          <FlatList
            data={serviceList}
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <ProsTeamHeader
                  providersList={item.providersList}
                  item={item.serviceId}
                  index={index}
                  getAllPros={getAllPros}
                  totalProvider={item.serviceTotalProvider}
                />
              );
            }}
          />
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

export default ProTeamServicesList;
