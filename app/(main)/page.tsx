import HomePage from "@/app/(main)/_landing/home-page";
import { homePageMetadata } from "@/lib/metadata";

export const metadata = homePageMetadata;

export default function IndexPage() {
  return <HomePage />;
}
