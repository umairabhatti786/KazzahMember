import {Image, StyleSheet} from 'react-native';
import {Pressable, Text, View} from 'ui';
import React from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import textStyle from 'theme/typoGraphy';
import {useTheme} from '@react-navigation/native';
import SelectIcon from '../../assets/SelectIcon.svg';
import {SvgUri} from 'react-native-svg';
import {useDispatch} from 'react-redux';
import {setServiceId} from 'reducers/addProReducer';

const ServicesList = (props: any) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);

  const dispatch = useDispatch();

  return (
    <View flexDirection={'row'} alignItems={'center'} style={{flex: 1}}>
      <SvgUri
        style={{backgroundColor: '#000000', borderRadius: 30}}
        width={30}
        height={30}
        uri={props?.item?.icon}
      />
      <View width={scale(10)} />
      <Pressable
        onPress={() => {
          props.setServicesIndex(props.index);
          props.setSelectedServices(props.item);
          dispatch(setServiceId(props.item.id));
        }}
        style={{
          paddingTop: scale(5),
          flexDirection: 'row',
          width: '90%',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: verticalScale(50),
        }}>
        <Text numberOfLines={1} style={[textStyle.b3, {color: colors.black}]}>
          {props?.item?.name}
        </Text>
        {props?.servicesIndex == props.index ? (
          <SelectIcon width={scale(50)} height={scale(50)} />
        ) : null}
      </Pressable>
      <View
        height={verticalScale(1)}
        style={{backgroundColor: colors.gallery}}
      />
    </View>
  );
};
export default ServicesList;

const makeStyles = (colors: any) =>
  StyleSheet.create({
    categoryName: {
      justifyContent: 'center',
      width: '55%',
      marginTop: verticalScale(2),
    },
  });
