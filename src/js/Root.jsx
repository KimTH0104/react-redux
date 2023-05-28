import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import ko from 'react-intl/locale-data/ko';
import cn from 'react-intl/locale-data/zh';
import language from './common/languages';

import * as PubSub from "pubsub-js";
import Amplify, { Storage } from "aws-amplify";
import config from './aws-export';
import 'semantic-ui-css/semantic.min.css';

Amplify.configure(config)

addLocaleData([...ko, ...en, ...cn]);

// let usersLocale = window.location.pathname.split('/')[1] || 'ko';

export default class Root extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentLocale: 'en',
    };
  }

  get content() {
    return (
      <Router>
        {this.props.routes}
      </Router>
    );
  }

  componentWillMount() {
    const usersLocale = window.location.pathname.split('/')[1];
    let locale = '';
    switch(usersLocale){
      case 'ko':
        locale = 'ko';
        break;
      case 'cn' :
        locale = 'cn';
        break;
      default :
        locale = "en";
        break;
    }
    this.setState({ currentLocale: locale });
  }

  componentDidMount() {
    PubSub.subscribe('change_language', (msg, data) => {
      this.setState({ currentLocale: data.locale })
    });
  }

  render() {

    const { currentLocale } = this.state;

    const locale = currentLocale !== 'cn' ? currentLocale : 'zh';

    return (
      <Provider history={this.props.history} store={this.props.store}>
        <IntlProvider
          locale={locale}
          messages={language[currentLocale]}
        >
          {this.content}
        </IntlProvider>
      </Provider>
    );
  }
}

Root.propTypes = {
  routes: PropTypes.element.isRequired,
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
