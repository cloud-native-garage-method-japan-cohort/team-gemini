FROM quay.io/jeffdean/node-alpine as build
WORKDIR /webapp
COPY . .

RUN npm install
RUN npm run build

FROM quay.io/jeffdean/nginx-unprivileged
COPY --from=build /webapp/build /usr/share/nginx/html
COPY --from=build /webapp/nginx.conf /etc/nginx/conf.d/default.conf