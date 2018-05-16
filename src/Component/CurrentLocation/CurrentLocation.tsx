import * as React from 'react';

interface IPros {
  data: any
}

export const CurrentLocation = (props: IPros) => {
  const CurrentData = props.data
  return (
    <div>
      {CurrentData.location.name}
    </div>
  );
}