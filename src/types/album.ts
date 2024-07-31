export interface IAlbum {
  id: number;
  name: string;
  tracks: ITrack[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ITrack {
  id: number;
  name: string;
  album_id: number;
  duration: string;
  createdAt: Date;
  updatedAt: Date;
}
