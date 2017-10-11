//Imports
import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

//YouTube API Key
const API_KEY = 'AIzaSyBC78Vv5Oct4iU9QgZV_zsMTt8KPNsKrlE';

//Create Component
class App extends Component {

  constructor(props) {
    super(props);

    this.state = { 
      videos: [], 
      selectedVideo: null
    };
    //Default search string when app loads
    this.videoSearch('react.js');
  }
  //YouTube API pull on search
  videoSearch(term){
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({ 
        videos: videos,
        selectedVideo: videos[0]
       });
    });
  };
  //Renders everything to DOM
  render() {
    //Delay search while typing
    const videoSearch = _.debounce((term) => { this.videoSearch(term)}, 500)

    return(
      <div>
      <SearchBar onSearchTermChange ={videoSearch}/>
      <VideoDetail video={this.state.selectedVideo}/>
      <VideoList 
        onVideoSelect={selectedVideo => this.setState({selectedVideo})} 
        videos={this.state.videos} />
     </div> 
    ); 
  }

}

//Render to DOM
ReactDOM.render(<App />, document.querySelector('.container'));

