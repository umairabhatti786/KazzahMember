import React, {useState} from 'react';
import {useNavigation, useTheme} from '@react-navigation/native';
import {Text, View} from 'ui';
import {scale} from 'react-native-size-matters';
import {BottomSheet} from 'react-native-btr';
import CrossIcon from '../../../assets/CrossIcon.svg';
import textStyle from 'theme/typoGraphy';
import Button from 'newComponents/Button';
import {Pressable, StyleSheet} from 'react-native';
import SelectMonthBox from './SelectMonthBox';
import TimeFrame from './TimeFrame';
import TeamList from './TeamList';

const tempPic = require('../../../assets/carDummy.png');

type Props = {
  isVisible?: boolean;
  setVisible?: any;
};

const TimeframeType = [
  {
    type: 'Year to date',
  },
  {
    type: 'Month to date',
  },
  {
    type: 'Last year',
  },
  {
    type: 'Custom',
  },
];

const teamList = [
  {
    team: 'Auto',
    icon: tempPic,
  },
  {
    team: 'Beauty',
    icon: tempPic,
  },
  {
    team: 'Finance',
    icon: tempPic,
  },
  {
    team: 'Home',
    icon: tempPic,
  },
  {
    team: 'Legal',
    icon: tempPic,
  },
  {
    team: 'Sports',
    icon: tempPic,
  },
  {
    team: 'Pet',
    icon: tempPic,
  },
  {
    team: 'Wellness',
    icon: tempPic,
  },
];

const OptionList = ({isVisible, setVisible}: Props) => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const [checkboxState, setCheckboxState] = useState();
  const [monthLeft, setMonthLeft] = useState(new Date());
  const [monthRight, setMonthRight] = useState(new Date());
  const [showLeftMonth, setShowLeftMonth] = useState(false);
  const [showRightMonth, setShowRightMonth] = useState(false);
  const [teamIndex, setTeamIndex] = useState();
  const onCloseModal = () => {
    setVisible(!isVisible);
  };

  return (
    <View>
      <BottomSheet
        visible={isVisible}
        onBackButtonPress={() => onCloseModal()}
        onBackdropPress={() => onCloseModal()}>
        <View
          flexDirection={'column'}
          backgroundColor={'white'}
          alignSelf="center"
          maxHeight={'92%'}
          minHeight={'92%'}
          width={'100%'}
          borderTopLeftRadius={scale(15)}
          borderTopRightRadius={scale(15)}
          padding={'xxl'}
          overflow="hidden">
          <View
            flexDirection={'row'}
            width={'100%'}
            justifyContent={'space-between'}>
            <Pressable
              style={styles.crossButton}
              onPress={() => onCloseModal()}>
              <CrossIcon style={{color: colors.black}} />
            </Pressable>
            <Text style={[textStyle.cta1, {color: colors.silverChalice}]}>
              Clear
            </Text>
          </View>
          <TimeFrame
            TimeframeType={TimeframeType}
            checkboxState={checkboxState}
            setCheckboxState={setCheckboxState}
          />
          <SelectMonthBox
            monthLeft={monthLeft}
            setMonthLeft={setMonthLeft}
            monthRight={monthRight}
            setMonthRight={setMonthRight}
            setShowLeftMonth={setShowLeftMonth}
            setShowRightMonth={setShowRightMonth}
            showLeftMonth={showLeftMonth}
            showRightMonth={showRightMonth}
          />
          <View height={scale(20)} />
          <TeamList
            teamList={teamList}
            teamIndex={teamIndex}
            setTeamIndex={setTeamIndex}
          />
        </View>

        <View style={styles.proBtn}>
          <Button
            disabled={showLeftMonth || showRightMonth}
            label="Show spend"
            width={'90%'}
            onPress={() => {
              onCloseModal();
              setTimeout(() => {
                navigation.navigate('PayReservationFess', {
                  choosePayment: true,
                });
              }, 400);
            }}
          />
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  proBtn: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: '5%',
    alignSelf: 'center',
  },
  crossButton: {
    height: scale(20),
    width: scale(20),
    bottom: scale(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default OptionList;
