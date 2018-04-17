import React from 'react';
import ServerIndex from './server_index';
import { withRouter, Link, Redirect } from 'react-router-dom';

class ServerShow extends React.Component {
  componentDidMount() {
    const serverId = this.props.location.pathname.split('/')[1];

    if (serverId) {
      this.props.fetchAllServers();
      // .then(
      //   (action) => {
      //     const servers = Object.values(action.servers);
      //     if (servers.length > 0 && this.props.currentUser) {
      //       const serverId = servers[0].id;
      //       const firstChannel = this.props.match.params.channelId;
      //
      //       this.props.history.replace(`/${this.props.currentUser.id}/server/${serverId}/channel/${channelId}`);
      //     }
      //   }
      // )
    } else {
      this.props.fetchAllServers()
        .then(() => this.props.history.push(`/@me/`))
      // .then(
    //     (action) => {
    //       const servers = Object.values(action.servers);
    //       if (servers.length > 0 && this.props.currentUser) {
    //         const serverId = servers[0].id;
    //         if (servers[0].channel_ids.length > 0) {
    //           const firstChannel = servers[0].channel_ids[0];
    //
    //           this.props.history.push(`/${serverId}/${firstChannel}`);
    //         // () => {this.props.history.replace(`/@me/`);
    //         } else {
    //           this.props.history.push(`/${serverId}/`);
    //         }
    //       }
    //   // );
    //   }
    // );
    }
  }

  // componentWillReceiveProps(nextProps) {
  // if (this.props.match.params.serverId !== nextProps.match.params.serverId) {
  //     this.props.fetchAServers(nextProps.match.params.serverId);
  //   }
  // }



  render() {


    const servers = this.props.serverIds.map((id, idx) => {
      if (this.props.servers[id].is_dm === false) {
      return (<ServerIndex
      server={this.props.servers[id]}
      key={ idx }
      id={ id }
      currentUser={this.props.currentUser}
      fetchAServer={this.props.fetchAServer}
      />
      );
    }
    });


    return (
      <div className='server-container'>

        <Link className='direct-message-link server-icons' to={`/@me/`}>
          <i className="fas fa-users"></i>
        </Link>
        <div className='separator'></div>
          {servers}
        <button id='create-server-form' onClick={this.props.createForm}>
          <span className='create-sign'>+</span>
        </button>
        <div className='separator'></div>
        <a href='https://www.github.com/chanmike92' className='server-icons'><i className="fab fa-github"></i></a>
        <a href='https://www.linkedin.com/in/chanmike92' className='server-icons'><i className="fab fa-linkedin-in"></i></a>
        <a href='http://mikechan.me' className='server-icons'><i className="fas fa-briefcase"></i></a>
      </div>
    );
  }
}

export default ServerShow;
