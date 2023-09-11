import {
  StyleSheet,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {Screen, View, Text, theme, Pressable} from 'ui';

import React, {useState} from 'react';
import ProsList from 'newComponents/ProsList';
import {scale, verticalScale} from 'react-native-size-matters';
import {useTheme} from '@react-navigation/native';
import textStyle from 'theme/typoGraphy';
import SearchProsItem from '../FilterPros/SearchProsItem';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useSelector} from 'react-redux';
import {getAllFriendsProviders} from 'reducers/searchReducer';

const FilterFriends = () => {
  const allFriends = useSelector(getAllFriendsProviders);

  const [loading, setLoading] = useState(false);
  const {colors} = useTheme();

  return (
    <View>
      <View
        style={{
          backgroundColor: 'white',
          width: '100%',
        }}>
        <Text
          numberOfLines={1}
          style={[
            textStyle.h3,
            {color: colors.black, marginVertical: verticalScale(10)},
          ]}>
          {` Results (${allFriends?.length})`}
        </Text>
        <KeyboardAwareScrollView
          contentContainerStyle={{paddingBottom: verticalScale(80)}}
          showsVerticalScrollIndicator={false}>
          <FlatList
            data={allFriends}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={() => (
              <>
                {loading ? (
                  <View style={{marginTop: verticalScale(100)}}>
                    <ActivityIndicator color={colors.black} />
                  </View>
                ) : (
                  <></>
                )}
              </>
            )}
            renderItem={({item, index}) => {
              return (
                <SearchProsItem
                  item={item}
                  // prosIndex={prosIndex}
                  // setProsIndex={setProsIndex}
                  // selectPros={selectPros}
                  index={index}
                  // setSelectPros={setSelectPros}
                />
              );
            }}
          />
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export default FilterFriends;

const styles = StyleSheet.create({});
