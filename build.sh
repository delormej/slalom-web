VERSION=v$(node -p "require('./package.json').version")
npm run clean
docker build -t skiweb:$VERSION --build-arg skiapi_host=api.ski.jasondel.com -f Dockerfile . 
docker run --rm --name skiweb1 -e PORT=3000 -p 3000:3000 skiweb:$VERSION

docker tag skiweb:$VERSION wthacr.azurecr.io/skiweb:$VERSION
docker push wthacr.azurecr.io/skiweb:$VERSION