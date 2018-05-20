import * as React from 'react';
import styled from '../../Theme/style';
import { SuggestItem } from './SuggestItem';
import { PlaceSuggest } from '../../GetApi/CheckData';
interface IProps {
  onSubmit: (cityName: string) => void
}

interface IState {
  cityName: string,
  cityList: Array<{
    id: number,
    name: string
  }>,
  location: {
    lat: number,
    lng: number
  }
}


  
export default class InputField extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      cityName: '',
      cityList: null,
      location: {
        lat: null,
        lng: null
      }
    }
  }

  onChange = async (e: any) => {
    e.persist();
    const value = e.target.value;
    this.setState({
      cityName: value
    });
    try {
      const data = await PlaceSuggest(e.target.value);
      if (data.length !== 0) {
        this.setState({ cityList: data })
      } else {
        this.setState({
          cityList: null
        })
      }
    } catch (err) {
      console.log(err);
    }
  }

  onSubmit = (e: any) => {
    this.props.onSubmit(this.state.cityName);
  }

  handleSuggest = (value:any) => {
    this.setState({
      cityName: value.name,
      location: {
        lat: value.lat,
        lng: value.lon
      },
      cityList: null
    })
  }

  render() {
    const { cityList, cityName } = this.state;
    return (
      <div className="input-wrapper">
        <div className="submit-wrapper">
          <input onChange={this.onChange} value={cityName}/>
          <button onClick={this.onSubmit}>Submit</button>
        </div>
        <div className="suggest-wrapper">
          {cityList ?
            <ul className="suggest">
              {
                cityList.map(value => <SuggestItem key={value.id} data={value} onClickSuggest={this.handleSuggest} />)
              }
            </ul>
            : null
          }
        </div>
      </div>
    );
  }
}
