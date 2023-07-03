export class Post {
  // public collections: IConnection<CollectionType>;
  public commentsCount: string | null;
  public createdAt: string | null;
  public description: string | null;
  public featuredAt: string | null;
  public id: string | null;
  public isCollected: boolean | null;
  public isVoted: boolean | null;
  public makers: boolean | null;
  public media: Array<{
    type: string;
    url: string;
    videoUrl: string;
  }> | null;
  public name: string | null;
  public productLinks: Array<{ type: string; url: string }> | null;
  public reviewsCount: string | null;
  public reviewsRating: string | null;
  public slug: string | null;
  public tagline: string | null;
  public thumbnail: { type: string; url: string; videoUrl: string } | null;
  public url: string | null;
  public votesCount: number | null;
  public website: string | null;

  constructor(post: PostType) {
    // this.collections = post.collections || null;
    this.commentsCount = post.commentsCount || null;
    this.createdAt = post.createdAt || null;
    this.description = post.description || null;
    this.featuredAt = post.featuredAt || null;
    this.id = post.id || null;
    this.isCollected = post.isCollected || null;
    this.isVoted = post.isVoted || null;
    this.makers = post.makers || null;
    this.media = post.media || null;
    this.name = post.name || null;
    this.productLinks = post.productLinks || null;
    this.reviewsCount = post.reviewsCount || null;
    this.reviewsRating = post.reviewsRating || null;
    this.slug = post.slug || null;
    this.tagline = post.tagline || null;
    this.thumbnail = post.thumbnail || null;
    this.url = post.url || null;
    this.votesCount = post.votesCount || null;
    this.website = post.website || null;
  }
}
