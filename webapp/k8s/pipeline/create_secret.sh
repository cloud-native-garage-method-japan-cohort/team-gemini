#!/bin/bash
export CONTAINER_REGISTRY_SERVER='https://quay.io'
export CONTAINER_REGISTRY_USER='yu_yamanaka_ibm'
export CONTAINER_REGISTRY_PASSWORD='SwSvqex0sytn9zxEa+R7o5TcMVmQjHZTrbS+x+3VFZ3lJo/+ktR5iT3+ozx0ePz7'
kubectl create secret -n team-gemini docker-registry quay-io-team-gemini-password --docker-server=$CONTAINER_REGISTRY_SERVER --docker-username=$CONTAINER_REGISTRY_USER --docker-password=$CONTAINER_REGISTRY_PASSWORD

