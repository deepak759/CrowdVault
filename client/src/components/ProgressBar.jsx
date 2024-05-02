/* eslint-disable react/prop-types */

import './style.css';

const ProgressBar = ({ value }) => {
console.log(value)
  return (
    <div>
      <progress
        value={value}
        max="100"
        style={{ '--value': `${value}`, '--max': '100' }}
      ></progress>
    </div>
  );
};

export default ProgressBar;
