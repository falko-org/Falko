FROM node:slim

MAINTAINER alaxallves@gmail.com

RUN apt-get update
RUN curl -sL https://deb.nodesource.com/setup_7.x | bash - && apt-get install -y nodejs && npm install --save-dev babel-preset-env 

RUN npm install --quiet --global vue-cli

RUN mkdir /Falko-2017.2-FrontEnd

COPY . /Falko-2017.2-FrontEnd

WORKDIR $PWD/Falko-2017.2-FrontEnd

ADD package.json /Falko-2017.2-FrontEnd/package.json
ADD node_modules/ /Falko-2017.2-FrontEnd/node_modules/ 


ADD . $PWD/
