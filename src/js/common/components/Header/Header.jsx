import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';

import './Header.css';
import * as PubSub from 'pubsub-js';

import classnames from 'classnames';
import { FormattedMessage } from 'react-intl';
import LoadingBar from 'react-top-loading-bar'
import 'react-loading-bar/dist/index.css'


class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false,
      headerFixed: false,
      searchKeyword: '',
      showLanguage: false,
      section: '',
      viewLoadBar: 0,
    }
  }

  componentDidMount() {
    const { pathname } = this.props.location;

    window.addEventListener('resize', this.handleWindowResize);
    window.addEventListener('scroll', this.handleScroll);
    this.props.history.listen(() => {
      this.setState({ showMenu: false });
      window.scrollTo(0, 0);
    });

    this.setState({
      viewLoadBar: 100,
    })


    // window.document.body.addEventListener('click', this.handleBocyClick);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
    window.removeEventListener('scroll', this.handleScroll);
    // window.document.body.removeEventListener('click', this.handleBocyClick);
  }

  componentDidUpdate(previousProps, previousState) {

    if (previousProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        viewLoadBar: 0,
      })

      this.setState({
        viewLoadBar: 100,
      })
    }

  }

  handleBodyClick = (e) => {
    this.setState({ showMenu: false });
  }

  handleScroll = (e) => {
    const cy = 400;
    if (window.scrollY > 120 ) {
      if (this.state.headerFixed === false ) {
        this.setState({
          headerFixed: true,
          showLanguage: false,
        });
      }
    } else if (this.state.headerFixed) {
      this.setState({ headerFixed: false });
    }
  }

  handleWindowResize = (e) => {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width > 540 && this.state.showMenu === true) {
      this.setState({ showMenu: false });
    }
  }

  handleMenu = () => {
    this.setState({ showMenu: !this.state.showMenu });
  }

  handleLanguage = () => {
    this.setState({
      showLanguage: !this.state.showLanguage,
    })
  }

  render() {
    const { pathname, hash } = this.props.location;
    const { section, viewLoadBar } = this.state;
    let isRegion = '';
    let Language = '';
    let Contact = '';
    let isApp = false;

    switch (pathname.split('/')[1]) {
      case '':
        isRegion = `/`;
        Language = 'ENG';
        break;
      case 'ko':
        isRegion = `/${pathname.split('/')[1]}/`;
        Language = 'KOR';
        break;
      case 'cn':
        isRegion = `/${pathname.split('/')[1]}/`;
        Language = 'CHN';
        break;
      case 'mobile':
        isApp = true;
        break;
      default:
        isRegion = '/';
        Language = 'ENG';
        break;
    }

    if (window.innerWidth > 540) {
      Contact = 'web';
    } else {
      Contact = 'mobile';
    }

    return (
      <React.Fragment>
        ...
      </React.Fragment>
    );
  }
}

export default withRouter(Header);
