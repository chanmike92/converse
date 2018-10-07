import MessageShow from './message_show';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { fetchAllMessages, receiveAMessage, makeNewMessage, receiveErrors, clearMessages } from '../../actions/message_actions';
import { fetchAllUsers } from '../../actions/user_actions';
import { fetchAllChannels, fetchAChannel } from '../../actions/channel_actions';
import { closeDropdown } from '../../actions/dropdown_actions';
import { connect } from 'react-redux';
import { openModal } from '../../actions/modal_actions';



const mapStateToProps = (state, ownProps) => {
  const messageType = ownProps.messageType || "";
  const channelId = parseInt(ownProps.channelId);
  const channel = messageType === "Channel" ?
    state.entities.channels[ownProps.channelId] :
    state.entities.dms[ownProps.channelId];
  const users = state.entities.users;
  const channelName = channel.name || "";
  const currentUser = state.session.user || {};
  const serverId = ownProps.serverId;
  const currentServer = state.entities.channels[serverId];
  const messages = Object.values(state.entities.messages).filter(message => {
    return (message.messagable_id === channelId && message.messagable_type === messageType);
  });
  const dropdownType = state.ui.dropdown.dropdownType || null;
  // const messages = channel.message_ids;
  const lastMessage = messages[messages.length - 1];
  // const currentChannel = state.session.currentChannel || {};


  return ({
    messageType,
    currentUser,
    channel,
    messages,
    users,
    // currentChannel,
    channelName,
    serverId,
    currentServer,
    channelId,
    lastMessage,
  });
};

const mapDispatchToProps = dispatch => {
  return ({
    fetchAllUsers: (id) => fetchAllUsers(id),
    fetchAllChannels: (id) => dispatch(fetchAllChannels(id)),
    fetchAChannel: (id) => dispatch(fetchAChannel(id)),
    fetchAllMessages: (id) => dispatch(fetchAllMessages(id)),
    receiveAMessage: (message) => dispatch(receiveAMessage(message)),
    clearMessages: () => dispatch(clearMessages()),
    closeDropdown: (e) => {
      e.preventDefault();
      e.stopPropagation();
      dispatch(closeDropdown());
    }
  });
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MessageShow));
