import StatCard from '@components/Dashboard/StatCard';
import StatLineChart from '@components/Dashboard/StatLineChart';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { BiImages } from 'react-icons/bi';
import { BsCodeSlash } from 'react-icons/bs';
import { MdOutlineVideoLibrary } from 'react-icons/md';

const cards = [
  {
    field: 'GIFs',
    value: 3,
    Icon: BiImages
  },
  {
    field: 'Videos',
    value: 7,
    Icon: MdOutlineVideoLibrary
  },
  {
    field: 'Files',
    value: 4,
    Icon: BsCodeSlash
  }
];

const Dashboard: NextPage = () => {
  useSession({
    required: true
  });

  return (
    <div className="w-full p-14 pt-16">
      <header className="py-5 text-4xl my-10">Dashboard</header>
      <div className="flex flex-wrap items-center w-full gap-12 mb-20">
        {cards.map(({ field, value, Icon }) => (
          <StatCard key={field} field={field} value={value} Icon={Icon} />
        ))}
      </div>
      <div className="lg:w-1/2 w-full h-fit">
        <StatLineChart />
      </div>
    </div>
  );
};

export default Dashboard;
