# @m5r/og

[https://vercel.com/docs/concepts/functions/edge-functions/og-image-generation](`@vercel/og`) but it works with Node.js

## API Reference

The API is compatible with `@vercel/og`.

The package exposes an `ImageResponse` constructor, with the following options available:

```ts
import type { ReactElement } from "react";
import { ImageResponse } from "@vercel/og";

new ImageResponse(
  element: ReactElement,
  options: {
    width?: number = 1200
    height?: number = 630
    emoji?: "twemoji" | "blobmoji" | "noto" | "openmoji" | "fluent" | "fluentFlat" = "twemoji",
    fonts?: {
      name: string,
      data: ArrayBuffer,
      weight: number,
      style: "normal" | "italic"
    }[]
    debug?: boolean = false

    // Options that will be passed to the HTTP response
    status?: number = 200
    statusText?: string
    headers?: Record<string, string>
  },
);
```

When running in production, these headers will be included:

```ts
"content-type": "image/png",
"cache-control": "public, immutable, no-transform, max-age=31536000",
```

During development, the `cache-control: no-cache, no-store` header is used instead.

## Acknowledgements

This project will not be possible without the following projects:

- [@vercel/og](https://vercel.com/docs/concepts/functions/edge-functions/og-image-generation)
- [Satori](https://github.com/vercel/satori)
- [Twemoji](https://github.com/twitter/twemoji)
- [Google Fonts](https://fonts.google.com) and [Noto Sans](https://www.google.com/get/noto/)
- [Resvg](https://github.com/RazrFalcon/resvg) and [Resvg.js](https://github.com/yisibl/resvg-js)
