import React, {useEffect, useState} from 'react';
import {View} from 'ui';
import TeamChartGraph from './TeamChartGraph';
import ServiceChartGraph from './ServiceChartGraph';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import PaymentChartHeader from './PaymentChartHeader';
import {scale} from 'react-native-size-matters';
import OptionList from './OptionList';
import services from 'services';

const tempPic = require('../../../assets/carDummy.png');

const ChartPaymentAppointment = () => {
  const [visible, setVisible] = useState(false);

  const [data, setData] = useState({
    categories: [],
    datasets: [
      {
        data: [],
        colors: [],
      },
    ],
  });
  const [servicesData, setServicesData] = useState({
    categories: [],
    datasets: [
      {
        data: [],
        colors: [],
      },
    ],
  });

  const get = async () => {
    const res = await services.getRootServicesChart();

    if (res.data.success) {
      const chartData = {
        categories: res.data.data
          .map(e => {
            return {
              label: e.serviceName,
              image: e.icon,
            };
          })
          .sort((a, b) => b.label.localeCompare(a.label)),
        datasets: [
          {
            data: res.data.data.map(e => {
              return Number(e.totalAmount);
            }),
            colors: res.data.data.map(e => {
              return (opacity = 1) => `#000`;
            }),
          },
        ],
      };

      setData(chartData);
    }
  };
  const getServicesData = async () => {
    const res = await services.getServicesChart();

    if (res.data.success) {
      const chartData = {
        categories: res.data.data
          .map(e => {
            return {
              label: e.serviceName,
              image: e.icon,
            };
          })
          .sort((a, b) => b.label.localeCompare(a.label)),
        datasets: [
          {
            data: res.data.data.map(e => {
              return Number(e.totalAmount);
            }),
            colors: res.data.data.map(e => {
              return (opacity = 1) => `#000`;
            }),
          },
        ],
      };

      setServicesData(chartData);
    }
  };

  useEffect(() => {
    get();
    getServicesData();
  }, []);

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      enableOnAndroid={true}
    >
      <View height={scale(10)} />
      <View flex={1}>
        <PaymentChartHeader
          onPressLeftHeading={() => setVisible(!visible)}
          leftHeadingIconSize={{width: scale(17), height: scale(17)}}
          headingLabelRight="Team"
        />
        <View height={scale(15)} />
        <TeamChartGraph data={data} />
        <PaymentChartHeader
          onPressLeftHeading={() => setVisible(!visible)}
          leftHeadingIconSize={{width: scale(17), height: scale(17)}}
          headingLabelRight="Service"
        />
        <View height={scale(20)} />
        <ServiceChartGraph data={servicesData} />
      </View>
      <OptionList isVisible={visible} setVisible={setVisible} />
    </KeyboardAwareScrollView>
  );
};

export default ChartPaymentAppointment;
