import React from 'react';

const ImgForm = ({ onSubmit, onInputChange }) => {
  return (
    <div className="w-60 br1 pt3 pa3 center shadow-3">
      <p className="f3">Give me a picture, and I will detect a face for you!</p>
      <form onSubmit={onSubmit} className="form">
        <input
          className="f4 pa2 w-70 center"
          type="text"
          onChange={onInputChange}
        />
        <button
          type="submit"
          className="w-30 glow f4 link ph3 pv2 dib white bg-light-red pointer"
        >
          Detect!
        </button>
      </form>
    </div>
  );
};

export default ImgForm;
