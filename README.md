# eq-publisher
An API for publishing [eq-author](http://github.com/ONSDigital/eq-author) questionnaires.

## Oveview

The conversion between the GraphQL JSON output and the EQ runner schema can be thought of as a pipeline.

The conversion pipeline is made up of a series of steps to convert each part of the GraphQL JSON.

Each step applies a series of transforms to manipulate the resulting JSON.

![process.jpg](docs/images/process.jpg)

## Installation

To install dependencies, simply run:
```
yarn install
```

To run the application:
```
yarn start
```

## Testing

To run all tests:
```
yarn test
```

## Configuration

The following environment variables can be used to configure the application:

_TBD_