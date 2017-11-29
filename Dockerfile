FROM node:8
MAINTAINER eq.team@ons.gov.uk

EXPOSE 9000
WORKDIR /app

ENTRYPOINT yarn start

# Install
COPY . /app
RUN yarn install