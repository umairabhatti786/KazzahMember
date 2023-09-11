import {Screen, View} from 'ui';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import AppBackHeader from 'newComponents/AppBackHeader';
import {useTheme} from '@react-navigation/native';
import Button from 'newComponents/Button';
import ProServices from './ProServices';
import services from 'services';
import {useSelector} from 'react-redux';
import {getAddPro, getChannelId, setEmptyAddPro} from 'reducers/addProReducer';
import _, {zip} from 'lodash';
import {useToast} from 'react-native-toast-notifications';
import {ActivityIndicator, Colors} from 'react-native-paper';
import {categorySelector} from 'reducers/categoryReducer';
import {authSelector} from 'reducers/authReducer';
import {useDispatch} from 'react-redux';
import ContactInvitationSheet from 'newComponents/ContactInvitationSheet';
const ChooseService = (props: any) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const channelId = useSelector(getChannelId);
  const [invitationModal, setInvitationModal] = useState(false);

  const dispatch = useDispatch();
  const addProState = useSelector(getAddPro);
  const teamsFromStore = useSelector(categorySelector);

  const toggleBottomSheet = () => {
    setInvitationModal(!invitationModal);
  };
  const onAddContact = async () => {
    // setInvitationModal(true);

    console.log('addProStateData', addProState);
    const proDetail = {
      client_team_id: addProState?.client_team_id,
      first_name: addProState?.first_name,
      last_name: addProState?.last_name,
      mobileNo: `+${addProState?.mobileNo.replace(/[^A-Za-z0-9]/g, '')}`,
      serviceId: addProState?.serviceId,
      image: addProState?.image,
      latitude: addProState?.latitude,
      longitude: addProState?.longitude,
      businessName: addProState?.businessName,
      email: addProState?.email,
      street: addProState?.state,
      city: addProState?.city,
      state: addProState?.state,
      zip: addProState?.zip,
    };

    try {
      const res = await services.createProvider(proDetail);
      console.log('resRessuccess', res.data);

      if (res.data.success) {
        toast.show('Pro added', {
          type: 'success_custom',
          placement: 'bottom',
          duration: 4000,
          animationType: 'slide-in',
        });

        dispatch(setEmptyAddPro());
        setInvitationModal(true);
      }
    } catch (error) {
      toast.show(error?.response?.data?.message, {
        type: 'error_custom',
        placement: 'bottom',
        duration: 4000,
        animationType: 'slide-in',
      });
    }
  };

  const [subChannelList, setSubChannelList] = useState([]);

  useEffect(() => {
    getSubChannels();
  }, []);

  const getSubChannels = async () => {
    const res = await services.getSubChannelsById(channelId);
    const {success} = res.data;

    if (success) {
      // const list = res.data.data.map(element => {
      //   return {label: element.name, value: element.id};
      // });
      const list = res.data.data;
      console.log('SubchannelList', list);

      setSubChannelList(_.orderBy(list, [obj => obj.name], ['asc']));
      setIsLoading(true);
    }
  };

  return (
    <>
      {isLoading && (
        <Screen edges={['right', 'top', 'left']}>
          <View
            style={{
              flex: 1,
            }}>
            <AppBackHeader
              navigation={props.navigation}
              label="Choose service"
            />
            <View style={{paddingHorizontal: '6%'}}>
              <ProServices list={subChannelList} />
            </View>
          </View>
          <View style={styles.proBtn}>
            <Button
              label="Add Pro"
              width={'90%'}
              onPress={onAddContact}
              disabled={addProState?.serviceId ? false : true}
            />
          </View>
        </Screen>
      )}
      {!isLoading && (
        <View flex={1} justifyContent={'center'} alignItems={'center'}>
          <ActivityIndicator
            size={scale(30)}
            animating={true}
            color={colors.black}
          />
        </View>
      )}

      <ContactInvitationSheet
        onReturnAddAnother={() => {
          props.navigation.navigate('AddProType');

          setInvitationModal(false);
        }}
        isPro={true}
        AddTeam={true}
        visible={invitationModal}
        onReturn={() => {
          props.navigation.navigate('TeamDetails', {
            data: teamsFromStore.categories.find(
              e => e.id.toString() == channelId,
            ),
          });
          setInvitationModal(false);
        }}
        setVisible={toggleBottomSheet}
      />
    </>
  );
};

export default ChooseService;

const makeStyles = (colors: any) =>
  StyleSheet.create({
    BackIcon: {
      width: scale(50),
      height: scale(50),
      justifyContent: 'center',
      alignItems: 'center',
    },

    proBtn: {
      position: 'absolute',
      bottom: verticalScale(20),
      alignItems: 'center',
      width: '100%',
      left: 0,
    },
  });
