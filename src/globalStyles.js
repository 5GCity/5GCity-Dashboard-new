import { injectGlobal } from 'styled-components'

// Theme variables
export const Theme = {
  bodyBackground: '#37474F',
  headerBackground: '#eef1f6',
  primaryColor: '#8CC14E',
  secondaryColor: '#89979F',
  dangerColor: '#DD6C6C',
  fontFamily: 'Open Sans, sans-serif',
  fontDin: 'd-din, sans-serif',
  fontDinCondensed: 'd-din-condensed ,sans-serif',
  fontDinExp: 'd-din-exp ,sans-serif'
}

// Global styles
injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600');

  body, html, #root , main {
    height: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: ${Theme.fontFamily};
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.004);
    -moz-osx-font-smoothing: grayscale;
    -ms-overflow-x: hidden;
    background: ${Theme.bodyBackground};

    .el-picker-panel {
      background: #404F57!important;
      border: none;
      color: white;
    }
    .el-date-table td.disabled {
      background-color: transparent;
      color: #6a6a6a;
    }
    .el-form-item__label {
      color: #fff;
    }
  }

  * {
    box-sizing: border-box;
  }

  /* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background-color: rgba(0,0,0,0.1);
}

/* Handle */
::-webkit-scrollbar-thumb {
  background-color: #76848C;
  border-radius: 4px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
/* MAPBOX */
.mapboxgl-marker > svg {
  position: absolute;
}
.mapboxgl-ctrl-logo {
  display: none !important;
}
`
