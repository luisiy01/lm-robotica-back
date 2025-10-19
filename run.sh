#!/bin/bash
echo "NODE_ENV: $NODE_ENV";

if [ "$NODE_ENV" == "prod" ]
    then
        echo "start prod mode...";
        yarn start
else
    echo "start dev mode...";
    yarn start
fi