import * as React from 'react';
import { LineChart, ResponsiveContainer, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface IProps {
  data: any
}

export const Chart = (props: IProps) => {
  return (
    <div>
      <ResponsiveContainer width='100%' aspect={4.0 / 3.0}>
        <LineChart
          min-width={500}
          min-height={700}
          data={props.data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="avg" stroke="#8884d8" />
          <Line type="monotone" dataKey="max" stroke="#82ca9d" />
          <Line type="monotone" dataKey="min" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}