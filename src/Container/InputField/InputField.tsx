import * as React from 'react';

interface IProps {
  onSubmit: (cityName: string) => any
}

interface IState {
  cityName: string
}

export default class InputField extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      cityName: ''
    }
  }

  onChange(e: any) {
    e.persist();
    const value = e.target.value;
    this.setState({
      cityName: value
    })
  }

   onSubmit(e: any) {
     this.props.onSubmit(this.state.cityName);
  }

  render() {
    return (
      <div>
        <input onChange={e => this.onChange(e)}/>
        <button onClick={e => this.onSubmit(e)}>Submit</button>
      </div>
    );
  }
}