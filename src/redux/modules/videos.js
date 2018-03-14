const YOUTUBE_KEY = 'AIzaSyCR1nmfJbqefCIk9vhJyDLmLB93AbGqqMk';

const SEARCH_START = 'video/SEARCH_START';
const SEARCH_SUCCESS = 'video/SEARCH_SUCCESS';
const SEARCH_ERROR = 'video/SEARCH_ERROR';

const initialState = {
  videos: [],
  searchingVideos: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_START:
      return {
        ...state,
        searchingVideos: true,
      };

    case SEARCH_SUCCESS:
      return {
        ...state,
        videos: action.result.data.items,
        searchingVideos: false,
      };

    case SEARCH_ERROR:
      return {
        ...state,
        searchingVideos: false,
      };

    default:
      return state;
  }
};

export default reducer;

export const searchVideos = (query) => ({
  types: [SEARCH_START, SEARCH_SUCCESS, SEARCH_ERROR],
  promise: client =>
    client.get(
      'https://www.googleapis.com/youtube/v3/search?part=snippet&type=video' +
      `&maxResults=10&q=${query}&key=${YOUTUBE_KEY}`
    ),
});
