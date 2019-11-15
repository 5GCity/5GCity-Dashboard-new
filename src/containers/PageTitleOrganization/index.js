/**
 * Pagetitleorganization Container
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'

/* Components */
import PageTitle from 'components/PageTitle'
import Select from 'components/Select'


class PageTitleOrganization extends Component {
  render () {
    const {
      onClick, title, buttonTitle, type, icon, organizations,
      selectOrganization, loading,
    }= this.props
    const { changeOrganization }= this.actions
    return (
      <PageTitle
        title={title}
        buttonTitle={buttonTitle}
        type={type}
        svg={icon}
        buttonFunction={() => onClick()}
      >
        <ContainerFilters>
          <Select
            label={'Repositories'}
            type={'default'}
            loading={loading}
            options={organizations}
            selectOption={selectOrganization}
            onChange={value => changeOrganization(value)}
          />
        </ContainerFilters>
      </PageTitle>
    )
  }
}

export default Logic(PageTitleOrganization)


const ContainerFilters = styled.div`
  display:flex;
  justify-content: flex-end;
  border-bottom : 1px solid rgba(137,151,159,0.2);
  padding: 16px 0px;
`
