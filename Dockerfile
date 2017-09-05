FROM node:slim

MAINTAINER alaxallves@gmail.com

RUN apt-get update
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash - && apt-get install -y nodejs && npm install --save-dev babel-preset-env && npm install --quiet --global vue-cli

RUN mkdir /Falko-2017.2-FrontEnd
COPY . /Falko-2017.2-FrontEnd

WORKDIR /Falko-2017.2-FrontEnd

ADD . /Falko-2017.2-FrontEnd
