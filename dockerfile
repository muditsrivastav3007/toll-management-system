FROM node:12-alpine

WORKDIR /toll_management_system/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN cd toll_management_system/src/app

EXPOSE 3000

CMD [ "node", "index.js" ]
