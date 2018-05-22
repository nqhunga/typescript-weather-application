import * as React from 'react';
import styled from '../../Theme/style';
import * as moment from 'moment';
import { HourReport } from '../HourReport/HourReport';
import { ICoordinate, IWeather } from '../../Types/Types';
interface IWeatherProps {
  weather: IWeather,
}
export class CurrentLocation extends React.Component<IWeatherProps, {}> {
 
  render() {
    const CurrentData = this.props.weather;
    const fixedTime = moment(CurrentData.location.localtime).format('LLL');
    return (
      <div className="user-location">
        <h3>{CurrentData.location.name}</h3>
        <p>{CurrentData.location.region} {CurrentData.location.country}</p>
        <p>{fixedTime}</p>
        <div className="icon-wrapper">
          <img src={CurrentData.current.condition.icon} />
          <p>{CurrentData.current.condition.text}</p>
        </div>
        <div className="temp-normal">
          <p>&#8593; {CurrentData.forecast.forecastday[0].day.maxtemp_c}&#8451;</p>
          <p>&#8595; {CurrentData.forecast.forecastday[0].day.mintemp_c}&#8451;</p>
        </div>
        <div className="temp-large">
          <p>{CurrentData.forecast.forecastday[0].day.avgtemp_c}&#8451;</p>
        </div>
        <p>Humidity: {CurrentData.forecast.forecastday[0].day.avghumidity} %</p>
        <p>Windy: {CurrentData.forecast.forecastday[0].day.maxwind_kph} kph</p>
      </div>
    );
  } 
}
