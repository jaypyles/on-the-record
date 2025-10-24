export enum ArticleType {
  NEWS = "News",
  RELEASE = "Release",
}

export type Article = {
  id: string;
  title: string;
  subTitle: string;
  author: string;
  created: string;
  content: string;
  href?: string;
  image?: string;
  type?: ArticleType;
};
