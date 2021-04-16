VERSION=v$(node -p "require('./package.json').version")

docker build -t gcr.io/$GOOGLE_PROJECT_ID/skiweb:$VERSION \
     --build-arg skiapi_host=$SKIAPI_HOST \
     -f Dockerfile . 

echo "Go ahead and test..."
docker run --rm -it \
    -e PORT=3000 -p 3000:3000 \
    --name skiweb1 \
    gcr.io/$GOOGLE_PROJECT_ID/skiweb:$VERSION

# Now push container to registry.
docker push gcr.io/$GOOGLE_PROJECT_ID/skiweb:$VERSION
