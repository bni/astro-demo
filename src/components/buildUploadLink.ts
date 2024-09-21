import { Resource } from "sst";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const client = new S3Client();

export const buildUploadLink = async (): Promise<string> => {
  const putObjectCommand = new PutObjectCommand({
    Key: crypto.randomUUID(),
    Bucket: Resource.MyBucket.name
  });

  return await getSignedUrl(client, putObjectCommand);
};
