VERSION=v$(node -p "require('./package.json').version")

docker build -t skiweb:$VERSION --build-arg skiapi_host=$SKIAPI_HOST -f Dockerfile . 

#echo "Go ahead and test..."
#docker run --rm --name skiweb1 -e PORT=3000 -p 3000:3000 skiweb:$VERSION

# Now push container to registry.
docker tag skiweb:$VERSION gcr.io/gke-ski/skiweb:$VERSION
docker push gcr.io/gke-ski/skiweb:$VERSION