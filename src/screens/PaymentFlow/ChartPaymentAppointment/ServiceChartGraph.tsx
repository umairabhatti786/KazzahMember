import React from 'react';
import {Text, View} from 'ui';
import {scale} from 'react-native-size-matters';
import PaymentChartHeader from './PaymentChartHeader';
import {BarChart} from 'react-native-chart-kit';
import {useTheme} from '@react-navigation/native';
import {Image, ScrollView} from 'react-native';
import {SvgUri} from 'react-native-svg';

type Props = {
  data: any;
};

const ServiceChartGraph = ({data}: Props) => {
  const customBarComponent = (index, value) => {
    const category = data.categories[index];
    return (
      <View
        key={index}
        style={{
          alignItems: 'center',
          // marginLeft: scale(15),
          width: scale(40),
        }}
      >
        <SvgUri height={20} width={20} uri={category.image} />

        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          style={{
            marginTop: 4,
            fontSize: 14,
            width: scale(40),
            textAlign: 'center',
          }}
        >
          {category.label}
        </Text>
      </View>
    );
  };
  const {colors} = useTheme();
  return (
    <View flex={1} style={{bottom: scale(20)}}>
      <View flexDirection={'row'}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={{zIndex: -100}}
          style={{width: scale(340)}}
        >
          <View style={{width: scale(340)}}>
            <BarChart
              data={data}
              width={scale(340)}
              height={scale(190)}
              yAxisLabel={'$'}
              yAxisSuffix={'k'}
              withInnerLines={true}
              showBarTops={false}
              withHorizontalLabels={false}
              withCustomBarColorFromData={true}
              fromZero={true}
              flatColor={true}
              chartConfig={{
                backgroundColor: '#ffffff',
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                barRadius: scale(5),
                barPercentage: 0.9,
                useShadowColorFromDataset: false,
                propsForBackgroundLines: {
                  strokeWidth: 1.3,
                  stroke: colors.gallery,
                  strokeDasharray: '-1',
                },
                data: data.datasets,
                color: (opacity = 1) => '#000',
                labelColor: () => colors.silverChalice,
              }}
              style={{
                backgroundColor: 'white',
                right: scale(40),
              }}
            />
            <View
              style={{
                top: scale(-35),
                height: scale(60),
                flexDirection: 'row',
                paddingTop: scale(10),
                width: '100%',
                alignItems: 'center',
                paddingLeft: scale(2),
                backgroundColor: colors.background,
              }}
            >
              {data.datasets[0].data.map((value, index) =>
                customBarComponent(index, value),
              )}
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            backgroundColor: colors.background,
            left: 10,
            zIndex: 100,
          }}
        >
          <BarChart
            data={data}
            width={70}
            height={scale(230)}
            yAxisLabel={'$'}
            yLabelsOffset={2}
            yAxisSuffix={'k'}
            withInnerLines={false}
            withVerticalLabels={false}
            showBarTops={false}
            withCustomBarColorFromData={true}
            segments={4}
            flatColor={true}
            chartConfig={{
              backgroundColor: '#ffffff',
              backgroundGradientFrom: '#ffffff',
              backgroundGradientTo: '#ffffff',
              barRadius: 8,
              barPercentage: 0.8,
              useShadowColorFromDataset: false,
              propsForBackgroundLines: {
                strokeWidth: 1.3,
                stroke: colors.background,
                strokeDasharray: '1',
              },
              data: data.datasets,
              color: (opacity = 1) => '#000',
              labelColor: () => colors.silverChalice,
              style: {
                backgroundColor: colors.background,
              },
            }}
            style={{
              backgroundColor: colors.background,
              right: 30,
              zIndex: 100,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default ServiceChartGraph;
