window.localStorage = window.sessionStorage = {
  getItem: function (key) {
      return this[key];
  },
  setItem: function (key, value) {
      this[key] = value;
  }
};

it('renders without crashing', () => {
  const root = document.createElement('div')
  root.setAttribute('id', 'root')
  document.body.appendChild(root)
  require('index')
})

it('should have initialized sentry', () => {
  jest.resetModules()
  process.env.NODE_ENV = 'production'
  process.env.VERSION = '1.0.0'
  process.env.BUILD_DATE = '22-10-2018'
  process.env.APP_ENV = 'development'
  const root = document.createElement('div')
  root.setAttribute('id', 'root')
  document.body.appendChild(root)
  const { Raven } = require('index')

  expect(Raven).not.toBe(undefined)
})

it('should have not initialized sentry', () => {
  jest.resetModules()
  process.env.NODE_ENV = 'development'
  process.env.VERSION = '1.0.0'
  process.env.BUILD_DATE = '22-10-2018'
  process.env.APP_ENV = 'development'
  const root = document.createElement('div')
  root.setAttribute('id', 'root')
  document.body.appendChild(root)
  const { Raven } = require('index')

  expect(Raven).toBe(undefined)
  jest.resetModules()
})




