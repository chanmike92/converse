import React from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';

const DmIndex = (props) => {

    const channelClass = Number(props.channelId) === Number(props.dm.id) ? "dm-channel-item-container active-channel" : "dm-channel-item-container";
    const channelNameClass = Number(props.channelId) === Number(props.dm.id) ? "active-name-channel channel-name-item" : "channel-name-item";
    if (props.dm.dmreceivers.length === 1) {
      const online = props.user.online_status ? "online-status-icon green-back" : "online-status-icon grey-back";
      return (
          <Link
            to={`/@me/${props.dm.id}`}
            className={ channelClass }>
            <div className='dm-user-profile'>
              <div className='dm-image-icons'>
                <img className='profile-picture' src={ props.user.image_url } />
                <div className={ online }></div>
              </div>
              <div className={ channelNameClass }>{ props.dm.name }</div>
            </div>
            <div className='channel-controls'>
              <div className='unsubscribe-dm' onClick={ (e) => props.unsubscribeDm(e, props.dm.id) }></div>
            </div>
          </Link>
      );
    }
    else {

      return (
          <Link
            to={`/@me/${props.id}`}
            className='channel-link-item'>
            <div className='dm-image-icons'>
              <img className='profile-picture group-dm-picture'/>
            </div>
            <div className={ channelNameClass }>{ props.dm.name }</div>
            <div className='channel-controls'>
              <div className='unsubscribe-dm'></div>
            </div>
          </Link>
      );
    }
};



export default withRouter(DmIndex);
