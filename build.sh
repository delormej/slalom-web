VERSION=v$(node -p "require('./package.json').version")
SKIAPI_HOST=ski.jasondel.com

npm run clean
docker build -t skiweb:$VERSION --build-arg skiapi_host=$SKIAPI_HOST -f Dockerfile . 
docker run --rm --name skiweb1 -e PORT=3000 -p 3000:3000 skiweb:$VERSION

echo "Go ahead and test..."

# Now push container to ACR.
docker tag skiweb:$VERSION wthacr.azurecr.io/skiweb:$VERSION
docker push wthacr.azurecr.io/skiweb:$VERSION