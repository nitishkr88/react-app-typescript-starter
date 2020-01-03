import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'

import React from 'react'
import ReactDOM from 'react-dom'

import './styles/index.less'

const MOUNT_NODE = document.getElementById('app') as HTMLElement

ReactDOM.render(<div>Hello</div>, MOUNT_NODE)
