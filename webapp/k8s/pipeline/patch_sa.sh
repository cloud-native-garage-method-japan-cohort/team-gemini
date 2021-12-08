#!/bin/bash
kubectl patch serviceaccount build-bot-frontend -p '{"imagePullSecrets": [{"name": "quay-io-team-gemini-password"}]}'
