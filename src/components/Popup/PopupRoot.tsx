import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import close from '../../shared/assets/icons/burger-close.svg';
import './Popup.scss';

export interface IPopupProps {
  closePopup: () => void;
  children?: JSX.Element;
}

export const getRootPopup = () => {
  let PopupRoot = document.getElementById('popup-root');

  if (PopupRoot === null) {
    PopupRoot = document.createElement('div');
    PopupRoot.setAttribute('id', 'popup-root');
    document.body.appendChild(PopupRoot);
  }

  return PopupRoot;
};

const Popup = ({ children, closePopup }: IPopupProps) => {
  useEffect(() => {
    const scrollTop = window.scrollY;
    console.log(scrollTop);
    const bodyNode = document.querySelector('body');
    if (bodyNode) {
      bodyNode.style.position = 'fixed';
      bodyNode.style.top = -scrollTop + 'px';
      bodyNode.style.left = '0px';
      bodyNode.style.right = '0px';
    }
    return () => {
      if (bodyNode) {
        bodyNode.style.removeProperty('top');
        bodyNode.style.removeProperty('left');
        bodyNode.style.removeProperty('right');
        bodyNode.style.removeProperty('position');
        window.scrollTo(0, scrollTop);
      }
    };
  }, []);

  return createPortal(
    <div className="popupContainer">
      <div className="popup-bg" onClick={closePopup}></div>
      <div className="popupBody">
        <img src={close} alt="" onClick={closePopup} className="popupClose" />
        <div className="popup-content">{children}</div>
      </div>
    </div>,
    getRootPopup()
  );
};
export default Popup;
