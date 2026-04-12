"use client";

import { copyToClipboardWithMeta } from "@/components/copy-button";

export function CopyProxy({ id, value }: { id: string; value: string }) {
  return (
    <button
      type="button"
      id={id}
      onClick={() => {
        copyToClipboardWithMeta(value);
      }}
      style={{ display: "none" }}
    />
  );
}
