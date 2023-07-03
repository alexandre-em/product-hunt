export class Collection {
  public coverImage: string | null;
  public createdAt: string | null;
  public description: string | null;
  public featuredAt: string | null;
  public followerCount: number | null;
  public id: string | null;
  public isFollowing: boolean | null;
  public name: string | null;
  public posts: IConnection<PostType> | null;
  public tagline: string | null;
  public url: string | null;
  public userId: string | null;

  constructor(collection: CollectionType) {
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
