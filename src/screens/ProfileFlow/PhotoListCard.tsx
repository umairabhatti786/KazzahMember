import {useTheme} from '@react-navigation/native';
import React, {useMemo, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {scale, verticalScale} from 'react-native-size-matters';
import {Pressable, View} from 'ui';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Video from 'react-native-video';
import ImageView from 'react-native-image-viewing';

type Props = {
  item: any;
  index: any;
  setVisible: any;
  visible: any;
  setSelectedPhoto: any;
  setSelectMediaView: any;
};

const PhotoListCard = ({
  item,
  index,
  setVisible,
  visible,
  setSelectedPhoto,
  setSelectMediaView,
}: Props) => {
  const randomBool = useMemo(() => Math.random() < 0.5, []);
  const [showImage, setShowImage] = useState(false);

  const even = index % 2 == 0;
  const {colors} = useTheme();
  return (
    <TouchableOpacity
      onPress={() => {
        setShowImage(true);
        setSelectMediaView(item);
        setSelectedPhoto(item);
      }}
      key={index}>
      {item?.type == 'video' ? (
        <Video
          muted={true}
          fullscreen={true}
          resizeMode="cover"
          repeat
          source={{uri: item?.thumbnail}}
          style={{
            margin: scale(5),
            marginBottom: scale(5),
            marginTop: scale(10),
            height: randomBool ? verticalScale(145) : verticalScale(185),
            flex: 1,
            alignSelf: 'stretch',
            borderRadius: scale(10),
          }}
        />
      ) : (
        <FastImage
          source={{uri: item?.url}}
          style={{
            margin: scale(5),
            marginBottom: scale(5),
            marginTop: scale(10),
            height: randomBool ? verticalScale(145) : verticalScale(185),
            flex: 1,
            alignSelf: 'stretch',
            borderRadius: scale(10),
          }}
          resizeMode="cover"
        />
      )}
      <Pressable
        onPress={() => {
          setSelectedPhoto(item);
          setVisible(!visible);
        }}
        style={{
          alignSelf: 'flex-end',
          paddingRight: scale(5),
        }}>
        <SimpleLineIcons color={'black'} name="options" size={22} />
      </Pressable>
      {/* <ImageView
        images={[{uri: item?.url}]}
        imageIndex={0}
        visible={showImage}
        onRequestClose={() => setShowImage(false)}
      /> */}
    </TouchableOpacity>
  );
};

export default PhotoListCard;
