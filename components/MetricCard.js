import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import DateHeader from './DateHeader'
import { getMetricMetaInfo } from '../utils/helper'
import { gray } from '../utils/colors'
import styled from 'styled-components/native'

const MetricView = styled.View`
    flex-direction: row;  
    margin-top: 12;
`

export default function MetricCard ({ date, metrics }) {
  return (
    <View>
      {date && <DateHeader date={date} />}
      {Object.keys(metrics).map((metric) => {
        const { getIcon, displayName, unit, backgroundColor } = getMetricMetaInfo(metric)
        return (
          <MetricView key={metric}>
            {getIcon()}
            <View>
              <Text style={{fontSize: 20}}>
                {displayName}
              </Text>
              <Text style={{fontSize: 16, color: gray}}>
                {metrics[metric]} {unit}
              </Text>
            </View>
          </MetricView>
        )
      })}
    </View>
  )
}




// const styles = StyleSheet.create({
//   metric: {
//     flexDirection: 'row',
//     marginTop: 12
//   },
// })