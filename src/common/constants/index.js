/**
 * Constants
 */
export const API = 'http://localhost:3000/api/v1/device';

export const COLORS = {
  white: '#fff',
  dark: '#000',
};

//breakpoints & devices
const BREAKPOINTS = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '425px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px',
};

export const MEDIA = {
  mobileS: `(min-width: ${BREAKPOINTS.mobileS})`,
  mobileM: `(min-width: ${BREAKPOINTS.mobileM})`,
  mobileL: `(min-width: ${BREAKPOINTS.mobileL})`,
  tabletP: `(max-width: ${BREAKPOINTS.tabletP})`,
  tablet: `(min-width: ${BREAKPOINTS.tablet})`,
  laptop: `(min-width: ${BREAKPOINTS.laptop})`,
  laptopL: `(min-width: ${BREAKPOINTS.laptopL})`,
  desktop: `(min-width: ${BREAKPOINTS.desktop})`,
  desktopL: `(min-width: ${BREAKPOINTS.desktop})`,
};
