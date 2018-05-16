import * as React from 'react';

interface IProps {
  data: any
}

export const ForecastReport = (props: IProps) => {
  const ForecastData = props.data.forecast;
  return (
    <ul>
      { ForecastData.map((day: any) => {
        return <li key={day.date}><img src={day.day.condition.icon}/></li>
      })}
    </ul>
  );
}