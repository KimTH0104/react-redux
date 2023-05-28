import React, { Component, Fragment } from 'react';
import './styles.css';
import { Dialog, DialogBody, DialogFooter } from "../dialogs/Dialog";
import Swiper from 'react-id-swiper';
import * as PubSub from 'pubsub-js';
import { bindActionCreators } from 'redux';
import * as noticeAction from '../../../redux/notice';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
class NoticeBar extends Component {

  swiper = null;
  eventAttached = false;

  constructor(props) {
    super(props);

    this.state = {
      showDialog: false,
      noticeIndex: 0,
    }

  }

  componentDidMount() {
    this.getListAction();
    PubSub.subscribe('change_language', (msg, data) => {
      if (data.locale === 'ko') {
        if (this.eventAttached === false) {
          this.addEvents();
        }
      } else {
        if (this.eventAttached) {
          this.removeEvents();
        }
      }
    })
  }

  componentWillUnmount() {
    this.removeEvents();
  }
  getListAction = async () => {
    const { Actions } = this.props;
    try {
      await Actions.getList();
      if (this.getLocaleFromBrowser() === 'ko') {
        this.addEvents();
      }
    } catch (e) {
      console.log(e);
    }
  }

  componentWillReceiveProps(nextProps) {
  }

  getLocaleFromBrowser = () => {
    const returnValue = window.location.pathname.split('/')[1] || 'en'
    return returnValue
  }

  addEvents = () => {
    this.eventAttached = true;
    const items = document.querySelectorAll(".notice_swiper_items");
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      item.addEventListener('click', this.handleSwiperClick);
      item.addEventListener('mouseover', this.handleSwiperMouseOver)
      item.addEventListener('mouseout', this.handleSwiperMouseOut)
    }
  }

  removeEvents = () => {
    this.eventAttached = false;
    const items = document.querySelectorAll(".notice_swiper_items");
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      item.removeEventListener('click', this.handleSwiperClick);
      item.removeEventListener('mouseover', this.handleSwiperMouseOver)
      item.removeEventListener('mouseout', this.handleSwiperMouseOut)
    }
  }

  handleSwiperClick = (e) => {
    const index = e.target.getAttribute('value');
    this.props.history.push(`/ko/notice/detail/${parseInt(index)}`)

  }

  handleSwiperMouseOver = (e) => {
    this.swiper.autoplay.stop();
  }

  handleSwiperMouseOut = (e) => {
    this.swiper.autoplay.start();
  }

  // showNotice = (index: number) => {
  //   this.setState({ noticeIndex: index, showDialog: true });
  // }

  handleClose = () => {
    this.setState({ showDialog: false });
  }

  render() {

    const { showDialog, noticeIndex } = this.state;

    const Region = window.location.pathname.split('/')[1];
    let RegionName = '';
    const { noticeList, status } = this.props;

    switch (Region) {
      case 'mobile':
        RegionName = 'mobile'
        break;
      case 'ko':
        RegionName = 'ko'
        break;
      case 'cn':
        RegionName = 'cn'
        break;
      default:
        RegionName = 'en'
        break;
    }

    const swiperParams = {
      direction: 'vertical',
      slidesPerView: 1,
      loop: true,
      containerClass: 'swiper_custom_container',
      centeredSlides: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false
      },
      noSwiping: true,
    };

    return (
      <Fragment>
        {RegionName === "ko" && noticeList !== undefined
        ? <div className="inner_container noticebar">
            <div className="inner_container__content noticebar_content">
              <div className="notice_list_title eng">Notice</div>
              <Swiper {...swiperParams} shouldSwiperUpdate ref={node => { if (node) this.swiper = node.swiper }} >
                {
                  noticeList.map((item, index) => {
                    if( index < 3) {
                      return  (
                        <a className="notice_swiper_items" value={item.id}  href="javascript:;" style={{ height: '40px' }} key={`notice-${index}`}>
                          {`${item.subject !== '공백' ? '['+item.subject+']' : ''} ${item.title}`}
                        </a>
                        )
                      }
                  })
                }
              </Swiper>
            </div>
          </div>
        :null}
      </Fragment>
    );
  }
}

export default withRouter(connect(
  state => ({
    noticeList: state.notice.noticeList,
    status : state.notice.status
  }),
  dispatch => ({
    Actions: bindActionCreators(noticeAction, dispatch)
  })
)(NoticeBar));
