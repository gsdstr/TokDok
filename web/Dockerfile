FROM node:lts as build-stage
WORKDIR ./app
COPY ./package*.json /app/
RUN npm ci
COPY ./ /app/

RUN npm run build -- --output-path=./dist/out --output-hashing=all

FROM nginx:stable
COPY --from=build-stage /app/dist/out/browser /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
