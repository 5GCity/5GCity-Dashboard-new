import React from 'react'
import {Theme} from 'globalStyles'

export const NodeMarkerIcon = props => (
  <svg width={props.width || '3rem'} height={props.height || '3rem'} viewBox="0 0 48 60" {...props}>
    <defs>
      <path
        d="M15 28h18v5H15v-5zm0-6.5h18v5H15v-5zm0-6.5h18v5H15v-5zm3 3.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 6.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 6.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
        id="NodeMarkerIcon__a"
      />
    </defs>
    <g fill="none" fillRule="evenodd">
      <path
        d="M15.542 46.467C6.46 43.047 0 34.277 0 24 0 10.745 10.745 0 24 0s24 10.745 24 24c0 10.278-6.46 19.047-15.542 22.467L24 60l-8.458-13.533z"
        fill="#FFF"
      />
      <circle fill={ props.color || '#89979F'} cx={24} cy={24} r={20} />
      <use fill="#FFF" fillRule="nonzero" xlinkHref="#NodeMarkerIcon__a" />
    </g>
  </svg>
)

export const DeleteIcon = props => (
  <svg width={20} height={20} {...props}>
    <path
      d="M4.833 16.333c0 .917.75 1.667 1.667 1.667h6.667c.916 0 1.666-.75 1.666-1.667v-10h-10v10zm10.834-12.5H12.75L11.917 3H7.75l-.833.833H4V5.5h11.667V3.833z"
      fill="#FFF"
      fillRule="nonzero"
    />
  </svg>
)

export const EditIcon = props => (
  <svg width={props.width || 20} height={props.height || 20} {...props}>
    <path
      d="M2 13.877v3.125h3.125l9.217-9.217-3.125-3.125L2 13.877zM16.758 5.37a.83.83 0 0 0 0-1.175l-1.95-1.95a.83.83 0 0 0-1.175 0l-1.525 1.525 3.125 3.125 1.525-1.525z"
      fill="#FFF"
      fillRule="nonzero"
    />
  </svg>
)

export const MapIcon = props => (
  <svg width={props.width || 32} height={props.height || 32} {...props}>
    <path
      d="M27.333 4l-.213.04L20 6.8 12 4 4.48 6.533a.672.672 0 0 0-.48.64v20.16a.66.66 0 0 0 .667.667l.213-.04L12 25.2l8 2.8 7.52-2.533a.672.672 0 0 0 .48-.64V4.667A.66.66 0 0 0 27.333 4zM20 25.333l-8-2.813V6.667l8 2.813v15.853z"
      fill="#FFF"
      fillRule="nonzero"
    />
  </svg>
)

export const BackIcon = props => (
  <svg width={24} height={24} {...props}>
    <defs>
      <path
        id="BackIcon__a"
        d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z"
      />
    </defs>
    <use fill="#89979F" xlinkHref="#BackIcon__a" fillRule="evenodd" />
  </svg>
)


// Start Catalogue
export const Start = props => (
  <g {...props}>
    <rect width="32" height="32" rx="5" fill="#8CC14E"></rect>
   <circle fill="white" r="10" cx="16" cy="16"></circle>
   <path d="M0,-6.204032394013997L5.372849659117709,3.1020161970069986L-5.372849659117709,3.1020161970069986Z" fill="#8CC14E" transform="translate(16,16) rotate(90)"></path>
  </g>
)
// Stop Catalogue
export const Stop = props => (
  <g {...props}>
    <rect width="32" height="32" rx="5" fill="#D84F4F"></rect>
    <circle fill="white" r="10" cx="16" cy="16"></circle>
  </g>
)
// Other Component Catalogue
const styledComponent = {
  fontSize: 12,
  fontWeight: 'bold',
  fontFamily: Theme.secondaryFont,
  textTransform: 'uppercase'
}

export const OtherComponent = props => (
  <g {...props}>
    <circle r="16" cx="16" cy="16" fill={props.circlefill}></circle>
    <text textAnchor="middle" x="16" y="20" style={styledComponent} fill={props.colortext}>{props.type}</text>
  </g>
)

// Plus Catalogue
export const Plus = props => (
  <g {...props}>
    <rect y="13" width="32" height="5" rx="0" fill="white"></rect>
    <rect y="-18" width="32" height="5" ry="0" fill="white" transform="rotate(90)"></rect>
  </g>
)


export const NodeWifiIcon = props => (
  <svg width={36} height={44} {...props}>
    <defs>
      <circle id="NodeWifiIcon__a" cx={18} cy={18} r={14} />
    </defs>
    <g fill="none" fillRule="evenodd">
      <path
        d="M12.456 35.13C5.228 32.793 0 26.007 0 18 0 8.059 8.059 0 18 0s18 8.059 18 18c0 8.007-5.228 14.793-12.456 17.13L18 44l-5.544-8.87z"
        fill="#FFF"
      />
      <mask id="NodeWifiIcon__b" fill="#fff">
        <use xlinkHref="#NodeWifiIcon__a" />
      </mask>
      <use fill={ props.color || '#89979F'} xlinkHref="#NodeWifiIcon__a" />
      <path
        d="M18 21.958a1.827 1.827 0 1 0 .001 3.655A1.827 1.827 0 0 0 18 21.958zm9.786-6.385A12.761 12.761 0 0 0 18 11a12.762 12.762 0 0 0-9.786 4.573.912.912 0 1 0 1.398 1.175A10.94 10.94 0 0 1 18 12.826c3.236 0 6.293 1.43 8.387 3.921a.912.912 0 1 0 1.399-1.174zM18 14.653a9.116 9.116 0 0 0-6.99 3.265.913.913 0 1 0 1.399 1.175A7.292 7.292 0 0 1 18 16.48c2.157 0 4.195.953 5.592 2.614a.91.91 0 0 0 1.286.112.913.913 0 0 0 .112-1.287A9.118 9.118 0 0 0 18 14.653zm0 3.653c-1.62 0-3.148.714-4.194 1.959a.912.912 0 1 0 1.398 1.175A3.646 3.646 0 0 1 18 20.132c1.078 0 2.097.477 2.796 1.308a.91.91 0 0 0 1.286.111.913.913 0 0 0 .112-1.286A5.468 5.468 0 0 0 18 18.305z"
        fill="#FFF"
        fillRule="nonzero"
        mask="url(#NodeWifiIcon__b)"
      />
    </g>
  </svg>
)



export const Logo = props => (
  <svg width={80} height={40} {...props}>
    <image
      width={80}
      height={40}
      href="data:image/png;base64,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 MDo1My0wNzowMK3aKBoAAAAASUVORK5CYII="
    />
  </svg>
)

export const CirclePlus = props => (
  <svg width={14} height={14} {...props}>
    <circle r="6" cx="7" cy="7" stroke="#89979F" strokeWidth="1" fill="transparent"></circle>
    <rect x="4" y="6.75" width="6" height="0.75" rx="0" fill="#89979F"></rect>
    <rect x="4" y="-7.35" width="6" height="0.75" ry="0" fill="#89979F" transform="rotate(90)"></rect>
  </svg>
)
