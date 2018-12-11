/**
 * Table Component Stories
 * Please write a description or remove this line
 *
 * @author Guilherme Patriarca <gpatriarca@ubiwhere.com>
 */
import React ,{ Component } from 'react'
import { storiesOf } from '@storybook/react'

import Table from './index'
import { Theme } from 'globalStyles';

const fakeColumns = [
  {
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
      used: 700,
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

const fakeDataNew = fakeData.map((obj) => {
    obj.open = false;

    obj.processor.percentage = (Math.floor((obj.processor.used / obj.processor.total) * 100));
    obj.ram.percentage = (Math.floor((obj.ram.used / obj.ram.total) * 100));
    obj.storage.percentage = (Math.floor((obj.storage.used / obj.storage.total) * 100));
    obj.bandwidth.percentage = (Math.floor((obj.bandwidth.used / obj.bandwidth.total) * 100));
    obj.processor.status = obj.processor.percentage >= 65  ? 'warning' : obj.processor.percentage >= 80 ? 'danger' : null;
    obj.ram.status = obj.ram.percentage >= 65  ? 'warning' : obj.ram.percentage >= 80 ? 'danger' : null ;
    obj.storage.status = obj.storage.percentage >= 65  ? 'warning' : obj.storage.percentage >= 80 ? 'danger' : null ;
    obj.bandwidth.status = obj.bandwidth.percentage <= 80  ? 'warning' : obj.bandwidth.percentage >= 80 ? 'danger' : null;    
    
    if(obj.details){
      obj.details = obj.details.map((item) => { 
      obj.processor.percentage = (Math.floor((obj.processor.used / obj.processor.total) * 100));
      obj.ram.percentage = (Math.floor((obj.ram.used / obj.ram.total) * 100));
      obj.storage.percentage = (Math.floor((obj.storage.used / obj.storage.total) * 100));
      obj.bandwidth.percentage = (Math.floor((obj.bandwidth.used / obj.bandwidth.total) * 100));
      obj.processor.status = obj.processor.percentage >= 65  ? 'warning' : obj.processor.percentage >= 80 ? 'danger' : null;
      obj.ram.status = obj.ram.percentage >= 65  ? 'warning' : obj.ram.percentage >= 80 ? 'danger' : null ;
      obj.storage.status = obj.storage.percentage >= 65  ? 'warning' : obj.storage.percentage >= 80 ? 'danger' : null ;
      obj.bandwidth.status = obj.bandwidth.percentage <= 80  ? 'warning' : obj.bandwidth.percentage >= 80 ? 'danger' : null;
      
      return item;
      })
    }

    return obj;
})
   
  /* obj.processor.percentage = (Math.floor((obj.processor.used / obj.processor.total) * 100));
  obj.ram.percentage = (Math.floor((obj.ram.used / obj.ram.total) * 100));
  obj.storage.percentage = (Math.floor((obj.storage.used / obj.storage.total) * 100));
  obj.bandwidth.percentage = (Math.floor((obj.bandwidth.used / obj.bandwidth.total) * 100));
  obj.processor.status = obj.processor.percentage >= 65  ? 'warning' : obj.processor.percentage >= 80 ? 'danger' : null ;
  obj.ram.status = obj.ram.percentage >= 65  ? 'warning' : obj.ram.percentage >= 80 ? 'danger' : null ;
  obj.storage.status = obj.storage.percentage >= 65  ? 'warning' : obj.storage.percentage >= 80 ? 'danger' : null ;
  obj.bandwidth.status = obj.bandwidth.percentage <= 80  ? 'warning' : obj.bandwidth.percentage >= 80 ? 'danger' : null ; */



class Story extends Component {

  state = {
    show: true,
    data : fakeDataNew,
  }
  
  render () {    

  const bStyle = {
  padding: '30px',
  backgroundColor: Theme.bodyBackground,
  height:'100%'
}
  const toogleAction = (item) => {
  const dataCopy = this.state.data
  dataCopy.map((obj) => {
    if(obj.id === item.id){
      obj.open = !obj.open
         }
  })
    this.setState({data: dataCopy})
  }

    return (
    <div style={bStyle}> 
      <Table
      columns={fakeColumns} 
      data={this.state.data} 
      toogleAction={(item) => toogleAction(item) }
      />
    </div>
    )
  }
}

const State1 = () => (
  <Story />
)

storiesOf('Table', module)
  .add('primary', State1)