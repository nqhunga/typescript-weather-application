import * as React from 'react';
import styled from '../../Theme/style';
import { CurrentLocation } from '../../Component/CurrentLocation/CurrentLocation';
import { GoogleMap } from '../../Component/GoogleMap/GoogleMap';
import { ForecastReport } from '../../Component/ForecastReport/ForecastReport';
import { Chart } from '../../Component/Chart/Chart';
import { Button } from 'reactstrap';
import { HourReport } from '../../Component/HourReport/HourReport';

interface IState {
  forecast: boolean
}

interface IProps {
  data: any,
  google: {
    lat: string,
    lng: string
  },
  drawdata: any,
  hour: any,
}

export default class DataReport extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      forecast: false
    }
    this.ChangeReport = this.ChangeReport.bind(this);
  }

  ChangeReport() {
    const changeReport = !this.state.forecast;

    this.setState({
      forecast: changeReport
    })
  }

  render() {
    return (
      <div className="current-display">
        <div className="button-wrapper"><Button onClick={this.ChangeReport}>{this.state.forecast ? 'Forecast' : 'General'}</Button></div>
        <div className="upper-display">

          {this.state.forecast ?
            <div className="left-content" id="fixed-left">
              <ForecastReport data={this.props.data} />
            </div>
            :
            <div className="left-content">
              <CurrentLocation data={this.props.data} />
            </div>
          }
          {this.state.forecast ?
            <div className="right-content" id="fixed-right">
              <Chart data={this.props.drawdata} />
            </div>
            :
            <div className="right-content">
              <GoogleMap data={this.props.google} />
            </div>
          }
        </div>
        {this.state.forecast ? '' : <HourReport data={this.props.hour[0]} />}
      </div>
    );
  }
}
