import React from 'react';
import {Platform, StyleSheet} from 'react-native';

const textStyle = StyleSheet.create({
  h1: {
    fontFamily: 'Calibre',
    fontSize: 42,
    fontWeight: '500',
  },
  h2: {
    fontFamily: 'Calibre',
    fontSize: 33,
    fontWeight: '500',
  },
  h3: {
    fontFamily: 'Calibre',
    fontSize: 18,
    fontWeight: '600',
  },
  b1: {
    fontFamily: 'Calibre',
    fontSize: 30,
    fontWeight: '400',
  },
  b2: {
    fontFamily: 'Calibre',
    fontSize: 24,
    fontWeight: '400',
  },
  b3: {
    fontFamily: 'Calibre',
    fontSize: 18,
    fontWeight: '400',
  },
  b4: {
    fontFamily: 'Calibre',
    fontSize: 16,
    fontWeight: '400',
  },
  b5: {
    fontFamily: 'Calibre',
    fontSize: Platform.OS == 'ios' ? 12 : 14,
    fontWeight: '400',
  },

  label: {
    fontFamily: 'Calibre',
    fontSize: 12,
    fontWeight: '500',
  },
  labe2: {
    fontFamily: 'Calibre',
    fontSize: 14,
    fontWeight: '500',
  },

  cta1: {
    fontFamily: 'Calibre',
    fontSize: 18,
    fontWeight: '600',
  },
  cta2: {
    fontFamily: 'Calibre',
    fontSize: Platform.OS == 'ios' ? 12 : 14,
    fontWeight: '600',
  },
  cta3: {
    fontFamily: 'Calibre',
    fontSize: 12,
    fontWeight: '700',
  },

  center: {textAlign: 'center'},
});

export default textStyle;
