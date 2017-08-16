FROM node:7
MAINTAINER eq.team@ons.gov.uk

EXPOSE 9000
WORKDIR /app

ENTRYPOINT yarn start

# Install
COPY . /app
RUN yarn install