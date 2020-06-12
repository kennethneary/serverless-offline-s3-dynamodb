all: offline

install:
	npm install
	serverless dynamodb install

offline:
	serverless offline start

# test local S3 events
offline-test:
	AWS_ACCESS_KEY_ID=S3RVER AWS_SECRET_ACCESS_KEY=S3RVER \
		aws --endpoint http://localhost:9000 \
		s3 cp ./S3_local_test_data/test_data.txt s3://local-product-bucket/test_data.txt

	AWS_ACCESS_KEY_ID=S3RVER AWS_SECRET_ACCESS_KEY=S3RVER \
		aws --endpoint http://localhost:9000 \
		s3 cp s3://local-product-bucket/test_data.txt  ./processed_test_data.txt
	cat processed_test_data.txt

	AWS_ACCESS_KEY_ID=S3RVER AWS_SECRET_ACCESS_KEY=S3RVER \
		aws --endpoint http://localhost:9000 \
		s3api put-object --bucket local-product-bucket --key processed_test_data.txt --body ./processed_test_data.txt

	AWS_ACCESS_KEY_ID=S3RVER AWS_SECRET_ACCESS_KEY=S3RVER \
		aws --endpoint http://localhost:9000 \
		s3 cp ./S3_local_test_data/test.jpg s3://local-product-bucket/incoming/test.jpg