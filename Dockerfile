FROM node:lts AS build
ARG default_port=3000
ARG skiapi_host
ENV REACT_APP_SKIAPI_HOST=${skiapi_host}

RUN echo "SKIAPI_HOST: $skiapi_host"

COPY . /src/
WORKDIR /src/
RUN npm install && npm run build

FROM node:lts-slim AS runtime
ENV PORT=${default_port}

COPY --from=build /src/build /slalom-web
RUN npm install -g serve

ENTRYPOINT /usr/local/bin/serve -s /slalom-web -l ${PORT}