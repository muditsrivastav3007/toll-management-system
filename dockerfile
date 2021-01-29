FROM node:12-alpine

RUN mkdir -p /toll_management_system

COPY package*.json ./

RUN npm install

COPY . /toll_management_system

WORKDIR /toll_management_system/src/app

EXPOSE 3000

CMD [ "node", "index.js" ]
