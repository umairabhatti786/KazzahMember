import React from 'react';
import {useTheme} from '@react-navigation/native';
import {Pressable, Text, View} from 'ui';
import {scale} from 'react-native-size-matters';
import SelectIcon from '../../../assets/SelectIcon.svg';
import textStyle from 'theme/typoGraphy';
import {Image, ScrollView, StyleSheet} from 'react-native';

type Props = {
  teamList: any;
  teamIndex: any;
  setTeamIndex: any;
};

const TeamList = ({teamList, teamIndex, setTeamIndex}: Props) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  return (
    <View flex={1} alignItems={'center'} justifyContent={'center'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={[textStyle.h3, {color: colors.black}]}>Team</Text>
        <View
          style={{
            paddingBottom: scale(100),
            backgroundColor: 'white',
            width: '100%',
          }}>
          {teamList.map((item, index) => {
            return (
              <Pressable
                key={index.toString()}
                onPress={() => {
                  setTeamIndex(index);
                }}
                style={styles.container}>
                <View
                  flex={1}
                  flexDirection={'row'}
                  alignItems={'center'}
                  justifyContent={'flex-start'}>
                  <Image source={item.icon} style={{width: 30, height: 30}} />
                  <View width={scale(8)} />
                  <Text
                    style={{
                      marginTop: 4,
                      fontSize: 14,
                      textAlign: 'center',
                    }}>
                    {item.team}
                  </Text>
                </View>
                <View
                  alignItems={'flex-end'}
                  justifyContent={'center'}
                  flex={1}>
                  {teamIndex == index ? (
                    <SelectIcon
                      style={{marginTop: scale(9), left: scale(26)}}
                      width={scale(75)}
                      height={scale(75)}
                    />
                  ) : (
                    <View
                      style={{borderColor: colors.black, borderWidth: 2}}
                      height={scale(24)}
                      width={scale(24)}
                      borderRadius={scale(50)}
                    />
                  )}
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      paddingRight: scale(15),
      paddingLeft: scale(5),
      paddingTop: scale(5),
      flexDirection: 'row',
      borderRadius: scale(8),
      backgroundColor: colors.background,
      width: scale(300),
      height: scale(60),
      alignSelf: 'flex-start',
      borderBottomColor: colors.silverChalice,
      borderBottomWidth: scale(0.5),
    },
  });

export default TeamList;
