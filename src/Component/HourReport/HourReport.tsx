import * as React from 'react';
import * as moment from 'moment';
import styled from '../../Theme/style';
interface IProps {
  data: Array<Object>
}

export const HourReport = (props: IProps) => {
  return (
    <div className="hour-wrapper">
      {props.data.map((hour:{
        time: string,
        condition: {
          icon: string,
        },
        temp_c: string
      }) => {
        const GetHour = moment(hour.time).add(24, 'hours').format('LT');
        const Fixed = GetHour.replace(":00","");
        return <div className="hour-item" key={hour.time}>
          <p>{Fixed}</p>
          <img src={hour.condition.icon} /> 
          <p>{hour.temp_c}&#8451;</p>
        </div>
      })}
    </div>
  );
}
