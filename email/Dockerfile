# FROM node:18-alpine

# # Create app directory
# WORKDIR /usr/src/app

# # Install app dependencies
# COPY package*.json ./
# RUN npm install

# # Bundle app source
# COPY . .
# #did not exposeed the port as it doesn't matter. 😂

# # Start command
# CMD [ "node", "src/index.js" ]


# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Create a non-root user
RUN adduser -D appuser && chown -R appuser /app
USER appuser

CMD ["node", "src/index.js"]