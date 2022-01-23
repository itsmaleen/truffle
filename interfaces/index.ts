interface Properties {
  version: string;
  name: string;
  description: string;
  mimeType: string;
}

export default interface Token {
  id: string;
  name: string;
  image: string;
  description: string;
  contentUri: string;
  properties: Properties;
  uri: string;
}
