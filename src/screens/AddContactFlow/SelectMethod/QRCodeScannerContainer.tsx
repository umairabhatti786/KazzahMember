import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {Screen, View, Text} from 'ui';
import textStyle from 'theme/typoGraphy';
import {useTheme} from '@react-navigation/native';
import QRCodeIcon from 'assets/QRCodeIcon.svg';

import ManuallyIcon from 'assets/ManuallyIcon.svg';
import {scale, verticalScale} from 'react-native-size-matters';


const QRCodeScannerContainer = (props: any) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  
  return (
    <View>
   

      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.main}>
        <View style={styles.inner}>
          <QRCodeIcon width={scale(30)} height={scale(30)} />
          <View width={scale(10)} />
          <View>
          <Text
            style={[
              textStyle.b3,
              {color: colors.black, marginTop: verticalScale(4)},
            ]}>
Scan a QR Code
          </Text>
          <Text
              style={[
                textStyle.b5,
                {color: colors.silverChalice, marginTop: verticalScale(2)},
              ]}>
Scan a QR code to add to your contacts.              
            </Text>

          </View>

         
        </View>

      </TouchableOpacity>

    </View>
  );
};

export default QRCodeScannerContainer;
const makeStyles = (colors: any) =>
  StyleSheet.create({
    main: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: verticalScale(17),
        borderRadius:scale(10),
        backgroundColor:colors.background,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
    
        shadowOpacity: 0.13,
        shadowRadius: 10,
        elevation: 3,
        
      },
      inner: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal:scale(10),

      },
   
  });


