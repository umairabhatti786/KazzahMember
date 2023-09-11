import {FlatList, Platform, ScrollView, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {scale, verticalScale} from 'react-native-size-matters';
import {Pressable, View} from 'ui';
import _ from 'lodash';
import {categorySelector} from 'reducers/categoryReducer';
import ChannelList from './channelsList';
import {useNavigation, useTheme} from '@react-navigation/native';
import Button from '../../newComponents/Button';
import AlphabetSort from '../../assets/AlphabetSort.svg';

const YourTeamsList = (props: any) => {
  const navigation = useNavigation();
  const getCategoryFromStore = useSelector(categorySelector);
  const [channelsList, setChannelsList] = useState(getCategoryFromStore);
  const [selectChannel, setSelectChannel] = useState([]);
  const [channelIndex, setChannelIndex] = useState();
  const [sortOrder, setSortOrder] = useState('asc');
  const onPress = () => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);

    const sortedContacts = _.orderBy(
      channelsList,
      item => item.name?.toLowerCase(),
      [newSortOrder],
    );

    setChannelsList(sortedContacts);
  };

  const {colors} = useTheme();
  const styles = makeStyles(colors);

  const onAddContact = () => {
    navigation.navigate('AddTeams');
  };

  return (
    <React.Fragment>
      <Pressable onPress={onPress}>
        <AlphabetSort height={scale(35)} width={scale(35)} />
      </Pressable>
      <ScrollView>
        <View
          style={{
            paddingBottom: scale(300),
            backgroundColor: 'white',
            width: '100%',
          }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            data={getCategoryFromStore.categories}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <ChannelList
                  item={item}
                  selectChannel={selectChannel}
                  contacts={getCategoryFromStore.categories}
                  setChannelIndex={setChannelIndex}
                  channelIndex={channelIndex}
                  index={index}
                  setSelectChannel={setSelectChannel}
                />
              );
            }}
          />
        </View>
      </ScrollView>
      <View style={styles.proBtn}>
        <Button label="Add team" width={'90%'} onPress={onAddContact} />
      </View>
    </React.Fragment>
  );
};

const makeStyles = () =>
  StyleSheet.create({
    proBtn: {
      position: 'absolute',
      bottom: verticalScale(35),
      alignItems: 'center',
      alignSelf: 'center',
      width: '100%',
      left: scale(19),
      top: scale(480),
    },
  });

export default YourTeamsList;
