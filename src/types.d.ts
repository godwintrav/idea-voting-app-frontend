export interface Idea {
  date: number;
  description?: string;
  id: string;
  ideaTitle: string;
  votes: number;
}

export interface BoardData extends BoardListData {
  ideas: Idea[];
}

export interface BoardListData {
  boardName: string;
  description?: string;
  date: number;
  id: string;
  owner: string;
  public: true;
}
