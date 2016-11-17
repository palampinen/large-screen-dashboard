import React, { Component } from 'react';

import './fullscreen-button.css';


class FullScreenButton extends Component {


  openFullScreen() {

    const elem = document.getElementById('dashboard');

    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
  }

  render() {
    return (
      <button onClick={this.openFullScreen} className="button--round ion-android-expand" />
    );
  }
};

export default FullScreenButton;