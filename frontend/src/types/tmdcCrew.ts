export interface Person {
  adult?: boolean;
  gender?: number;
  id?: number;
  known_for_department?: string;
  name?: string;
  original_name?: string;
  popularity?: number;
  profile_path?: string | null;
}

export interface CastMember extends Person {
  cast_id?: number;
  character?: string;
  credit_id?: string;
  order?: number;
}

export interface CrewMember extends Person {
  credit_id?: string;
  department?: string;
  job?: string;
}

export interface MovieCredits {
  id: number;
  cast?: CastMember[];
  crew?: CrewMember[];
}
