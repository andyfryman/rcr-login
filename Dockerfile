ARG NODE_TAG=14
FROM node:${NODE_TAG}
WORKDIR /usr/src/app/
COPY ./app/package*.json ./
RUN npm install
COPY ./app ./
CMD [ "npm", "start" ]