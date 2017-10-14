FROM node:7.10.0

MAINTAINER alaxallves@gmail.com

RUN apt-get update
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash - && apt-get install -y nodejs tree libfontconfig bzip2 && npm install --quiet --global vue-cli

RUN mkdir -p /usr/src/app && cp -a /tmp/node_modules /usr/src/app

WORKDIR /usr/src/app

WORKDIR /Falko-2017.2-FrontEnd

ADD package.json /Falko-2017.2-FrontEnd/package.json

RUN npm install
