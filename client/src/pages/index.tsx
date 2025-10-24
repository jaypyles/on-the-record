import { HomePage } from "@/components/pages";
import { getServerSideProps as homeGetServerSideProps } from "@/components/pages/home/get-server-side-props";
import { ShopItem } from "@/types/shop.types";

interface HomeProps {
  artists?: ShopItem[];
}

export default function Home({ artists }: HomeProps) {
  return <HomePage artists={artists} />;
}

export const getServerSideProps = homeGetServerSideProps;
