import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {FlatList, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import {getProviderProfile} from 'reducers/providerReducer';
import textStyle from 'theme/typoGraphy';
import {Text, View} from 'ui';
import ImageView from 'react-native-image-viewing';
import {useDispatch} from 'react-redux';

const ProfileDocuments = () => {
  const credentials = useSelector(getProviderProfile)?.credentials;
  console.log('AllCrednetiola', credentials);
  const [showImage, setShowImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const dispatch = useDispatch();
  const DocumentsData = [
    {
      name: 'Finance certification',
    },
  ];

  const {colors} = useTheme();
  const styles = makeStyles(colors);
  return (
    <>
      <View flex={1}>
        <View height={scale(30)} />
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={credentials}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <React.Fragment>
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={() => {
                    setSelectedImage(item?.imageUrl);
                    setShowImage(true);
                  }}
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginVertical: verticalScale(10),
                  }}>
                  <View style={styles.container}>
                    <Image
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: scale(10),
                      }}
                      source={{uri: item?.imageUrl}}
                    />
                  </View>
                </TouchableOpacity>
                <Text
                  numberOfLines={3}
                  style={[
                    textStyle.b3,
                    {
                      color: colors.black,
                      paddingHorizontal: scale(27),
                      marginBottom: verticalScale(10),
                    },
                  ]}>
                  {item.title}
                </Text>
              </React.Fragment>
            );
          }}
        />
      </View>
      <ImageView
        images={[{uri: selectedImage}]}
        imageIndex={0}
        visible={showImage}
        onRequestClose={() => setShowImage(false)}
      />
    </>
  );
};

const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      height: scale(200),
      width: '90%',
      padding: scale(5),
      borderRadius: scale(10),
      // marginBottom:verticalScale(10),
      // backgroundColor: colors.background,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.3,
      shadowRadius: 15,
      elevation: 5,
    },
  });

export default ProfileDocuments;
