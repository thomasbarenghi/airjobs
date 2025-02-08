docker build -t airjobs-api .
docker run -it -p 3000:3000 --env-file .env airjobs-api
