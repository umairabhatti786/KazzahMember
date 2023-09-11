import {PermissionsAndroid, Platform, FlatList, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {check, PERMISSIONS} from 'react-native-permissions';
import {useSelector} from 'react-redux';
import {authSelector, getProviderContacts} from 'reducers/authReducer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {scale, verticalScale} from 'react-native-size-matters';
import {Pressable, Text, View} from 'ui';
import _ from 'lodash';
import ArrowDown from '../../../../src/assets/ArrowDown.svg';
import {ActivityIndicator} from 'react-native-paper';
import {useTheme} from '@react-navigation/native';
import ProsList from 'newComponents/ProsList';
import {GetAllConnections} from 'services/Connections';
import {useDispatch} from 'react-redux';
import {
  fetchProvidersList,
  getProviderListLoading,
  getProvidersList,
} from 'reducers/addAppointmentReducer';
import textStyle from 'theme/typoGraphy';
import AlphabetOrder from 'newComponents/AlphabetOrder';

const ProsForm = ({selectPros, setSelectPros}: any) => {
  const [prosIndex, setProsIndex] = useState();

  const dispatch = useDispatch();
  const allProvider = useSelector(getProvidersList);
  const {colors} = useTheme();
  const loading = useSelector(getProviderListLoading);
  const [sortOrder, setSortOrder] = useState(false);

  useEffect(() => {
    dispatch(fetchProvidersList(sortOrder));
  }, [sortOrder]);

  const onPress = () => {
    setSortOrder(!sortOrder);
  };
  console.log('allProvider', allProvider);
  return (
    <React.Fragment>
      <AlphabetOrder onPress={onPress} sortOrder={sortOrder} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingBottom: scale(300),
            backgroundColor: 'white',
            width: '100%',
          }}>
          <FlatList
            data={allProvider}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={() => (
              <>
                {loading ? (
                  <View style={{marginTop: verticalScale(100)}}>
                    <ActivityIndicator color={colors.black} />
                  </View>
                ) : (
                  <></>
                )}
              </>
            )}
            renderItem={({item, index}) => {
              return (
                <ProsList
                  item={item}
                  prosIndex={prosIndex}
                  setProsIndex={setProsIndex}
                  selectPros={selectPros}
                  index={index}
                  setSelectPros={setSelectPros}
                />
              );
            }}
          />
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

export default ProsForm;
