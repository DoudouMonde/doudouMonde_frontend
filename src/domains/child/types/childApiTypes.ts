export interface ChildItemResponse {
  id: number;
  name: string;
  birthday: string;
  gender: string;
  profile: string;
  sido: string;
}

export interface ChildListResponse {
  contents: ChildItemResponse[];
}
