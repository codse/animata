import { NotFoundPage } from "@/components/not-found-page";
import { notFoundMetadata } from "@/lib/metadata";

export const metadata = notFoundMetadata;

export default function NotFound() {
  return <NotFoundPage />;
}
