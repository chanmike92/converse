
import React from 'react';
import { withRouter, Link, Redirect } from 'react-router-dom';

class ChannelCreate extends React.Component {

  constructor(props) {
    super(props);
    this.state = {name: ''};
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const channel = Object.assign({}, this.state);

    this.props.processForm(channel, this.props.serverId)
        .then(() => {this.props.closeModal();});
  }

  handleInput(input) {
    return (e) => {
      this.setState({
        [input]: e.currentTarget.value
      });
    };
  }

  goBack() {
    this.props.closeModal();
  }

  render() {
    return (
      <div className='channel-update-form-container'>
        <div className='display-form-message-container'>
          <label className='modal-title'>Create A Channel</label>
        </div>
        <form onSubmit={ this.handleSubmit }>
          <div className='input-container'>
            <label className='channel-label'>Name</label>
            <input className='channel-input-field' autoFocus type='text' maxLength="100" onChange={this.handleInput('name')} value={this.state.name}></input>
          </div>
          <div className="channel-submit-buttons">
            <button className='submit-button no' type='submit'>Create</button>
            <button className='submit-button yes' onClick={ this.goBack }>Cancel</button>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(ChannelCreate);
