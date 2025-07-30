---
title: Use Sentry in Next.js
description: A practical guide to use Sentry in Next.js
date: 2025-07-29
image: https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
minRead: 10
author:
  name: Bobby Lin
  avatar:
    src: https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
    alt: Bobby Lin
---

# Use Sentry in Next.js

Sentry 提供端到端的分布式追踪，使开发者能够识别和调试其系统和服务的性能问题和错误。

## Setup with Next.js

[Manual Setup | Sentry for Next.js](https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/)

### 1. Install the Sentry SDK
```bash
pnpm add @sentry/nextjs
```

### 2. 修改 `next.config.js`
```ts [next.config.js]{2} meta-info=val
  import { withSentryConfig } from "@sentry/nextjs";

  const nextConfig = {
    // Your existing Next.js configuration
  };

  // Make sure adding Sentry options is the last code to run before exporting
  export default withSentryConfig(nextConfig, {
    org: "example-org",
    project: "example-project",

    // Only print logs for uploading source maps in CI
    // Set to `true` to suppress logs
    silent: !process.env.CI,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,
  });

```
    
### 3. App Router 需要在 `app/layout.tsx` 上添加额外配置
  ```tsx
  import * as Sentry from "@sentry/nextjs";
  import type { Metadata } from "next";

  export function generateMetadata(): Metadata {
    return {
      // ... your existing metadata
      other: {
        ...Sentry.getTraceData(),
      },
    };
  }

  ```
    
### 4. 配置三种环境下的sentry配置，需要加在根目录上
#### 4.1. client `instrumentation-client.(js|ts)`      
  ```tsx
  import * as Sentry from "@sentry/nextjs";
  
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  
    // Adds request headers and IP for users, for more info visit:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
    sendDefaultPii: true,

    // Capture Replay for 10% of all sessions,
    // plus for 100% of sessions with an error
    // Learn more at
    // https://docs.sentry.io/platforms/javascript/session-replay/configuration/#general-integration-configuration
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  
    // Note: if you want to override the automatic release value, do not set a
    // `release` value here - use the environment variable `SENTRY_RELEASE`, so
    // that it will also get attached to your source maps
  });
  
  // This export will instrument router navigations, and is only relevant if you enable tracing.
  // `captureRouterTransitionStart` is available from SDK version 9.12.0 onwards
  export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
  ```

#### 4.2. server `sentry.server.config.(js|ts)`
        
```tsx
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: true,

  // ...

  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});
```
        
#### 4.3. edge `sentry.edge.config.(js|ts)`
        
```tsx
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Adds request headers and IP for users, for more info visit:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
  sendDefaultPii: true,

  // ...

  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
});
```
        
#### 4.4. 注册Sentry服务端SDK，并初始化
    
在根目录或者src（如果有）下创建 `instrumentation.ts`

```tsx
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  }
}
```
    
#### 4.5. 捕获React渲染错误
    
在Next.js的 `error.tsx` 或者 `global-error.tsx` 中加入

```tsx
"use client";

import * as Sentry from "@sentry/nextjs";
import NextError from "next/error";
import { useEffect } from "react";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        {/* `NextError` is the default Next.js error page component. Its type
        definition requires a `statusCode` prop. However, since the App Router
        does not expose status codes for errors, we simply pass 0 to render a
        generic error message. */}
        <NextError statusCode={0} />
      </body>
    </html>
  );
}
```

#### 4.6. 获取嵌套的React Server Component错误：需要在 `instrumentation.ts` 中加入

```tsx
import * as Sentry from "@sentry/nextjs";

export const onRequestError = Sentry.captureRequestError;
```
    

# Configuration

## 1. `dsn`

```
dsn: 'https://<key>@o<org>.ingest.sentry.io/<project>',

```

- 用于告诉 Sentry SDK 报错应该发送到哪个项目。
- 如果为空（`dsn: ''`），Sentry 不会上传任何数据。

---

## 2. `tracesSampleRate`（性能监控采样率）

```
tracesSampleRate: 1.0,
```

- 取值范围：`0 ~ 1`
- 表示采集请求/事务追踪数据（如前端加载、API 调用）的比例
- 开发阶段推荐设为 `1.0`，上线后通常设置为 `0.1` 或更低以减少数据量。

---

## 3. `replaysSessionSampleRate` 和 `replaysOnErrorSampleRate`（会话回放）

```
replaysSessionSampleRate: 0.1,       // 正常会话记录采样率
replaysOnErrorSampleRate: 1.0,       // 出错会话记录采样率
```

- 让你可以「重现」用户出现错误时的操作轨迹
- 非常适合定位前端 UI 问题（如点击、滚动、导航等）

---

## 4. `sendDefaultPii`（是否发送用户隐私数据）

```
sendDefaultPii: true,
```

- 是否发送如 IP、Cookie、用户邮箱等信息
- 若开启，可用于 `setUser({ email })` 显示用户身份

---

## 5. `integrations`（集成插件）

```
integrations: [
  Sentry.browserTracingIntegration(),
  Sentry.replayIntegration(),
  Sentry.feedbackIntegration(),
]
```

常见插件：

| 插件 | 用途 |
| --- | --- |
| `BrowserTracing` | 前端性能监控（用于页面加载时间、资源加载、API 调用等） |
| `Replay` | 用户操作录屏 |
| `Feedback` | 内置用户反馈 UI，可弹出对话框收集意见 |
| `HttpClient` | 追踪 XMLHttpRequest 和 Fetch 请求 |
| `Console` | 收集 `console.error` 等信息 |
| `SessionTiming` | 记录用户会话时间（默认包含） |

---

## 6. `beforeSend`（发送前钩子）

```
beforeSend(event, hint) {
  if (event.message?.includes('IgnoreError')) return null;
  return event;
}
```

- 可用于过滤错误或对错误做自定义处理
- 返回 `null` 表示忽略该事件，不上传

---

## 7. `environment`（环境标签）

```
environment: process.env.NODE_ENV,
```

- 自定义错误所在环境，如：`production`、`staging`、`dev`
- 有助于 Sentry 控制台中分环境查看问题

---

## 8. 用户信息（需要手动设置）

```tsx
Sentry.setUser({
  id: '12345',
  email: 'user@example.com',
  username: 'tester',
});
```

- 用于将错误归属到具体用户（前提是你知道用户信息）
- 会体现在 Sentry 控制台的 Issue 详情页

---

## 9. 标签和上下文（Tag / Context）

```tsx
Sentry.setTag('feature', 'checkout');
Sentry.setContext('cart', {
  items: 3,
  total: 100,
});
```

- 标签用于分类/筛选错误（如模块、浏览器类型）
- 上下文是结构化数据，通常用于补充错误场景

---

## 10. 手动捕获异常

```tsx
try {
  // some code
} catch (e) {
  Sentry.captureException(e);
}
```

或手动记录信息：

```
Sentry.captureMessage('Something unusual happened');
```

---

## 11. 分布式追踪配置（performance）

若你在多端项目中（前端 + 后端）都用了 Sentry，还可通过：

```
Sentry.getCurrentHub().getScope()?.getSpan()?.toTraceparent()

```

传递 `traceparent` header 实现端到端追踪（如 API 调用链追踪）。

---

## 12. 调试配置

```
debug: true,

```

- 会将所有 Sentry 相关行为输出到浏览器控制台（用于调试初始化过程）

# Verify

1. 在 `.env` 中加入sentry.io中的DSN
2. 模拟触发一个Error
3. 在Sentry控制台可以看到错误信息
