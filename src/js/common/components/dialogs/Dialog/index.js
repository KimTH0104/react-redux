import React, {Component} from 'react';
import './styles.css';

type DialogProps = {
  show: boolean;
  title: string;
  onClose: () => void;
}

const Dialog = (props: DialogProps) => {

  if (props.show) {
    if (window.innerWidth <= 540) {
      window.scrollTo(0, 0);
      document.querySelector('body').style.overflow = 'hidden';
    }
  } else {
    document.querySelector('body').style.overflow = 'auto';
  }

  return (
    <div className={`dialog_wrapper ${props.show? 'show' : 'hide'}`}>
      <div className="dialog">
        <div className="dialog_header">
          <div className="btn_close" onClick={props.onClose}>
            <img className="sm-hide" src={require('../../../../../assets/images/btn_close.png')} />
            <img className="lg-hide" src={require('../../../../../assets/images/btn_close_m.png')} />
          </div>
          {props.title}
        </div>
        {props.children}
        </div>
    </div>
  )
}
const DialogBody = (props?: any) => <div className="dialog_body">{props.children}</div>;
const DialogFooter = (props?: any) => <div className="dialog_footer">{props.children}</div>;

export {Dialog, DialogBody, DialogFooter};
