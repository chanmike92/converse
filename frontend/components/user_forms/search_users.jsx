import React from 'react';
import Fuse from 'fuse.js';
import SearchIndex from './search_index';
import { withRouter, Link, Redirect } from 'react-router-dom';

class SearchUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '@', index: 0, searches: []};
    this.handleInput = this.handleInput.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleUserSearch = this.handleUserSearch.bind(this);
    this.handleChannelSearch = this.handleChannelSearch.bind(this);
    this.handleServerSearch = this.handleServerSearch.bind(this);
    this.renderSearchResults = this.renderSearchResults.bind(this);
    this.handleSearchClass = this.handleSearchClass.bind(this);
    this.renderSearchIndex = this.renderSearchIndex.bind(this);
    this.handleHover = this.handleHover.bind(this);
  }

  handleInput(input) {
    return (e) => {
      let searchResult = this.renderSearchResults(e.currentTarget.value);
      console.log(searchResult);
      this.setState({
        [input]: e.currentTarget.value,
        index: 0,
        searches: searchResult,
      });
    };
  }

  handleKeyPress(e) {
    if (e.which === 27) {
      let currentValue = this.state.name;
      if (currentValue.length > 0) {
        this.setState({
          name: "",
          index: 0,
          searches: [],
        });
      } else {
        this.props.closeModal();
      }
    } else if (e.which === 9 || e.which === 40) {
        e.preventDefault();
        let index = this.state.index;
        if (this.state.index >= this.state.searches.length) {
          index = 0;
        } else {
          index++;
        }
        this.setState({
          index
        });
    } else if (e.which === 38) {
      let index = this.state.index;
      if (this.state.index < 0) {
        index = this.state.searches.length - 1;
      } else {
        index--;
      }
      this.setState({
        index
      });
    } else if (e.which === 13) {

    }
  }

  handleUserSearch(query) {
    let length = Math.floor(query.length / 2);
    let options = {
      shouldSort: true,
      threshold: 0.4,
      location: length,
      distance: 1000,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        "username"
    ]};
    console.log(query);
    let fuse = new Fuse(this.props.users, options);
    return fuse.search(query) || [];
  }

  handleServerSearch(query) {
    let length = Math.floor(query.length / 2);
    let options = {
      shouldSort: true,
      threshold: 0.4,
      location: length,
      distance: 1000,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        "name"
    ]};
    let fuse = new Fuse(this.props.servers, options);
    return fuse.search(query) || [];
  }

  handleChannelSearch(query) {
    let length = Math.floor(query.length / 2);
    let options = {
      shouldSort: true,
      threshold: 0.4,
      location: length,
      distance: 1000,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        "name"
    ]};
    let fuse = new Fuse(this.props.channels, options);
    return fuse.search(query) || [];
  }

  renderSearchResults(searchName) {
    let query = searchName;
    if (searchName.length === 0) {
      return [];
    } else {
      if (query[0] === '@' || query[0] === '*' || query[0] === '#') {
        if (query.length > 1) {
          switch(query[0]) {
          case '@':
            query = query.substring(1);
            return this.handleUserSearch(query);
          case '*':
            query = query.substring(1);
            return this.handleServerSearch(query);
          case '#':
            query = query.substring(1);
            return this.handleChannelSearch(query);
          }
        } else {
          return [];
        }
      } else {
        let users = this.handleUserSearch(query);
        let channels = this.handleChannelSearch(query);
        let servers = this.handleServerSearch(query);
        return [].concat.apply(users, channels, servers);
      }
    }
  }

  handleSearchClass() {
    let className = "Searching all names";
    if (this.state.name.length > 0) {
      switch(this.state.name[0]) {
        case '@':
          className = "Searching users";
          break;
        case '*':
          className = "Searching servers";
          break;
        case '#':
          className = "Searching channels";
          break;
        default:
          className = "Searching all names";
      }
    }
    return (
      <div className="default-index-search">
        <div className='search-header'>{ className }</div>;
      </div>
    );
  }

  handleHover(i) {
    return (e) => {
      this.setState({
        index: i
      });
    };
  }

  renderSearchIndex() {
    let searchResults = [];
    for (let i = 0; i < this.state.searches.length; i++) {
      let active = false;
      let currentSearch = this.state.searches[i];
      if (this.state.index === i) {
        active = true;
      }

      searchResults.push(
        <SearchIndex
          key={ i }
          name={ currentSearch.name || currentSearch.username }
          image={ currentSearch.image_url }
          displayName={ currentSearch.display_name || ""}
          type={ currentSearch.type }
          handleHover={ this.handleHover }
          index={ i }
          active={ active }
        />
      );
    }

    return searchResults;

  }

  renderSearchContainer() {
    let searchClassName = this.handleSearchClass();
    if (this.state.searches.length > 0) {
      let searchResult = this.renderSearchIndex();
      return (
        <div className="search-results">
          <div className="search-scroller">
          <div style={ {width: '100%', height: '15px'}}></div>
            { searchClassName }
            { searchResult }
          </div>
        </div>);
    } else {
      return (
        <div className="empty-search-result">
          { searchClassName }
          <div className="empty-search-note">Can’t seem to find what you’re looking for?</div>
        </div>);
    }
  }


  render() {
    let searchContainer = this.renderSearchContainer();

    return (
      <div className='user-search-form-container' onKeyDown={ this.handleKeyPress }>
        <div className='search-input-container'
          onKeyDown={ this.handleKeyPress }>
          <input ref={input => input && input.focus()}
            className='search-input-field' autoFocus type='text'
            onChange={this.handleInput('name')}
            value={ this.state.name }
            placeholder="Where would you like to go?"
            onKeyDown={ this.handleKeyPress }>
          </input>
          { searchContainer }
          <div className='tips-nav-bar'>
            <div className='tips-nav-controls'>
              <div className='keybind-controls'>
                <span>Tab</span>
              </div>
               or
               <div className='keybind-controls'>
                 <span><i className="fas fa-arrow-down"></i></span>
               </div>
               <div className='keybind-controls'>
                 <span><i className="fas fa-arrow-up"></i></span>
               </div>
            </div>

            <div className='tips-command-controls'>
              <div className='keybind-controls'>
                <span>Enter</span>
              </div>
               to select
               <div className='keybind-controls keybind-esc'>
                 <span>Esc</span>
               </div>
               to dismiss
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SearchUser);
