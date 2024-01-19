export interface Athlete {
  id:                     number;
  username?:               string;
  resource_state?:         number;
  firstname?:              string;
  lastname?:               string;
  city?:                   string;
  state?:                  string;
  country?:                string;
  sex?:                    string;
  premium?:                boolean;
  created_at?:             Date;
  updated_at?:             Date;
  badge_type_id?:          number;
  profile_medium?:         string;
  profile?:                string;
  friend?:                 null;
  follower?:               null;
  follower_count?:         number;
  friend_count?:           number;
  mutual_friend_count?:    number;
  athlete_type?:           number;
  date_preference?:        string;
  measurement_preference?: string;
  clubs?:                  any[];
  ftp?:                    null;
  weight?:                 number;
  bikes?:                  Bike[];
  shoes?:                  Bike[];
}

export interface Bike {
  id:             string;
  primary?:        boolean;
  name?:           string;
  resource_state?: number;
  distance?:       number;
}
