# Use node: 8 for image
FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

# npm install - only with production dependencies
RUN npm install --only=production

# Bundle app source
COPY . .

# allow connections to port 8080
EXPOSE 8080

# start app
CMD [ "npm", "start" ]