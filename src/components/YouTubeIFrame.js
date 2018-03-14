import React from 'react';

const YouTubeIFrame = ({ id }) => (
  <div className="embed-responsive embed-responsive-16by9">
    <iframe
      title="YouTube Player"
      width="560"
      height="315"
      src={`https://www.youtube.com/embed/${id}?autoplay=1`}
      frameBorder="0"
      allowFullScreen>
    </iframe>
  </div>
);

export default YouTubeIFrame;
