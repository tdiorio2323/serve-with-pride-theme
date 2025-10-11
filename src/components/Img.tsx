import React from "react";

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  fetchPriority?: "high" | "low" | "auto";
};

export function Img({ fetchPriority, ...rest }: Props) {
  const extra: Record<string, unknown> = fetchPriority ? { fetchpriority: fetchPriority } : {};
  return <img {...extra} {...rest} />;
}
