#!/bin/bash
oc policy add-role-to-user cluster-admin -z tekton-triggers-sa
