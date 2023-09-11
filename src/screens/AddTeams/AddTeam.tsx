import {FlatList, Platform, ScrollView, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {scale, verticalScale} from 'react-native-size-matters';
import {Pressable, View} from 'ui';
import _ from 'lodash';
import {categorySelector, setCategory} from 'reducers/categoryReducer';
import ChannelList from './AddTeamList';
import {useNavigation, useTheme} from '@react-navigation/native';
import Button from '../../newComponents/Button';
import AlphabetSort from '../../assets/AlphabetSort.svg';
import AddTeamList from './AddTeamList';
import services from 'services';
import {useDispatch} from 'react-redux';
import {useToast} from 'react-native-toast-notifications';
import {loadRootServices} from 'services/common';
import {setChannelId, setTeamId} from 'reducers/addProReducer';

const AddTeam = (props: any) => {
  const navigation = useNavigation();
  const getCategoryFromStore = useSelector(categorySelector);
  const [channelsList, setChannelsList] = useState([]);
  const [selectChannel, setSelectChannel] = useState(undefined);
  const [channelIndex, setChannelIndex] = useState();
  console.log("Channel",selectChannel)

  const toast = useToast();
  const dispatch = useDispatch();
  const addChannel = async () => {
    console.log(
      '🚀 ~ file: YourTeams.tsx:21 ~ YourTeams ~ selectChannel:',
      selectChannel,
    );

    const body = {
      root_service_id: selectChannel?.value,
    };
    const res = await services.createRootServices(body);
    const {success} = res.data;

    if (success) {
      loadRootServices();
      toast.show('Team Added Successfully', {
        type: 'success_custom',
        placement: 'bottom',
        duration: 4000,
        animationType: 'slide-in',
      });
      navigation.goBack();
    }
  };

  const addChannelWithPro = async () => {
    const body = {
      root_service_id: selectChannel?.value,
    };
    const res = await services.createRootServices(body);
    const {success} = res.data;

    if (success) {
      dispatch(setTeamId(res.data.data.id));
      dispatch(setChannelId(selectChannel?.value));
      loadRootServices();
      toast.show('Team Added Successfully', {
        type: 'success_custom',
        placement: 'bottom',
        duration: 4000,
        animationType: 'slide-in',
      });
      navigation.navigate('AddProType',{isAddTeam:true});
    }
  };

  const get = async () => {
    const res = await services.getChannels();
    const {success} = res.data;
    if (success) {
      var arr = [];
      var arrIds = [];
      getCategoryFromStore.categories.forEach(element => {
        arrIds.push(element.id);
      });
      res.data.data.forEach(element => {
        if (!arrIds.includes(element.id)) {
          arr.push({
            name: element.name,
            value: element.id,
            icon: element.icon,
          });
        }
      });

      setChannelsList(_.orderBy(arr, [obj => obj.label], ['asc']));

      // setData(arr);
    }
  };
  useEffect(() => {
    get();
  }, []);

  const {colors} = useTheme();
  const styles = makeStyles(colors);

  const onAddContact = () => {
    navigation.navigate('AddProType');
  };

  return (
    <React.Fragment>
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
            data={channelsList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <AddTeamList
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
      {
        selectChannel&&(
          <View style={styles.proBtn}>
        <Button
          variant="outlined"
          label="Just add team"
          width={'90%'}
          onPress={addChannel}
        />
        <View height={scale(15)} />
        <Button
          label="Continue and Add Pro"
          width={'90%'}
          onPress={addChannelWithPro}
        />
      </View>

        )
      }
      
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
      top: Platform.OS === 'ios' ? scale(420) : scale(400),
    },
  });

export default AddTeam;
