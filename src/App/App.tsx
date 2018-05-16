import * as React from 'react';

import { CurrentPosition } from '../GetApi/CurrentData';
import { ForecastData } from '../GetApi/ForecastData';
import { CurrentLocation } from '../Component/CurrentLocation/CurrentLocation';
import { Chart } from '../Component/Chart/Chart';
import  { ForecastReport } from '../Component/ForecastReport/ForecastReport';
import InputField from '../Container/InputField/InputField';

interface IState {
  currentPosition: {
    lat: string,
    lng: string
  },
  currentPositionData: Object,
  render: boolean,
  weather: Object,
  drawArray: Array<Object>
}

interface FetchData {
  current: Object,
  forecast: Array<Object>,
  location: Object
}

export class App extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      currentPosition: {
        lat: '',
        lng: ''
      },
      currentPositionData: {},
      render: false,
      weather: {},
      drawArray: []
    }

    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude.toString();
      const lng = position.coords.longitude.toString();
      this.setState({
        currentPosition: {
          lat, lng
        }
      });
    });
  }

  async componentDidUpdate(prevProps: {}, prevState: {}) {
    if (JSON.stringify(prevState) !== JSON.stringify(this.state)) {
      await CurrentPosition(this.state.currentPosition.lat, this.state.currentPosition.lng).then(data => this.setState({
        currentPositionData: data,
        render: true
      }));
    }
  }

  onSubmit(cityName: string) {
    ForecastData(cityName).then((data: any) => {
      console.log(data)
      const drawArray: Array<Object> = [];
      data.forecast.map((day: any) => {
        const fixedDate = day.date.slice(5, day.date.length)
        const drawData = {
          name: fixedDate,
          avg: day.day.avgtemp_c,
          max: day.day.maxtemp_c,
          min: day.day.mintemp_c
        };
        return drawArray.push(drawData);
      });
      return this.setState({
        drawArray,
        weather: data
      });
    });
  }

  render() {
    return (
      <div>
        {this.state.render ?
          <div>
            <InputField onSubmit={(cityName: string) => this.onSubmit(cityName)} />
            <CurrentLocation data={this.state.currentPositionData} />
          </div>
          : ''
        }
        {this.state.drawArray.length !== 0 ?
          <div>
            <Chart data={this.state.drawArray} />
            <ForecastReport data={this.state.weather} />
          </div>
          : ''
        }
      </div>
    );
  }
}