import { HomePage } from "@/components/site/HomePage";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata("ar");

export default function Page() {
  return <HomePage locale="ar" />;
}
