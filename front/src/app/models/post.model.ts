export class Post {
  // public collections: IConnection<CollectionType>;
  public commentsCount: string;
  public createdAt: string;
  public description: string;
  public featuredAt: string;
  public id: string;
  public isCollected: boolean;
  public isVoted: boolean;
  public makers: boolean;
  public media: Array<{
    type: string;
    url: string;
    videoUrl: string;
  }>;
  public name: string;
  public productLinks: Array<{ type: string; url: string }>;
  public reviewsCount: string;
  public reviewsRating: string;
  public slug: string;
  public tagline: string;
  public thumbnail: { type: string; url: string; videoUrl: string };
  public url: string;
  public votesCount: number;
  public website: string;

  constructor(post: any) {
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
