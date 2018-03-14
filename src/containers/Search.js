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
  }

  componentDidMount() {
    this.props.searchVideos('');
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
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <SearchInput value={query} onChange={this.searchInputChangeHandler} />
          </div>
        </div>
        <div className="row mt-4">
          <div className="col">
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
          {
            (!!ppv || !!spv) && <div className="col">
              <YouTubeIFrame id={ppv || spv} />
            </div>
          }
        </div>
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
