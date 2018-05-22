import * as React from 'react';

import { ICoordinate, IWeather, IHour } from '../Types/Types';
import { UserPositionWeather } from '../GetApi/UserPositionWeather';
import { ForecastWeather } from '../GetApi/ForecastWeather';
import { GoogleId } from '../GetApi/GoogleIdData';
import { PlaceSuggest } from '../GetApi/CheckData';
import { CurrentLocation } from '../Component/CurrentLocation/CurrentLocation';
import { Chart } from '../Component/Chart/Chart';
import { ForecastReport } from '../Component/ForecastReport/ForecastReport';
import { GoogleMap } from '../Component/GoogleMap/GoogleMap';
import { injectGlobal } from "../Theme/style";
import { HourReport } from '../Component/HourReport/HourReport';
import ReactFontAwesome from '../Component/FontAwesome';
import styled from '../Theme/style';
import InputField from '../Container/InputField/InputField';
import DataReport from '../Container/DataReport/DataReport';
import * as moment from 'moment';

interface IState {
  currentPosition: ICoordinate,
  errorMessage: string,
  userPositionWeather: IWeather,
  loading: boolean,
  forecastWeather: IWeather,
  drawArray: Array<Object>,
  hourWeather: Array<Object>,
  hourForecastData: Array<Object>,
  trueName: string
}

class App extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      currentPosition: {
        lat: null,
        lng: null,
      },
      errorMessage: null,
      userPositionWeather: null,
      loading: false,
      forecastWeather: null,
      drawArray: [],
      hourWeather: null,
      hourForecastData: [],
      trueName: null
    }
  }

  componentDidMount() {
    // get current position of user
    this.getCurrentGeoCooridinate();
  }

  // Load Current Place InfoÖ weather, locale time, address, country
  getCurrentPositionInfo = async () => {
    const { currentPosition: { lat, lng } } = this.state;
    try {
      const data = await UserPositionWeather(lat, lng) as any;
      const hourWeather = data.forecast.forecastday[0].hour;
      this.setState({
        hourWeather,
        loading: false,
        userPositionWeather: data,
      });
    } catch (err) {
      this.setState({ loading: false }, () => console.log(err));
    }
  }

  // Get geo position from browser's navigator and call to fetch info
  getCurrentGeoCooridinate() {
    this.setState({ loading: true });
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude.toString();
      const lng = position.coords.longitude.toString();
      this.setState({
        currentPosition: { lat, lng },
      }, this.getCurrentPositionInfo);
    }, err => this.handleCoordinateError(err));
  }

  // update State when get Geo Coordinator error
  handleCoordinateError = (err: { code: number }) => {
    const error: { message: string } = { message: null };
    switch (err.code) {
      case 1:
        error.message = 'You denied to share you location, please activate the Sharing location feature in your device and browser to have weather report at your place!'
        break;
      case 2:
        error.message = 'Unfortunately, the sharing position feature is not available at your device or browser. However you still can search weather report by search bar!'
      case 3:
        error.message = 'The sharing location feature took too long for response. Please reload the page or using search bar to get weather report!'
      default:
        error.message = 'There is something wrong with sharing location feature. Please reload the page or using search bar to get weather report!'
    }
    this.setState({ errorMessage: error.message, loading: false });
  }

  // Submit Place Name
  onSubmit = (cityName: string) => {
    this.setState({ loading: true }, () => {
      this.getForecastData(cityName);
    });
  }

  // Update State after Search Place 
  getForecastData = async (cityName: string) => {
    try {
      const data = await ForecastWeather(cityName);
      this.setState({
        forecastWeather: data,
        loading: false,
        drawArray: this.getDrawData(data),
        hourForecastData: this.getHourForecastData(data),
        currentPosition: this.getSearchingLocation(data),
      })
    } catch (err) {
      console.log(err);
      this.setState({ loading: false }, () => console.log(err));
    }
  }
  // Get Data For Chart
  getDrawData(data: any) {
    const drawArray: Array<Object> = data.forecast.forecastday.map((day: any) => {
      return this.getFormatDrawData(day);
    });
    return drawArray;
  }

  getFormatDrawData(day: any) {
    const fixedDate = moment(day.date).format('dddd');
    return {
      name: fixedDate,
      avg: day.day.avgtemp_c,
      max: day.day.maxtemp_c,
      min: day.day.mintemp_c
    };
  }
  // Get Data for 24 Hours a day
  getHourForecastData(data: any) {
    const hourForecastData: Array<Object> = data.forecast.forecastday.map((day: any) => {
      return day.hour;
    });
    return hourForecastData;
  }
  // Get lat and lng for Searched Place
  getSearchingLocation(data: any) {
    const lat = data.location.lat.toString();
    const lng = data.location.lon.toString();
    return { lat, lng }
  }

  render() {
    const { currentPosition, userPositionWeather, loading, forecastWeather, drawArray, hourForecastData, hourWeather, trueName, errorMessage } = this.state;
    if (loading) {
      return <div className="app-container"><ReactFontAwesome /></div>;
    }
    return (
      <div className="app-container">
        <div className="inner-container">
          <InputField onSubmit={this.onSubmit} />
          <div className="content-container">
            {forecastWeather ?
              <div className="forecast-wrapper">
                <DataReport weather={forecastWeather} google={currentPosition} drawdata={drawArray} hour={hourForecastData} />
              </div>
              :
              <div className="forecast-wrapper">
                {(currentPosition.lat && currentPosition.lng) ?
                  <div className="current-display">
                    <div className="upper-display">
                      <div className="left-content">
                        <CurrentLocation weather={userPositionWeather} />
                      </div>
                      <div className="right-content">
                        <GoogleMap data={currentPosition} />
                      </div>
                    </div>
                    <HourReport data={hourWeather} />
                  </div>
                  :
                  <div className="current-display">
                    <div className="sharing-location-message">
                      <h3>The Application can not get your Geographic Coordinator!</h3>
                      <p>{errorMessage}</p>
                    </div>
                  </div>
                }
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;