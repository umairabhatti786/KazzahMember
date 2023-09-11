import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Screen, View, Text} from 'ui';
import textStyle from 'theme/typoGraphy';
import {useTheme} from '@react-navigation/native';
import ContactIcon from 'assets/ContactIcon.svg';

import ManuallyIcon from 'assets/ManuallyIcon.svg';
import {scale, verticalScale} from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import { setEmptyAddPro, setEmptyMobileNo } from 'reducers/addProReducer';
const linkMap=require("../../../../src/assets/LinkMap.png")
const ProTypeContainer = (props: any) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);

  const dispatch=useDispatch()
  return (
    <View>
      <View
        height={verticalScale(0.5)}
        style={{backgroundColor: colors.gallery}}
      />
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => 
          {
            dispatch(setEmptyAddPro())
            props.navigation.navigate('AddContacts')


          }
       }
        style={styles.main}>
        <View style={styles.inner}>
          <ContactIcon width={scale(20)} height={scale(20)} />
          <View width={scale(10)} />
          <View>
          <Text
            style={[
              textStyle.b3,
              {color: colors.black, marginTop: verticalScale(4)},
            ]}>
              Choose from contacts
          </Text>
          <Text
            style={[
              textStyle.b5,
              {color: colors.silverChalice, marginTop: verticalScale(4)},
            ]}>
              Open your Contacts and invite Pro
          </Text>

          </View>


          
        </View>

        <Image
          source={require('../../../assets/NextIcon.png')}
          style={{width: scale(8), height: scale(8)}}
        />
      </TouchableOpacity>
       <TouchableOpacity
        activeOpacity={0.6}
        style={styles.main}
        onPress={() =>
          {
            dispatch(setEmptyAddPro())
            props.navigation.navigate('Search')

          }
        }>
        <View style={styles.inner}>
          <Image
          style={{width:20,height:20}}
           source={linkMap}/>
          <View width={scale(10)} />
          <View>
          <Text
            style={[
              textStyle.b3,
              {color: colors.black, marginTop: verticalScale(4)},
            ]}>
              [Link to map]
          </Text>

          <Text
            style={[
              textStyle.b5,
              {color: colors.silverChalice, marginTop: verticalScale(4)},
            ]}>
              Your friends trusted Pros
          </Text>

          </View>

          
        </View>

        <Image
          source={require('../../../assets/NextIcon.png')}
          style={{width: scale(8), height: scale(8)}}
        />
      </TouchableOpacity>

     

      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.main}
        onPress={() =>
          {
            dispatch(setEmptyAddPro())
            props.navigation.navigate('AddYourPro')

          }
        }>
        <View style={styles.inner}>
          <ManuallyIcon width={scale(20)} height={scale(20)} />
          <View width={scale(10)} />
          <View>
          <Text
            style={[
              textStyle.b3,
              {color: colors.black, marginTop: verticalScale(4)},
            ]}>
            Add manually
          </Text>

          <Text
            style={[
              textStyle.b5,
              {color: colors.silverChalice, marginTop: verticalScale(4)},
            ]}>
              Open your Contacts and choose Pro
          </Text>

          </View>

          
        </View>

        <Image
          source={require('../../../assets/NextIcon.png')}
          style={{width: scale(8), height: scale(8)}}
        />
      </TouchableOpacity>

     
    </View>
  );
};

export default ProTypeContainer;
const makeStyles = (colors: any) =>
  StyleSheet.create({
    main: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: verticalScale(17),
      borderBottomWidth:0.5,
      borderColor:colors.gallery,
    },
    inner: {
      flexDirection: 'row',
      alignItems: 'center',
    },
   
  });


