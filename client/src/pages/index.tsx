import { HomePage } from "@/components/pages";
import { getServerSideProps as homeGetServerSideProps } from "@/components/pages/home/get-server-side-props";
import { Article } from "@/types/article.types";
import { ShopItem } from "@/types/shop.types";

interface HomeProps {
  artists?: ShopItem[];
  articles?: Article[];
}

export default function Home({ artists, articles }: HomeProps) {
  return <HomePage artists={artists} articles={articles} />;
}

export const getServerSideProps = homeGetServerSideProps;
