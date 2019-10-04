import Enzyme, { mount, shallow } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
import { Nav } from 'components/nav';
import React from 'react';
import dayjs from 'dayjs';

Enzyme.configure({ adapter: new Adapter() });
describe('Navigaton component', () => {
  it('Check Navigaton render', () => {
    const component = shallow(<Nav />);
    expect(component).toMatchSnapshot();
  });

  test('Check the children length', () => {
    const wrapper = mount(<Nav />);
    expect(wrapper.find('div').length).toEqual(4);
  });

  test('Check User name', () => {
    const wrapper = mount(<Nav />);
    expect(
      wrapper
        .find('div')
        .at(3)
        .text(),
    ).toEqual('Jane Doe');
  });

  test('Check application display time and Format should be HH:mm A', () => {
    const wrapper = mount(<Nav />);
    const now = dayjs();

    const time = now.format('HH:mm A');

    expect(
      wrapper
        .find('div')
        .at(2)
        .text(),
    ).toEqual(time);
  });

  test('Date should be S MMMM YYYY format', () => {
    const wrapper = mount(<Nav />);
    const now = dayjs();

    const day = now.format('dddd, D MMMM, YYYY');

    expect(
      wrapper
        .find('div')
        .at(1)
        .text(),
    ).toEqual(day);
  });
});
