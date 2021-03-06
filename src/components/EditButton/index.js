import React, { Component } from 'react';

import './edit-button.css';

class EditButton extends Component {

  constructor(props) {
    super(props);

    this.state = {
      expandShare: false
    }
  }


  render() {

    const { item } = this.props;

    if (this.state.expandShare) {
      setTimeout(() => {
        document.getElementById('share').select();
      });
    }
    return (
      <div
        className={`share-button ${this.state.expandShare ? 'open' : ''}`}
      >
        {!this.state.expandShare &&
          <div
            className="ion-android-create share-toggle"
            onClick={() => this.setState({ expandShare: !this.state.expandShare })}
          />
        }

        {this.state.expandShare &&
          <div className="share-content">
            <span className="share-input">
              <input
                value={item.get('url')}
                onClick={() => document.getElementById('share').select()}
                id="share"
                autoFocus
              />
            </span>
            <div className="buttons">
              <a
                className="ion-android-download download"
                download
                target="_blank"
                href={item.get('url')}
              />
              <div
                className="ion-android-arrow-forward share-toggle share-close"
                onClick={() => this.setState({ expandShare: false})}
            />
            </div>
          </div>
        }

      </div>
    );
  }
};

export default EditButton;