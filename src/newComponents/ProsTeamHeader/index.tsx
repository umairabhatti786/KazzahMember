import {
  StyleSheet,
  Image,
  TouchableOpacityBase,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import {Text, View} from 'ui';
import React, {useState} from 'react';
import {scale, verticalScale} from 'react-native-size-matters';
import textStyle from 'theme/typoGraphy';
import {useTheme} from '@react-navigation/native';
import {SvgUri} from 'react-native-svg';
import ProsList from 'newComponents/ProsList';
const ProsTeamHeader = (props: any) => {
  const {colors} = useTheme();
  const [showProList, setShowProList] = useState(false);
  const [prosIndex, setProsIndex] = useState();
  const [selectPros, setSelectPros] = useState();

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          setShowProList(!showProList);
          props.getAllPros(props?.item?.id);
        }}
        style={{
          borderBottomColor: colors.gallery,
          borderBottomWidth: 1,
          backgroundColor: colors.background,
          borderTopColor: colors.gallery,
          borderTopWidth: 1,
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          height: verticalScale(50),
        }}>
        <SvgUri width={scale(30)} height={scale(30)} uri={props?.item?.icon} />

        <View
          marginLeft={'s'}
          alignItems={'center'}
          justifyContent={'space-between'}
          flexDirection={'row'}>
          <View width={'80%'} flexDirection={'column'}>
            <Text
              numberOfLines={1}
              style={[textStyle.b3, {color: colors.black}]}
              ellipsizeMode={'tail'}>
              {props.item?.name}
            </Text>

            <Text
              numberOfLines={1}
              style={[textStyle.b5, {color: colors.doveGray}]}>
              {`${props?.totalProvider} Pro`}
            </Text>
          </View>
          <Image
            source={require('../../../src/assets/NextIcon.png')}
            style={{width: scale(8), height: scale(8)}}
          />
        </View>
      </TouchableOpacity>

      {showProList && (
        <ScrollView>
          <FlatList
            data={props.providersList}
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <ProsList
                  item={item}
                  prosIndex={prosIndex}
                  setProsIndex={setProsIndex}
                  selectPros={selectPros}
                  index={index}
                  setSelectPros={setSelectPros}
                />
              );
            }}
          />
        </ScrollView>
      )}
    </>
  );
};

export default ProsTeamHeader;

const makeStyles = (colors: any) =>
  StyleSheet.create({
    categoryName: {
      justifyContent: 'center',
      width: '55%',
      marginTop: verticalScale(2),
    },
  });
