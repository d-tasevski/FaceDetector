import React from 'react';

const FaceRecognition = ({ imgUrl }) => {
  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}
    >
      <div className="absolute mt2">
        {imgUrl && <img src={imgUrl} alt="Image" width="500px" height="auto" />}
      </div>
    </div>
  );
};

export default FaceRecognition;
