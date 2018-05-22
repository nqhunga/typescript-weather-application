import * as React from 'react';
import styled from '../../Theme/style';
import { CurrentLocation } from '../../Component/CurrentLocation/CurrentLocation';
import { GoogleMap } from '../../Component/GoogleMap/GoogleMap';
import { ForecastReport } from '../../Component/ForecastReport/ForecastReport';
import { Chart } from '../../Component/Chart/Chart';
import { Button } from 'reactstrap';
import { HourReport } from '../../Component/HourReport/HourReport';
import { ICoordinate, IWeather, IHour } from '../../Types/Types';

interface IState {
  forecast: boolean
}

interface IProps {
  weather: IWeather,
  google: ICoordinate,
  drawdata: any,
  hour: any,
}

export default class DataReport extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      forecast: false
    }
  }

  ChangeReport = ()  => {
    const changeReport = !this.state.forecast;

    this.setState({
      forecast: changeReport
    })
  }

  render() {
    const { forecast } = this.state;
    const { weather, drawdata, google, hour } = this.props;
    return (
      <div className="current-display" >
        <div className="button-wrapper"><Button onClick={this.ChangeReport}>{forecast ? 'Forecast' : 'General'}</Button></div>
        <div className={forecast ? 'upper-display forecast-fixed' : 'upper-display'}>

          {this.state.forecast ?
            <div className="left-content" id="fixed-left">
              <ForecastReport data={weather} />
            </div>
            :
            <div className="left-content">
              <CurrentLocation weather={weather} />
            </div>
          }
          {this.state.forecast ?
            <div className="right-content" id="fixed-right">
              <Chart data={drawdata} />
            </div>
            :
            <div className="right-content">
              <GoogleMap data={google} />
            </div>
          }
        </div>
        {this.state.forecast ? '' : <HourReport data={hour[0]} />}
      </div>
    );
  }
}
