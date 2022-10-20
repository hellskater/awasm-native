import StatCard from '@components/Dashboard/StatCard';
import StatLineChart from '@components/Dashboard/StatLineChart';
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage
} from 'next';
import { useSession } from 'next-auth/react';
import { BiError, BiImages } from 'react-icons/bi';
import { BsCodeSlash } from 'react-icons/bs';
import { MdOutlineVideoLibrary } from 'react-icons/md';
import axios from 'axios';

const cards = [
  {
    field: 'GIFs',
    Icon: BiImages
  },
  {
    field: 'Videos',
    Icon: MdOutlineVideoLibrary
  },
  {
    field: 'Files',
    Icon: BsCodeSlash
  }
];

const Dashboard: NextPage = ({
  statsData
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  useSession({
    required: true
  });

  //   eslint-disable-next-line
  console.log('CHART DATA =>', statsData);

  return (
    <div className="w-full p-14 pt-16">
      <header className="py-5 text-4xl my-10">Dashboard</header>
      <div className="h-fit w-full bg-red-400 mb-10 p-10 rounded-lg text-lg">
        <div className="flex items-center gap-3 mb-5">
          <BiError size={35} />
          <p className="text-xl font-semibold">Note</p>
        </div>
        <p className="text-base">
          The data displayed on this page is static and not real time, it is
          fetched from database on page load and is not correct at this moment.
          It is only to demonstrate the working of the UI components. The dummy
          data will be replaced with real data soon.
        </p>
      </div>
      <div className="flex flex-wrap items-center w-full gap-12 mb-20">
        {cards.map(({ field, Icon }) => {
          const value = statsData.aggregate[field.toLowerCase()];
          return (
            <StatCard key={field} field={field} value={value} Icon={Icon} />
          );
        })}
      </div>
      <div className="lg:w-1/2 w-full h-fit">
        <StatLineChart chartData={statsData.recentActivity} />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const statsData = await axios
    .get('http://localhost:3000/api/stats')
    .then(res => res.data);

  return {
    props: {
      statsData
    }
  };
};

export default Dashboard;
