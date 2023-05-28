import React from 'react';
import {
  Route,
  Switch,
  withRouter,
  Redirect,
  Router,
} from 'react-router-dom';

import { Helmet } from 'react-helmet';

import { Header } from './common/components/Header';
import Footer from './common/components/Footer';
import MainView from './views/Main';

import '../assets/fonts/fonts.css';
import '../style/index.css';
import NoticeBar from "./common/components/NoticeBar";
const HeaderWithRouter = withRouter(props => <Header {...props} />);
const FooterWithRouter = withRouter(props => <Footer {...props} />);
const region = window.navigator.language.split('-')[0];
const favicon = require('../assets/images/favicon.png');


const KO = props => {
  return (
    <div>
      {/* <TransitionGroup>
        <CSSTransition key={location.pathname.split('/')[1]} timeout={500}
          classNames="pageSlider" className="left" mountOnEnter={false} unmountOnExit={true}> */}
          <Switch>
            <Route exact path='/ko/' component={MainView} />
          </Switch>
        {/* </CSSTransition>
      </TransitionGroup> */}
    </div>
  );
}

const EN = props => {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={MainView} />
      </Switch>
    </div>
  );
}

const CN = props => {
  return (
    <div>
      <Switch>
        <Route exact path='/cn/' component={MainView} />
      </Switch>
    </div>
  );
}


module.exports = (
  <div className="container">
    <Helmet>
      <link rel="shortcut icon" href={favicon} type="image/x-icon" />
      <link rel="icon" href={favicon} type="image/x-icon" />
    </Helmet>
    <HeaderWithRouter />
    <div className="container__content">
      <Switch>
        <Route path="/cn" component={CN} />
        <Route path="/ko" component={KO} />
        <Route path="/" component={EN} />
      </Switch>
    </div>
    <NoticeBar />
    <FooterWithRouter />
  </div>
);
