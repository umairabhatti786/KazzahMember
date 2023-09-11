import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Pressable, Text, View} from 'ui';

import React from 'react';
import CustomSearch from 'newComponents/CustomSearch';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import { useNavigation,useTheme } from '@react-navigation/native';
import Ionicons from "react-native-vector-icons/Ionicons"
import FilterIcon from "../../../src/assets/FilterIcon.svg"


const MapSearchHeader = ({placeholder,style,activeMap=false,activeFilter=false,activeExplore=false}:any) => {
    const navigation=useNavigation()
    const {colors} = useTheme();

  return (
    <View style={styles.main}>
      <CustomSearch width={'65%'}
      placeholder={placeholder}
      style={style}
       />

      <View style={styles.innerContainer}>
        <TouchableOpacity
                onPress={  ()=>navigation.navigate("Search")}

         activeOpacity={0.6}>
            <Ionicons  size={moderateScale(22)}
            name="location-outline"
             color={activeMap?colors.black:colors.doveGray}/>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={()=>navigation.navigate("MapsFilterStack")}
        activeOpacity={0.6}>
          <FilterIcon
            resizeMode="contain"
            style={{...styles.img,color: activeFilter?colors.black:colors.doveGray}}
          />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.6}
        onPress={()=>navigation.navigate("ExploreStack")}
        >
          <Image
            resizeMode="contain"
            style={{...styles.img,tintColor:activeExplore?colors.black:colors.doveGray}}
            source={require('../../../src/assets/GalleryIcon.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MapSearchHeader;

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: verticalScale(50),
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    marginLeft: scale(22),
  },
  img: {
    width: scale(15),
    height: scale(15),
  },
});
