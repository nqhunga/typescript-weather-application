import * as React from 'react';

interface IProps {
  data: {
    id: number
    name: string,
  },
  onClickSuggest: (data: {name:string}) => void
}

export class SuggestItem extends React.Component<IProps, any> {
  handleClick = () => {
    this.props.onClickSuggest(this.props.data);
  }
  render() {
    return (
      <li className="suggest-item" onClick={this.handleClick}>{this.props.data.name}</li>
    );
  }
}