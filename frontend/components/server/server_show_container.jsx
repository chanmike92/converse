import ServerShow from './server_show';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { fetchAllServers, deleteServer, receiveErrors, fetchAServer } from '../../actions/server_actions';
import { connect } from 'react-redux';
import { openModal } from '../../actions/modal_actions';



const mapStateToProps = state => {

  return ({
    currentUser: state.session.currentUser,
    currentChannel: state.session.currentChannel,
    currentServer: state.session.currentServer,
    servers: Object.values(state.entities.servers),
    errors: state.errors.server
  });
};

const mapDispatchToProps = dispatch => {
  return ({
    fetchAllServers: () => dispatch(fetchAllServers()),
    deleteServer: (id) => dispatch(deleteServer(id)),
    createForm: () => dispatch(openModal('createServer')),
    fetchAServer: (id) => dispatch(fetchAServer(id))
  });
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ServerShow));