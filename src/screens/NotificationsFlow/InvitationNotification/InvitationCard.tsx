import React, {useEffect} from 'react';
import {Screen, View, Text, Pressable} from 'ui';
import {scale, verticalScale} from 'react-native-size-matters';
import {FlatList, StyleSheet,Image} from 'react-native';
import textStyle from 'theme/typoGraphy';
import {useTheme} from '@react-navigation/native';
import ArrowDown from '../../../assets/ArrowDown.svg';
import {getPaidPayment} from 'reducers/PaymentReducer';
import {useSelector} from 'react-redux';
import {Item} from 'react-native-paper/lib/typescript/components/List/List';
import FastImage from 'react-native-fast-image';
import InitialNameLetters from 'newComponents/InitialNameLetters';
import CrossIcon from "../../../../src/assets/CrossIcon.svg"
import AntDesign from "react-native-vector-icons/AntDesign"

const InvitationCard = (props: any) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);


  return (
    <Pressable
    onPress={props.onCardPress}
      style={{
        backgroundColor: colors.background,
        borderBottomWidth: 0.5,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',

        borderBottomColor: colors.silverChalice,
        paddingVertical: verticalScale(10),
        // marginVertical: verticalScale(5),zw
        height: verticalScale(70),
      }}>
      {props.item?.profileImage ? (
        <Pressable
          width={scale(35)}
          height={scale(35)}
          borderRadius={10}
          style={{marginRight: scale(10)}}
          overflow="hidden">
          <FastImage
            style={{width: '100%', height: '100%'}}
            source={{uri: provider?.profileImage}}
          />
        </Pressable>
      ) : (
        <InitialNameLetters
          width={scale(35)}
          height={scale(35)}
          firstName={`${props.item?.firstName}`}
          lastName={`${props.item?.lastName}`}
        />
      )}

      <View
        alignItems={'center'}
        justifyContent={'space-between'}
        flexDirection={'row'}>
        <View width={'64%'} 
        flexDirection={'column'}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              numberOfLines={1}
              style={[textStyle.b3, {color: colors.black}]}
              ellipsizeMode={'tail'}>
              {props.item?.firstName} {props.item?.lastName}
            </Text>
            <View
              style={{
                width: scale(25),
                height: verticalScale(17),
                backgroundColor: '#FFDCC8',
                borderRadius: scale(4),
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: scale(5),
              }}>
              <Text style={[textStyle.cta3, {color: colors.black}]}>Pro</Text>
            </View>
          </View>

          {props.item?.rootService ? (
            <Text
              numberOfLines={1}
              style={[textStyle.b5, {color: colors.doveGray}]}>
              {props.item?.rootService}
            </Text>
          ) : null}
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={styles.circle}>
                <CrossIcon style={{color:colors.black}}
                width={scale(10)}
                height={scale(10)}

                />

            </View>
            

            <View
            style={{...styles.circle,marginLeft:scale(15)}}>
                <AntDesign  name="check"  size={scale(15)} color={colors.black}/>

            </View>
        </View>
      </View>
    </Pressable>
  );
};

export default InvitationCard;

const makeStyles = (colors: any) =>
  StyleSheet.create({
      circle:{
        width: scale(25),
        height: scale(25),
        borderRadius: scale(100),
        borderColor: colors.black,
        borderWidth: 1,
        alignItems:"center",
        justifyContent:"center",
      }

 
  });
