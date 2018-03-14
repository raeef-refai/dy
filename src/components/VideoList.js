import React from 'react';
import VideolistItem from './VideoListItem';

const VideoList = ({ videos, onSelectVideo }) => (
  <ul style={{ listStyle: 'none' }}>
    {videos.map(video => (
      <VideolistItem key={video.id.videoId} video={video} onSelect={onSelectVideo} />
    ))}
  </ul>
);

export default VideoList;
