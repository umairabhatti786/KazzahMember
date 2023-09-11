import React, {useEffect} from 'react';
import {Screen, View, Text} from 'ui';
import {scale, verticalScale} from 'react-native-size-matters';
import {FlatList} from 'react-native';
import textStyle from 'theme/typoGraphy';
import {useTheme} from '@react-navigation/native';
import ArrowDown from '../../../assets/ArrowDown.svg';
import {useSelector} from 'react-redux';
import { Title } from 'newComponents/TextComponents';
import BackButtonHeader from 'newComponents/BackButtonHeader';
import CustomSearch from 'newComponents/CustomSearch';

const SearchNotification = () => {
  const {colors} = useTheme();



  return (
    <Screen edges={['right', 'top', 'left']}>
    <View
      style={{
        flex: 1,
      }}>
          <BackButtonHeader  showPages={false}

          />
          <View height={verticalScale(40)}/>
<View style={{paddingHorizontal:"6%"}}>
    <CustomSearch placeholder="Search notifications"/>

</View>
     
    </View>
  </Screen>
 
  );
};

export default SearchNotification;
