import * as React from 'react';
import { Table } from 'reactstrap';
import * as moment from 'moment';
import styled from '../../Theme/style';

interface IProps {
  data: {
    forecast: {
      forecastday: Array<{
        date: string,
        day: {
          avgtemp_c: string,
          maxtemp_c: string,
          mintemp_c: string
        }
      }>
    }
  }
}

export const ForecastReport = (props: IProps) => {
  const ForecastData = props.data.forecast.forecastday;
  return (
    <Table id="table-fixed">
      <thead>
        <tr>
          <th></th>
          <th>Avg</th>
          <th>Max</th>
          <th>Min</th>
        </tr>
      </thead>
      <tbody>
      { ForecastData.map((day: {
        date: string,
        day: {
          avgtemp_c: string,
          maxtemp_c: string,
          mintemp_c: string
        }
      }) => {
        return (
          <tr key={day.date}>
            <th>{moment(day.date).format('dddd')}</th>
            <th>{day.day.avgtemp_c}&#8451;</th>
            <th>{day.day.maxtemp_c}&#8451;</th>
            <th>{day.day.mintemp_c}&#8451;</th>
          </tr>
        );
      })}
      </tbody>
    </Table>
  );
}
