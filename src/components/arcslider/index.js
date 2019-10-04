import { ArcSlider, Img, Txt } from 'rendition';

import React from 'react';
import styled from 'styled-components';

const Brightness = styled.h1`
  color: white;

  span {
    font-size: 50%;
  }
`;

const ImgContainer = styled.div`
  text-align: center;

  img {
    width: 24px;
    display: inline-block;
  }
`;

export const Arcslider = props => {
  const { active, brightness, name } = props.device;
  const brightnessLevel = active ? brightness : 0;
  return (
    <div className='c-arc-slider__container'>
      <div className='c-arc-slider__header'>
        <span>{name}</span>
        <span className='close' onClick={props.close}>
          X
        </span>
      </div>
      <ArcSlider
        mx='auto'
        value={(brightnessLevel / 100).toFixed(2)}
        onValueChange={props.handleChange}
        className='c-arc-slider__root'
      >
        <ImgContainer>
          <Img src='assets/icons/icon-bright-light.png' alt='brightness' />
        </ImgContainer>
        <Brightness>
          {Math.round(brightnessLevel)}
          <span>%</span>
        </Brightness>
        <Txt color='white'>Brightness</Txt>
      </ArcSlider>
    </div>
  );
};
