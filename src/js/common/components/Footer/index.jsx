import React, { Component } from 'react';

import './styles.css';
import { Link } from 'react-router-dom';
import * as PubSub from 'pubsub-js';
import classnames from 'classnames';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';

class Footer extends Component {


  componentDidMount () {
    if(this.props.location.pathname.indexOf('ko') === -1){
      const wrapper = document.getElementById('footer_main')
      wrapper.classList.add('eng')
    }
  }

  render() {
    let pathname = window.location.pathname;
    let isRegion = '';
    switch (pathname.split('/')[1]) {
      case '':
        isRegion = '/';
        break;
      case 'ko':
      case 'cn':
        isRegion = `/${pathname.split('/')[1]}/`;
        break;
      default :
        isRegion = '/';
        break;
    }
    return (
      <div className="inner_container footer" id='footer_main'>
        ...
      </div>
    )
  }
}

export default Footer;
