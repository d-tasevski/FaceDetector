import React from 'react';

const ImgForm = () => {
  return (
    <div className="w-60 br1 pt3 pa3 center shadow-3">
      <p className="f3">Give me a picture, and I will detect a face for you!</p>
      <div className="form">
        <input className="f4 pa2 w-70 center" type="text" />
        <button className="w-30 glow f4 link ph3 pv2 dib white bg-light-red pointer">
          Detect!
        </button>
      </div>
    </div>
  );
};

export default ImgForm;
