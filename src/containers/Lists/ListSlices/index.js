/**
 * Listslices Container
 * Please write a description
 *
 * @author Your Name <gpatriarca@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { Titles, TitlesUser } from './utils'

/* Containers */
import ModalSliceList from 'containers/Modals/ModalSliceList'
import ModalConfigurationSliceList from 'containers/Modals/ModalConfigurationSliceList'
import ModalErrorSlice from 'containers/Modals/ModalErrorSlice'

/* Components */
import List from 'components/List'
import Button from 'components/Button'
import { DeleteIcon, EyeIcon, SettingIcon, CheckIcon } from 'components/Icons'
import NoData from 'components/NoData'
import ErroPage from 'components/ErroPage'

const ListAllSlices = (props) => (
  <List>
    <List.Header>
      {props.title.map(title =>
        <List.Column size={title.size} key={title.id}>
          {title.name}
        </List.Column>)}
      <List.Column marginLeft />
    </List.Header>
    {props.slices && props.slices.map((slice, i) =>
      <List.Row key={i} row={1250}>
        {props.title && props.title.map(({
        size,
        propItem,
        render
      }) => {
          return [render && slice &&
          <List.Column key={i} size={size}>
            {render(slice[propItem])}
          </List.Column>, !render && slice &&
          <List.Column key={i} size={size}>
            {slice[propItem]}
          </List.Column>]
        })}
        <ColumnBottons>
          <ContainerButtons>
            { slice &&
              slice.chunks.chunketeChunks.length > 0 &&
              slice.activationStatus === 'pending' &&
            <Button
              type={'primary'}
              loading={props.loadingConfig}
              svg={<CheckIcon />}
              onClick={() => props.sliceConfig(slice)}
              text={'Configuration'}
            />
            }
            <Button
              type={'secondary'}
              svg={<DeleteIcon />}
              onClick={() => props.sliceInfo(slice)}
              text={'Remove'}
            />
            <Button
              type={'primary'}
              svg={<EyeIcon />}
              onClick={() =>
              props.navigate(`/slice/${slice.id}`)} text={'View'}
            />
            <Button
              disabled
              type={'primary'}
              svg={<SettingIcon />}
              onClick={() => props.navigate(`/monitor/slice/${slice.id}`)}
              text={'Monitoring'}
            />
          </ContainerButtons>
        </ColumnBottons>
      </List.Row>)}
  </List>
)

class ListSlices extends Component {
  navigate = (path) => {
    const { history } = this.props
    history.push(path)
  }

  render () {
    const { slices, userRole, modalVisibled, loading, sliceSelect, noData, errorFecth, modalErrorStatus, errorMessage, loadingConfig } = this.props
    const { deleteSlice, actionModal, sliceInfo, sliceConfig, closeModalAction } = this.actions
    const title = userRole === 'Inf. Owner' ? Titles : TitlesUser
    return (
      <Wrapper>
        <ModalErrorSlice
          modalStatus={closeModalAction}
          modalError={modalErrorStatus}
          error={errorMessage}
        />
        <ModalSliceList
          status={modalVisibled}
          slice={sliceSelect}
          actionModal={actionModal}
          loading={loading}
          deleteSlice={deleteSlice}
        />
        <ModalConfigurationSliceList />
        {slices &&
        <ListAllSlices
          navigate={this.navigate}
          slices={slices}
          sliceInfo={sliceInfo}
          title={title}
          sliceConfig={sliceConfig}
          loadingConfig={loadingConfig}
        />
        }
        {noData &&
        <NoData
          title={'You don’t have any slice yet...'}
          message={'Click on the “Add new slice button to add your first slice!'}
        />
        }
        {errorFecth &&
        <ErroPage />
        }
      </Wrapper>
    )
  }
}

export default withRouter(Logic(ListSlices))

const Wrapper = styled.div`
  overflow: auto;
`

const ContainerButtons = styled.div`
  display: flex;
  float: right;
`

const ColumnBottons = styled.div`
  width: 100%;
`
