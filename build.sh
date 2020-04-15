npm run clean
docker build -t skiweb:v1.1.0 --build-arg skiapi_host=api.ski.jasondel.com -f Dockerfile . 
docker run --rm --name skiweb1 -e PORT=3000 -p 3000:3000 skiweb:v1.1.0   

docker tag skiweb:v1.1.0 wthacr.azurecr.io/skiweb:v1.1.0
docker push wthacr.azurecr.io/skiweb:v1.1.0