import UserShow from './user_show';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { fetchAllUsers } from '../../actions/user_actions';
import { fetchAServer } from '../../actions/server_actions';
import { connect } from 'react-redux';
import { openModal, closeModal } from '../../actions/modal_actions';
import { makeNewDm, updateDm } from '../../actions/dm_actions';



const mapStateToProps = (state, ownProps) => {
  const users = state.entities.users || {};
  // const users = Object.values(state.entities.users).filter(user => {
  //   return user.serverId === serverId;
  const currentServerId = ownProps.serverId;
  const currentServer = ownProps.messageType === "Channel" ?
    state.entities.servers[currentServerId] :
    state.entities.dms[ownProps.channelId];
  const currentUser = state.session.currentUser || {};
  const userIds = currentServer.user_ids || [];
  return ({
    users,
    currentServerOwnerId : currentServer.owner_id || "",
    currentUserId: currentUser.id || "",
    userIds,
    currentServerId,
  });
};

const mapDispatchToProps = dispatch => {
  return ({
    fetchAServer: (id) => dispatch(fetchAServer(id)),
    fetchAllUsers: (id) => dispatch(fetchAllUsers(id)),
    makeNewDm: (id) => dispatch(makeNewDm(id)),
    closeModal: () => {
      dispatch(closeModal());
    }
  });
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserShow));
