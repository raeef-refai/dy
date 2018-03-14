import React from 'react';

const SearchInput = ({ value, onChange }) => (
  <input
    className="form-control"
    value={value}
    placeholder="Search in YouTube videos..."
    onChange={onChange} />
);

export default SearchInput;
