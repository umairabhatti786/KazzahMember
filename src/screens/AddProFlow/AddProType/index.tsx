import {Screen, View, Text} from 'ui';
import React from 'react';
import {Platform, StyleSheet, TouchableOpacity} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import textStyle from 'theme/typoGraphy';
import {Title} from 'newComponents/TextComponents';
import AppBackHeader from 'newComponents/AppBackHeader';
import {useTheme} from '@react-navigation/native';
import ProTypeContainer from './ProTypeContainer';
import QRCodeCard from 'newComponents/QRCodeCard';
import { backgroundColor } from '@shopify/restyle';
import BackIcon from "../../../../src/assets/BackIcon.svg"

const AddProType = (props: any) => {
  const isAddTeam=props?.route?.params?.isAddTeam
    const {colors} = useTheme();
    return (
    <Screen edges={['right', 'top', 'left']}>
      <View
        style={{
          flex: 1,
        }}>{
          isAddTeam?(
            <View>
            <TouchableOpacity
              onPress={()=>{
                props.navigation.navigate("YourTeams")

              }}
              style={styles.BackIcon}>
              <BackIcon
                style={{
                  alignSelf: 'flex-start',
                  marginLeft: scale(10),
                  color: colors.black,
                }}
                width={scale(20)}
                height={scale(15)}
              />
            </TouchableOpacity>
            <Title title={"Add Pro"} />
          </View>
          ):       
           <AppBackHeader navigation={props.navigation} label="Add Pro" />

        }
        <View height={verticalScale(10)} />
        <View style={{paddingHorizontal:"6%",}}>
       
                <ProTypeContainer navigation={props.navigation}/>



        </View>

       

       
      </View>
      <View
          style={{
            alignItems: 'center',
            paddingHorizontal:"6%"
            
          }}>
                            <QRCodeCard/>

          {/* <Button onPress={handleSubmit(submit)} label={'Continue'} /> */}
          {Platform.OS === 'ios' ? <View height={verticalScale(50)} /> : <></>}
        </View>
    </Screen>
  );
};

export default AddProType;

const styles = StyleSheet.create({
  BackIcon: {
    width: scale(50),
    height: scale(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
