import { Select } from '@mantine/core';
import React, { forwardRef } from 'react';
import { RiArrowDownSFill } from 'react-icons/ri';

type Props = {
  value: {
    label: string;
    value: string;
  };
  onChange: (val: string) => void;
  options: {
    label: string;
    value: string;
  }[];
  height?: string;
  isNoBorder?: boolean;
  placeholder?: string;
};

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  label: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ label, ...others }: ItemProps, ref) => {
    return (
      <div
        ref={ref}
        {...others}
        className={`flex overflow-hidden relative items-center text-white p-3 hover:bg-gray-900 cursor-pointer rounded-lg `}
      >
        <p className="text-sm 2xl:text-lg">{label}</p>
      </div>
    );
  }
);

const CustomDropdown = ({
  value,
  options,
  onChange,
  height,
  isNoBorder,
  placeholder
}: Props) => {
  const classNames = {
    defaultVariant: `w-full bg-transparent text-white ${
      height || 'h-12'
    } rounded-xl cursor-pointer text-base 2xl:text-lg p-3 ${
      isNoBorder
        ? 'border-0'
        : 'border-[0.6px] border-gray-200 focus:border-white focus:border-sm'
    }`,
    root: 'w-full text-base 2xl:text-lg',
    dropdown: 'bg-gray-800 rounded-lg text-white',
    rightSection: 'text-gray-200',
    input: `text-base bg-gray-800 text-white cursor-pointer 2xl:text-lg rounded-lg ${
      height || 'h-12'
    }`,
    item: 'text-white hover:bg-gray-900'
  };

  return (
    <Select
      data={options}
      value={value?.value || null}
      searchable
      nothingFound="No results"
      onChange={val => onChange(val as string)}
      itemComponent={SelectItem}
      rightSection={<RiArrowDownSFill />}
      classNames={classNames}
      placeholder={placeholder}
    />
  );
};

export default CustomDropdown;
