import { Fragment } from 'react';
import ReactDOM from 'react-dom';

import classes from './Modal.module.css';

// 팝업창이 떴을 때, 뒷부분을 어둡게 가리는 레이어
const Backdrop = (props) => {
  return <div className={classes.backdrop} />
}

// 장바구니를 보여주는 팝업창
const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      {/* 장바구니에 담긴 아이템 목록을 보여줄 것임 */}
      <div className={classes.content}>{props.children}</div>
    </div>
  )
}

const portalElement = document.getElementById('overlays')

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  )
}

export default Modal