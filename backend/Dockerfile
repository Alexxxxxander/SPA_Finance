FROM node:14

WORKDIR /app
COPY . .
RUN rm -rf node_modules
RUN rm -rf package-lock.json
RUN npm install

EXPOSE 5000

CMD ["npm", "start"]
