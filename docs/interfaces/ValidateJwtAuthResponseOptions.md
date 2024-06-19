# Interface: ValidateJwtAuthResponseOptions

[💗 Help the project](https://github.com/sponsors/panva)

## Table of contents

### Properties

- [[customFetch]](ValidateJwtAuthResponseOptions.md#customfetch)
- [[experimental\_jwksCache]](ValidateJwtAuthResponseOptions.md#experimental_jwkscache)
- [headers](ValidateJwtAuthResponseOptions.md#headers)
- [signal](ValidateJwtAuthResponseOptions.md#signal)

## Properties

### [customFetch]

• `Optional` **[customFetch]**: (`input`: `RequestInfo` \| [`URL`]( https://developer.mozilla.org/docs/Web/API/URL ), `init?`: `RequestInit`) => [`Promise`]( https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise )\<[`Response`]( https://developer.mozilla.org/docs/Web/API/Response )\>

See [customFetch](../variables/customFetch.md).

___

### [experimental\_jwksCache]

• `Optional` **[experimental\_jwksCache]**: [`JWKSCacheInput`](../types/JWKSCacheInput.md)

See [experimental_jwksCache](../variables/experimental_jwksCache.md).

___

### headers

• `Optional` **headers**: [`Record`]( https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type )\<`string`, `string`\> \| [`string`, `string`][] \| [`Headers`]( https://developer.mozilla.org/docs/Web/API/Headers )

Headers to additionally send with the HTTP request(s) triggered by this function's invocation.

___

### signal

• `Optional` **signal**: [`AbortSignal`]( https://developer.mozilla.org/docs/Web/API/AbortSignal ) \| () => [`AbortSignal`]( https://developer.mozilla.org/docs/Web/API/AbortSignal )

An AbortSignal instance, or a factory returning one, to abort the HTTP request(s) triggered by
this function's invocation.

**`Example`**

A 5000ms timeout AbortSignal for every request

```js
const signal = () => AbortSignal.timeout(5_000) // Note: AbortSignal.timeout may not yet be available in all runtimes.
```

## Hierarchy

- [`HttpRequestOptions`](HttpRequestOptions.md)

- [`JWKSCacheOptions`](JWKSCacheOptions.md)

  ↳ **`ValidateJwtAuthResponseOptions`**
