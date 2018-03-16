import * as APIUtil from '../util/server_api_util';
export const RECEIVE_A_SERVER = 'RECEIVE_A_SERVER';
export const RECEIVE_ALL_SERVERS = 'RECEIVE_ALL_SERVERS';
export const RECEIVE_SERVER_ERRORS = 'RECEIVE_SERVER_ERRORS';
export const RECEIVE_CURRENT_SERVER = 'RECEIVE_CURRENT_SERVER';

export const receiveAllServers = (servers) => {

  return {
    type: RECEIVE_ALL_SERVERS,
    servers
  };
};

export const receiveAServer = (payload) => {

  return {
    type: RECEIVE_A_SERVER,
    payload
  };
};

export const receiveErrors = (errors) => {

  return {
    type: RECEIVE_SERVER_ERRORS,
    errors
  };
};

export const receiveCurrentServer = (currentServer) => {

  return {
    type: RECEIVE_CURRENT_SERVER,
    currentServer
  };
};


export const fetchAllServers = () => dispatch => {

  return APIUtil.fetchAllServers().then((servers) => dispatch(receiveAllServers(servers)), (errors) => {

    return dispatch(receiveErrors(errors.responseJSON));});
};

export const fetchAServer = (id) => dispatch => {

  return APIUtil.fetchAServer(id).then((payload) => dispatch(receiveAServer(payload)), (errors) => {

    dispatch(receiveErrors(errors.responseJSON));});
};

export const makeNewServer = (server) => dispatch => {

  return APIUtil.makeNewServer(server).then((payload) => dispatch(receiveAServer(payload)), (errors) => dispatch(receiveErrors(errors.responseJSON)));
};

export const joinServer = (server) => dispatch => {

  return APIUtil.joinServer(server).then((payload) => dispatch(receiveAServer(payload)), (errors) => dispatch(receiveErrors(errors.responseJSON)));
};

export const deleteServer = (id) => dispatch => {
  return APIUtil.deleteServer(id).then((servers) => dispatch(receiveAllServers(servers)), (errors) => dispatch(receiveErrors(errors.responseJSON)));
};
