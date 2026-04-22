export interface Bucket {
  id: string;
  title: string;
  options: string[];
  btnLabel: string;
}

export interface PageConfig {
  id: string;
  name: string;
  version: string;
  primaryColor: string; 
  highlightColor: string;
  buckets: [Bucket, Bucket, Bucket];
  promptPrefix: string;
}
