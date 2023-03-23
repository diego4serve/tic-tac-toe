import React from 'react';
import PropTypes from 'prop-types';


function Cell({ value, onClick }) {
  return (
    <div className={`cell${value ? " " + value : ""}`} onClick={onClick}>
      {value}
    </div>
  );
}

Cell.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func.isRequired
};

export default Cell;