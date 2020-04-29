VERSION=v$(node -p "require('./package.json').version")

docker build -t skiweb:$VERSION --build-arg skiapi_host=$SKIAPI_HOST -f Dockerfile . 

echo "Go ahead and test..."
docker run --rm --name skiweb1 -e PORT=3000 -p 3000:3000 skiweb:$VERSION

# Now push container to ACR.
az acr login -n wthacr
docker tag skiweb:$VERSION wthacr.azurecr.io/skiweb:$VERSION
docker push wthacr.azurecr.io/skiweb:$VERSION