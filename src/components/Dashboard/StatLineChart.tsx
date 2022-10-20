import { LineChart } from '@tremor/react';

const chartdata = [
  {
    day: 'Mon',
    'Files Changed': 2
  },
  {
    day: 'Tue',
    'Files Changed': 1
  },
  {
    day: 'Wed',
    'Files Changed': 3
  },
  {
    day: 'Thu',
    'Files Changed': 5
  },
  {
    day: 'Fri',
    'Files Changed': 4
  },
  {
    day: 'Sat',
    'Files Changed': 3
  },
  {
    day: 'Sun',
    'Files Changed': 1
  }
];

export default () => (
  <div className="w-full h-full p-10 bg-gray-900 rounded-xl">
    <h2 className="text-2xl font-semibold">Recent Activity</h2>
    <LineChart
      data={chartdata}
      dataKey="day"
      categories={['Files Changed']}
      colors={['orange']}
      marginTop="mt-6"
      yAxisWidth="w-10"
    />
  </div>
);
