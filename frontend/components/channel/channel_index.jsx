import React from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';

const ChannelIndex = (props) => {

    if (props.id) {
    const channelClass = props.active ? "channel-item-container active-channel channel-link-item" : "channel-item-container channel-link-item";
    const channelNameClass = props.active ? "active-name-channel channel-name-item" : "channel-name-item";

    let iconButtons;
    if (props.currentUserId === props.currentServerOwnerId) {
      iconButtons = <div className='channel-controls'>
        <button className='fafaicons-container channel-edit' onClick={() => {
            props.updateForm(props.id);} }>
          <i className="fas fa-edit"></i>
        </button>
        <button className='fafaicons-container channel-delete' onClick={() => {
            props.deleteChannel(props.id);} }>
          <i className="far fa-trash-alt"></i>
        </button>
      </div>;
    }


    return (
        <Link
          to={`/${props.serverId}/${props.id}`}
          onContextMenu={ (e) => props.handleIndexContextClick(props.id, e) }
          className={ channelClass }>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" className="hashtag"><path className="foreground-2zy1hc" fill="currentColor" d="M2.27333333,12 L2.74666667,9.33333333 L0.08,9.33333333 L0.313333333,8 L2.98,8 L3.68666667,4 L1.02,4 L1.25333333,2.66666667 L3.92,2.66666667 L4.39333333,0 L5.72666667,0 L5.25333333,2.66666667 L9.25333333,2.66666667 L9.72666667,0 L11.06,0 L10.5866667,2.66666667 L13.2533333,2.66666667 L13.02,4 L10.3533333,4 L9.64666667,8 L12.3133333,8 L12.08,9.33333333 L9.41333333,9.33333333 L8.94,12 L7.60666667,12 L8.08,9.33333333 L4.08,9.33333333 L3.60666667,12 L2.27333333,12 L2.27333333,12 Z M5.02,4 L4.31333333,8 L8.31333333,8 L9.02,4 L5.02,4 L5.02,4 Z" transform="translate(1.333 2)"></path></svg>
          </div>
          <div className={ channelNameClass }>{ props.channel.name }</div>
        {iconButtons}
        </Link>
    );
  }
};



export default withRouter(ChannelIndex);
