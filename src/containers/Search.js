import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchVideos } from '../redux/modules/videos';
import SearchInput from '../components/SearchInput';
import VideoList from '../components/VideoList';
import YouTubeIFrame from '../components/YouTubeIFrame';
import queryString from 'query-string';
import { debounce } from 'lodash';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      playingVideo: queryString.parse(this.props.location.search).play,
    };

    this.search = debounce(this.search, 500);
    this.searchInputChangeHandler = this.searchInputChangeHandler.bind(this);
    this.onEscKeyHandler = this.onEscKeyHandler.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
  }

  onModalClose() {
    this.props.history.push('/search')
  }

  onEscKeyHandler(event) {
    if (event.keyCode === 27) {
      this.onModalClose();
    }
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.onEscKeyHandler, false);
  }

  componentDidMount() {
    this.props.searchVideos('');

    document.addEventListener("keydown", this.onEscKeyHandler, false);
  }

  search(query) {
    this.props.searchVideos(query);
  }

  searchInputChangeHandler(evt) {
    const query = evt.target.value;

    this.setState({ query });

    this.search(query);
  }

  render() {
    const { videos, searchingVideos, playingVideo: ppv } = this.props;
    const { query, playingVideo: spv } = this.state;

    return (
      <div>
        <div className="heading">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <SearchInput value={query} onChange={this.searchInputChangeHandler} />
              </div>
            </div>
          </div>
        </div>
        <div className="container content">
          <div className="row">
            <div className="col-md-12">
              {
                !searchingVideos && (
                  !!videos.length ?
                    <VideoList videos={videos} /> :
                    <p className="text-danger text-center mt-4">No search results!</p>
                )
              }
              {
                searchingVideos && <p className="text-center mt-4">
                  <i className="fa fa-spinner fa-spin"></i>
                </p>
              }
            </div>
          </div>
        </div>
        {
          (!!ppv || !!spv) && (
            <div className="video-frame" onClick={this.onModalClose}>
              <div className="backdrop">
                <YouTubeIFrame id={ppv || spv} />
              </div>
            </div>
          )
        }
      </div>
    )
  }
}

const mapStateToProps = ({
  videos: { videos, searchingVideos },
  routing: { locationBeforeTransitions: loc },
}) => ({
  videos,
  searchingVideos: searchingVideos,
  playingVideo: loc ? queryString.parse(loc.search).play : '',
});

const mapDispatchToProps = { searchVideos };

export default connect(mapStateToProps, mapDispatchToProps)(Search);
