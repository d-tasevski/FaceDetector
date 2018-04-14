import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imgUrl, box, loading }) => {
  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}
    >
      <div className="absolute mt2">
        {!loading ? (
          imgUrl &&
          box && (
            <React.Fragment>
              <img
                src={imgUrl}
                id="js-input-image"
                alt="Processed"
                width="500px"
                height="auto"
              />
              <div
                className="bounding-box"
                style={{
                  top: box.topRow,
                  right: box.rightCol,
                  bottom: box.bottomRow,
                  left: box.leftCol
                }}
              />
            </React.Fragment>
          )
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default FaceRecognition;
