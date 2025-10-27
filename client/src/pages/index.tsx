import { HomePage } from "@/components/pages";
import { getServerSideProps as homeGetServerSideProps } from "@/components/pages/home/get-server-side-props";
import { useAnonymousSession } from "@/hooks/use-anonymous-session";
import { Article } from "@/types/article.types";
import { ShopItem } from "@/types/shop.types";

interface HomeProps {
  artists?: ShopItem[];
  articles?: Article[];
  previouslyViewed?: boolean;
}

export default function Home({
  artists,
  articles,
  previouslyViewed,
}: HomeProps) {
  return (
    <HomePage
      artists={artists}
      articles={articles}
      previouslyViewed={previouslyViewed}
    />
  );
}

export const getServerSideProps = homeGetServerSideProps;
