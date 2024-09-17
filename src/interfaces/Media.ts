export interface Transcoding {
  duration: number;
  format: Format;
  preset: string;
  quality: string;
  snipped: boolean;
  url: string;
}

export interface Format {
  mime_type: string;
  protocol: string;
}