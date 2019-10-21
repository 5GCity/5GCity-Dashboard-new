/**
 * Selectautocomplete Container
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'
import Select from 'react-select'


const colourStyles = {
  control: (styles, state) => {
    return {
      ...styles,
      backgroundColor: 'transparent',
      outline: '0px',
      border: state.isFocused ? 0 : 0,
      boxShadow: state.isFocused ? 0 : 0,
      '&:hover': {
        border: state.isFocused ? 0 : 0
      },
    }
  },
  option: (styles, { isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      fontSize: '14px',
      color: '#89979F',
      backgroundColor:  isSelected || isFocused ? '#55666e' : '#37474F',
      margin: 0,
      border: 'none',
    }
  },
  menu: (styles, {isSelected, isFocused}) =>({
    ...styles,
    fontSize: '14px',
    color: '#89979F',
    backgroundColor: isSelected || isFocused ? '#55666e' : '#37474F',
  }),
  noOptionsMessage: (styles) =>({
    ...styles,
    fontSize: '14px',
    color: '#89979F',
    backgroundColor: '#37474F',
  }),
  input: styles => ({
    ...styles,
    fontSize: '14px',
    color: '#fff',
  }),
  placeholder: styles => ({ ...styles }),
  singleValue: styles => ({ ...styles,
    fontSize: '14px',
    color: '#fff'
  }),
  multiValue: (base, state) => {
    return state.data.isFixed ? { ...base, backgroundColor: 'gray' } : base;
  },
  multiValueLabel: (base, state) => {
    return state.data.isFixed
      ? { ...base, fontWeight: 'bold', color: 'white', paddingRight: 6 }
      : base;
  },
  multiValueRemove: (base, state) => {
    return state.data.isFixed ? { ...base, display: 'none' } : base;
  },
}

const orderOptions = values => values.filter(v => v.isFixed).concat(values.filter(v => !v.isFixed))

const findIndexOptionsFixed = values => values.findIndex(v => v.isFixed)

const orderOptionsDefault = (options, values) => {
  const array = []
  values.forEach(value => {
    if(value !== 'admin')
      array.push(options.find(option => option.value === value))
  })
  return array
}

class SelectAutoComplete extends Component {

  state = {
    selectOptions: null,
  };

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(value, { action, removedValue }) {
    const { options, onChange }= this.props
    switch (action) {
      case 'remove-value':
          break;
      case 'pop-value':
        if (removedValue.isFixed) {
          return;
        }
        break;
      case 'clear':
        value = options.filter(v => v.isFixed);
        break;
        default:
        break;
    }
    value = orderOptions(value)
    this.setState({ selectOptions: value })
    onChange(value)
  }

  componentDidMount () {
    const { options, valueSelect }= this.props
    const fixedOption = options && findIndexOptionsFixed(options)
    const values = valueSelect && orderOptionsDefault(options, valueSelect)
    this.setState({selectOptions: orderOptions([options[fixedOption], ...values])})
  }

  render () {
    const { options }= this.props
    const { selectOptions }= this.state
    return (
    <Select
      isMulti
      options={options}
      styles={colourStyles}
      isClearable={selectOptions && selectOptions.some(v => !v.isFixed)}
      onChange={this.onChange}
      value={selectOptions}
    />
    )
  }
}

export default Logic(SelectAutoComplete)

const Wrapper = styled.div`

`
