export enum ArticleType {
  NEWS = "News",
  RELEASE = "Release",
}

export type Article = {
  title: string;
  subTitle: string;
  author: string;
  created: string;
  href?: string;
  image?: string;
  type?: ArticleType;
};
