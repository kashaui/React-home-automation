import { Flex } from 'rendition';
import React from 'react';
import styled from 'styled-components';

const ImgContainer = styled.span`
  vertical-align: text-top;

  img {
    width: 16px;
    display: inline-block;
  }
`;

const BreadcrumbList = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  padding: 0;

  li {
    padding: 8px;
    margin: 0 5px;

    &.icon {
      background: #ebeef3;
      border-radius: 5px;
    }

    &.spliter {
      padding: 0;
      margin: 0;
    }

    a {
      text-decoration: none;
      padding-left: 5px;
      color: #29506e;
    }
  }
`;

/**
 * Breadcrumns menu
 */
const menu = {
  items: [
    { id: 1, to: '/', label: '', icon: 'icon-home', classname: 'icon' },
    {
      id: 2,
      to: '/#back',
      label: 'Back',
      icon: 'icon-left-arrow',
      classname: 'icon',
    },
    {
      id: 3,
      to: '/#holiday-home',
      label: 'Holiday home',
      icon: 'icon-light-bulb',
      classname: 'link mr-0',
    },
    {
      id: 4,
      to: '/',
      label: '',
      icon: 'icon-right-arrow',
      classname: 'spliter',
    },
    {
      id: 5,
      to: '/',
      label: 'Lighiting',
      icon: 'icon-light-bulb',
      classname: 'link ml-0',
    },
  ],
};

const Icon = props => (
  <ImgContainer>
    <img src={`assets/icons/${props.name}.svg`} alt='icon'></img>
  </ImgContainer>
);

export const Breadcrumbs = () => {
  return (
    <Flex flex='1'>
      <BreadcrumbList>
        {menu.items.map(({ id, to, label, icon, classname }) => {
          return (
            <li key={id} className={classname}>
              <a href={to}>
                {' '}
                {icon && <Icon name={icon} />} {label}
              </a>
            </li>
          );
        })}
      </BreadcrumbList>
    </Flex>
  );
};
