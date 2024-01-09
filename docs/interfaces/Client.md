# Interface: Client

[💗 Help the project](https://github.com/sponsors/panva)

Recognized Client Metadata that have an effect on the exposed functionality.

**`See`**

[IANA OAuth Client Registration Metadata registry](https://www.iana.org/assignments/oauth-parameters/oauth-parameters.xhtml#client-metadata)

## Indexable

▪ [metadata: `string`]: [`JsonValue`](../types/JsonValue.md) \| `undefined`

## Table of contents

### Properties

- [client\_id](Client.md#client_id)
- [[clockSkew]](Client.md#[clockskew])
- [[clockTolerance]](Client.md#[clocktolerance])
- [authorization\_signed\_response\_alg](Client.md#authorization_signed_response_alg)
- [client\_secret](Client.md#client_secret)
- [default\_max\_age](Client.md#default_max_age)
- [id\_token\_signed\_response\_alg](Client.md#id_token_signed_response_alg)
- [introspection\_signed\_response\_alg](Client.md#introspection_signed_response_alg)
- [require\_auth\_time](Client.md#require_auth_time)
- [token\_endpoint\_auth\_method](Client.md#token_endpoint_auth_method)
- [userinfo\_signed\_response\_alg](Client.md#userinfo_signed_response_alg)

## Properties

### client\_id

• **client\_id**: `string`

Client identifier.

___

### [clockSkew]

• `Optional` **[clockSkew]**: `number`

Use to adjust the client's assumed current time. Positive and negative finite values
representing seconds are allowed. Default is `0` (Date.now() + 0 seconds is used).

**`Example`**

When the client's local clock is mistakenly 1 hour in the past

```ts
const client: oauth.Client = {
  client_id: 'abc4ba37-4ab8-49b5-99d4-9441ba35d428',
  // ... other metadata
  [oauth.clockSkew]: +(60 * 60),
}
```

**`Example`**

When the client's local clock is mistakenly 1 hour in the future

```ts
const client: oauth.Client = {
  client_id: 'abc4ba37-4ab8-49b5-99d4-9441ba35d428',
  // ... other metadata
  [oauth.clockSkew]: -(60 * 60),
}
```

___

### [clockTolerance]

• `Optional` **[clockTolerance]**: `number`

Use to set allowed client's clock tolerance when checking DateTime JWT Claims. Only positive
finite values representing seconds are allowed. Default is `30` (30 seconds).

**`Example`**

Tolerate 30 seconds clock skew when validating JWT claims like exp or nbf.

```ts
const client: oauth.Client = {
  client_id: 'abc4ba37-4ab8-49b5-99d4-9441ba35d428',
  // ... other metadata
  [oauth.clockTolerance]: 30,
}
```

___

### authorization\_signed\_response\_alg

• `Optional` **authorization\_signed\_response\_alg**: [`JWSAlgorithm`](../types/JWSAlgorithm.md)

JWS `alg` algorithm required for signing authorization responses. When not configured the
default is to allow only [supported algorithms](../types/JWSAlgorithm.md) listed in
[`as.authorization_signing_alg_values_supported`](AuthorizationServer.md#authorization_signing_alg_values_supported)
and fall back to `RS256` when the authorization server metadata is not set.

___

### client\_secret

• `Optional` **client\_secret**: `string`

Client secret.

___

### default\_max\_age

• `Optional` **default\_max\_age**: `number`

Default Maximum Authentication Age.

___

### id\_token\_signed\_response\_alg

• `Optional` **id\_token\_signed\_response\_alg**: `string`

JWS `alg` algorithm required for signing the ID Token issued to this Client. When not
configured the default is to allow only algorithms listed in
[`as.id_token_signing_alg_values_supported`](AuthorizationServer.md#id_token_signing_alg_values_supported)
and fall back to `RS256` when the authorization server metadata is not set.

___

### introspection\_signed\_response\_alg

• `Optional` **introspection\_signed\_response\_alg**: `string`

JWS `alg` algorithm REQUIRED for signed introspection responses. When not configured the
default is to allow only algorithms listed in
[`as.introspection_signing_alg_values_supported`](AuthorizationServer.md#introspection_signing_alg_values_supported)
and fall back to `RS256` when the authorization server metadata is not set.

___

### require\_auth\_time

• `Optional` **require\_auth\_time**: `boolean`

Boolean value specifying whether the [`auth_time`](IDToken.md#auth_time) Claim in the ID Token
is REQUIRED. Default is `false`.

___

### token\_endpoint\_auth\_method

• `Optional` **token\_endpoint\_auth\_method**: [`ClientAuthenticationMethod`](../types/ClientAuthenticationMethod.md)

Client [authentication method](../types/ClientAuthenticationMethod.md) for the client's authenticated
requests. Default is `client_secret_basic`.

___

### userinfo\_signed\_response\_alg

• `Optional` **userinfo\_signed\_response\_alg**: `string`

JWS `alg` algorithm REQUIRED for signing UserInfo Responses. When not configured the default is
to allow only algorithms listed in
[`as.userinfo_signing_alg_values_supported`](AuthorizationServer.md#userinfo_signing_alg_values_supported)
and fall back to `RS256` when the authorization server metadata is not set.
