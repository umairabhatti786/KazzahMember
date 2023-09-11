import React, {useState, useMemo, useEffect} from 'react';
import {Button, Screen, Input, Pressable, View, Text, theme} from 'ui';
import {scale, verticalScale} from 'react-native-size-matters';
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useIsFocused, useNavigation, useTheme} from '@react-navigation/native';
import _ from 'lodash';
import CustomSearch from 'newComponents/CustomSearch';
import SortFilterHeader from 'newComponents/SortFilterHeader/ContactHeader';
import {Title} from 'newComponents/TextComponents';
import BackButtonHeader from 'newComponents/BackButtonHeader';
import {AddChatSearch} from './AddChatSearch';
import SendMessage from 'newComponents/SendMessage';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {fetchContactsList} from 'reducers/contactReducer';
import {getSelectedConnectionId, getUserType, setEmptySelectedConnectionId} from 'reducers/chatReducer';
import useService from '../services';
export const AddChat = (props: any) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {colors} = useTheme();

  useEffect(() => {
    dispatch(fetchContactsList({filter: 'all'}));
  }, []);

  const {handleMessageSend} = useService();
  const [searchText, setSearchText] = useState<String>('');


  const selectedConnectionId = useSelector(getSelectedConnectionId);
  const userType = useSelector(getUserType);

  return (
    <>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={
          Platform.OS === 'ios' ? responsiveHeight(0) : responsiveHeight(12)
        }
      >
        <Screen edges={['top']} backgroundColor={colors.background}>
          <BackButtonHeader showPages={false} />

          <View style={{marginHorizontal: '6%', flex: 1}}>
            <View height={verticalScale(30)} />
            <AddChatSearch setSearchText={setSearchText}
            searchText={searchText} />
          </View>
          <View style={{paddingHorizontal: '6%', paddingBottom: scale(20)}}>
            <SendMessage
            textMessage={selectedConnectionId}
            
              onPressSend={() => {
                if(selectedConnectionId){
                  handleMessageSend();
                  props.navigation.navigate('ChatDetailScreen', {
                    userId: selectedConnectionId,
                    userType: userType,
                  });
                  setSearchText("")

                dispatch(setEmptySelectedConnectionId())

                }
               
              }}
              addChat={true}
            />
          </View>
        </Screen>
      </KeyboardAvoidingView>
    </>
  );
};
