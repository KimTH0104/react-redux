import React, { Component, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import './styles.css';
import SessionContainer from '../../utility/session';
import * as PubSub from 'pubsub-js';


import Swiper from 'react-id-swiper';
import { FormattedHTMLMessage, injectIntl, FormattedMessage } from 'react-intl';
import Cookies from 'universal-cookie';

import { Modal, ModalBody, ModalFooter, ModalHeader, TabContent, TabPane } from 'reactstrap';
import { detect } from 'detect-browser'

const browser = detect();

import Amplify, { Storage } from 'aws-amplify';
import { S3Image } from 'aws-amplify-react';
import { bindActionCreators } from 'redux';
import * as newsAction from '../../redux/news'
import { connect } from 'react-redux';

import classnames from 'classnames'


const cookies = new Cookies();

class MainView extends Component {


  // timer1 = null;
  // timer2 = null;
  // timer3 = null;
  swiper = null;


  constructor(props) {
    super(props);

    this.state = {
      showPopUp: false,
      showIntro: false,
      showContent: false,
      goto: 0,
      swiperParams: {
        slidesPerView: window.innerWidth > 540 ? 3 : 1,
        spaceBetween: window.innerWidth > 540 ? 45 : 0,
        slidesPerGroup: 1,
        loop: true,
        loopFillGroupWithBlank: true,
        pagination: window.innerWidth < 540 ? {
          el: '.swiper-pagination',
          clickable: true,
        } : {},
      },
      selectWalletIdx: 0,
      selectedWalletIdx: 0,
      selectSloganIdx: 0,
    }
  }

  componentWillMount() {

  }

  handleStr = (idx) => {
    const { intl } = this.props;
    return intl.formatMessage({ id: idx })
  }

  goNext = () => {
    if (this.swiper) this.swiper.slideNext()
  }

  goPrev = () => {
    if (this.swiper) this.swiper.slidePrev()
  }

  scrollToAnchor = ({ hash }) => {
    if (hash) {
      let margin = 0;
      if (document.querySelector('.globalHeader')
        .classList
        .contains('fixed')) {
        margin = 0;
      }
      const top = document.querySelector(`${hash}`)
        .getBoundingClientRect().top - margin;
      window.scrollTo(0, top);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.scrollToAnchor(nextProps.location);
  }

  popUpNoShow = (e) => {
    this.setState({
      showPopUp: false,
    })
  }

  popUpRemove = (e) => {
    this.setState({
      showPopUp: false,
    })
    cookies.set('popup', false, { maxAge: 24 * 3600 })
  }

  componentDidMount() {
    this.getListAction();
    window.addEventListener('resize', this.getParams);
    window.addEventListener('load', () => {
      setTimeout(function () {
        window.scrollTo(0, 0);
      }, 100);
    })

    if (cookies.get('popup') === 'false') {
      this.setState({
        showPopUp: false,
      })
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.getParams);
    window.removeEventListener('load', () => {
      setTimeout(function () {
        window.scrollTo(0, 0);
      }, 100);
    })
  }

  getListAction = async () => {
    const { Actions } = this.props;
    try {
      const result = await Actions.getList();
    } catch (e) {
      console.log(e);
    }
  }

  getParams = () => {
    let params = {}

    if (window.innerWidth > 540) {
      params = {
        slidesPerView: 3,
        spaceBetween: 45,
        slidesPerGroup: 1,
        loop: true,
        loopFillGroupWithBlank: true,
      };
    } else {
      params = {
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        slidesPerView: 1,
        slidesPerGroup: 1,
        loop: true,
        loopFillGroupWithBlank: true,
      };
    }
    this.setState({
      swiperParams: params,
    })

  }

  getImageLoop = () => {
    const { selectWalletIdx } = this.state
    const tempArr = [];
    for (let i = 0; i < 4; i++) {
      tempArr.push(
        // <div className={classnames({
        // "sm-hide wallet_img " : true,
        //   'active' : selectWalletIdx === i,
        // })}>
        <img className={classnames({
          'wallet_img ': true,
          'active': selectWalletIdx === i,
        })}
          src={require('../../../assets/images/img-wallet-0' + (i + 1) + '.png')} />,
        // </div>
      )
    }

    return tempArr

  }

  onChangeImg = (idx) => {
    this.setState({
      selectedWalletIdx: this.state.selectWalletIdx,
      selectWalletIdx: idx,
    })
  }

  onScrollToMain = () => {

    const reward = document.getElementById('new_dapp')

    reward.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

  }

  onChangeMainView = (idx) => {
    // if( idx >= 0 && idx < 3 ){
    //   this.setState({
    //     selectSloganIdx: idx,
    //   })
    //   const wrapper = document.getElementById('tab');

    //   switch (idx) {
    //     case 0:
    //       wrapper.classList.add('move-to-first')
    //       wrapper.classList.remove('move-to-second')
    //       wrapper.classList.remove('move-to-third')
    //       break;
    //     case 1:
    //       wrapper.classList.remove('move-to-first')
    //       wrapper.classList.add('move-to-second')
    //       wrapper.classList.remove('move-to-third')
    //       break;
    //     case 2:
    //       wrapper.classList.remove('move-to-first')
    //       wrapper.classList.remove('move-to-second')
    //       wrapper.classList.add('move-to-third')
    //       break;
    //   }
    // }
  }



  render() {

    // const {showIntro, showContent} = this.state;
    // let introMode = '';
    // if (showIntro) introMode = 'show';
    // if (showContent) introMode = 'fixed';
    let contents = '';
    let popupTop = '';
    const Region = this.props.location.pathname.split('/')[1];
    const { newsList } = this.props;
    const { selectSloganIdx } = this.state;


    const walletOption = [
      this.handleStr('main.wallet_detail_title_0'),
      this.handleStr('main.wallet_detail_title_1'),
      this.handleStr('main.wallet_detail_title_2'),
      this.handleStr('main.wallet_detail_title_3'),
    ]

    return (
      <Fragment>
        ....
      </Fragment>
    )
  }
}

export default connect(
  state => ({
    newsList: state.news.newsList,
  }),
  dispatch => ({
    Actions: bindActionCreators(newsAction, dispatch),
  }),
)(injectIntl(withRouter(MainView)));
