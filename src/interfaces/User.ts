
export default interface User {
  avatar_url: string;
  badges: {
    creator_mid_tier: boolean;
    pro: boolean;
    pro_unlimited: boolean;
    verified: boolean;
  }
  city: string;
  country_code: string;
  first_name: string;
  followers_count: number;
  full_name: string;
  id: number;
  kind: "user";
  last_modified: string;
  last_name: string;
  permalink: string;
  permalink_url: string;
  station_permalink: string;
  station_urn: string;
  uri: string;
  urn: string;
  username: string;
  verified: boolean;
}