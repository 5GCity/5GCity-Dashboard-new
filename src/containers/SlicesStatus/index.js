/**
 * Slicesstatus Container
 * Please write a description
 *
 * @author Your Name <youremail@ubiwhere.com>
 */
import React, { Component } from 'react'
import { connect } from 'kea'
import Logic from './logic'
import styled from 'styled-components'
import Table from 'components/Table'

class SlicesStatus extends Component {

  render () {

    const Columns = [{
        prop: 'name',
        size: 20,
        title: "Slice name"
      },
      {
        prop: 'processor',
        size: 20,
        title: "Processor",
        render: ({ total, used, type }) => {
          return `${used}/${total} ${type}`
        }
      },
      {
        prop: 'ram',
        size: 20,
        title: "RAM",
        render: ({ total, used, type }) => {
          return `${used}/${total} ${type}`
        }
      },
      {
        prop: 'bandwidth',
        size: 20,
        title: "Bandwidth",
        render: ({ total, used, type }) => {
          return `${used}/${total} ${type}`
        }
      },
      {
        prop: 'storage',
        size: 20,
        title: "Storage",
        render: ({ total, used, type }) => {
          return `${used}/${total} ${type}`
        }
      }
    ]


    const fakeData = [
  {
    id: 1,
    name: 'Slice name',
    processor: {
      total: 2,
      used: 1,
      type :"CPU's"
    },
    ram: {
      total: 64,
      used: 12,
      type: 'GB'
    },
    bandwidth: {
      total: 500,
      used: 300,
      type: 'mbps'
    },
    storage: {
      total: 512,
      used: 330,
      type: 'GB'
    },
    details: [
      {
        id: 1,
        name: "Network service name",
        processor: {
          total: 2,
          used: 1,
          type: "CPU's"
        },
        ram: {
          total: 64,
          used: 12,
          type: "GB"
        },
        bandwidth: {
          total: 500,
          used: 300,
          type: "mbps"
        },
        storage: {
          total: 512,
          used: 330,
          type: "GB"
        }
      }
    ]
  },
  {
    id: 2,
    name: 'Slice name',
    processor: {
      total: 2,
      used: 1,
      type :"CPU's"
    },
    ram: {
      total: 64,
      used: 12,
      type: 'GB'
    },
    bandwidth: {
      total: 500,
      used: 300,
      type: 'mbps'
    },
    storage: {
      total: 512,
      used: 330,
      type: 'GB'
    }
  },
  {
    id: 3,
    name: 'Slice name',
    processor: {
      total: 4,
      used: 3,
      type :"CPU's"
    },
    ram: {
      total: 16,
      used: 12,
      type: 'GB'
    },
    bandwidth: {
      total: 700,
      used: 1000,
      type: 'mbps'
    },
    storage: {
      total: 1024,
      used: 512,
      type: 'GB'
    },
    details: [
      {
        id: 1,
        name: "Network service name",
        processor: {
          total: 2,
          used: 1,
          type: "CPU's"
        },
        ram: {
          total: 8,
          used: 4,
          type: "GB"
        },
        bandwidth: {
          total: 200,
          used: 300,
          type: "mbps"
        },
        storage: {
          total: 512,
          used: 480,
          type: "GB"
        }
      },
      {
        id: 2,
        name: "Network service name",
        processor: {
          total: 2,
          used: 2,
          type: "CPU's"
        },
        ram: {
          total: 8,
          used: 8,
          type: "GB"
        },
        bandwidth: {
          total: 500,
          used: 500,
          type: "mbps"
        },
        storage: {
          total: 512,
          used: 256,
          type: "GB"
        }
      }
    ]
  },
  {
    id: 4,
    name: 'Slice name',
    processor: {
      total: 2,
      used: 1,
      type: "CPU's"
    },
    ram: {
      total: 64,
      used: 12,
      type: 'GB'
    },
    bandwidth: {
      total: 500,
      used: 300,
      type: 'mbps'
    },
    storage: {
      total: 512,
      used: 330,
      type: 'GB'
    }
  },
  {
    id: 5,
    name: 'Slice name',
    processor: {
      total: 2,
      used: 1,
      type: "CPU's"
    },
    ram: {
      total: 64,
      used: 12,
      type: 'GB'
    },
    bandwidth: {
      total: 500,
      used: 300,
      type: 'mbps'
    },
    storage: {
      total: 512,
      used: 330,
      type: 'GB'
    }
  }
]

    return (
      <Wrapper>
        <Table columns={Columns} data={fakeData} />
      </Wrapper>
    )
  }
}

export default connect({
  props: [
    Logic, [

    ]
  ],

  actions: [
    Logic, [

    ]
  ]
})(SlicesStatus)

const Wrapper = styled.div`

`
