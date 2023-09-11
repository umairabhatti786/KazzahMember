import React from 'react';
import {Screen, Text, View} from 'ui';

export const Style = () => {
  return (
    <Screen>
      <View flex={1} paddingTop="xl" justifyContent="center">
        <Text textAlign={'center'}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
          temporibus soluta tenetur doloremque ut incidunt sequi explicabo
          quisquam nostrum laborum deserunt libero dolore, quidem eius! Eaque
          aperiam necessitatibus dignissimos velit.
        </Text>
      </View>
    </Screen>
  );
};
