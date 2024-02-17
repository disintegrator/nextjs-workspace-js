"use client";

import { GhAcme as SDK } from "@disintegrator/httpbin-client";
import React from "react";
import { useQuery } from "@tanstack/react-query";

async function generateUUID(sdk: SDK) {
  const res = await sdk.generateUUID();
  const uuid = res.object?.uuid;
  if (!uuid) {
    throw new Error("No UUID found");
  }
  return uuid;
}

export function ClientIDCard() {
  const sdk = React.useMemo(() => new SDK(), []);
  const query = useQuery({
    queryKey: ["uuid"],
    queryFn: () => generateUUID(sdk),
  });

  return (
    <p>
      Client component using SDK:
      <br />
      <code>
        {query.status === "error" ? query.error.message : null}
        {query.status === "success" ? query.data : null}
        {query.status === "pending" ? " Initializing..." : null}
      </code>
    </p>
  );
}
