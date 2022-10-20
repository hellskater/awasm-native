// Icons for all file types

import {
  DiCode,
  DiPython,
  DiJavascript1,
  DiHtml5,
  DiCss3Full,
  DiSass,
  DiLess
} from 'react-icons/di';

type Props = {
  type: string;
};

const FileIcon = ({ type }: Props) => {
  return (
    <>
      {type === 'python' && <DiPython className="mr-1 text-lg" />}
      {type === 'javascript' && <DiJavascript1 className="mr-1 text-lg" />}
      {type === 'html' && <DiHtml5 className="mr-1 text-lg" />}
      {type === 'css' && <DiCss3Full className="mr-1 text-lg" />}
      {type === 'cpp' && <DiCode className="mr-1 text-lg" />}
      {type === 'sass' && <DiSass className="mr-1 text-lg" />}
      {type === 'less' && <DiLess className="mr-1 text-lg" />}
      {type === 'other' && <DiCode className="mr-1 text-lg" />}
    </>
  );
};

export default FileIcon;
