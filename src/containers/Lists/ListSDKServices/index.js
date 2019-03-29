/**
 * Listsdkservices Container
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'
import { Titles } from './utils'
import { withRouter } from 'react-router-dom'

/* Component */
import List from 'components/List'
import Button from 'components/Button'
import { DeleteIcon } from 'components/Icons'




class ListSDKServices extends Component {

  navigate = (path) => {
    const { history } = this.props
    history.push(path)
  }

  render () {
    const { services } = this.props
    const { deleteService, cloneService } = this.props
    return (
      <List>
      <List.Header>
        {Titles && Titles.map(title =>
        <List.Column size={title.size} key={title.id}>
          {title.name}
        </List.Column>)}
        <List.Column marginLeft />
      </List.Header>
      {services && services.map((service, i) =>
      <List.Row key={i}>
        {Titles && Titles.map(({
          size,
          propItem,
          render
        }) => {
          return [render && service &&
          <List.Column key={i} size={size}>
            {render(service[propItem])}
          </List.Column>, !render && service &&
          <List.Column key={i} size={size}>
            {service[propItem]}
          </List.Column>];
        })}
        <ColumnBottons>
          <ContainerButtons>
            <Button
              type={'secondary'}
              //svg={<DeleteIcon />}
              onClick={() => cloneService(service)} text={'Clone'}
            />
            <Button
              type={'secondary'}
              svg={<DeleteIcon />}
              onClick={() => deleteService(service)} text={'Delete'}
            />
            <Button
              type={'primary'}
              icon={'view'}
              onClick={() => this.navigate(`/sdk/composer/${service.id}`)}
              text={'Edit'}
            />
          </ContainerButtons>
        </ColumnBottons>
      </List.Row>)}
      </List>
    )
  }
}

export default withRouter(Logic(ListSDKServices))

const ContainerButtons = styled.div`
  display: flex;
  float: right;
`

const ColumnBottons = styled.div`
  width: 100%;
`
