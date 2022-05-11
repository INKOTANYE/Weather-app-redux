FROM node: alpine:3.14
WORKDIR /weather-app
ENV PATH="./node_modules/.bin:$PATH"
COPY . .
RUN npm run build
CMD ["npm", "start"]