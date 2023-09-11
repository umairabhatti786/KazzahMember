import {useTheme} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {scale} from 'react-native-size-matters';
import textStyle from 'theme/typoGraphy';
import {Text, View} from 'ui';

type Props = {
  firstName: string;
  lastName: string;
  borderRadius?: string | number | undefined;
  width?: string | number | undefined;
  height?: string | number | undefined;
  fontSize?: string | number | undefined;
  marginRight?: string | number | undefined;
};

const InitialNameLetters = ({
  firstName,
  lastName,
  borderRadius = scale(8),
  height = scale(33),
  width = scale(33),
  fontSize = scale(13),
  marginRight = scale(10),
}: Props) => {
  const colorS = ['#FFDCC8', '#C7E4FF', '#FFF0BC', '#CAE8C8'];

  const generateRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colorS.length);
    return colorS[randomIndex];
  };
  const [randomColor, setrandomColor] = useState();
  useEffect(() => {
    const randomColor = generateRandomColor();

    setrandomColor(randomColor);
  }, []);

  const {colors} = useTheme();
  return (
    <View
      style={{
        borderRadius: borderRadius,
        height: height,
        width: width,
        backgroundColor: randomColor,
        marginRight,
      }}
      padding="xs"
      justifyContent="center"
      alignItems={'center'}
    >
      <Text
        style={{color: colors.black}}
        fontSize={fontSize}
        fontWeight="bold"
        textTransform={'uppercase'}
        textAlign="center"
      >
        {`${
          firstName === firstName?.split(' ')[0]
            ? firstName?.charAt(0).toUpperCase()
            : firstName?.charAt(0).toUpperCase()
        } ${
          lastName === lastName?.split(' ')[0]
            ? lastName?.charAt(0).toUpperCase()
            : lastName?.charAt(0).toUpperCase()
        }`}
      </Text>
    </View>
  );
};

export default InitialNameLetters;
