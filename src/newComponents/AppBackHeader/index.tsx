import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';
import BackArrow from '../../assets/BackArrow.svg';
import {scale} from 'react-native-size-matters';
import {Title} from 'newComponents/TextComponents';
import {useTheme} from '@react-navigation/native';

export default function AppBackHeader(props: any) {
  const {colors} = useTheme();
  return (
    <View>
      <TouchableOpacity
        onPress={props.navigation.goBack}
        style={styles.BackIcon}>
        <BackArrow
          style={{
            alignSelf: 'flex-start',
            marginLeft: scale(10),
            color: colors.black,
          }}
          width={scale(20)}
          height={scale(15)}
        />
      </TouchableOpacity>
      <Title title={props.label} />
    </View>
  );
}

const styles = StyleSheet.create({
  BackIcon: {
    width: scale(50),
    height: scale(50),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '2%',
  },
});
