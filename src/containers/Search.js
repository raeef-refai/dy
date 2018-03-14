import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchVideos } from '../redux/modules/videos';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.searchVideos('i love like a love song selena gomez');
  }

  selectVideo(evt, id) {
    evt.preventDefault();

    this.setState({ selectedVideo: id });
  }

  render() {
    const { videos } = this.props;
    const { selectedVideo } = this.state;

    return (
      <div>
        <ul>
          {videos.map(video => (
            <li key={video.id.videoId}>
              <img
                src={video.snippet.thumbnails.default.url}
                alt={video.snippet.title} />

              <a
                href={`https://youtube.com/watch?v=${video.id.videoId}`}
                target="_blank" onClick={(evt) => this.selectVideo(evt, video.id.videoId)}>
                {video.snippet.title}
              </a>
            </li>
          ))}
        </ul>
        {selectedVideo && <iframe
          title="YouTube Player"
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
          frameBorder="0"
          allowFullScreen>
        </iframe>}
      </div>
    )
  }
}

const mapStateToProps = ({ videos }) => ({
  videos: videos.videos,
});

const mapDispatchToProps = { searchVideos };

export default connect(mapStateToProps, mapDispatchToProps)(Search);
