#!/bin/bash

echo Deply_Production...
npm run build

echo Upload to..
aws s3 cp ./docroot ....s3-url --recursive

echo CDN Invalidation...
aws cloudfront create-invalidation --distribution-id [DISTRIBUTION_ID] —-paths "/*"
