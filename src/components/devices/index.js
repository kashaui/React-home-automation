import { API, COLORS, MEDIA } from 'common/constants';
import { Box, Checkbox, Flex, Input, Modal, Table, Txt } from 'rendition';
import React, { Component } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import { Arcslider } from 'components/arcslider';

const ControlContainer = styled(Box)`
  border-top-left-radius: 10px;
`;

const DevicesWrapper = styled(Flex)`
  @media ${MEDIA.tabletP} {
    flex-direction: column;
  }
`;

const DeviceStyle = createGlobalStyle`

  .c-arc-slider__header {
    display: none;
  }

  @media ${MEDIA.tabletP} {
    .c-devices {
      & > div {
        padding: 0;
      }
    }
    .c-arc-slider {
      position: fixed;
      width: 100%;
      height: 100%;
      top: 0;
      margin: 0;
      padding: 20px;
      border-radius: 0;

      &__container {
        padding: 20px;
      }

      &__header {
        color: ${COLORS.white};
        position: relative;
        display: block;

        .close {
          position: absolute;
          right: 10px;
          font-size: 1.5em;
        }
      }
    }
    
  }
`;

let bindOnOffDeviceEvent, bindEditDeviceName, bindRowSelected;

class Devices extends Component {
  constructor(props) {
    super(props);

    this.state = {
      devices: '',
      selectedDevice: null,
      editDevice: false,
      selectedRows: [],
    };

    bindOnOffDeviceEvent = this.handleOnOffDevice;
    bindEditDeviceName = this.handleEditDeviceModal;
    bindRowSelected = this.handleRowSelected;

    //Table column
    this.columns = [
      {
        field: 'selected',
        label: <Checkbox disabled />,
        sortable: false,
        render(value, row) {
          return (
            <Flex>
              <Checkbox
                checked={value || false}
                onChange={event => bindRowSelected(row, event.target.checked)}
                mr={2}
              />
            </Flex>
          );
        },
      },
      {
        field: 'name',
        label: 'Room',
        sortable: true,
        render(value, row) {
          return (
            <Txt
              onDoubleClick={event => bindEditDeviceName(row)}
              onTouchStart={event => bindEditDeviceName(row)}
              className='user-select-none'
            >
              {value}
            </Txt>
          );
        },
      },
      {
        field: 'active',
        label: 'State',
        sortable: true,
        render(value, row) {
          return (
            <Flex>
              <Checkbox
                toggle
                checked={value}
                onChange={event => bindOnOffDeviceEvent(row.id, event.target)}
                mr={2}
              />
              <Txt ml={2}>{value ? 'On' : 'Off'}</Txt>
            </Flex>
          );
        },
      },
      {
        field: 'brightness',
        label: 'Brightness',
        sortable: true,
        render(value) {
          return `${Math.round(value)} %`;
        },
      },
    ];
  }

  componentDidMount() {
    this.fetchDevices();
  }

  /**
   * Fetch the list of devices form API
   * first room with its arc slider component checked by default
   */
  fetchDevices = () => {
    fetch(API)
      .then(resp => resp.json())
      .then(response => {
        this.setState({
          devices: response.data,
        });
      });
  };

  /**
   * Save the device data into API
   */
  saveDevices = (id, payload) => {
    fetch(`${API}/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        data: payload,
      }),
    }).then(response => response.json());
  };

  /**
   * Get the selected device index using device id
   * @param {Number}
   */
  getSelectedDevice = id => {
    return this.state.devices.findIndex(device => device.id === id);
  };

  /**
   * Update the state device object by object property name
   * @param {Number, Sting, Any, Object}
   */
  updateStateByIndex = (i, attr, val, _state = this.state.devices) => {
    let items = [..._state];
    let item = { ...items[i] };
    item[attr] = val;
    items[i] = item;
    return items;
  };

  /**
   * Adjust brightness on selected bulb
   * @param {Number}
   */
  handleBrightnessLevel = value => {
    //if selected device is off state then don't allow to update the brightness level
    if (!this.state.selectedDevice.active) {
      return;
    }

    const _brightness = value * 100,
      _index = this.getSelectedDevice(this.state.selectedDevice.id);
    let _newState = this.updateStateByIndex(_index, 'brightness', _brightness);

    //brightness level is 0 than trun off the device
    if (_brightness === 0) {
      _newState = this.updateStateByIndex(_index, 'active', false, _newState);
    } else {
      _newState = this.updateStateByIndex(_index, 'active', true, _newState);
    }

    this.setState({
      devices: _newState,
      selectedDevice: {
        ...this.state.selectedDevice,
        brightness: _brightness,
      },
    });
  };

  /**
   * Reset the all selected rows
   */
  resetSelectedRows = () => {
    let items = [...this.state.devices];
    items.map(val => {
      val.selected = false;
      return val;
    });
    return items;
  };

  /**
   * Update the selected state
   * Multi selection will select always first item only
   * @param {Object, Boolen}
   */
  handleRowSelected = (row, value) => {
    if (value) {
      const _devicesState = this.resetSelectedRows(),
        index = this.getSelectedDevice(row.id),
        _devices = this.updateStateByIndex(
          index,
          'selected',
          true,
          _devicesState,
        );
      this.setState({
        devices: _devices,
        selectedDevice: row,
        selectedRows: [row.id],
      });
    } else {
      this.cancelModalAction();
    }
  };

  /**
   * On/Off the lightbulb
   * @param {Number, Boolen}
   */
  handleOnOffDevice = (id, status) => {
    const index = this.getSelectedDevice(id),
      _devices = this.updateStateByIndex(index, 'active', status.checked),
      _selectedDevice = this.state.selectedDevice
        ? { ...this.state.selectedDevice, active: status.checked }
        : null;

    this.setState(
      {
        devices: _devices,
        selectedDevice: _selectedDevice,
      },
      () =>
        _selectedDevice &&
        this.saveDevices(
          this.state.selectedDevice.id,
          this.state.selectedDevice,
        ),
    );
  };

  /**
   * Show the device name edit modal
   * @package {Object}
   */
  handleEditDeviceModal = row => {
    this.setState({
      editDevice: true,
      selectedDevice: row,
      selectedRows: [row.id],
    });
  };

  /**
   * Cancel/Hide device edit name modal
   */
  cancelModalAction = () => {
    this.resetSelectedRows();
    this.setState({
      editDevice: false,
      selectedDevice: null,
      selectedRows: [],
    });
  };

  /**
   * Edit the selected device name
   * @package {Event}
   */
  handleEditDeviceName = e => {
    const _selectedDevice = {
      ...this.state.selectedDevice,
      name: e.target.value,
    };

    this.setState({
      selectedDevice: _selectedDevice,
    });
  };

  /**
   * Save edited deveice data and update the API
   * @package {Event}
   */
  saveEditDeviceName = e => {
    const index = this.getSelectedDevice(this.state.selectedDevice.id),
      _devices = this.updateStateByIndex(
        index,
        'name',
        this.state.selectedDevice.name,
      ),
      copyselectedDevice = Object.assign({}, this.state.selectedDevice);

    this.setState(
      {
        devices: _devices,
        selectedDevice: null,
        selectedRows: [],
        editDevice: false,
      },
      () => this.saveDevices(copyselectedDevice.id, copyselectedDevice),
    );
  };

  render() {
    const { devices, selectedDevice, editDevice, selectedRows } = this.state;
    return (
      <>
        {devices && devices.length && (
          <DevicesWrapper flex='1' mt={4} className='c-devices'>
            <Box flex='3' pl={3}>
              <Table
                flex='1'
                columns={this.columns}
                data={devices}
                rowKey='id'
                highlightedRows={selectedRows}
                className='device-table'
              />
            </Box>
            {selectedDevice && (
              <ControlContainer
                flex='2'
                ml={3}
                bg='secondary.main'
                className='c-arc-slider'
              >
                <Arcslider
                  handleChange={this.handleBrightnessLevel}
                  device={selectedDevice}
                  close={this.cancelModalAction}
                />
              </ControlContainer>
            )}
          </DevicesWrapper>
        )}

        {editDevice && (
          <Modal
            title='Room Name'
            cancel={() => {
              this.cancelModalAction();
            }}
            done={x => {
              this.saveEditDeviceName(x);
            }}
          >
            <div>
              <Input
                m={2}
                emphasized
                placeholder='Enter room name'
                value={selectedDevice.name}
                onChange={this.handleEditDeviceName}
              />
            </div>
          </Modal>
        )}
        <DeviceStyle />
      </>
    );
  }
}

export default Devices;
