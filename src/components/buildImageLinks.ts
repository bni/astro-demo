import { Resource } from "sst";
import { S3Client, ListObjectsV2Command, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const client = new S3Client();

export const buildImageLinks = async (): Promise<any[]> => {
  const listCommand = new ListObjectsV2Command({
    Bucket: Resource.MyBucket.name
  });

  const imageLinks: any[] = [];

  const { Contents } = await client.send(listCommand);

  if (Contents) {
    const sortedContents = Contents.sort((a, b) => (
        b.LastModified?.getTime() ?? 0) - (a.LastModified?.getTime() ?? 0
      )
    );

    for (const content of sortedContents) {
      const getObjectCommand = new GetObjectCommand({
        Bucket: Resource.MyBucket.name,
        Key: content.Key
      });

      const link = await getSignedUrl(new S3Client(), getObjectCommand);

      imageLinks.push(link);
    }
  }

  return imageLinks;
};
