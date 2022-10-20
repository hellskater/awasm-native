type Props = {
  field: string;
  value: number;
  Icon: any;
};

const StatCard = ({ field, value, Icon }: Props) => {
  return (
    <div className="lg:w-[30%] w-full h-56 p-5 bg-gray-900 rounded-xl flex flex-col justify-center items-center">
      <p className="text-5xl">{value}</p>
      <div className="flex items-center gap-3 mt-6">
        <Icon size={40} />
        <p className="text-3xl text-gray-400">{field}</p>
      </div>
    </div>
  );
};

export default StatCard;
