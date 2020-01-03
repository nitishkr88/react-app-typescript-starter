FROM node:11

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
COPY internals/scripts/npmcheckversion.js ./internals/scripts/

RUN npm install --unsafe-perm

# Bundle app source
COPY . .

EXPOSE 3000
ENTRYPOINT [ "npm", "run" ]
CMD [ "start:production" ]
