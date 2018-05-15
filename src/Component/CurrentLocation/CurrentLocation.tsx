import * as React from 'react';

interface IPros {
  data: any
}

export const CurrentLocation: React.StatelessComponent<IPros> = (props) => {
  const CurrentData = props.data
  return (
    <div>
      {CurrentData.location.name}
    </div>
  );
}