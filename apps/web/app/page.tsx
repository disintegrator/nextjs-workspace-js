import { GhAcme as SDK } from "@disintegrator/httpbin-client";
import { unstable_noStore } from "next/cache";
import { ClientIDCard } from "../components/id-card";

async function ServerIDCard() {
  const sdk = new SDK();
  const res = await sdk.generateUUID();
  const uuid = res.object?.uuid || "";
  return (
    <p>
      Server component using SDK:
      <br />
      <code>{uuid}</code>
    </p>
  );
}

export default async function Page() {
  unstable_noStore();

  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <div>
        <ServerIDCard />
        <ClientIDCard />
      </div>
    </main>
  );
}
