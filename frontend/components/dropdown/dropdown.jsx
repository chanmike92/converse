import React from 'react';
import { closeDropdown } from '../../actions/dropdown_actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import FriendAddContainer from '../friend_list/friend_add_container';


const Dropdown = ({ dropdownType, id, x, y, serverId, server, channelId, channel, closeDropdown }) => {

  if (!dropdownType) {
    return null;
  }
  let component;
  switch (dropdownType) {
      case 'serverindex':
        component =
        <div className='dropdown-container'>
            <ServerUpdateContainer server={ server }/>
        </div>;
      break;
      case 'channel':
        component =
        <div className='dropdown-container'>
            <ServerUpdateContainer server={ server }/>
        </div>;
      break;
      case 'channelindex':
        component =
        <div className='dropdown-container'>
            <ServerUpdateContainer server={ server }/>
        </div>;
      break;
    default:
      return null;
  }

  return (
    <div className="dropdown-background" onClick={ closeDropdown }>
      <div className='dropdown-child' style={ {left: `${x}`, bottom: `${y}` } } onClick={ e => e.stopPropagation() }>
        { component }
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  const dropdownType = state.ui.dropdown.type;
  const dropdownId = state.ui.dropdown.id;
  const x = state.ui.dropdown.x;
  const y = state.ui.dropdown.y;
  const serverId = (ownProps.location.pathname.split('/')[1]);
  const server = state.entities.servers[serverId] || {};
  const channelId = (ownProps.location.pathname.split('/')[2]);
  const channel = state.entities.channels[channelId] || {};
  return {
    dropdownType,
    dropdownId,
    x,
    y,
    server,
    serverId,
    channel,
    channelId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeDropdown: () => dispatch(closeDropdown())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dropdown));