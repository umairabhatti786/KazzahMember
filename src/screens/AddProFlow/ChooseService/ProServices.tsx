import {
  StyleSheet,
  PermissionsAndroid,
  Platform,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {View, Text} from 'ui';
import {useSelector} from 'react-redux';
import ContactList from 'newComponents/ContactList';
import {scale, verticalScale} from 'react-native-size-matters';
import ServicesList from 'newComponents/ServicesList';
import textStyle from 'theme/typoGraphy';
import {useTheme} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {getAddPro} from 'reducers/addProReducer';

type Props = {
  list: any[];
};

const ProServices = ({list}: Props) => {
  const [proService, setProService] = useState([]);
  const [selectedServices, setSelectedServices] = useState({});
  const [servicesIndex, setServicesIndex] = useState();
  const addProState = useSelector(getAddPro);

  const {colors} = useTheme();

  useEffect(() => {
    setServicesIndex(list.findIndex(e => e.id == addProState.serviceId));
  }, [list.length]);

  return (
    <View>
      <Text style={[textStyle.cta1]}>Type </Text>
      <View height={verticalScale(20)} />
      <View height={verticalScale(10)} />
      <ScrollView>
        <View
          style={{
            paddingBottom: scale(330),
            backgroundColor: 'white',
            width: '100%',
          }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            data={list}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <ServicesList
                  item={item}
                  selectedServices={selectedServices}
                  setServicesIndex={setServicesIndex}
                  servicesIndex={servicesIndex}
                  index={index}
                  setSelectedServices={setSelectedServices}
                />
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ProServices;

const styles = StyleSheet.create({});
