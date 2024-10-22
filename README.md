# 5GCity Platform
![pipeline status](https://gitlab.ubiwhere.com/5GCity/web-platform/badges/master/pipeline.svg)](https://gitlab.ubiwhere.com/5GCity/web-platform/commits/master)

![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)(https://standardjs.com)

![pipeline status](https://gitlab.ubiwhere.com/frontend/Starters/ReactKea/badges/master/pipeline.svg)
(https://gitlab.ubiwhere.com/frontend/Starters/ReactKea/commits/master)

![coverage report](https://gitlab.ubiwhere.com/frontend/Starters/ReactKea/badges/master/coverage.svg)
(https://gitlab.ubiwhere.com/frontend/Starters/ReactKea/commits/master)

![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)
(https://conventionalcommits.org)

![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)(https://github.com/semantic-release/semantic-release)

![Storybook](https://github.com/storybooks/press/blob/master/badges/storybook.svg)
(https://github.com/storybooks/storybook)

## Stack used

* [React](https://reactjs.org/)
* [Webpack](https://webpack.js.org/)
* [Babel](https://webpack.js.org/)
* [Kea.js/Redux](https://kea.js.org/)
* [React Router 4](https://reacttraining.com/react-router/)
* [Styled Components](https://www.styled-components.com/)
* [Axios HTTP Client](https://github.com/axios/axios)
* [Flow Type Checking](https://flow.org/)
* [Standardjs](https://standardjs.com/)
* [Hygen](http://www.hygen.io/)

# Installation/Instantiation

The presented solution use Docker.

Please install [Docker](https://docs.docker.com/install/) according to the desired operating system.

Build Docker command:
```
docker build --rm -t 5gcity:latest . --build-arg API_BASE_URL=https://5g-dashboard.i2cat.net --build-arg API_MONITORING=https://5gcity-monitoring.i2cat.net/d/qymONwsWz
```
When on your console show `Successfully built xxxxxxxxxx` run command:

```
docker run -d -p 5000:5000 5gcity:latest
```
Go to http://localhost:5000

**To Stop Container Ctrl+C**

## Configuration

To change the *name* or *tag* of docker image modify:

`docker build --rm -t NAME:TAG`

To change **API_BASE_URL** or **API_MONITORING** need to pass `--build-arg` modify `API_BASE_URL="http://XXX.XXX.X.XXX` or `API_MONITORING=http://XXX.XXX.X.XXX`

```
docker build --rm -t 5gcity:latest . --build-arg API_BASE_URL=http://xxx.xxx.x.xxx --build-arg API_MONITORING=http://xxx.xxx.x.xxx
```

# How to develop

1 - Clone the project

2 - Install dependencies
```
yarn install
```

3 - Create a branch of the feature/issue you are working on

```
git checkout -b <feature/issue>
```

4 - Start the dev environment

```
yarn start
```

## Available Commands

### Linter
#### Lints and fixes common problems
```
yarn lint:fix
```

#### Shows the results of the linter
```
yarn lint
```

#### Testing
```
yarn test
```

#### Generate Components
```
yarn generate:component
```

#### Generate Containers

```
yarn generate:container
```

#### Generate Scenes
```
yarn generate:scene
```

### StoryBook
### Start StoryBook
```
yarn start:storybook
```

### Build StoryBook
```
yarn build:storybook
```

### UI
[Element-React](http://element.eleme.io/#/en-US)
