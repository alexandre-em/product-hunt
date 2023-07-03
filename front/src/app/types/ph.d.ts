interface IEdge<T> {
  cursor: string;
  node: T;
}

type IPageInfo = {
  endCursor: string;
  hasNextPage: string;
  hasPreviousPage: string;
  startCursor: string;
};

interface IConnection<T> {
  edges: Array<IEdge<T>>;
  nodes: Array<T>;
  pageInfo: IPageInfo;
  totalCount: number;
}

type PostType = {
  collections: IConnection<CollectionType>;
  commentsCount: string;
  createdAt: string;
  description: string;
  featuredAt: string;
  id: string;
  isCollected: boolean;
  isVoted: boolean;
  makers: boolean;
  media: {
    type: string;
    url: string;
    videoUrl: string;
  }[];
  name: string;
  productLinks: Array<{ type: string; url: string }>;
  reviewsCount: string;
  reviewsRating: string;
  slug: string;
  tagline: string;
  thumbnail: { type: string; url: string; videoUrl: string };
  url: string;
  votesCount: number;
  website: string;
};

type CollectionType = {
  coverImage: string;
  createdAt: string;
  description: string;
  featuredAt: string;
  followerCount: number;
  id: string;
  isFollowing: boolean;
  name: string;
  posts: IConnection<PostType>;
  tagline: string;
  url: string;
  userId: string;
};

type QueryType = {
  posts?: IConnection<PostType>;
  collections?: IConnection<CollectionType>;
};
