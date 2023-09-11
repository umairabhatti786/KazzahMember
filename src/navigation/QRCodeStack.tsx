import React, {useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {scale} from 'react-native-size-matters';
import {View} from 'ui';
import {TouchableOpacity, Image, Platform} from 'react-native';
import {useTheme} from '@react-navigation/native';
import QRScreen from 'screens/ProfileFlow/QRScreen';
import QRCodeScreen from 'screens/ProfileFlow/QRCodeScreen';
import QRCoderBackHeader from 'newComponents/QRCoderBackHeader';

const AddPhotoIcon = require('../assets/QrcodeIcons/AddPhotoIcon.png');
const QRCodeScannerIcon = require('../assets/QrcodeIcons/QRCodeScannerIcon.png');

const Tab = createMaterialTopTabNavigator();

type Props = {
  navigation: any;
};

export const QRCodeStack: React.FC<Props> = props => {
  const {colors} = useTheme();
  const [selected, setSelected] = useState(0);

  return (
    <Tab.Navigator
      screenOptions={{
        swipeEnabled: false,
      }}
      tabBar={props => {
        return (
          <View
            style={{
              paddingLeft: scale(10),
              marginTop:  Platform.OS=="ios"?"13%" :' 6%',
              position: 'absolute',
              zIndex: 5,
              width: '100%',
              backgroundColor:
                selected === 0 ? 'transparent' : colors.background,
            }}
            flexDirection={'row'}
            justifyContent={'space-between'}
          >
            <QRCoderBackHeader
              color={selected === 0 ? colors.background : colors.black}
            />
            <View width={scale(15)} />
            <View flexDirection={'row'}>
              {props.state.routes.map((item, index) => {
                const isFocused = props.state.index === index;

                return (
                  <TouchableOpacity
                  activeOpacity={0.6}
                    key={index}
                    onPress={() => {
                      setSelected(index);
                      props.navigation.navigate(item.name);
                    }}
                    style={{
                      alignItems: 'center',
                      paddingVertical: scale(12),
                      justifyContent: 'center',
                      marginRight: scale(30),
                      paddingHorizontal: scale(7),  
                                      }}
                  >
                    <Image
                      resizeMode="contain"
                      style={{
                        width: item.name == 'QRScreen' ? scale(20) : scale(18),
                        height:
                          item.name == 'QRCodeScreen' ? scale(20) : scale(18),
                        tintColor:
                          isFocused && selected === 0
                            ? colors.background
                            : isFocused && selected === 1
                            ? colors.black
                            : colors.doveGray,
                      }}
                      source={
                        item.name == 'QRScreen'
                          ? QRCodeScannerIcon
                          : item.name == 'QRCodeScreen'
                          ? AddPhotoIcon
                          : ''
                      }
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        );
      }}
    >
      <Tab.Screen name="QRScreen" component={QRScreen} />
      <Tab.Screen name="QRCodeScreen" component={QRCodeScreen} />
    </Tab.Navigator>
  );
};
