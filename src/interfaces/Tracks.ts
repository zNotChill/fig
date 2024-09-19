import { Transcoding } from "./Media";
import User from "./User";

export interface TrackInfo {
  id: number;
  title: string;
  artist: string;
  album: string;
  cover: string;
  duration: number;
  volume: number;
}

export interface APITrack {
  artwork_url: string,
  caption: any,
  comment_count: number,
  commentable: boolean,
  created_at: string,
  description: string,
  display_date: string,
  download_count: number,
  downloadable: boolean,
  duration: number,
  embeddable_by: string,
  full_duration: number,
  genre: string,
  has_downloads_left: boolean,
  id: number,
  kind: string,
  label_name: string,
  last_modified: string,
  license: string,
  likes_count: number,
  media: {
    transcodings: Transcoding[]
  },
  monetization_model: string,
  permalink: string,
  permalink_url: string,
  playback_count: number,
  policy: string,
  public: boolean,
  publisher_metadata: PublisherMetadata,
  purchase_title: string,
  release_date: string,
  reposts_count: number,
  secret_token: string,
  sharing: string,
  state: string,
  station_permalink: string,
  station_urn: string,
  streamable: boolean,
  tag_list: string,
  title: string,
  track_authorization: string,
  uri: string,
  urn: string,
  user: User,
  user_id: number,
  visuals: any,
  waveform_url: string
}

export interface APISong {
  track: APITrack,
  track_id: number,
  played_at: string,
}

export interface PublisherMetadata {
  album_title: string;
  contains_music: boolean;
  id: number;
  urn: string;
}