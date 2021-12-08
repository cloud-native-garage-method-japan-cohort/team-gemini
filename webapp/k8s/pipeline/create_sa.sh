#!/bin/bash
kubectl create sa build-bot-frontend
kubectl patch serviceaccount build-bot-frontend -p '{"secrets": [{"name": "quay-io-team-gemini-password"}]}'
kubectl get sa -n team-gemini build-bot-frontend -o yaml
oc policy add-role-to-user cluster-admin -z build-bot-frontend


