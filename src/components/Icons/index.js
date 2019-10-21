import React from 'react'
import {Theme} from 'globalStyles'

export const NodeMarkerIcon = props => (
  <svg width={props.width || '3rem'} height={props.height || '3rem'} viewBox='0 0 48 60' {...props}>
    <defs>
      <path
        d='M15 28h18v5H15v-5zm0-6.5h18v5H15v-5zm0-6.5h18v5H15v-5zm3 3.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 6.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 6.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z'
        id='NodeMarkerIcon__a'
      />
    </defs>
    <g fill='none' fillRule='evenodd'>
      <path
        d='M15.542 46.467C6.46 43.047 0 34.277 0 24 0 10.745 10.745 0 24 0s24 10.745 24 24c0 10.278-6.46 19.047-15.542 22.467L24 60l-8.458-13.533z'
        fill='#FFF'
      />
      <circle fill={props.color || '#89979F'} cx={24} cy={24} r={20} />
      <use fill='#FFF' fillRule='nonzero' xlinkHref='#NodeMarkerIcon__a' />
    </g>
  </svg>
)

export const DeleteIcon = props => (
  <svg width={props.width || 24} height={props.height || 24} {...props}>
    <path
      d='M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z'
      fill={props.fill || '#fff'}
      fillRule='nonzero'
    />
  </svg>
)

export const EditIcon = props => (
  <svg width={props.width || 20} height={props.height || 20} {...props}>
    <path
      d='M2 13.877v3.125h3.125l9.217-9.217-3.125-3.125L2 13.877zM16.758 5.37a.83.83 0 0 0 0-1.175l-1.95-1.95a.83.83 0 0 0-1.175 0l-1.525 1.525 3.125 3.125 1.525-1.525z'
      fill={props.fill || '#FFF'}
      fillRule='nonzero'
    />
  </svg>
)

export const MapIcon = props => (
  <svg width={props.width || 24} height={props.height || 24} {...props}>
    <path
      d='M27.333 4l-.213.04L20 6.8 12 4 4.48 6.533a.672.672 0 0 0-.48.64v20.16a.66.66 0 0 0 .667.667l.213-.04L12 25.2l8 2.8 7.52-2.533a.672.672 0 0 0 .48-.64V4.667A.66.66 0 0 0 27.333 4zM20 25.333l-8-2.813V6.667l8 2.813v15.853z'
      fill={props.fill}
      fillRule='nonzero'
    />
  </svg>
)

export const NetworkServicesIcon = props => (
  <svg width={props.width || 24} height={props.height || 24} {...props}>
    <path
      d='M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z'
      fill={props.fill || 'white'}
      fillRule='nonzero'
      />
  </svg>
)

export const BackIcon = props => (
  <svg width={24} height={24} {...props}>
    <path
      d='M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20z'
      fill={props.fill || '#89979F'}
      />
  </svg>
)

export const PlayIcon = props => (
  <svg width={24} height={24} {...props}>
    <path fill='white' fillRule='nonzero' d='M7 5v14l11-7z' />
  </svg>
)

export const PlusIcon = props => (
  <svg width={24} height={24} {...props}>
    <path
      d='M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6z'
      fill={props.fill || '#fff'}
      fillRule='nonzero'
      />
  </svg>
)

export const EyeIcon = props => (
  <svg width={24} height={24} {...props}>
    <path
      d='M12 5C7 5 2.73 8.11 1 12.5 2.73 16.89 7 20 12 20s9.27-3.11 11-7.5C21.27 8.11 17 5 12 5zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z'
      fill={props.fill || '#fff'}
      fillRule='nonzero'
    />
  </svg>
)

export const SettingIcon = props => (
  <svg width={24} height={24} {...props}>
    <path
      d='M19.46 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46a.503.503 0 0 0-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65a.488.488 0 0 0-.49-.42h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-7.43 2.52c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z'
      fill={props.fill || '#fff'}
      fillRule='nonzero'
    />
  </svg>
)

export const CirclePlusIcon = props => (
  <svg width={props.width || 24} height={props.height || 24} {...props}>
    <path
      d='M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zm0-1.5C6.201 22.5 1.5 17.799 1.5 12S6.201 1.5 12 1.5 22.5 6.201 22.5 12 17.799 22.5 12 22.5zm6-9.643h-5.143V18h-1.714v-5.143H6v-1.714h5.143V6h1.714v5.143H18v1.714z'
      fill={props.fill || '#fff'}
      fillRule='nonzero'
    />
  </svg>
)
export const CheckIcon = props => (
  <svg width={24} height={24} {...props}>
    <path
      fill={props.fill || '#fff'}
      fillRule='nonzero'
      d='M8.59 15.58l-4.17-4.17L3 12.82l5.59 5.59 12-12L19.18 5z'
    />
  </svg>
)

export const CloseIcon = props => (
  <svg width={24} height={24} {...props}>
    <path
      d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'
      fill={props.fill || '#fff'}
      fillRule='nonzero'
    />
  </svg>
)

export const PublishIcon = props => (
  <svg width={24} height={24} {...props}>
    <path
      d='M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z'
      fill={props.fill || '#fff'}
      fillRule='nonzero'
    />
  </svg>
)

export const SaveIcon = props => (
  <svg width={24} height={24} {...props}>
    <path
      d='M17 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z'
      fill={props.fill || '#fff'}
      fillRule='nonzero'
    />
  </svg>
)

export const ServiceIcon = props => (
  <svg width={24} height={24} {...props}>
    <path
      d='M21 16H3V4h18v12zm0-14H3c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h7v2H8v2h8v-2h-2v-2h7a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z'
      fill={props.fill || '#fff'}
      fillRule='nonzero'
    />
  </svg>
)

export const CloneIcon = props => (
  <svg width={24} height={24} {...props}>
    <path
      fill={props.fill || '#fff'}
      d='M16 8h-2v3h-3v2h3v3h2v-3h3v-2h-3M2 12c0-2.79 1.64-5.2 4-6.32V3.5C2.5 4.76 0 8.09 0 12s2.5 7.24 6 8.5v-2.18C3.64 17.2 2 14.79 2 12m13-9c-4.96 0-9 4.04-9 9s4.04 9 9 9 9-4.04 9-9-4.04-9-9-9m0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z' />
  </svg>
)

export const LeftIcon = props => (
  <svg width={24} height={24} {...props}>
    <path
      fill={props.fill || '#fff'}
      d='M14 6l1.41 1.41L10.83 12l4.58 4.59L14 18l-6-6z'
    />
  </svg>
)

export const RightIcon = props => (
  <svg width={24} height={24} {...props}>
    <path
      fill={props.fill || '#fff'}
      d='M9.41 6L8 7.41 12.58 12 8 16.59 9.41 18l6-6z'
    />
  </svg>
)

export const AddIcon = props => (
  <svg width={24} height={24} {...props}>
    <path
      d='M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zm0-1.5C6.201 22.5 1.5 17.799 1.5 12S6.201 1.5 12 1.5 22.5 6.201 22.5 12 17.799 22.5 12 22.5zm6-9.643h-5.143V18h-1.714v-5.143H6v-1.714h5.143V6h1.714v5.143H18v1.714z'
      fill={props.fill || '#fff'}
      fillRule='nonzero'
  />
  </svg>
)
// Start Catalogue
export const Start = props => (
  <g {...props}>
    <rect width='32' height='32' rx='5' fill='#8CC14E' />
    <circle fill='white' r='10' cx='16' cy='16' />
    <path d='M0,-6.204032394013997L5.372849659117709,3.1020161970069986L-5.372849659117709,3.1020161970069986Z' fill='#8CC14E' transform='translate(16,16) rotate(90)' />
  </g>
)
// Stop Catalogue
export const Stop = props => (
  <g {...props}>
    <rect width='32' height='32' rx='5' fill='#D84F4F' />
    <circle fill='white' r='10' cx='16' cy='16' />
  </g>
)
// Virtual Switch
export const VirtualSwitch = props => (
  <g {...props}>
    <rect width='32' height='32' rx='5' fill='#006bb7' />
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
    <circle r='16' cx='16' cy='16' fill={props.circlefill} />
    <text textAnchor='middle' x='16' y='20' style={styledComponent} fill={props.colortext}>{props.type}</text>
  </g>
)

// Plus Catalogue
export const Plus = props => (
  <g {...props}>
    <rect y='13' width='32' height='5' rx='0' fill='white' />
    <rect y='-18' width='32' height='5' ry='0' fill='white' transform='rotate(90)' />
  </g>
)

// Plus Catalogue
export const Remove = props => (
  <g {...props}>
    <circle r='20' cx='16' cy='16' fill='#d84f4f' />
    <rect y='14' width='30' x='1' height='5' rx='0' fill='white' />
  </g>
)

export const NodeWifiIcon = props => (
  <svg width={36} height={44} {...props}>
  <defs>
    <circle id="prefix__a" cx={18} cy={18} r={14} />
  </defs>
  <g fill="none" fillRule="evenodd">
    <path
      d="M18 0c9.941 0 18 8.059 18 18 0 8.006-5.227 14.792-12.455 17.13L18 44l-5.544-8.87C5.228 32.793 0 26.007 0 18 0 8.059 8.059 0 18 0z"
      fill="#FFF"
    />
    <mask id="prefix__b" fill="#fff">
      <use xlinkHref="#prefix__a" />
    </mask>
    <use fill={props.fill || '#89979F'} xlinkHref="#prefix__a" />
    <g mask="url(#prefix__b)" fill="#FFF">
      <path d="M10.674 16.063l1.347 1.348a8.575 8.575 0 0112.126 0l1.348-1.348c-4.09-4.09-10.725-4.09-14.821 0zm5.39 5.39l2.02 2.02 2.021-2.02a2.854 2.854 0 00-4.042 0zm-2.696-2.695l1.348 1.347a4.765 4.765 0 016.737 0l1.347-1.347c-2.6-2.6-6.824-2.6-9.432 0z" />
    </g>
  </g>
</svg>
)

export const NodeRanIcon = props => (
  <svg width={36} height={45} viewBox='0 0 36 45' {...props}>
    <path
      d='M11.656 34.852C4.844 32.285 0 25.707 0 18 0 8.059 8.059 0 18 0s18 8.059 18 18c0 7.707-4.844 14.285-11.656 16.852L18 45zm0 0'
      fill='#fff'
    />
    <path
      d='M33 18c0 8.285-6.715 15-15 15S3 26.285 3 18 9.715 3 18 3s15 6.715 15 15zm0 0'
      fill={props.color || '#89979F'}
    />
    <path
      d='M18.336 25.754c-1.961 0-3.414-.664-4.36-1.988-.94-1.32-1.414-3.188-1.414-5.594 0-2.41.473-4.274 1.415-5.598.945-1.324 2.398-1.984 4.359-1.984.758 0 1.426.101 2.004.305a4.6 4.6 0 0 1 1.504.851c.418.363.765.805 1.039 1.32.273.52.484 1.102.64 1.746l-2.941.711a7.402 7.402 0 0 0-.293-.964 2.606 2.606 0 0 0-.43-.754 1.87 1.87 0 0 0-.652-.496c-.258-.118-.57-.176-.934-.176-.855 0-1.46.332-1.816.996-.36.664-.535 1.586-.535 2.762v2.562c0 1.176.176 2.094.535 2.762.355.664.961.996 1.816.996.727 0 1.258-.223 1.586-.672.328-.45.57-1.023.723-1.723l2.941.715a7.456 7.456 0 0 1-.64 1.742 4.69 4.69 0 0 1-1.04 1.336 4.39 4.39 0 0 1-1.503.848c-.578.195-1.246.297-2.004.297zm0 0'
      fill='#fff'
    />
  </svg>
)

export const NodeBoxLTE = props => (
  <svg width={36} height={44} {...props}>
    <defs>
      <circle id="prefix__a" cx={18} cy={18} r={14} />
    </defs>
    <g fill="none" fillRule="evenodd">
      <path
        d="M18 0c9.941 0 18 8.059 18 18 0 8.006-5.227 14.792-12.455 17.13L18 44l-5.544-8.87C5.228 32.793 0 26.007 0 18 0 8.059 8.059 0 18 0z"
        fill="#FFF"
      />
      <mask id="prefix__b" fill="#fff">
        <use xlinkHref="#prefix__a" />
      </mask>
      <use fill={props.fill || '#89979F'} xlinkHref="#prefix__a" />
      <g mask="url(#prefix__b)" fill="#FFF">
        <path d="M22.716 11.684h-1.853v9.152h-2.779l3.705 3.648 3.706-3.648h-2.78v-9.152zm-8.337 0l-3.705 3.648h2.779v9.152h1.852v-9.152h2.78l-3.706-3.648z" />
      </g>
    </g>
  </svg>
)

export const Logo = props => (
  <svg width={80} height={40} {...props}>
    <image
      width={80}
      height={40}
      href='data:image/png;base64,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 MDo1My0wNzowMK3aKBoAAAAASUVORK5CYII='
    />
  </svg>
)

export const CirclePlus = props => (
  <svg width={14} height={14} {...props}>
    <circle r='6' cx='7' cy='7' stroke='#89979F' strokeWidth='1' fill='transparent' />
    <rect x='4' y='6.75' width='6' height='0.75' rx='0' fill='#89979F' />
    <rect x='4' y='-7.35' width='6' height='0.75' ry='0' fill='#89979F' transform='rotate(90)' />
  </svg>
)

export const NoDataIcon = props => (
  <svg width={252} height={240} {...props}>
    <defs>
      <linearGradient
        x1='49.999%'
        y1='100%'
        x2='49.999%'
        y2='0%'
        id='prefix__a'
    >
        <stop stopColor='gray' stopOpacity={0.25} offset='0%' />
        <stop stopColor='gray' stopOpacity={0.12} offset='54%' />
        <stop stopColor='gray' stopOpacity={0.1} offset='100%' />
      </linearGradient>
      <linearGradient x1='50%' y1='100%' x2='50%' y2='0%' id='prefix__b'>
        <stop stopColor='gray' stopOpacity={0.25} offset='0%' />
        <stop stopColor='gray' stopOpacity={0.12} offset='54%' />
        <stop stopColor='gray' stopOpacity={0.1} offset='100%' />
      </linearGradient>
      <linearGradient
        x1='60.274%'
        y1='98.88%'
        x2='39.783%'
        y2='1.029%'
        id='prefix__c'
    >
        <stop stopColor='gray' stopOpacity={0.25} offset='0%' />
        <stop stopColor='gray' stopOpacity={0.12} offset='54%' />
        <stop stopColor='gray' stopOpacity={0.1} offset='100%' />
      </linearGradient>
      <linearGradient
        x1='49.999%'
        y1='100%'
        x2='49.999%'
        y2='0%'
        id='prefix__d'
    >
        <stop stopColor='gray' stopOpacity={0.25} offset='0%' />
        <stop stopColor='gray' stopOpacity={0.12} offset='54%' />
        <stop stopColor='gray' stopOpacity={0.1} offset='100%' />
      </linearGradient>
      <linearGradient x1='50%' y1='100%' x2='50%' y2='0%' id='prefix__e'>
        <stop stopColor='gray' stopOpacity={0.25} offset='0%' />
        <stop stopColor='gray' stopOpacity={0.12} offset='54%' />
        <stop stopColor='gray' stopOpacity={0.1} offset='100%' />
      </linearGradient>
      <linearGradient x1='50%' y1='99.914%' x2='50%' y2='-.086%' id='prefix__f'>
        <stop stopColor='gray' stopOpacity={0.25} offset='0%' />
        <stop stopColor='gray' stopOpacity={0.12} offset='54%' />
        <stop stopColor='gray' stopOpacity={0.1} offset='100%' />
      </linearGradient>
    </defs>
    <g fillRule='nonzero' fill='none'>
      <path
        fill='#89979F'
        d='M21.216 41.636L152.37 13.462l38.882 181.424-131.155 28.173z'
    />
      <path
        transform='rotate(-12.11 173.933 -3.04)'
        d='M17.51 11.74l129.613-.03-.043 179.271-129.613.03z'
        opacity={0.5}
        fill='url(#prefix__a)'
    />
      <path
        fill='#5A666D'
        d='M25.98 45.17l123.495-26.528 36.738 171.419-123.496 26.528z'
    />
      <path
        fill='url(#prefix__b)'
        transform='rotate(-12.11 87.889 31.87)'
        d='M56.56 24.28l62.662-.016-.004 15.196-62.662.014z'
    />
      <path
        d='M83.185 9.929c-4.73 1.017-7.723 5.77-6.683 10.617 1.04 4.846 5.716 7.956 10.436 6.939 4.721-1.017 7.723-5.771 6.683-10.617-1.04-4.846-5.706-7.956-10.436-6.94zm2.968 13.859a5.172 5.172 0 0 1-5.406-2.02 5.186 5.186 0 0 1-.177-5.775 5.173 5.173 0 0 1 9.438 1.649 5.125 5.125 0 0 1-.652 3.875 5.114 5.114 0 0 1-3.203 2.271z'
        fill='url(#prefix__c)'
    />
      <path
        fill='#8CC14E'
        d='M56.173 30.245l59.974-12.883 3.044 14.202-59.974 12.884z'
    />
      <path
        d='M83.185 9.929c-4.63.995-7.577 5.558-6.583 10.192.993 4.635 5.55 7.586 10.18 6.591 4.63-.994 7.577-5.557 6.584-10.192a8.583 8.583 0 0 0-3.727-5.407 8.565 8.565 0 0 0-6.454-1.184zm2.836 13.244a4.945 4.945 0 0 1-5.11-2.03 4.958 4.958 0 0 1-.083-5.503 4.946 4.946 0 0 1 8.993 1.652 4.954 4.954 0 0 1-3.8 5.881z'
        fill='#8CC14E'
    />
      <path fill='#89979F' d='M79.157 35.926h134.14v185.553H79.157z' />
      <path
        d='M.086.037h129.607v179.281H.086z'
        opacity={0.5}
        transform='translate(81.34 39.027)'
        fill='url(#prefix__d)'
    />
      <path fill='#5A666D' d='M83.074 40.385h126.307v175.32H83.074z' />
      <path fill='url(#prefix__e)' d='M115.064 32.783h62.659v15.196h-62.659z' />
      <path
        d='M146.393 17.95c-4.837 0-8.76 4.019-8.76 8.979 0 4.96 3.923 8.979 8.76 8.979 4.838 0 8.76-4.02 8.76-8.98 0-4.96-3.922-8.979-8.76-8.979zm0 14.16a5.175 5.175 0 0 1-4.867-3.112 5.186 5.186 0 0 1 1.042-5.687 5.17 5.17 0 0 1 5.653-1.18 5.181 5.181 0 0 1 3.225 4.798 5.117 5.117 0 0 1-5.053 5.156v.025z'
        fill='url(#prefix__f)'
    />
      <path fill='#8CC14E' d='M115.724 32.131h61.339v14.526h-61.339z' />
      <path
        d='M146.393 17.95a8.573 8.573 0 0 0-7.92 5.298 8.59 8.59 0 0 0 1.858 9.353 8.566 8.566 0 0 0 9.343 1.86 8.583 8.583 0 0 0 5.292-7.929c0-4.74-3.838-8.583-8.573-8.583zm0 13.536a4.95 4.95 0 0 1-4.941-4.954 4.95 4.95 0 0 1 4.941-4.954 4.95 4.95 0 0 1 4.954 4.942 4.957 4.957 0 0 1-1.452 3.503 4.945 4.945 0 0 1-3.502 1.447v.016z'
        fill='#8CC14E'
    />
      <g opacity={0.5} fill='#8CC14E'>
        <path d='M4.687 226.494H5.84v6.555H4.687z' />
        <path d='M8.54 229.195v1.156H1.991v-1.156z' />
      </g>
      <g opacity={0.5} fill='#8CC14E'>
        <path d='M138.582 0h1.154v6.555h-1.154z' />
        <path d='M142.434 2.698v1.156h-6.547V2.698z' />
      </g>
      <path
        d='M236.677 237.406a1.417 1.417 0 0 1-.788-1.711.683.683 0 0 0 .03-.157.71.71 0 0 0-1.274-.47.682.682 0 0 0-.08.138c-.286.66-1.021 1-1.709.79a.68.68 0 0 0-.157-.03.709.709 0 0 0-.47 1.274c.044.032.09.06.139.08.659.288.998 1.024.789 1.712a.683.683 0 0 0-.03.157.71.71 0 0 0 1.273.47.682.682 0 0 0 .08-.138c.287-.66 1.022-1 1.71-.79a.68.68 0 0 0 .156.03.709.709 0 0 0 .47-1.275.681.681 0 0 0-.139-.08zM41.95 174.392a1.417 1.417 0 0 1-.789-1.712.683.683 0 0 0 .03-.157.71.71 0 0 0-1.273-.47.682.682 0 0 0-.08.139c-.287.66-1.022.999-1.71.79a.68.68 0 0 0-.156-.031.709.709 0 0 0-.47 1.275c.043.032.09.059.138.08.66.287.999 1.023.79 1.711a.683.683 0 0 0-.031.157.71.71 0 0 0 1.273.47.682.682 0 0 0 .08-.138c.287-.66 1.022-1 1.71-.79a.68.68 0 0 0 .156.031.709.709 0 0 0 .47-1.275.681.681 0 0 0-.138-.08zM204.141 20.952a1.417 1.417 0 0 1-.788-1.712.683.683 0 0 0 .03-.157.71.71 0 0 0-1.273-.47.682.682 0 0 0-.08.138c-.287.66-1.022 1-1.71.79a.68.68 0 0 0-.156-.03.709.709 0 0 0-.47 1.275c.043.032.089.058.138.08.659.287.998 1.023.789 1.711a.683.683 0 0 0-.03.157.71.71 0 0 0 1.273.47.682.682 0 0 0 .08-.138c.287-.66 1.022-1 1.71-.79a.68.68 0 0 0 .156.03.709.709 0 0 0 .47-1.275.681.681 0 0 0-.139-.08z'
        fill='#8CC14E'
        opacity={0.5}
    />
      <ellipse
        fill='#8CC14E'
        opacity={0.5}
        cx={249.434}
        cy={96.636}
        rx={2.311}
        ry={2.314}
    />
      <ellipse
        fill='#8CC14E'
        opacity={0.5}
        cx={70.821}
        cy={229.444}
        rx={2.311}
        ry={2.314}
    />
      <ellipse
        fill='#8CC14E'
        opacity={0.5}
        cx={225.698}
        cy={146.652}
        rx={2.311}
        ry={2.314}
    />
      <ellipse
        fill='#8CC14E'
        opacity={0.5}
        cx={26.747}
        cy={29.608}
        rx={2.311}
        ry={2.314}
    />
      <ellipse
        fill='#8CC14E'
        opacity={0.5}
        cx={2.311}
        cy={92.73}
        rx={2.311}
        ry={2.314}
    />
    </g>
  </svg>
)

export const ErrorIcon = props => (
  <svg width={120} height={120} {...props}>
    <defs>
      <circle id='prefix__a' cx={60} cy={60} r={40} />
      <mask
        id='prefix__b'
        maskContentUnits='userSpaceOnUse'
        maskUnits='objectBoundingBox'
        x={0}
        y={0}
        width={80}
        height={80}
        fill='#fff'
      >
        <use xlinkHref='#prefix__a' />
      </mask>
      <path
        d='M17.333 17.333h-2.666v-8h2.666v8zm0 5.334h-2.666V20h2.666v2.667zM16 2.667C8.636 2.667 2.667 8.637 2.667 16A13.333 13.333 0 1 0 16 2.667z'
        id='prefix__c'
      />
    </defs>
    <g fill='none' fillRule='evenodd'>
      <path
        d='M60 120c33.137 0 60-26.863 60-60S93.137 0 60 0 0 26.863 0 60s26.863 60 60 60z'
        fill='#5A666D'
        opacity={0.302}
      />
      <path
        d='M60 110c27.614 0 50-22.386 50-50S87.614 10 60 10 10 32.386 10 60s22.386 50 50 50z'
        fill='#5A666D'
        opacity={0.599}
      />
      <use
        strokeOpacity={0.299}
        stroke='#EFF2F7'
        mask='url(#prefix__b)'
        strokeWidth={2}
        strokeDasharray='3 4'
        xlinkHref='#prefix__a'
      />
      <g transform='translate(44 44)'>
        <mask id='prefix__d' fill='#fff'>
          <use xlinkHref='#prefix__c' />
        </mask>
        <use fill='#757575' fillRule='nonzero' xlinkHref='#prefix__c' />
        <g mask='url(#prefix__d)' fill='#FFF'>
          <path d='M0 0h32v32H0z' />
        </g>
      </g>
    </g>
  </svg>
)
