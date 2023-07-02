export class Collection {
  public coverImage: string;
  public createdAt: string;
  public description: string;
  public featuredAt: string;
  public followerCount: number;
  public id: string;
  public isFollowing: boolean;
  public name: string;
  // public posts: IConnection<ProductType>;
  public tagline: string;
  public url: string;
  public userId: string;

  constructor(collection: any) {
    this.coverImage = collection?.coverImage || null;
    this.createdAt = collection?.createdAt || null;
    this.description = collection?.description || null;
    this.featuredAt = collection?.featuredAt || null;
    this.followerCount = collection?.followerCount || null;
    this.id = collection?.id || null;
    this.isFollowing = collection?.isFollowing || null;
    this.name = collection?.name || null;
    this.tagline = collection?.tagline || null;
    this.url = collection?.url || null;
    this.userId = collection?.userId || null;
  }
}
