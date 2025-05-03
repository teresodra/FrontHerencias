import React from 'react';
import './infoTooltip.css';
import { ICON_NAMES } from '../../shared/consts';

const InfoTooltip = ({
  icon = ICON_NAMES.INFO,
  text = 'change this dummy text by setting the text prop to the component',
  size = 24,
  relative = false,
  top = undefined
}) => {
  if (!icon || !text) return null;

  return (
    <div
      className={`info-tooltip ${relative ? '--relative' : ''}`}
      style={{
        right: `-${size + 6}px`,
        top: relative ? (top ? top + '%' : '40%') : ''
      }}
    >
      <span
        className="material-symbols-outlined tooltip-icon"
        translate="no"
        aria-hidden="true"
        style={{ fontSize: size + 'px' }}
      >
        {icon}
      </span>
      <span className="tooltip-text">{text}</span>
    </div>
  );
};

export default InfoTooltip;
