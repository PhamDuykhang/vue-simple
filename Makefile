dockerFileLocation=./deployment/Dockerfile
imageName=sportstore
buildVersions=1.0
outTraficePort=8080
inTraficePort=8080

run_be_dev:
	yarn install; yarn json

run_dev:
	yarn install; yarn serve
run_prob:
	docker build -f $(dockerFileLocation) . -t $(imageName):$(buildVersions) ; \
	docker run -p $(outTraficePort):$(inTraficePort) $(imageName):$(buildVersions)