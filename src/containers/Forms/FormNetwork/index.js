/**
 * Formnetwork Container
 * Please write a description
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React, { Component } from "react";
import Logic from "./logic";
import styled from "styled-components";
import { Layout } from "element-react";
import { UNITS } from "./utils";

/* Component */
import Form from "components/Form";
import Input from "components/Input";
import Button from "components/Button";
import Select from "components/Select";
import { PlusIcon, DeleteIcon } from "components/Icons";

class FormNetwork extends Component {
  render() {
    const { form } = this.props;
    const {
      name,
      bandwidth,
      /* floatingIps, */
      provisionedTags,
      tagRangeInit,
      tagRangeEnd,
      /* cidr,
      gwIp, */
      bandwidthUnit,
      neutronPhyNetName
    } = form;
    const {
      addProvisionedTags,
      removeProvisionedTags,
      setValueProvisioned,
      change
    } = this.actions;
    return (
      <Wrapper>
        <Title>Network</Title>
        <Form labelPosition={"top"} labelWidth="100">
          <Form.Item label={"Name"} required status={!name.valid}>
            <Input
              value={name.value}
              onChange={value => change({ name: value })}
            />
            <Form.Error>{name.message}</Form.Error>
          </Form.Item>
          <Form.Item
            label={"Neutron Phy Net Name"}
            required
            status={!neutronPhyNetName.valid}
          >
            <Input
              value={neutronPhyNetName.value}
              onChange={value => change({ neutronPhyNetName: value })}
            />
            <Form.Error>{neutronPhyNetName.message}</Form.Error>
          </Form.Item>
          {/* <Form.Item label={"CIDR"} required status={!cidr.valid}>
            <Input
              value={cidr.value}
              onChange={value => change({ cidr: value })}
            />
            <Form.Error>{cidr.message}</Form.Error>
          </Form.Item>
          <Form.Item label={"Gateway IP"} required status={!gwIp.valid}>
            <Input
              value={gwIp.value}
              onChange={value => change({ gwIp: value })}
            />
            <Form.Error>{gwIp.message}</Form.Error>
          </Form.Item> */}
          <Layout.Row gutter="4">
            <Layout.Col span="14">
              <Form.Item label="Bandwidth" required status={!bandwidth.valid}>
                <Input
                  value={bandwidth.value}
                  onChange={value => change({ bandwidth: value })}
                />
                <Form.Error>{bandwidth.message}</Form.Error>
              </Form.Item>
            </Layout.Col>
            <Layout.Col span="10">
              <Form.Item label={"Unit"}>
                <Select
                  type={"default"}
                  placeholder="unit"
                  options={UNITS}
                  onChange={value => change({ bandwidthUnit: value })}
                  selectOption={bandwidthUnit.value}
                />
              </Form.Item>
            </Layout.Col>
          </Layout.Row>
          {/* <Form.Item label="Floating IP's" required status={!floatingIps.valid}>
            <Input
              value={floatingIps.value}
              onChange={value => change({ floatingIps: value })}
            />
            <Form.Error>{floatingIps.message}</Form.Error>
          </Form.Item> */}

          <SubTitle>Provisioned Tags</SubTitle>
          {provisionedTags.array.map((proTags, index) => (
            <Form.Item
              key={index}
              label={`Provisioned Tags ${index + 1}`}
              status={!proTags.valid}
            >
              <Layout.Row gutter="6">
                <Layout.Col span="12">
                  <Input
                    value={proTags.value}
                    onChange={value =>
                      setValueProvisioned("provisionedTags", value, index)
                    }
                  />
                  <Form.Error>{proTags.message}</Form.Error>
                </Layout.Col>
                <Layout.Col span="6">
                  <Button
                    text={"Remove"}
                    type={"danger"}
                    svg={<DeleteIcon />}
                    onClick={() => removeProvisionedTags(index)}
                  />
                </Layout.Col>
              </Layout.Row>
            </Form.Item>
          ))}
          <AddMore
            text={"Add Parameter"}
            svg={<PlusIcon />}
            type={"primary"}
            onClick={() => addProvisionedTags()}
          />

          <Form.Item
            label="Tag Range Init"
            required
            status={!tagRangeInit.valid}
          >
            <Input
              value={tagRangeInit.value}
              onChange={value => change({ tagRangeInit: value })}
            />
            <Form.Error>{tagRangeInit.message}</Form.Error>
          </Form.Item>

          <Form.Item label="Tag Range End" required status={!tagRangeEnd.valid}>
            <Input
              value={tagRangeEnd.value}
              onChange={value => change({ tagRangeEnd: value })}
            />
            <Form.Error>{tagRangeEnd.message}</Form.Error>
          </Form.Item>
        </Form>
      </Wrapper>
    );
  }
}

export default Logic(FormNetwork);

const Wrapper = styled.div``;
const Title = styled.h5`
  color: ${({ theme }) => theme.primaryColor};
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: 20px;
  line-height: 20px;
  font-weight: normal;
  margin-bottom: 16px;
`;
const SubTitle = styled.h5`
  color: ${({ theme }) => theme.secondaryColor};
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: 14px;
  line-height: 14px;
  font-weight: normal;
`;
const AddMore = styled(Button)`
  margin-top: 0px;
  margin-bottom: 10px;
`;
