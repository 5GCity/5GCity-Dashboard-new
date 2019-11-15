/**
 * Panelresourcelocation Container
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React, { Component } from 'react'
import Logic from './logic'
import styled from 'styled-components'
import { Checkbox, Layout } from 'element-react'

/* Compoment */
import Form from 'components/Form'
import PanelRight from 'components/PanelRight'
import Button from 'components/Button'
import { BackIcon } from 'components/Icons'

class PanelResourceLocation extends Component {
  render () {
    const { show, close, update, resources }= this.props
    return (
        <PanelRight
          show={show}
          close={close}
        >
          {resources &&
          <React.Fragment>
          <Container>
            <Form
              labelWidth='120'
              labelPosition={'top'}
            >
              <Form.Item>
                {resources.computes &&
                <TitleResource>Computing</TitleResource>
                }
                 {resources.computes && resources.computes.map((compute, i) =>
                  <React.Fragment key={i}>
                    <Checkbox.Group
                      value={compute.ischecked === false ? [] : [compute.name]}
                      onChange={(value) => changeComputes(selectPin, i, 'ischecked', value.length > 0)}>
                      <Checkbox
                        key={compute.id}
                        label={compute.name}
                      >
                        <Name>{compute.name}</Name>
                        <Label>{compute.id}</Label>
                      </Checkbox>
                    </Checkbox.Group>
             {/*        {compute.ischecked &&
                      <FormContainer key={i}>
                        <Form.Item label='Name'>
                          <Input
                            type='text'
                            value={compute.computeName}
                            onChange={(value) => changeComputes(selectPin, i, 'computeName', value)}
                          />
                        </Form.Item>
                        <Form.Item label='Description'>
                          <Input
                            type='text'
                            value={compute.computeDescription}
                            onChange={(value) => changeComputes(selectPin, i, 'computeDescription', value)}
                          />
                        </Form.Item>
                        <Form.Item label='CPUs'>
                          <Input
                            type='text'
                            value={compute.cpus}
                            onChange={(value) => changeComputes(selectPin, i, 'cpus', value)}
                          />
                        </Form.Item>
                        <Label>CPU Total: {compute.computeData.cpus.total} cores </Label>
                        <Label>CPU Provisioned: {compute.computeData.cpus.provisioned} cores </Label>
                        <Layout.Row gutter="4">
                          <Layout.Col span="16">
                            <Form.Item
                              label='RAM'
                              required
                              //status={!ram.valid}
                            >
                            <Input
                              value={compute.ran}
                              onChange={(value) => changeComputes(selectPin, i, 'ram', value)}
                            />
                            <Form.Error>{ram.message}</Form.Error>
                            </Form.Item>
                          </Layout.Col>
                          <Layout.Col span="8">
                            <Form.Item label={'Unit'}>
                            <Select
                              type={'default'}
                              placeholder="unit"
                              options={UNITS}
                              onChange={value => change({ramUnit: value})}
                              selectOption={ramUnit.value}
                            />
                            </Form.Item>
                          </Layout.Col>
                        </Layout.Row>
                        <Label>RAM Total: {compute.computeData.ram.total} {compute.computeData.ram.units} </Label>
                        <Label>RAM Provisioned: {compute.computeData.ram.provisioned} {compute.computeData.ram.units} </Label>
                        <Form.Item label='Storage'>
                          <Input
                            type='text'
                            value={compute.storage}
                            onChange={(value) => changeComputes(selectPin, i, 'storage', value)}
                          />
                        </Form.Item>
                        <Label>Storage Total: {compute.computeData.storage.total} {compute.computeData.storage.units} </Label>
                        <Label>Storage Provisioned: {compute.computeData.storage.provisioned} {compute.computeData.storage.units} </Label>
                      </FormContainer>
                    } */}
                  </React.Fragment>
                )} */}
              </Form.Item>
            </Form>
          </Container>
          <Bottom>
            <BottomContainer>
              <Button
                size={'xxxlarge'}
                svg={<BackIcon />}
                text={'Update Card'}
                type={'primary'}
                onClick={update}
              />
            </BottomContainer>
          </Bottom>
          </React.Fragment>
          }
        </PanelRight>
    )
  }
}

export default Logic(PanelResourceLocation)

const Container = styled.div`
  overflow-y: auto;
  margin: 0 0 0 20px;
  max-height: calc(100vh - 200px);
`

const Bottom = styled.div`
  background-color: rgba(255,255,255,0.05);
  height: 80px;
  width: 100%;
  position: absolute;
  bottom: 80px;
`

const BottomContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`

const TitleResource = styled.h5`
  color: ${({ theme }) => theme.primaryColor};
  font-family: ${({ theme }) => theme.fontFamily};
  margin: 32px 0 24px 0;
  font-size: 20px;
  line-height: 20px;
`

const Label = styled.p`
  margin:12px 0;
  font-size: 14px;
  line-height: 14px;
  font-family: ${({ theme }) => theme.fontFamily};
  color: #89979F;
`

const Name = styled.p`
  margin: 12px 0;
  font-size: 12px;
  line-height: 12px;
  font-weight: bold;
  color: #EFF2F7;
  font-family: ${({ theme }) => theme.fontFamily};
`
