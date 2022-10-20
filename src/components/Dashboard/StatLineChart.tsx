import { LineChart } from '@tremor/react';

type Props = {
  chartData: any[];
};

const StatLineChart = ({ chartData }: Props) => (
  <div className="w-full h-full p-10 bg-gray-900 rounded-xl">
    <h2 className="text-2xl font-semibold">Recent Activity</h2>
    <LineChart
      data={chartData}
      dataKey="day"
      categories={['Files Changed']}
      colors={['orange']}
      marginTop="mt-6"
      yAxisWidth="w-10"
    />
  </div>
);

export default StatLineChart;
