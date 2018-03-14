import React from 'react';
import { Link } from 'react-router-dom';

const VideoListItem = ({ video, onSelect }) => {
  const {
    id: { videoId },
    snippet: { title, thumbnails: { default: { url: thumbUrl } } },
  } = video;

  return (
    <li key={videoId} className="mb-2">
      <div className="thumbnail-wrapper">
        <div className="thumbnail">
          <img
            src={thumbUrl}
            alt={title} />
        </div>
      </div>
      <h3>
        <Link to={`/search?play=${videoId}`}>
          {title}
        </Link>
      </h3>
    </li>
  );
};

export default VideoListItem;
