# Function: validateJwtAuthResponse

[💗 Help the project](https://github.com/sponsors/panva)

▸ **validateJwtAuthResponse**(`as`, `client`, `parameters`, `expectedState?`, `options?`): `Promise`<`CallbackParameters` \| [`OAuth2Error`](../interfaces/OAuth2Error.md)\>

Same as [validateAuthResponse](validateAuthResponse.md) but for signed JARM responses.

**`see`** [openid-financial-api-jarm-ID1 - JWT Secured Authorization Response Mode for OAuth 2.0 (JARM)](https://openid.net/specs/openid-financial-api-jarm-ID1.html)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `as` | [`AuthorizationServer`](../interfaces/AuthorizationServer.md) | Authorization Server Metadata. |
| `client` | [`Client`](../interfaces/Client.md) | Client Metadata. |
| `parameters` | `URL` \| `URLSearchParams` | JARM authorization response. |
| `expectedState?` | `string` \| typeof [`expectNoState`](../variables/expectNoState.md) \| typeof [`skipStateCheck`](../variables/skipStateCheck.md) | Expected `state` parameter value. Default is [expectNoState](../variables/expectNoState.md). |
| `options?` | [`HttpRequestOptions`](../interfaces/HttpRequestOptions.md) | - |

#### Returns

`Promise`<`CallbackParameters` \| [`OAuth2Error`](../interfaces/OAuth2Error.md)\>

Validated Authorization Response parameters or Authorization Error Response.
