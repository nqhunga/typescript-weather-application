import * as React from 'react';
import { CurrentPosition } from '../GetApi/CurrentData';
import { CurrentLocation } from '../Component/CurrentLocation/CurrentLocation';

interface IState {
  currentPosition: {
    lat: string,
    lng: string
  },
  currentPositionData: Object,
  render: boolean
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
      render: false
    }
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
  render() {
    return (
      <div>
        {this.state.render ?
          <CurrentLocation data={this.state.currentPositionData} />
          : ''
        }
      </div>
    );
  }
}