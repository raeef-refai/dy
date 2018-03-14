import React from 'react';
import { Link } from 'react-router-dom';

const VideoListItem = ({ video, onSelect }) => {
  const {
    id: { videoId },
    snippet: { title, thumbnails: { default: { url: thumbUrl } } },
  } = video;

  return (
    <li key={videoId} className="mb-2">
      <img
        src={thumbUrl}
        alt={title} />

      <Link className="d-inline-block ml-3" style={{ width: 'calc(100% - 120px - 1rem)' }} to={`/search?play=${videoId}`}>
        {title}
      </Link>
    </li>
  );
};

export default VideoListItem;
