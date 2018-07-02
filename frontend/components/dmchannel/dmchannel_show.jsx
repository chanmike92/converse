import React from 'react';
import FriendIndexContainer from '../friend_list/friend_index_container';
import GreetingContainer from '../greeting/greeting_container';
import DmIndex from './dm_index';

class DmChannelShow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let dms = this.props.dmIds.map((id, i) => {
      return (<DmIndex
        key={ i }
        id={ id }
        dm={ this.props.dms[id] }
        channelId={ this.props.channelId }
        />);}
      );
    //make selected for friends-logo and each dm item
    return (
      <div className='subcomponent-container'>
        <div className='channel-container'>
          <div className='server-title-container'>
            <div onClick={ this.props.searchUsers } className='user-search'>
              <input className='user-search-inner' disabled placeholder="Find or start a conversation"></input>
            </div>
          </div>
          <div className='bottom-channels-container'>
            <div className='friends-logo' >
              Friends - { this.props.friendCount }
            </div>
            <div className='dm-text-channel-name'>DIRECT MESSAGES</div>
              { dms }
          </div>
          <GreetingContainer />
        </div>
        <FriendIndexContainer
          friendList={ this.props.friendList }
          channelId={ this.props.channelId }
        />
      </div>
    );
  }
}

export default DmChannelShow;
