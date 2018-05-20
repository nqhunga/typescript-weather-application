import * as React from 'react';

import { CurrentPosition } from '../GetApi/CurrentData';
import { ForecastData } from '../GetApi/ForecastData';
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
  currentPosition: {
    lat: string,
    lng: string
  },
  currentPositionData: {
    location: {
      name: string,
      region: string,
      country: string,
      localtime: string,
    },
    current: {
      condition: {
        icon: string,
        text: string,
      }
    },
    forecast: {
      forecastday: Array<{
        day: {
          maxtemp_c: string,
          mintemp_c: string,
          avgtemp_c: string,
          avghumidity: string,
          maxwind_kph: string
        }
      }>
    }
  },
  loading: boolean,
  weather: Object,
  drawArray: Array<Object>,
  searchLocation: {
    lat: string,
    lng: string
  },
  hourData: Array<Object>,
  hourForecastData: Array<Object>,
  trueName: string
}

injectGlobal`
  * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Normal';}
  
`;

class App extends React.Component<{}, IState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      currentPosition: {
        lat: '',
        lng: ''
      },
      currentPositionData: null,
      loading: false,
      weather: null,
      drawArray: [],
      searchLocation: {
        lat: '',
        lng: ''
      },
      hourData: null,
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
      const data = await CurrentPosition(lat, lng) as any;
      const hourData = data.forecast.forecastday[0].hour;
      this.setState({
        hourData,
        loading: false,
        currentPositionData: data,
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
    });

  }
  // Submit Place Name
  onSubmit = async (cityName:string) => {
    this.setState({ loading: true });
    try {
      const data = await PlaceSuggest(cityName);
      if (data.length !== 0) {this.getForecastData(cityName)}
      else this.setState({ loading: false });
    } catch (err) {
      console.log(err);
    }
  }

  // Update State after Search Place 
  getForecastData = async (cityName: string) => {
    try {
      const data = await ForecastData(cityName);
      this.setState({
        weather: data,
        loading: false,
        drawArray: this.getDrawData(data),
        hourForecastData: this.getHourForecastData(data),
        searchLocation: this.getSearchingLocation(data),
      })
    } catch (err) {
      console.log(err);
      this.setState({ loading: false },() => console.log(err));
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
    const { currentPosition, currentPositionData, loading, weather, searchLocation, drawArray, hourForecastData, hourData, trueName } = this.state;
    if (loading) {
      return <div className="app-container"><ReactFontAwesome /></div>;
    }
    return (
      <div className="app-container">
        <div className="inner-container">
          <InputField onSubmit={this.onSubmit} />
          <div className="content-container">
            {weather ?
              <div className="forecast-wrapper">
                <DataReport data={weather} google={searchLocation} drawdata={drawArray} hour={hourForecastData}/>
              </div>
              :
              <div className="forecast-wrapper">
                {currentPositionData ?
                  <div className="current-display">
                    <div className="upper-display">
                      <div className="left-content">
                        <CurrentLocation data={currentPositionData} />
                      </div>
                      <div className="right-content">
                        <GoogleMap data={currentPosition} />
                      </div>
                    </div>
                    <HourReport data={hourData} />
                  </div>
                  :
                  <div className="current-display">Loading..</div>
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