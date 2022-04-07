const NAME = 'oauth4webapi'
const VERSION = 'v0.2.1'
const HOMEPAGE = 'https://github.com/panva/oauth4webapi'
const USER_AGENT = `${NAME}/${VERSION} (${HOMEPAGE})`

/**
 * Interface to pass an asymmetric public key and, optionally, its associated
 * JWK Key ID to be added as a `kid` JOSE Header Parameter.
 */
export interface PublicKey {
  /**
   * An asymmetric public
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/CryptoKey CryptoKey}.
   *
   * Its algorithm must be compatible with a supported
   * {@link KeyManagementAlgorithm JWE "alg" Key Management Algorithm}.
   */
  key: CryptoKey

  /**
   * JWK Key ID to add to JOSE headers when this key is used. When not provided
   * no `kid` (JWK Key ID) will be added to the JOSE Header.
   */
  kid?: string
}

/**
 * Interface to pass an asymmetric private key and, optionally, its associated
 * JWK Key ID to be added as a `kid` JOSE Header Parameter.
 */
export interface PrivateKey {
  /**
   * An asymmetric private
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/CryptoKey CryptoKey}.
   *
   * Its algorithm must be compatible with a supported
   * {@link JWSAlgorithm JWS "alg" Algorithm}.
   */
  key: CryptoKey

  /**
   * JWK Key ID to add to JOSE headers when this key is used. When not provided
   * no `kid` (JWK Key ID) will be added to the JOSE Header.
   */
  kid?: string
}

/**
 * Supported Client Authentication Methods.
 *
 * - **`client_secret_basic`** (default) uses the HTTP `Basic` authentication scheme
 * to send
 * {@link Client.client_id `client_id`} and
 * {@link Client.client_secret `client_secret`}
 * in an `Authorization` HTTP Header.
 *
 * - **`client_secret_post`** uses the HTTP request body to send
 * {@link Client.client_id `client_id`} and
 * {@link Client.client_secret `client_secret`}
 * as `application/x-www-form-urlencoded` body parameters.
 *
 * - **`private_key_jwt`** uses the HTTP request body to send
 * {@link Client.client_id `client_id`}, `client_assertion_type`, and `client_assertion`
 * as `application/x-www-form-urlencoded` body parameters.
 * The `client_assertion` is signed using a private key supplied
 * as an {@link AuthenticatedRequestOptions.clientPrivateKey options parameter}.
 *
 * - **`client_secret_jwt`** uses the HTTP request body to send
 * {@link Client.client_id `client_id`}, `client_assertion_type`, and `client_assertion`
 * as `application/x-www-form-urlencoded` body parameters.
 * The `client_assertion` is signed using the {@link Client.client_secret `client_secret`}.
 *
 * - **`none`** (public client) uses the HTTP request body to send only
 * {@link Client.client_id `client_id`}
 * as `application/x-www-form-urlencoded` body parameter.
 *
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc6749.html#section-2.3 RFC 6749 - The OAuth 2.0 Authorization Framework}
 * @see {@link https://openid.net/specs/openid-connect-core-1_0.html#ClientAuthentication OpenID Connect Core 1.0}
 * @see {@link https://www.iana.org/assignments/oauth-parameters/oauth-parameters.xhtml#token-endpoint-auth-method OAuth Token Endpoint Authentication Methods}
 */
export type TokenEndpointAuthMethod =
  | 'client_secret_basic'
  | 'client_secret_post'
  | 'client_secret_jwt'
  | 'private_key_jwt'
  | 'none'

/**
 * Supported JWS "alg" Algorithm identifiers.
 *
 * Compatibility notes:
 * - ES512 is not supported Safari 14 and older (03/2022)
 * - ES512 is not supported iOS/iPadOS 14 and older (03/2022)
 *
 * @example PS256 CryptoKey algorithm
 * ```ts
 * interface Ps256Algorithm extends RsaHashedKeyAlgorithm {
 *   name: 'RSA-PSS'
 *   hash: { name: 'SHA-256' }
 * }
 * ```
 *
 * @example ES256 CryptoKey algorithm
 * ```ts
 * interface Es256Algorithm extends EcKeyAlgorithm {
 *   name: 'ECDSA'
 *   namedCurve: 'P-256'
 * }
 * ```
 *
 * @example RS256 CryptoKey algorithm
 * ```ts
 * interface Rs256Algorithm extends RsaHashedKeyAlgorithm {
 *   name: 'RSASSA-PKCS1-v1_5'
 *   hash: { name: 'SHA-256' }
 * }
 * ```
 *
 * @example PS384 CryptoKey algorithm
 * ```ts
 * interface Ps384Algorithm extends RsaHashedKeyAlgorithm {
 *   name: 'RSA-PSS'
 *   hash: { name: 'SHA-384' }
 * }
 * ```
 *
 * @example ES384 CryptoKey algorithm
 * ```ts
 * interface Es384Algorithm extends EcKeyAlgorithm {
 *   name: 'ECDSA'
 *   namedCurve: 'P-384'
 * }
 * ```
 *
 * @example RS384 CryptoKey algorithm
 * ```ts
 * interface Rs384Algorithm extends RsaHashedKeyAlgorithm {
 *   name: 'RSASSA-PKCS1-v1_5'
 *   hash: { name: 'SHA-384' }
 * }
 * ```
 *
 * @example PS512 CryptoKey algorithm
 * ```ts
 * interface Ps512Algorithm extends RsaHashedKeyAlgorithm {
 *   name: 'RSA-PSS'
 *   hash: { name: 'SHA-512' }
 * }
 * ```
 *
 * @example ES512 CryptoKey algorithm
 * ```ts
 * interface Es512Algorithm extends EcKeyAlgorithm {
 *   name: 'ECDSA'
 *   namedCurve: 'P-521'
 * }
 * ```
 *
 * @example RS512 CryptoKey algorithm
 * ```ts
 * interface Rs512Algorithm extends RsaHashedKeyAlgorithm {
 *   name: 'RSASSA-PKCS1-v1_5'
 *   hash: { name: 'SHA-512' }
 * }
 * ```
 */
export type JWSAlgorithm =
  | 'PS256'
  | 'ES256'
  | 'RS256'
  | 'PS384'
  | 'ES384'
  | 'RS384'
  | 'PS512'
  | 'ES512'
  | 'RS512'

/**
 * Supported JWE "enc" Content Encryption Algorithm identifiers.
 *
 * Compatibility notes:
 * - A192GCM is not supported in Chromium-based runtimes (03/2022)
 * - A192CBC-HS384 is not supported in Chromium-based runtimes (03/2022)
 */
export type ContentEncryptionAlgorithm =
  | 'A128GCM'
  | 'A192GCM'
  | 'A256GCM'
  | 'A128CBC-HS256'
  | 'A192CBC-HS384'
  | 'A256CBC-HS512'

/**
 * Supported JWE "alg" Key Management Algorithm identifier.
 *
 * Compatibility notes:
 * - ECDH-ES using NIST curve P-521 is not supported Safari 14 and older (03/2022)
 * - ECDH-ES using NIST curve P-521 is not supported iOS/iPadOS 14 and older (03/2022)
 *
 * @example ECDH-ES CryptoKey algorithm
 * ```ts
 * interface EcdhEsAlgorithm extends EcKeyAlgorithm {
 *   name: 'ECDH'
 *   namedCurve: 'P-256' | 'P-384' | 'P-521'
 * }
 * ```
 *
 * @example RSA-OAEP CryptoKey algorithm
 * ```ts
 * interface RsaOaepAlgorithm extends RsaHashedKeyAlgorithm {
 *   name: 'RSA-OAEP'
 *   hash: { name: 'SHA-1' }
 * }
 * ```
 *
 * @example RSA-OAEP-256 CryptoKey algorithm
 * ```ts
 * interface RsaOaep256Algorithm extends RsaHashedKeyAlgorithm {
 *   name: 'RSA-OAEP'
 *   hash: { name: 'SHA-256' }
 * }
 * ```
 *
 * @example RSA-OAEP-384 CryptoKey algorithm
 * ```ts
 * interface RsaOaep384Algorithm extends RsaHashedKeyAlgorithm {
 *   name: 'RSA-OAEP'
 *   hash: { name: 'SHA-384' }
 * }
 * ```
 *
 * @example RSA-OAEP-512 CryptoKey algorithm
 * ```ts
 * interface RsaOaep512Algorithm extends RsaHashedKeyAlgorithm {
 *   name: 'RSA-OAEP'
 *   hash: { name: 'SHA-512' }
 * }
 * ```
 */
export type KeyManagementAlgorithm =
  | 'ECDH-ES'
  | 'RSA-OAEP'
  | 'RSA-OAEP-256'
  | 'RSA-OAEP-384'
  | 'RSA-OAEP-512'

export interface JWK {
  // common
  readonly kty?: string
  readonly kid?: string
  readonly alg?: string
  readonly use?: string
  readonly key_ops?: string[]
  // RSA
  readonly e?: string
  readonly n?: string
  // EC
  readonly crv?: string
  readonly x?: string
  readonly y?: string

  readonly [parameter: string]: unknown
}

/**
 * Authorization Server Metadata
 *
 * @see {@link https://www.iana.org/assignments/oauth-parameters/oauth-parameters.xhtml#authorization-server-metadata IANA OAuth Authorization Server Metadata registry}
 */
export interface AuthorizationServer {
  /**
   * Authorization server's issuer identifier URL.
   */
  readonly issuer: string
  /**
   * URL of the authorization server's authorization endpoint.
   */
  readonly authorization_endpoint?: string
  /**
   * URL of the authorization server's token endpoint.
   */
  readonly token_endpoint?: string
  /**
   * URL of the authorization server's JWK Set document.
   */
  readonly jwks_uri?: string
  /**
   * URL of the authorization server's Dynamic Client Registration Endpoint.
   */
  readonly registration_endpoint?: string
  /**
   * JSON array containing a list of the "scope" values that this authorization
   * server supports.
   */
  readonly scopes_supported?: string[]
  /**
   * JSON array containing a list of the "response_type" values that this
   * authorization server supports.
   */
  readonly response_types_supported?: string[]
  /**
   * JSON array containing a list of the "response_mode" values that this
   * authorization server supports.
   */
  readonly response_modes_supported?: string[]
  /**
   * JSON array containing a list of the "grant_type" values that this
   * authorization server supports.
   */
  readonly grant_types_supported?: string[]
  /**
   * JSON array containing a list of client authentication methods supported by
   * this token endpoint.
   */
  readonly token_endpoint_auth_methods_supported?: string[]
  /**
   * JSON array containing a list of the JWS signing algorithms supported by the
   * token endpoint for the signature on the JWT used to authenticate the client
   * at the token endpoint.
   */
  readonly token_endpoint_auth_signing_alg_values_supported?: string[]
  /**
   * URL of a page containing human-readable information that developers might
   * want or need to know when using the authorization server.
   */
  readonly service_documentation?: string
  /**
   * Languages and scripts supported for the user interface, represented as a
   * JSON array of language tag values from RFC 5646.
   */
  readonly ui_locales_supported?: string[]
  /**
   * URL that the authorization server provides to the person registering the
   * client to read about the authorization server's requirements on how the
   * client can use the data provided by the authorization server.
   */
  readonly op_policy_uri?: string
  /**
   * URL that the authorization server provides to the person registering the
   * client to read about the authorization server's terms of service.
   */
  readonly op_tos_uri?: string
  /**
   * URL of the authorization server's revocation endpoint.
   */
  readonly revocation_endpoint?: string
  /**
   * JSON array containing a list of client authentication methods supported by
   * this revocation endpoint.
   */
  readonly revocation_endpoint_auth_methods_supported?: string[]
  /**
   * JSON array containing a list of the JWS signing algorithms supported by the
   * revocation endpoint for the signature on the JWT used to authenticate the
   * client at the revocation endpoint.
   */
  readonly revocation_endpoint_auth_signing_alg_values_supported?: string[]
  /**
   * URL of the authorization server's introspection endpoint.
   */
  readonly introspection_endpoint?: string
  /**
   * JSON array containing a list of client authentication methods supported by
   * this introspection endpoint.
   */
  readonly introspection_endpoint_auth_methods_supported?: string[]
  /**
   * JSON array containing a list of the JWS signing algorithms supported by the
   * introspection endpoint for the signature on the JWT used to authenticate
   * the client at the introspection endpoint.
   */
  readonly introspection_endpoint_auth_signing_alg_values_supported?: string[]
  /**
   * PKCE code challenge methods supported by this authorization server.
   */
  readonly code_challenge_methods_supported?: string[]
  /**
   * Signed JWT containing metadata values about the authorization server as
   * claims.
   */
  readonly signed_metadata?: string
  /**
   * URL of the authorization server's device authorization endpoint.
   */
  readonly device_authorization_endpoint?: string
  /**
   * Indicates authorization server support for mutual-TLS client
   * certificate-bound access tokens.
   */
  readonly tls_client_certificate_bound_access_tokens?: boolean
  /**
   * JSON object containing alternative authorization server endpoints, which a
   * client intending to do mutual TLS will use in preference to the
   * conventional endpoints.
   */
  readonly mtls_endpoint_aliases?: {
    /**
     * URL of the authorization server's MTLS token endpoint.
     */
    readonly token_endpoint?: string
    /**
     * URL of the authorization server's MTLS revocation endpoint.
     */
    readonly revocation_endpoint?: string
    /**
     * URL of the authorization server's MTLS introspection endpoint.
     */
    readonly introspection_endpoint?: string
    /**
     * URL of the authorization server's MTLS device authorization endpoint.
     */
    readonly device_authorization_endpoint?: string
    /**
     * URL of the authorization server's MTLS UserInfo Endpoint.
     */
    readonly userinfo_endpoint?: string
    /**
     * URL of the authorization server's MTLS pushed authorization request
     * endpoint.
     */
    readonly pushed_authorization_request_endpoint?: string

    readonly [metadata: string]: unknown
  }
  /**
   * URL of the authorization server's UserInfo Endpoint.
   */
  readonly userinfo_endpoint?: string
  /**
   * JSON array containing a list of the Authentication Context Class References
   * that this authorization server supports.
   */
  readonly acr_values_supported?: string[]
  /**
   * JSON array containing a list of the Subject Identifier types that this
   * authorization server supports.
   */
  readonly subject_types_supported?: string[]
  /**
   * JSON array containing a list of the JWS "alg" values supported by the
   * authorization server for the ID Token.
   */
  readonly id_token_signing_alg_values_supported?: string[]
  /**
   * JSON array containing a list of the JWE "alg" values supported by the
   * authorization server for the ID Token.
   */
  readonly id_token_encryption_alg_values_supported?: string[]
  /**
   * JSON array containing a list of the JWE "enc" values supported by the
   * authorization server for the ID Token.
   */
  readonly id_token_encryption_enc_values_supported?: string[]
  /**
   * JSON array containing a list of the JWS "alg" values supported by the
   * UserInfo Endpoint.
   */
  readonly userinfo_signing_alg_values_supported?: string[]
  /**
   * JSON array containing a list of the JWE "alg" values supported by the
   * UserInfo Endpoint.
   */
  readonly userinfo_encryption_alg_values_supported?: string[]
  /**
   * JSON array containing a list of the JWE "enc" values supported by the
   * UserInfo Endpoint.
   */
  readonly userinfo_encryption_enc_values_supported?: string[]
  /**
   * JSON array containing a list of the JWS "alg" values supported by the
   * authorization server for Request Objects.
   */
  readonly request_object_signing_alg_values_supported?: string[]
  /**
   * JSON array containing a list of the JWE "alg" values supported by the
   * authorization server for Request Objects.
   */
  readonly request_object_encryption_alg_values_supported?: string[]
  /**
   * JSON array containing a list of the JWE "enc" values supported by the
   * authorization server for Request Objects.
   */
  readonly request_object_encryption_enc_values_supported?: string[]
  /**
   * JSON array containing a list of the "display" parameter values that the
   * authorization server supports.
   */
  readonly display_values_supported?: string[]
  /**
   * JSON array containing a list of the Claim Types that the authorization
   * server supports.
   */
  readonly claim_types_supported?: string[]
  /**
   * JSON array containing a list of the Claim Names of the Claims that the
   * authorization server MAY be able to supply values for.
   */
  readonly claims_supported?: string[]
  /**
   * Languages and scripts supported for values in Claims being returned,
   * represented as a JSON array of RFC 5646 language tag values.
   */
  readonly claims_locales_supported?: string[]
  /**
   * Boolean value specifying whether the authorization server supports use of
   * the "claims" parameter.
   */
  readonly claims_parameter_supported?: boolean
  /**
   * Boolean value specifying whether the authorization server supports use of
   * the "request" parameter.
   */
  readonly request_parameter_supported?: boolean
  /**
   * Boolean value specifying whether the authorization server supports use of
   * the "request_uri" parameter.
   */
  readonly request_uri_parameter_supported?: boolean
  /**
   * Boolean value specifying whether the authorization server requires any
   * "request_uri" values used to be pre-registered.
   */
  readonly require_request_uri_registration?: boolean
  /**
   * Indicates where authorization request needs to be protected as Request
   * Object and provided through either request or request_uri parameter.
   */
  readonly require_signed_request_object?: boolean
  /**
   * URL of the authorization server's pushed authorization request endpoint.
   */
  readonly pushed_authorization_request_endpoint?: string
  /**
   * Indicates whether the authorization server accepts authorization requests
   * only via PAR.
   */
  readonly require_pushed_authorization_requests?: boolean
  /**
   * JSON array containing a list of algorithms supported by the authorization
   * server for introspection response signing.
   */
  readonly introspection_signing_alg_values_supported?: string[]
  /**
   * JSON array containing a list of algorithms supported by the authorization
   * server for introspection response content key encryption (alg value).
   */
  readonly introspection_encryption_alg_values_supported?: string[]
  /**
   * JSON array containing a list of algorithms supported by the authorization
   * server for introspection response content encryption (enc value).
   */
  readonly introspection_encryption_enc_values_supported?: string[]
  /**
   * Boolean value indicating whether the authorization server provides the
   * "iss" parameter in the authorization response.
   */
  readonly authorization_response_iss_parameter_supported?: boolean
  /**
   * JSON array containing a list of algorithms supported by the authorization
   * server for introspection response signing.
   */
  readonly authorization_signing_alg_values_supported?: string[]
  /**
   * JSON array containing a list of algorithms supported by the authorization
   * server for introspection response encryption (alg value).
   */
  readonly authorization_encryption_alg_values_supported?: string[]
  /**
   * JSON array containing a list of algorithms supported by the authorization
   * server for introspection response encryption (enc value).
   */
  readonly authorization_encryption_enc_values_supported?: string[]
  /**
   * CIBA Backchannel Authentication Endpoint.
   */
  readonly backchannel_authentication_endpoint?: string
  /**
   * JSON array containing a list of the JWS signing algorithms supported for
   * validation of signed CIBA authentication requests.
   */
  readonly backchannel_authentication_request_signing_alg_values_supported?: string[]
  /**
   * Supported CIBA authentication result delivery modes.
   */
  readonly backchannel_token_delivery_modes_supported?: string[]
  /**
   * Indicates whether the authorization server supports the use of the CIBA
   * user_code parameter.
   */
  readonly backchannel_user_code_parameter_supported?: boolean
  /**
   * URL of an authorization server iframe that supports cross-origin
   * communications for session state information with the RP Client, using the
   * HTML5 postMessage API.
   */
  readonly check_session_iframe?: string
  /**
   * JSON array containing a list of the JWS algorithms supported for DPoP proof
   * JWTs.
   */
  readonly dpop_signing_alg_values_supported?: string[]
  /**
   * URL at the authorization server to which an RP can perform a redirect to
   * request that the End-User be logged out at the authorization server.
   */
  readonly end_session_endpoint?: string
  /**
   * Boolean value specifying whether the authorization server can pass "iss"
   * (issuer) and "sid" (session ID) query parameters to identify the RP session
   * with the authorization server when the "frontchannel_logout_uri" is used.
   */
  readonly frontchannel_logout_session_supported?: boolean
  /**
   * Boolean value specifying whether the authorization server supports
   * HTTP-based logout.
   */
  readonly frontchannel_logout_supported?: boolean
  /**
   * Boolean value specifying whether the authorization server can pass a sid
   * (session ID) Claim in the Logout Token to identify the RP session with the
   * OP.
   */
  readonly backchannel_logout_session_supported?: boolean
  /**
   * Boolean value specifying whether the authorization server supports
   * back-channel logout.
   */
  readonly backchannel_logout_supported?: boolean

  readonly [metadata: string]: unknown
}

/**
 * Recognized Client Metadata that have an effect on the exposed functionality.
 *
 * @see {@link https://www.iana.org/assignments/oauth-parameters/oauth-parameters.xhtml#client-metadata IANA OAuth Client Registration Metadata registry}
 */
export interface Client {
  /**
   * Client identifier.
   */
  client_id: string
  /**
   * Client secret.
   */
  client_secret?: string
  /**
   * Client {@link TokenEndpointAuthMethod authentication method} for the
   * client's authenticated requests.
   */
  token_endpoint_auth_method?: TokenEndpointAuthMethod | string
  /**
   * JWS "alg" algorithm required for signing the ID Token issued to this
   * Client.
   */
  id_token_signed_response_alg?: JWSAlgorithm | string
  /**
   * JWS "alg" algorithm required for signing authorization responses.
   */
  authorization_signed_response_alg?: JWSAlgorithm | string
  /**
   * JWE "enc" algorithm the RP is declaring that it may use for encrypting
   * Request Objects sent to the authorization server.
   */
  request_object_encryption_enc?: ContentEncryptionAlgorithm | string
  /**
   * Boolean value specifying whether the {@link IDToken.auth_time auth_time}
   * Claim in the ID Token is REQUIRED.
   */
  require_auth_time?: boolean
  /**
   * JWS "alg" algorithm REQUIRED for signing UserInfo Responses.
   */
  userinfo_signed_response_alg?: JWSAlgorithm | string
  /**
   * JWS "alg" algorithm REQUIRED for signed introspection responses.
   */
  introspection_signed_response_alg?: JWSAlgorithm | string
  /**
   * Default Maximum Authentication Age.
   */
  default_max_age?: number
  /**
   * JWS "alg" algorithm for `client_secret_jwt`
   * {@link TokenEndpointAuthMethod authentication method}. It is ignored
   * for every other method.
   */
  token_endpoint_auth_signing_alg?: 'HS256' | 'HS384' | 'HS512' | string

  [metadata: string]: unknown
}

const encoder = new TextEncoder()
const decoder = new TextDecoder()

/**
 * simple LRU
 */
class LRU<T1, T2> {
  cache = new Map<T1, T2>()
  _cache = new Map<T1, T2>()
  maxSize: number

  constructor(maxSize: number) {
    this.maxSize = maxSize
  }

  get(key: T1) {
    let v = this.cache.get(key)
    if (v) {
      return v
    }

    if ((v = this._cache.get(key))) {
      this.update(key, v)
      return v
    }
  }

  has(key: T1) {
    return this.cache.has(key) || this._cache.has(key)
  }

  set(key: T1, value: T2) {
    if (this.cache.has(key)) {
      this.cache.set(key, value)
    } else {
      this.update(key, value)
    }
    return this
  }

  delete(key: T1) {
    if (this.cache.has(key)) {
      return this.cache.delete(key)
    }
    if (this._cache.has(key)) {
      return this._cache.delete(key)
    }
    return false
  }

  update(key: T1, value: T2) {
    this.cache.set(key, value)
    if (this.cache.size >= this.maxSize) {
      this._cache = this.cache
      this.cache = new Map()
    }
  }
}

export class UnsupportedOperationError extends Error {
  constructor(message = 'operation not supported') {
    super(message)
    this.name = this.constructor.name
    // @ts-ignore
    Error.captureStackTrace?.(this, this.constructor)
  }
}

export class OperationProcessingError extends Error {
  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
    // @ts-ignore
    Error.captureStackTrace?.(this, this.constructor)
  }
}

const OPE = OperationProcessingError

const dpopNonces: LRU<string, string> = new LRU(100)

function isCryptoKey(key: unknown): key is CryptoKey {
  return key instanceof CryptoKey
}

function isPrivateKey(key: unknown): key is CryptoKey {
  return isCryptoKey(key) && key.type === 'private'
}

function isPublicKey(key: unknown): key is CryptoKey {
  return isCryptoKey(key) && key.type === 'public'
}

export type ProcessingMode = 'oidc' | 'oauth2'

const SUPPORTED_JWS_ALGS: JWSAlgorithm[] = [
  'PS256',
  'PS384',
  'PS512',
  'ES256',
  'ES384',
  'ES512',
  'RS256',
  'RS384',
  'RS512',
]

const SUPPORTED_JWE_ALGS: KeyManagementAlgorithm[] = [
  'ECDH-ES',
  'RSA-OAEP',
  'RSA-OAEP-256',
  'RSA-OAEP-384',
  'RSA-OAEP-512',
]

const SUPPORTED_JWE_ENCS: ContentEncryptionAlgorithm[] = [
  'A128GCM',
  'A192GCM',
  'A256GCM',
  'A128CBC-HS256',
  'A192CBC-HS384',
  'A256CBC-HS512',
]

export interface SignalledRequestOptions {
  /**
   * An {@link https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal AbortSignal}
   * instance to abort the underlying fetch requests.
   *
   * @example Obtain a 5000ms timeout AbortSignal
   * ```js
   * const signal = AbortSignal.timeout(5_000) // Note: AbortSignal.timeout may not yet be available in all runtimes.
   * ```
   *
   */
  signal?: AbortSignal
}

export interface DiscoveryRequestOptions extends SignalledRequestOptions {
  /**
   * The issuer transformation algorithm to use.
   */
  algorithm?: ProcessingMode | string
}

function preserveBodyStream(response: Response) {
  assertReadableResponse(response)
  return response.clone()
}

function processDpopNonce(response: Response) {
  const url = new URL(response.url)
  if (response.headers.has('dpop-nonce')) {
    dpopNonces.set(url.origin, response.headers.get('dpop-nonce')!)
  }
  return response
}

function normalizeTyp(value: string) {
  return value.toLowerCase().replace(/^application\//, '')
}

function isObjectLike(value: unknown) {
  return typeof value === 'object' && value !== null
}

function isTopLevelObject<T = object>(input: unknown): input is T {
  if (!isObjectLike(input) || Object.prototype.toString.call(input) !== '[object Object]') {
    return false
  }

  if (Object.getPrototypeOf(input) === null) {
    return true
  }
  let proto = input
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto)
  }
  return Object.getPrototypeOf(input) === proto
}

/**
 * Performs an authorization server metadata discovery using one of two
 * algorithms.
 *
 * - "oidc" (default) with the issuer identifier URL as input and target url
 * transformation algorithm as defined by OpenID Connect Discovery 1.0.
 * - "oauth2" with the issuer identifier URL as input and target url
 * transformation algorithm as defined by RFC 8414.
 *
 * The difference between these two algorithms is in their handling of path
 * components in the issuer identifier.
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc8414.html#section-3 RFC 8414 - OAuth 2.0 Authorization Server Metadata}
 * @see {@link https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderConfig OpenID Connect Discovery 1.0}
 *
 * @param issuerIdentifier Issuer identifier to resolve the well-known discovery
 * URI for
 *
 * @returns Resolves with
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API Fetch API}'s
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Response Response}
 */
export async function discoveryRequest(
  issuerIdentifier: URL,
  options?: DiscoveryRequestOptions,
): Promise<Response> {
  if (!(issuerIdentifier instanceof URL)) {
    throw new TypeError('"issuer" must be an instance of URL')
  }

  if (issuerIdentifier.protocol !== 'https:' && issuerIdentifier.protocol !== 'http:') {
    throw new TypeError('"issuer.protocol" must be "https:" or "http:"')
  }

  const url = new URL(issuerIdentifier.href)

  switch (options?.algorithm) {
    case undefined: // Fall through
    case 'oidc':
      url.pathname = `${url.pathname}/.well-known/openid-configuration`.replace('//', '/')
      break
    case 'oauth2':
      if (url.pathname === '/') {
        url.pathname = `.well-known/oauth-authorization-server`
      } else {
        url.pathname = `.well-known/oauth-authorization-server/${url.pathname}`.replace('//', '/')
      }
      break
    default:
      throw new TypeError('"options.algorithm" must be "oidc" (default), or "oauth2"')
  }

  return fetch(url.href, {
    headers: new Headers({ accept: 'application/json', 'user-agent': USER_AGENT }),
    method: 'GET',
    redirect: 'manual',
    signal: options?.signal,
  }).then(processDpopNonce)
}

/**
 * Validates
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Response Fetch API Response}
 * to be one coming from the authorization server's well-known discovery endpoint.
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc8414.html#section-3 RFC 8414 - OAuth 2.0 Authorization Server Metadata}
 * @see {@link https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderConfig OpenID Connect Discovery 1.0}
 *
 * @param expectedIssuerIdentifier Expected issuer identifier value
 * @param response resolved value from {@link discoveryRequest}
 *
 * @returns Discovered Authorization Server Metadata
 */
export async function processDiscoveryResponse(
  expectedIssuerIdentifier: URL,
  response: Response,
): Promise<AuthorizationServer> {
  if (!(expectedIssuerIdentifier instanceof URL)) {
    throw new TypeError('"expectedIssuer" must be an instance of URL')
  }

  if (!(response instanceof Response)) {
    throw new TypeError('"response" must be an instance of Response')
  }

  if (response.status !== 200) {
    throw new OPE('"response" is not a conform Authorization Server Metadata response')
  }

  let json: unknown
  try {
    json = await preserveBodyStream(response).json()
  } catch {
    throw new OPE('failed to parsed "response" body as JSON')
  }

  if (!isTopLevelObject<AuthorizationServer>(json)) {
    throw new OPE('"response" body must be a top level object')
  }

  if (typeof json.issuer !== 'string' || json.issuer.length === 0) {
    throw new OPE('"response" body "issuer" property must be a non-empty string')
  }

  if (new URL(json.issuer).href !== expectedIssuerIdentifier.href) {
    throw new OPE('"response" body "issuer" does not match "expectedIssuer"')
  }

  return json
}

/**
 * Generates 32 random bytes and encodes them using base64url.
 */
function randomBytes() {
  return encodeBase64Url(crypto.getRandomValues(new Uint8Array(32)))
}

/**
 * Generate random `code_verifier` value.
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc7636.html#section-4 RFC 7636 - Proof Key for Code Exchange by OAuth Public Clients (PKCE)}
 */
export function generateRandomCodeVerifier() {
  return randomBytes()
}

/**
 * Generate random `nonce` value.
 *
 * @see {@link https://openid.net/specs/openid-connect-core-1_0.html#IDToken OpenID Connect Core 1.0}
 */
export function generateRandomNonce() {
  return randomBytes()
}

/**
 *
 * Calculates the PKCE `code_verifier` value to send with an authorization
 * request using the S256 PKCE Code Challenge Method transformation.
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc7636.html#section-4 RFC 7636 - Proof Key for Code Exchange by OAuth Public Clients (PKCE)}
 *
 * @param codeVerifier code_verifier value generated e.g. from
 * {@link generateRandomCodeVerifier}
 */
export async function calculatePKCECodeChallenge(codeVerifier: string) {
  if (typeof codeVerifier !== 'string' || codeVerifier.length === 0) {
    throw new TypeError('"codeVerifier" must be a non-empty string')
  }

  const digest = await crypto.subtle.digest('SHA-256', encoder.encode(codeVerifier))

  return encodeBase64Url(new Uint8Array(digest))
}

function getKeyAndKid(input: PublicKey | PrivateKey | undefined) {
  if (!(input?.key instanceof CryptoKey)) {
    return { key: undefined, kid: undefined }
  }

  if (input.kid !== undefined && (typeof input.kid !== 'string' || input.kid.length === 0)) {
    throw new TypeError('"kid" must be a non-empty string')
  }

  return { key: input.key, kid: input.kid }
}

export interface DPoPOptions extends CryptoKeyPair {
  /**
   * Private
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/CryptoKey CryptoKey}
   * instance to sign the DPoP Proof JWT with.
   *
   * Its algorithm must be compatible with a supported
   * {@link JWSAlgorithm JWS "alg" Algorithm}.
   */
  privateKey: CryptoKey

  /**
   * The public key corresponding to {@link DPoPOptions.privateKey}
   */
  publicKey: CryptoKey

  /**
   * Server-Provided Nonce to use in the request. This option serves as an
   * override in case the self-correcting mechanism does not work with a
   * particular server. Previously received nonces will be used automatically.
   */
  nonce?: string
}

export interface DPoPRequestOptions {
  /**
   * DPoP-related options.
   */
  DPoP?: DPoPOptions
}

export interface AuthenticatedRequestOptions {
  /**
   * Private key to use for `private_key_jwt`
   * {@link TokenEndpointAuthMethod client authentication}.
   */
  clientPrivateKey?: PrivateKey
}

export interface PushedAuthorizationRequestOptions
  extends SignalledRequestOptions,
    AuthenticatedRequestOptions,
    DPoPRequestOptions {}

/**
 * The client identifier is encoded using the
 * "application/x-www-form-urlencoded" encoding algorithm per Appendix B, and
 * the encoded value is used as the username; the client password is encoded
 * using the same algorithm and used as the password.
 */
function formUrlEncode(token: string) {
  return encodeURIComponent(token).replace(/%20/g, '+')
}

/**
 * Formats client_id and client_secret as an HTTP Basic Authentication header as
 * per the OAuth 2.0 specified in RFC6749.
 */
function clientSecretBasic(clientId: string, clientSecret: string) {
  const username = formUrlEncode(clientId)
  const password = formUrlEncode(clientSecret)
  const credentials = btoa(`${username}:${password}`)
  return `Basic ${credentials}`
}

/**
 * Determines an RSASSA-PSS algorithm identifier from CryptoKey instance
 * properties.
 */
function rsaPssAlg(key: CryptoKey) {
  switch ((<RsaHashedKeyAlgorithm>key.algorithm).hash.name) {
    case 'SHA-256':
      return 'PS256'
    case 'SHA-384':
      return 'PS384'
    case 'SHA-512':
      return 'PS512'
    default:
      throw new UnsupportedOperationError('unsupported RsaHashedKeyAlgorithm hash name')
  }
}

/**
 * Determines an RSASSA-PKCS1-v1_5 algorithm identifier from CryptoKey instance
 * properties.
 */
function rsAlg(key: CryptoKey) {
  switch ((<RsaHashedKeyAlgorithm>key.algorithm).hash.name) {
    case 'SHA-256':
      return 'RS256'
    case 'SHA-384':
      return 'RS384'
    case 'SHA-512':
      return 'RS512'
    default:
      throw new UnsupportedOperationError('unsupported RsaHashedKeyAlgorithm hash name')
  }
}

/**
 * Determines an ECDSA algorithm identifier from CryptoKey instance properties.
 */
function esAlg(key: CryptoKey) {
  switch ((<EcKeyAlgorithm>key.algorithm).namedCurve) {
    case 'P-256':
      return 'ES256'
    case 'P-384':
      return 'ES384'
    case 'P-521':
      return 'ES512'
    default:
      throw new UnsupportedOperationError('unsupported EcKeyAlgorithm namedCurve')
  }
}

/**
 * Determines a supported JWS "alg" identifier from CryptoKey instance
 * properties.
 */
function determineJWSAlgorithm(key: CryptoKey) {
  switch (key.algorithm.name) {
    case 'RSA-PSS':
      return rsaPssAlg(key)
    case 'RSASSA-PKCS1-v1_5':
      return rsAlg(key)
    case 'ECDSA':
      return esAlg(key)
    default:
      throw new UnsupportedOperationError('unsupported CryptoKey algorithm name')
  }
}

/**
 * Determines an RSAES OAEP algorithm identifier from CryptoKey instance
 * properties.
 */
function oaepAlg(key: CryptoKey) {
  switch ((<RsaHashedKeyAlgorithm>key.algorithm).hash.name) {
    case 'SHA-1':
      return 'RSA-OAEP'
    case 'SHA-256':
      return 'RSA-OAEP-256'
    case 'SHA-384':
      return 'RSA-OAEP-384'
    case 'SHA-512':
      return 'RSA-OAEP-512'
    default:
      throw new UnsupportedOperationError('unsupported RsaHashedKeyAlgorithm hash name')
  }
}

/**
 * Determines a supported JWE "alg" identifier from CryptoKey instance
 * properties.
 */
function jweAlg(key: CryptoKey) {
  switch (key.algorithm.name) {
    case 'ECDH':
      switch ((<EcKeyAlgorithm>key.algorithm).namedCurve) {
        case 'P-256': // Fall through
        case 'P-384': // Fall through
        case 'P-521':
          return 'ECDH-ES'
        default:
          throw new UnsupportedOperationError('unsupported EcKeyAlgorithm namedCurve')
      }
    case 'RSA-OAEP':
      checkRsaKeyAlgorithm(<RsaKeyAlgorithm>key.algorithm)
      return oaepAlg(key)
    default:
      throw new UnsupportedOperationError('unsupported CryptoKey algorithm name')
  }
}

/**
 * Returns the current unix timestamp in seconds.
 */
function currentTimestamp() {
  return Math.floor(Date.now() / 1000)
}

function clientAssertion(as: AuthorizationServer, client: Client) {
  const now = currentTimestamp()
  return {
    jti: randomBytes(),
    aud: [as.issuer, as.token_endpoint],
    exp: now + 60,
    iat: now,
    nbf: now,
    iss: client.client_id,
    sub: client.client_id,
  }
}

/**
 * Generates a unique client assertion to be used in `private_key_jwt`
 * authenticated requests.
 */
async function privateKeyJwt(
  as: AuthorizationServer,
  client: Client,
  key: CryptoKey,
  kid?: string,
) {
  return jwt(
    {
      alg: checkSupportedJwsAlg(determineJWSAlgorithm(key)),
      kid,
    },
    clientAssertion(as, client),
    key,
  )
}

function isHmac(alg: unknown): alg is 'HS256' | 'HS384' | 'HS512' {
  return alg === 'HS256' || alg === 'HS384' || alg === 'HS512'
}

/**
 * Generates a unique client assertion to be used in `client_secret_jwt`
 * authenticated requests.
 */
async function clientSecretJwt(as: AuthorizationServer, client: Client, secret: string) {
  const alg =
    client.token_endpoint_auth_signing_alg ??
    (Array.isArray(as.token_endpoint_auth_signing_alg_values_supported) &&
      as.token_endpoint_auth_signing_alg_values_supported.find(isHmac))

  if (!isHmac(alg)) {
    throw new OPE(
      'could not determine client_secret_jwt JWS "alg" algorithm, client.token_endpoint_auth_signing_alg must be configured',
    )
  }

  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: `SHA-${alg.slice(-3)}` },
    false,
    ['sign'],
  )

  return jwt({ alg }, clientAssertion(as, client), key)
}

function assertIssuer(metadata: AuthorizationServer): metadata is AuthorizationServer {
  if (typeof metadata !== 'object' || metadata === null) {
    throw new TypeError('"issuer" must be an object')
  }

  if (typeof metadata.issuer !== 'string' || metadata.issuer.length === 0) {
    throw new TypeError('"issuer.issuer" property must be a non-empty string')
  }
  return true
}

function assertClient(metadata: Client): metadata is Client {
  if (typeof metadata !== 'object' || metadata === null) {
    throw new TypeError('"client" must be an object')
  }

  if (typeof metadata.client_id !== 'string' || metadata.client_id.length === 0) {
    throw new TypeError('"client.client_id" property must be a non-empty string')
  }
  return true
}

function assertClientSecret(clientSecret: unknown) {
  if (typeof clientSecret !== 'string' || clientSecret.length === 0) {
    throw new TypeError('"client.client_secret" property must be a non-empty string')
  }
  return clientSecret
}

function assertNoClientPrivateKey(clientAuthMethod: string, clientPrivateKey?: unknown) {
  if (clientPrivateKey !== undefined) {
    throw new TypeError(
      `"options.clientPrivateKey" property must not be provided when ${clientAuthMethod} client authentication method is used.`,
    )
  }
}

function assertNoClientSecret(clientAuthMethod: string, clientSecret?: unknown) {
  if (clientSecret !== undefined) {
    throw new TypeError(
      `"client.client_secret" property must not be provided when ${clientAuthMethod} client authentication method is used.`,
    )
  }
}

/**
 * Applies supported client authentication to an URLSearchParams instance
 * representing the request body and/or a Headers instance to be sent with an
 * authenticated request.
 */
async function clientAuthentication(
  as: AuthorizationServer,
  client: Client,
  body: URLSearchParams,
  headers: Headers,
  clientPrivateKey?: PrivateKey,
) {
  switch (client.token_endpoint_auth_method) {
    case undefined: // Fall through
    case 'client_secret_basic': {
      assertNoClientPrivateKey('client_secret_basic')
      headers.set(
        'authorization',
        clientSecretBasic(client.client_id, assertClientSecret(client.client_secret)),
      )
      break
    }
    case 'client_secret_post': {
      assertNoClientPrivateKey('client_secret_post')
      body.set('client_id', client.client_id)
      body.set('client_secret', assertClientSecret(client.client_secret))
      break
    }
    case 'client_secret_jwt': {
      assertNoClientPrivateKey('client_secret_jwt')
      body.set('client_id', client.client_id)
      body.set('client_assertion_type', 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer')
      body.set(
        'client_assertion',
        await clientSecretJwt(as, client, assertClientSecret(client.client_secret)),
      )
      break
    }
    case 'private_key_jwt': {
      assertNoClientSecret('private_key_jwt')
      if (clientPrivateKey === undefined) {
        throw new TypeError(
          '"options.clientPrivateKey" must be provided when "client.token_endpoint_auth_method" is "private_key_jwt"',
        )
      }
      const { key, kid } = getKeyAndKid(clientPrivateKey)
      if (!isPrivateKey(key)) {
        throw new TypeError('"options.clientPrivateKey.key" must be a private CryptoKey')
      }
      body.set('client_id', client.client_id)
      body.set('client_assertion_type', 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer')
      body.set('client_assertion', await privateKeyJwt(as, client, key, kid))
      break
    }
    case 'none': {
      assertNoClientSecret('none')
      assertNoClientPrivateKey('none')
      body.set('client_id', client.client_id)
      break
    }
    default:
      throw new UnsupportedOperationError('unsupported client token_endpoint_auth_method')
  }
}

const JAR = 'oauth-authz-req+jwt'

/**
 * Minimal JWT sign() implementation.
 */
async function jwt(
  header: CompactJWSHeaderParameters | ClientSecretJWTHeaderParameters,
  claimsSet: Record<string, unknown>,
  key: CryptoKey,
) {
  const input = `${encodeBase64Url(encoder.encode(JSON.stringify(header)))}.${encodeBase64Url(
    encoder.encode(JSON.stringify(claimsSet)),
  )}`
  const signature = encodeBase64Url(
    new Uint8Array(
      await crypto.subtle.sign(subtleAlgorithm(header.alg, key), key, encoder.encode(input)),
    ),
  )
  return `${input}.${signature}`
}

/**
 * Generates JWT-Secured Authorization Request (JAR) that is either signed, or
 * signed and encrypted.
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc9101.html#name-request-object-2 RFC 9101 - The OAuth 2.0 Authorization Framework: JWT-Secured Authorization Request (JAR)}
 *
 * @param as Authorization Server Metadata
 * @param client Client Metadata
 * @param privateKey Private key to sign the Request Object with.
 * @param publicKey Public key to encrypt the Signed Request Object with.
 */
export async function issueRequestObject(
  as: AuthorizationServer,
  client: Client,
  parameters: URLSearchParams,
  privateKey: PrivateKey,
  publicKey?: PublicKey,
) {
  assertIssuer(as)
  assertClient(client)

  if (!(parameters instanceof URLSearchParams)) {
    throw new TypeError('"parameters" must be an instance of URLSearchParams')
  }

  const { key, kid } = getKeyAndKid(privateKey)
  if (!isPrivateKey(key)) {
    throw new TypeError('"privateKey.key" must be a private CryptoKey')
  }

  parameters.set('client_id', client.client_id)

  const now = currentTimestamp()
  const claims: Record<string, unknown> = {
    ...Object.fromEntries(parameters.entries()),
    jti: randomBytes(),
    aud: as.issuer,
    exp: now + 60,
    iat: now,
    nbf: now,
    iss: client.client_id,
    sub: client.client_id,
  }

  let resource: string[]
  if (
    parameters.has('resource') &&
    (resource = parameters.getAll('resource')) &&
    resource.length > 1
  ) {
    claims.resource = resource
  }

  let request = await jwt(
    {
      alg: checkSupportedJwsAlg(determineJWSAlgorithm(key)),
      typ: JAR,
      kid,
    },
    claims,
    key,
  )

  if (publicKey !== undefined) {
    const { key, kid } = getKeyAndKid(publicKey)
    if (!isPublicKey(key)) {
      throw new TypeError('"publicKey.key" must be a public CryptoKey')
    }
    request = await jwe(
      {
        alg: checkSupportedJweAlg(jweAlg(key)),
        enc: checkSupportedJweEnc(client.request_object_encryption_enc || 'A128CBC-HS256'),
        cty: JAR,
        kid,
        iss: client.client_id,
        sub: client.client_id,
        aud: as.issuer,
      },
      encoder.encode(request),
      key,
    )
  }
  return request
}

/**
 * Generates a unique DPoP Proof JWT
 */
async function dpopProofJwt(
  headers: Headers,
  options: DPoPOptions,
  url: URL,
  htm: string,
  accessToken?: string,
) {
  if (!isPrivateKey(options.privateKey)) {
    throw new TypeError('"DPoP.privateKey" must be a private CryptoKey')
  }

  if (!isPublicKey(options.publicKey)) {
    throw new TypeError('"DPoP.publicKey" must be a public CryptoKey')
  }

  if (
    options.nonce !== undefined &&
    (typeof options.nonce !== 'string' || options.nonce.length === 0)
  ) {
    throw new TypeError('"DPoP.nonce" must be a non-empty string or undefined')
  }

  if (options.publicKey.extractable !== true) {
    throw new TypeError('"DPoP.publicKey.extractable" must be true')
  }

  const { nonce = dpopNonces.get(url.origin) } = options
  const proof = await jwt(
    {
      alg: checkSupportedJwsAlg(determineJWSAlgorithm(options.privateKey)),
      typ: 'dpop+jwt',
      jwk: await publicJwk(options.publicKey),
    },
    {
      iat: currentTimestamp(),
      jti: randomBytes(),
      htm,
      nonce,
      htu: `${url.origin}${url.pathname}`,
      ath: accessToken
        ? encodeBase64Url(
            new Uint8Array(await crypto.subtle.digest('SHA-256', encoder.encode(accessToken))),
          )
        : undefined,
    },
    options.privateKey,
  )

  headers.set('dpop', proof)
}

/**
 * exports an asymmetric crypto key as bare JWK
 */
async function publicJwk(key: CryptoKey) {
  const { kty, e, n, x, y, crv } = await crypto.subtle.exportKey('jwk', key)
  return { kty, crv, e, n, x, y }
}

/**
 * Performs a Pushed Authorization Request at the
 * {@link AuthorizationServer.pushed_authorization_request_endpoint `as.pushed_authorization_request_endpoint`}.
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc9126.html#name-pushed-authorization-reques RFC 9126 - OAuth 2.0 Pushed Authorization Requests}
 * @see {@link https://www.ietf.org/archive/id/draft-ietf-oauth-dpop-06.html#name-dpop-with-pushed-authorizat draft-ietf-oauth-dpop-06 - OAuth 2.0 Demonstrating Proof-of-Possession at the Application Layer (DPoP)}
 *
 * @param as Authorization Server Metadata
 * @param client Client Metadata
 * @param parameters authorization request parameters
 *
 * @returns Resolves with
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API Fetch API}'s
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Response Response}
 */
export async function pushedAuthorizationRequest(
  as: AuthorizationServer,
  client: Client,
  parameters: URLSearchParams,
  options?: PushedAuthorizationRequestOptions,
): Promise<Response> {
  assertIssuer(as)
  assertClient(client)

  if (!(parameters instanceof URLSearchParams)) {
    throw new TypeError('"parameters" must be an instance of URLSearchParams')
  }

  if (typeof as.pushed_authorization_request_endpoint !== 'string') {
    throw new TypeError('"issuer.pushed_authorization_request_endpoint" must be a string')
  }

  const url = new URL(as.pushed_authorization_request_endpoint)

  const body = new URLSearchParams(parameters)
  body.set('client_id', client.client_id)

  const headers = new Headers({ accept: 'application/json' })

  if (options?.DPoP !== undefined) {
    await dpopProofJwt(headers, options.DPoP, url, 'POST')
  }

  return authenticatedRequest(as, client, 'POST', url, body, headers, options)
}

export interface PushedAuthorizationResponse {
  readonly request_uri: string
  readonly expires_in: number

  readonly [parameter: string]: unknown
}

export interface OAuth2Error {
  readonly error: string
  readonly error_description?: string
  readonly error_uri?: string
  readonly algs?: string
  readonly scope?: string

  readonly [parameter: string]: unknown
}

/**
 * A helper function used to determine if a response processing function
 * returned an OAuth2Error.
 */
export function isOAuth2Error(input?: ReturnTypes): input is OAuth2Error {
  const value = <unknown>input
  if (typeof value !== 'object' || Array.isArray(value) || value === null) {
    return false
  }

  // @ts-expect-error
  return value.error !== undefined
}

export interface WWWAuthenticateChallenge {
  /**
   * NOTE: the scheme value is lowercased
   */
  readonly scheme: string
  /**
   * NOTE: all parameter names are lowercased
   */
  readonly parameters: {
    readonly realm?: string
    readonly error?: string
    readonly error_description?: string
    readonly error_uri?: string
    readonly algs?: string
    readonly scope?: string

    readonly [parameter: string]: unknown
  }
}

function unquote(value: string) {
  if (value.length >= 2 && value[0] === '"' && value[value.length - 1] === '"') {
    return value.slice(1, -1)
  }

  return value
}

const SPLIT_REGEXP = /((?:,|, )?[0-9a-zA-Z!#$%&'*+-.^_`|~]+=)/
const SCHEMES_REGEXP = /(?:^|, ?)([0-9a-zA-Z!#$%&'*+\-.^_`|~]+)(?=$|[ ,])/g

function wwwAuth(scheme: string, params: string): WWWAuthenticateChallenge {
  const arr = params.split(SPLIT_REGEXP).slice(1)
  if (arr.length === 0) {
    return { scheme: scheme.toLowerCase(), parameters: {} }
  }
  arr[arr.length - 1] = arr[arr.length - 1].replace(/,$/, '')
  const parameters: WWWAuthenticateChallenge['parameters'] = {}
  for (let i = 1; i < arr.length; i += 2) {
    const idx = i
    if (arr[idx][0] === '"') {
      while (arr[idx].slice(-1) !== '"' && ++i < arr.length) {
        arr[idx] += arr[i]
      }
    }
    const key = arr[idx - 1].replace(/^(?:, ?)|=$/g, '').toLowerCase()
    // @ts-expect-error
    parameters[key] = unquote(arr[idx])
  }

  return {
    scheme: scheme.toLowerCase(),
    parameters,
  }
}

/**
 * Parses the `WWW-Authenticate` HTTP Header from a
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Response Fetch API Response}.
 *
 * @param response {@link https://developer.mozilla.org/en-US/docs/Web/API/Response Fetch API Response}
 *
 * @returns Array of {@link WWWAuthenticateChallenge} objects. Their order from
 * the response is preserved.
 */
export function parseWwwAuthenticateChallenges(
  response: Response,
): WWWAuthenticateChallenge[] | undefined {
  if (!(response instanceof Response)) {
    throw new TypeError('"response" must be an instance of Response')
  }

  if (response.headers.has('www-authenticate') === false) {
    return undefined
  }

  const header = response.headers.get('www-authenticate')!

  const result: [string, number][] = []
  for (const { 1: scheme, index } of header.matchAll(SCHEMES_REGEXP)) {
    result.push([scheme, index!])
  }

  if (result.length === 0) {
    return undefined
  }

  const challenges = result.map(([scheme, indexOf], i, others) => {
    const next = others[i + 1]
    let parameters: string
    if (next) {
      parameters = header.slice(indexOf, next[1])
    } else {
      parameters = header.slice(indexOf)
    }
    return wwwAuth(scheme, parameters)
  })

  return challenges
}

/**
 * Validates
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Response Fetch API Response}
 * to be one coming from the
 * {@link AuthorizationServer.pushed_authorization_request_endpoint `as.pushed_authorization_request_endpoint`}.
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc9126.html#name-pushed-authorization-reques RFC 9126 - OAuth 2.0 Pushed Authorization Requests}
 *
 * @param as Authorization Server Metadata
 * @param client Client Metadata
 * @param response resolved value from {@link pushedAuthorizationRequest}
 *
 * @returns Object representing the parsed successful response, or an object
 * representing an OAuth 2.0 protocol style error. Use {@link isOAuth2Error} to
 * determine if an OAuth 2.0 error was returned.
 */
export async function processPushedAuthorizationResponse(
  as: AuthorizationServer,
  client: Client,
  response: Response,
): Promise<PushedAuthorizationResponse | OAuth2Error> {
  assertIssuer(as)
  assertClient(client)

  if (!(response instanceof Response)) {
    throw new TypeError('"response" must be an instance of Response')
  }

  if (response.status !== 201) {
    let err: OAuth2Error | undefined
    if ((err = await handleOAuthBodyError(response))) {
      return err
    }
    throw new OPE('"response" is not a conform Pushed Authorization Request Endpoint response')
  }

  let json: unknown
  try {
    json = await preserveBodyStream(response).json()
  } catch {
    throw new OPE('failed to parsed "response" body as JSON')
  }

  if (!isTopLevelObject<PushedAuthorizationResponse>(json)) {
    throw new OPE('"response" body must be a top level object')
  }

  if (typeof json.request_uri !== 'string' || json.request_uri.length === 0) {
    throw new OPE('"response" body "request_uri" property must be a non-empty string')
  }

  if (typeof json.expires_in !== 'number' || json.expires_in <= 0) {
    throw new OPE('"response" body "expires_in" property must be a positive number')
  }

  return json
}

export interface ProtectedResourceRequestOptions
  extends SignalledRequestOptions,
    DPoPRequestOptions {}

/**
 * Performs a protected resource request at an arbitrary URL.
 *
 * Authorization Header is used to transmit the Access Token
 * value.
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc6750.html#section-2.1 RFC 6750 - The OAuth 2.0 Authorization Framework: Bearer Token Usage}
 * @see {@link https://www.ietf.org/archive/id/draft-ietf-oauth-dpop-06.html#name-protected-resource-access draft-ietf-oauth-dpop-06 - OAuth 2.0 Demonstrating Proof-of-Possession at the Application Layer (DPoP)}
 *
 * @param accessToken The access token for the request
 * @param method The HTTP method for the request
 * @param url Instance of {@link https://developer.mozilla.org/en-US/docs/Web/API/URL URL} as the target URL for the request
 * @param headers Instance of {@link https://developer.mozilla.org/en-US/docs/Web/API/Headers Headers} for the request
 * @param body see {@link https://developer.mozilla.org/en-US/docs/Web/API/fetch#body Fetch API documentation}.
 *
 * @returns Resolves with
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API Fetch API}'s
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Response Response}
 */
export async function protectedResourceRequest(
  accessToken: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | string,
  url: URL,
  headers: Headers,
  body: RequestInit['body'],
  options?: ProtectedResourceRequestOptions,
): Promise<Response> {
  if (typeof accessToken !== 'string' || accessToken.length === 0) {
    throw new TypeError('"accessToken" must be a non-empty string')
  }

  if (!(url instanceof URL)) {
    throw new TypeError('"url" must be an instance of URL')
  }

  if (!(headers instanceof Headers)) {
    throw new TypeError('"headers" must be an instance of Headers')
  }

  headers = new Headers(headers)

  if (options?.DPoP === undefined) {
    headers.set('authorization', `Bearer ${accessToken}`)
  } else {
    await dpopProofJwt(headers, options.DPoP, url, 'GET', accessToken)
    headers.set('authorization', `DPoP ${accessToken}`)
  }

  headers.set('user-agent', USER_AGENT)

  return fetch(url.href, {
    body,
    headers,
    method,
    redirect: 'manual',
    signal: options?.signal,
  }).then(processDpopNonce)
}

export interface UserInfoRequestOptions extends ProtectedResourceRequestOptions {}

/**
 * Performs a UserInfo Request at the
 * {@link AuthorizationServer.userinfo_endpoint `as.userinfo_endpoint`}.
 *
 * Authorization Header is used to transmit the Access Token
 * value.
 *
 * @see {@link https://openid.net/specs/openid-connect-core-1_0.html#UserInfo OpenID Connect Core 1.0}
 * @see {@link https://www.ietf.org/archive/id/draft-ietf-oauth-dpop-06.html#name-protected-resource-access draft-ietf-oauth-dpop-06 - OAuth 2.0 Demonstrating Proof-of-Possession at the Application Layer (DPoP)}
 *
 * @param as Authorization Server Metadata
 * @param client Client Metadata
 * @param accessToken Access Token value
 *
 * @returns Resolves with
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API Fetch API}'s
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Response Response}
 */
export async function userInfoRequest(
  as: AuthorizationServer,
  client: Client,
  accessToken: string,
  options?: UserInfoRequestOptions,
): Promise<Response> {
  assertIssuer(as)
  assertClient(client)

  if (typeof as.userinfo_endpoint !== 'string') {
    throw new TypeError('"issuer.userinfo_endpoint" must be a string')
  }

  const url = new URL(as.userinfo_endpoint)

  const headers = new Headers()
  if (client.userinfo_signed_response_alg) {
    headers.set('accept', 'application/jwt')
  } else {
    headers.set('accept', 'application/json')
    headers.append('accept', 'application/jwt')
  }

  return protectedResourceRequest(accessToken, 'GET', url, headers, null, options)
}

export interface UserInfoResponse {
  readonly sub: string
  readonly name?: string
  readonly given_name?: string
  readonly family_name?: string
  readonly middle_name?: string
  readonly nickname?: string
  readonly preferred_username?: string
  readonly profile?: string
  readonly picture?: string
  readonly website?: string
  readonly email?: string
  readonly email_verified?: boolean
  readonly gender?: string
  readonly birthdate?: string
  readonly zoneinfo?: string
  readonly locale?: string
  readonly phone_number?: string
  readonly updated_at?: number
  readonly address?: {
    readonly formatted?: string
    readonly street_address?: string
    readonly locality?: string
    readonly region?: string
    readonly postal_code?: string
    readonly country?: string
  }

  readonly [claim: string]: unknown
}

const jwksCache = new LRU<string, { jwks: JsonWebKeySet; iat: number; stale: boolean }>(20)
const cryptoKeyCaches: Record<string, WeakMap<JWK, CryptoKey>> = {}

async function getPublicSigKeyFromIssuerJwksUri(
  as: AuthorizationServer,
  signal: AbortSignal | undefined,
  header: CompactJWSHeaderParameters,
): Promise<CryptoKey> {
  const { alg, kid } = header
  checkSupportedJwsAlg(alg)
  let kty: string
  switch (alg[0]) {
    case 'R': // Fall through
    case 'P':
      kty = 'RSA'
      break
    case 'E':
      kty = 'EC'
      break
    default:
      throw new UnsupportedOperationError()
  }

  let jwks: JsonWebKeySet
  let stale: boolean
  if (jwksCache.has(as.jwks_uri!)) {
    ;({ jwks, stale } = jwksCache.get(as.jwks_uri!)!)
  } else {
    jwks = await jwksRequest(as, { signal }).then(processJwksResponse)
    stale = false
    jwksCache.set(as.jwks_uri!, {
      jwks,
      iat: currentTimestamp(),
      get stale() {
        return this.iat + 5 * 60 * 60 < currentTimestamp()
      },
    })
  }

  const candidates = jwks.keys.filter((jwk) => {
    // filter keys based on the mapping of signature algorithms to Key Type
    let candidate = jwk.kty === kty

    // filter keys based on the JWK Key ID in the header
    if (candidate && typeof kid === 'string') {
      candidate = kid === jwk.kid
    }

    // filter keys based on the key's declared Algorithm
    if (candidate && typeof jwk.alg === 'string') {
      candidate = alg === jwk.alg
    }

    // filter keys based on the key's declared Public Key Use
    if (candidate && typeof jwk.use === 'string') {
      candidate = jwk.use === 'sig'
    }

    // filter keys based on the key's declared Key Operations
    if (candidate && Array.isArray(jwk.key_ops)) {
      candidate = jwk.key_ops.includes('verify')
    }

    // filter out non-applicable EC curves
    if (candidate) {
      switch (alg) {
        case 'ES256':
          candidate = jwk.crv === 'P-256'
          break
        case 'ES384':
          candidate = jwk.crv === 'P-384'
          break
        case 'ES512':
          candidate = jwk.crv === 'P-521'
          break
      }
    }

    return candidate
  })

  const { 0: jwk, length } = candidates

  if (length === 0) {
    if (stale) {
      jwksCache.delete(as.jwks_uri!)
      return getPublicSigKeyFromIssuerJwksUri(as, signal, header)
    }
    throw new OPE('error when selecting a JWT verification key, no applicable keys found')
  } else if (length !== 1) {
    throw new OPE(
      'error when selecting a JWT verification key, multiple applicable keys found, a "kid" JWT Header Parameter is required',
    )
  }

  cryptoKeyCaches[alg] ||= new WeakMap()

  let key = cryptoKeyCaches[alg].get(jwk)
  if (!key) {
    key = <CryptoKey>await importJwk({ ...jwk, alg, ext: false })
    cryptoKeyCaches[alg].set(jwk, key)
  }

  return key
}

/**
 * DANGER ZONE
 *
 * Use this as a value to {@link processUserInfoResponse} `expectedSubject`
 * parameter to skip the "sub" value check.
 *
 * @see {@link https://openid.net/specs/openid-connect-core-1_0.html#UserInfoResponse OpenID Connect Core 1.0}
 */
export const skipSubjectCheck = Symbol()

/**
 * Validates
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Response Fetch API Response}
 * to be one coming from the
 * {@link AuthorizationServer.userinfo_endpoint `as.userinfo_endpoint`}.
 *
 * @see {@link https://openid.net/specs/openid-connect-core-1_0.html#UserInfo OpenID Connect Core 1.0}
 *
 * @param as Authorization Server Metadata
 * @param client Client Metadata
 * @param expectedSubject Expected "sub" claim value. In response to
 * OpenID Connect authentication requests, the expected subject is the one from
 * the ID Token claims retrieved from {@link getValidatedIdTokenClaims}.
 * @param response resolved value from {@link userInfoRequest}
 *
 * @returns Object representing the parsed successful response, or an object
 * representing an OAuth 2.0 protocol style error. Use {@link isOAuth2Error} to
 * determine if an OAuth 2.0 error was returned.
 */
export async function processUserInfoResponse(
  as: AuthorizationServer,
  client: Client,
  expectedSubject: string | typeof skipSubjectCheck,
  response: Response,
  options?: SignalledRequestOptions,
): Promise<UserInfoResponse> {
  assertIssuer(as)
  assertClient(client)

  if (!(response instanceof Response)) {
    throw new TypeError('"response" must be an instance of Response')
  }

  if (response.status !== 200) {
    throw new OPE('"response" is not a conform UserInfo Endpoint response')
  }

  let json: unknown
  const [contentType] = (response.headers.get('content-type') || '').split(';')
  if (contentType === 'application/jwt') {
    if (typeof as.jwks_uri !== 'string') {
      throw new TypeError('"issuer.jwks_uri" must be a string')
    }

    const { claims } = await validateJws(
      await preserveBodyStream(response).text(),
      getPublicSigKeyFromIssuerJwksUri.bind(undefined, as, options?.signal),
    )
      .then(
        checkSigningAlgorithm.bind(
          undefined,
          client.userinfo_signed_response_alg,
          as.userinfo_signing_alg_values_supported,
          'RS256',
        ),
      )
      .then(checkJwtCrit)
      .then(parsePayload)
      .then(validateClaimTypesAndTimestamps)
      .then(validateOptionalAudience.bind(undefined, as.issuer))
      .then(validateOptionalIssuer.bind(undefined, client.client_id))

    json = <UserInfoResponse>claims
  } else {
    if (client.userinfo_signed_response_alg) {
      throw new OPE('JWT UserInfo Response expected')
    }

    try {
      json = await preserveBodyStream(response).json()
    } catch {
      throw new OPE('failed to parsed "response" body as JSON')
    }
  }

  if (!isTopLevelObject<UserInfoResponse>(json)) {
    throw new OPE('"response" body must be a top level object')
  }

  if (typeof json.sub !== 'string' || json.sub.length === 0) {
    throw new OPE('"response" body "sub" property must be a non-empty string')
  }

  switch (expectedSubject) {
    case skipSubjectCheck:
      break
    default:
      if (typeof expectedSubject !== 'string' || expectedSubject.length === 0) {
        throw new OPE('"expectedSubject" must be a non-empty string')
      }
      if (json.sub !== expectedSubject) {
        throw new OPE('unexpected "response" body "sub" value')
      }
  }

  return json
}

async function timingSafeEqual(a: Uint8Array, b: Uint8Array) {
  if (!(a instanceof Uint8Array)) {
    throw new TypeError('"a" must be an instance of Uint8Array')
  }

  if (!(b instanceof Uint8Array)) {
    throw new TypeError('"b" must be an instance of Uint8Array')
  }

  if (a.length !== b.length) {
    return false
  }

  const len = a.length
  let out = 0
  let i = -1
  while (++i < len) {
    out |= a[i] ^ b[i]
  }
  return out === 0
}

async function idTokenHash(jwsAlg: string, data: string) {
  let algorithm: string
  switch (jwsAlg) {
    case 'RS256': // Fall through
    case 'PS256': // Fall through
    case 'ES256':
      algorithm = 'SHA-256'
      break
    case 'RS384': // Fall through
    case 'PS384': // Fall through
    case 'ES384':
      algorithm = 'SHA-384'
      break
    case 'RS512': // Fall through
    case 'PS512': // Fall through
    case 'ES512':
      algorithm = 'SHA-512'
      break
    default:
      throw new UnsupportedOperationError()
  }

  const digest = new Uint8Array(await crypto.subtle.digest(algorithm, encoder.encode(data)))
  return encodeBase64Url(digest.slice(0, digest.length / 2))
}

async function idTokenHashMatches(jwsAlg: string, data: string, actual: string) {
  const expected = await idTokenHash(jwsAlg, data)
  const encoder = new TextEncoder()
  return timingSafeEqual(encoder.encode(actual), encoder.encode(expected))
}

async function authenticatedRequest(
  as: AuthorizationServer,
  client: Client,
  method: string,
  url: URL,
  body: URLSearchParams,
  headers: Headers,
  options?: SignalledRequestOptions & AuthenticatedRequestOptions,
) {
  headers.set('user-agent', USER_AGENT)

  await clientAuthentication(as, client, body, headers, options?.clientPrivateKey)

  return fetch(url.href, {
    body,
    headers,
    method,
    redirect: 'manual',
    signal: options?.signal,
  }).then(processDpopNonce)
}

export interface TokenEndpointRequestOptions
  extends SignalledRequestOptions,
    AuthenticatedRequestOptions,
    DPoPRequestOptions {
  /**
   * Any additional parameters to send. This cannot override existing parameter
   * values.
   */
  additionalParameters?: URLSearchParams
}

async function tokenEndpointRequest(
  as: AuthorizationServer,
  client: Client,
  grantType: string,
  parameters: URLSearchParams,
  options?: TokenEndpointRequestOptions,
): Promise<Response> {
  if (typeof grantType !== 'string' || grantType.length === 0) {
    throw new TypeError('"grantType" must be a non-empty string')
  }

  if (!(parameters instanceof URLSearchParams)) {
    throw new TypeError('"parameters" must be an instance of URLSearchParams')
  }

  if (typeof as.token_endpoint !== 'string') {
    throw new TypeError('"issuer.token_endpoint" must be a string')
  }

  const url = new URL(as.token_endpoint)

  parameters.set('grant_type', grantType)
  const headers = new Headers({ accept: 'application/json' })

  if (options?.DPoP !== undefined) {
    await dpopProofJwt(headers, options.DPoP, url, 'POST')
  }

  return authenticatedRequest(as, client, 'POST', url, parameters, headers, options)
}

/**
 * Performs a Refresh Token Grant request at the
 * {@link AuthorizationServer.token_endpoint `as.token_endpoint`}.
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc6749.html#section-6 RFC 6749 - The OAuth 2.0 Authorization Framework}
 * @see {@link https://openid.net/specs/openid-connect-core-1_0.html#RefreshTokens OpenID Connect Core 1.0}
 * @see {@link https://www.ietf.org/archive/id/draft-ietf-oauth-dpop-06.html#name-dpop-access-token-request draft-ietf-oauth-dpop-06 - OAuth 2.0 Demonstrating Proof-of-Possession at the Application Layer (DPoP)}
 *
 * @param as Authorization Server Metadata
 * @param client Client Metadata
 * @param refreshToken Refresh Token value
 *
 * @returns Resolves with
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API Fetch API}'s
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Response Response}
 */
export async function refreshTokenGrantRequest(
  as: AuthorizationServer,
  client: Client,
  refreshToken: string,
  options?: TokenEndpointRequestOptions,
): Promise<Response> {
  assertIssuer(as)
  assertClient(client)

  if (typeof refreshToken !== 'string' || refreshToken.length === 0) {
    throw new TypeError('"refreshToken" must be a non-empty string')
  }

  const parameters = new URLSearchParams(options?.additionalParameters)
  parameters.set('refresh_token', refreshToken)
  return tokenEndpointRequest(as, client, 'refresh_token', parameters, options)
}

const idTokenClaims = new WeakMap<TokenEndpointResponse, IDToken>()

/**
 * Returns ID Token claims validated during {@link authorizationCodeGrantRequest} or
 * {@link refreshTokenGrantRequest}.
 *
 * @param ref object previously resolved from
 * {@link processAuthorizationCodeOpenIDResponse},
 * {@link refreshTokenGrantRequest}, or
 * {@link processDeviceCodeResponse}.
 * If the "ref" object did not come from these methods, or didn't contain an ID
 * Token, this function returns undefined.
 *
 * @returns JWT Claims Set from an ID Token, or undefined if there was no ID
 * Token returned in "ref".
 */
export function getValidatedIdTokenClaims(
  ref: OpenIDTokenEndpointResponse | OAuth2TokenEndpointResponse | TokenEndpointResponse,
): IDToken | undefined {
  return idTokenClaims.get(ref)
}

async function processGenericAccessTokenResponse(
  as: AuthorizationServer,
  client: Client,
  response: Response,
  options?: SignalledRequestOptions,
  ignoreIdToken = false,
  ignoreRefreshToken = false,
): Promise<TokenEndpointResponse | OAuth2Error> {
  assertIssuer(as)
  assertClient(client)

  if (!(response instanceof Response)) {
    throw new TypeError('"response" must be an instance of Response')
  }

  if (response.status !== 200) {
    let err: OAuth2Error | undefined
    if ((err = await handleOAuthBodyError(response))) {
      return err
    }
    throw new OPE('"response" is not a conform Token Endpoint response')
  }

  let json: unknown
  try {
    json = await preserveBodyStream(response).json()
  } catch {
    throw new OPE('failed to parsed "response" body as JSON')
  }

  if (!isTopLevelObject<TokenEndpointResponse>(json)) {
    throw new OPE('"response" body must be a top level object')
  }

  if (typeof json.access_token !== 'string' || json.access_token.length === 0) {
    throw new OPE('"response" body "access_token" property must be a non-empty string')
  }

  if (typeof json.token_type !== 'string' || json.token_type.length === 0) {
    throw new OPE('"response" body "token_type" property must be a non-empty string')
  }

  // @ts-expect-error
  json.token_type = json.token_type.toLowerCase()

  if (
    json.expires_in !== undefined &&
    (typeof json.expires_in !== 'number' || json.expires_in <= 0)
  ) {
    throw new OPE('"response" body "expires_in" property must be a positive number')
  }

  if (
    ignoreRefreshToken === false &&
    json.refresh_token !== undefined &&
    (typeof json.refresh_token !== 'string' || json.refresh_token.length === 0)
  ) {
    throw new OPE('"response" body "refresh_token" property must be a non-empty string')
  }

  if (json.scope !== undefined && (typeof json.scope !== 'string' || json.scope.length === 0)) {
    throw new OPE('"response" body "scope" property must be a non-empty string')
  }

  if (ignoreIdToken === false) {
    if (
      json.id_token !== undefined &&
      (typeof json.id_token !== 'string' || json.id_token.length === 0)
    ) {
      throw new OPE('"response" body "id_token" property must be a non-empty string')
    }

    if (json.id_token) {
      if (typeof as.jwks_uri !== 'string') {
        throw new TypeError('"issuer.jwks_uri" must be a string')
      }

      const { header, claims } = await validateJws(
        json.id_token,
        getPublicSigKeyFromIssuerJwksUri.bind(undefined, as, options?.signal),
      )
        .then(
          checkSigningAlgorithm.bind(
            undefined,
            client.id_token_signed_response_alg,
            as.id_token_signing_alg_values_supported,
            'RS256',
          ),
        )
        .then(checkJwtCrit)
        .then(parsePayload)
        .then(
          validatePresence.bind(undefined, [
            ['iss', 'issuer'],
            ['aud', 'audience'],
            ['sub', 'subject'],
            ['iat', 'issued at'],
            ['exp', 'expiration time'],
          ]),
        )
        .then(validateClaimTypesAndTimestamps)
        .then(validateIssuer.bind(undefined, as.issuer))
        .then(validateAudience.bind(undefined, client.client_id))

      if (Array.isArray(claims.aud) && claims.aud.length !== 1 && claims.azp !== client.client_id) {
        throw new OPE('unexpected ID Token "azp" (authorized party)')
      }

      if (client.require_auth_time && typeof claims.auth_time !== 'number') {
        throw new OPE('invalid ID Token "auth_time"')
      }

      if (claims.at_hash !== undefined) {
        if (
          typeof claims.at_hash !== 'string' ||
          (await idTokenHashMatches(header.alg, json.access_token, claims.at_hash)) !== true
        ) {
          throw new OPE('invalid ID Token "at_hash"')
        }
      }

      idTokenClaims.set(json, <IDToken>claims)
    }
  }

  return json
}

/**
 * Validates Refresh Token Grant
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Response Fetch API Response}
 * to be one coming from the
 * {@link AuthorizationServer.token_endpoint `as.token_endpoint`}.
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc6749.html#section-6 RFC 6749 - The OAuth 2.0 Authorization Framework}
 * @see {@link https://openid.net/specs/openid-connect-core-1_0.html#RefreshTokens OpenID Connect Core 1.0}
 *
 * @param as Authorization Server Metadata
 * @param client Client Metadata
 * @param response resolved value from {@link refreshTokenGrantRequest}
 *
 * @returns Object representing the parsed successful response, or an object
 * representing an OAuth 2.0 protocol style error. Use {@link isOAuth2Error} to
 * determine if an OAuth 2.0 error was returned.
 */
export async function processRefreshTokenResponse(
  as: AuthorizationServer,
  client: Client,
  response: Response,
  options?: SignalledRequestOptions,
): Promise<TokenEndpointResponse | OAuth2Error> {
  return processGenericAccessTokenResponse(as, client, response, options)
}

function validateOptionalAudience(expected: string, result: ParsedJWT) {
  if (result.claims.aud !== undefined) {
    return validateAudience(expected, result)
  }
  return result
}

function validateAudience(expected: string, result: ParsedJWT) {
  if (Array.isArray(result.claims.aud)) {
    if (result.claims.aud.includes(expected) === false) {
      throw new OPE('unexpected JWT "aud" (audience)')
    }
  } else if (result.claims.aud !== expected) {
    throw new OPE('unexpected JWT "aud" (audience)')
  }

  return result
}

function validateOptionalIssuer(expected: string, result: ParsedJWT) {
  if (result.claims.iss !== undefined) {
    return validateIssuer(expected, result)
  }
  return result
}

function validateIssuer(expected: string, result: ParsedJWT) {
  if (result.claims.iss !== expected) {
    throw new OPE('unexpected JWT "iss" (issuer)')
  }
  return result
}

/**
 * Performs an Authorization Code grant request at the
 * {@link AuthorizationServer.token_endpoint `as.token_endpoint`}.
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc6749.html#section-4.1 RFC 6749 - The OAuth 2.0 Authorization Framework}
 * @see {@link https://openid.net/specs/openid-connect-core-1_0.html#CodeFlowAuth OpenID Connect Core 1.0}
 * @see {@link https://www.rfc-editor.org/rfc/rfc7636.html#section-4 RFC 7636 - Proof Key for Code Exchange by OAuth Public Clients (PKCE)}
 * @see {@link https://www.ietf.org/archive/id/draft-ietf-oauth-dpop-06.html#name-dpop-access-token-request draft-ietf-oauth-dpop-06 - OAuth 2.0 Demonstrating Proof-of-Possession at the Application Layer (DPoP)}
 *
 * @param as Authorization Server Metadata
 * @param client Client Metadata
 * @param callbackParameters parameters obtained from the callback to
 * redirect_uri, this is returned from {@link validateAuthResponse}, or
 * {@link validateJwtAuthResponse}
 * @param redirectUri redirect_uri value used in the authorization request
 * @param codeVerifier PKCE code verifier to send to the token endpoint
 *
 * @returns Resolves with
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API Fetch API}'s
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Response Response}
 */
export async function authorizationCodeGrantRequest(
  as: AuthorizationServer,
  client: Client,
  callbackParameters: CallbackParameters,
  redirectUri: string,
  codeVerifier: string,
  options?: TokenEndpointRequestOptions,
): Promise<Response> {
  assertIssuer(as)
  assertClient(client)

  if (!(callbackParameters instanceof CallbackParameters)) {
    throw new TypeError(
      '"callbackParameters" must be an instance of CallbackParameters obtained from "validateAuthResponse()"',
    )
  }

  if (typeof redirectUri !== 'string' || redirectUri.length === 0) {
    throw new TypeError('"redirectUri" must be a non-empty string')
  }

  if (typeof codeVerifier !== 'string' || codeVerifier.length === 0) {
    throw new TypeError('"codeVerifier" must be a non-empty string')
  }

  const code = getURLSearchParameter(callbackParameters, 'code')
  if (!code) {
    throw new OPE('no authorization code received')
  }

  const parameters = new URLSearchParams(options?.additionalParameters)
  parameters.set('redirect_uri', redirectUri)
  parameters.set('code_verifier', codeVerifier)
  parameters.set('code', code)

  return tokenEndpointRequest(as, client, 'authorization_code', parameters, options)
}

interface JWTPayload {
  readonly iss?: string
  readonly sub?: string
  readonly aud?: string | string[]
  readonly jti?: string
  readonly nbf?: number
  readonly exp?: number
  readonly iat?: number

  readonly [claim: string]: unknown
}

export interface IDToken extends JWTPayload {
  readonly iss: string
  readonly sub: string
  readonly aud: string | string[]
  readonly iat: number
  readonly exp: number
  readonly nonce?: string
  readonly auth_time?: number
  readonly azp?: string
}

interface ClientSecretJWTHeaderParameters {
  alg: 'HS256' | 'HS384' | 'HS512'
}

interface CompactJWSHeaderParameters {
  alg: JWSAlgorithm
  kid?: string
  typ?: string
  crit?: string[]
  jwk?: JWK
}

interface CompactJWEHeaderParameters {
  alg: KeyManagementAlgorithm
  enc: ContentEncryptionAlgorithm
  cty?: string
  kid?: string
  typ?: string
  iss: string
  sub: string
  aud: string
  epk?: JWK
}

interface CompactVerifyResult {
  header: CompactJWSHeaderParameters
  payload: Uint8Array
}

interface ParsedJWT {
  header: CompactJWSHeaderParameters
  claims: JWTPayload
}

function parsePayload(result: CompactVerifyResult): ParsedJWT {
  const { header, payload } = result
  let claims: any
  try {
    claims = JSON.parse(decoder.decode(payload))
  } catch {}

  if (!isTopLevelObject<JWTPayload>(claims)) {
    throw new OPE('JWT Payload must be a top level object')
  }
  return { header, claims }
}

function validateClaimTypesAndTimestamps(result: ParsedJWT) {
  const { claims } = result

  const now = currentTimestamp()
  const tolerance = 30 // TODO: tolerance config

  if (claims.exp !== undefined) {
    if (typeof claims.exp !== 'number') {
      throw new OPE('invalid JWT "exp" (expiration time)')
    }

    if (claims.exp <= now - tolerance) {
      throw new OPE('JWT "exp" (expiration time) timestamp is <= now()')
    }
  }

  if (claims.iat !== undefined) {
    if (typeof claims.iat !== 'number') {
      throw new OPE('invalid JWT "iat" (issued at)')
    }
  }

  if (claims.iss !== undefined) {
    if (typeof claims.iss !== 'string') {
      throw new OPE('invalid JWT "iss" (issuer)')
    }
  }

  if (claims.nbf !== undefined) {
    if (typeof claims.nbf !== 'number') {
      throw new OPE('invalid JWT "nbf" (not before)')
    }
    if (claims.nbf > now + tolerance) {
      throw new OPE('JWT "nbf" (not before) timestamp is > now()')
    }
  }

  if (claims.aud !== undefined) {
    if (typeof claims.aud !== 'string' && !Array.isArray(claims.aud)) {
      throw new OPE('invalid JWT "aud" (audience)')
    }
  }

  return result
}

type Entries = [string, string]
function validatePresence(required: Entries[], result: ParsedJWT) {
  for (const [claim, name] of required) {
    if (result.claims[claim] === undefined) {
      throw new OPE(`missing JWT "${claim}" (${name})`)
    }
  }
  return result
}

export interface TokenEndpointResponse {
  readonly access_token: string
  readonly refresh_token?: string
  /**
   * NOTE: the token_type value is lowercased
   */
  readonly token_type: string
  readonly expires_in?: number
  readonly id_token?: string
  readonly scope?: string

  readonly [parameter: string]: unknown
}

export interface OpenIDTokenEndpointResponse {
  readonly access_token: string
  readonly refresh_token?: string
  /**
   * NOTE: the token_type value is lowercased
   */
  readonly token_type: string
  readonly expires_in?: number
  readonly id_token: string
  readonly scope?: string

  readonly [parameter: string]: unknown
}

export interface OAuth2TokenEndpointResponse {
  readonly access_token: string
  readonly refresh_token?: string
  /**
   * NOTE: the token_type value is lowercased
   */
  readonly token_type: string
  readonly expires_in?: number
  readonly scope?: string

  readonly [parameter: string]: unknown
}

export interface ClientCredentialsGrantResponse {
  readonly access_token: string
  /**
   * NOTE: the token_type value is lowercased
   */
  readonly token_type: string
  readonly expires_in?: number
  readonly scope?: string

  readonly [parameter: string]: unknown
}

/**
 * Use this as a value to {@link processAuthorizationCodeOpenIDResponse} `expectedNonce`
 * parameter to indicate no "nonce" ID Token claim value is expected, i.e. no "nonce"
 * parameter value was sent with the authorization request.
 */
export const expectNoNonce = Symbol()

/**
 * Use this as a value to {@link processAuthorizationCodeOpenIDResponse} `maxAge`
 * parameter to indicate no "auth_time" ID Token claim value check should be performed.
 */
export const skipAuthTimeCheck = Symbol()

/**
 * (OpenID Connect only) Validates Authorization Code Grant
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Response Fetch API Response}
 * to be one coming from the
 * {@link AuthorizationServer.token_endpoint `as.token_endpoint`}.
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc6749.html#section-4.1 RFC 6749 - The OAuth 2.0 Authorization Framework}
 * @see {@link https://openid.net/specs/openid-connect-core-1_0.html#CodeFlowAuth OpenID Connect Core 1.0}
 *
 * @param as Authorization Server Metadata
 * @param client Client Metadata
 * @param response resolved value from {@link authorizationCodeGrantRequest}
 * @param expectedNonce Expected ID Token "nonce" claim value
 * @param maxAge ID Token {@link IDToken.auth_time auth_time} parameter will be
 * checked to be present and conform to the "maxAge" value. Use of this option
 * is required if you sent a max_age parameter in an authorization request. It's
 * value defaults to {@link Client.default_max_age `client.default_max_age`} and
 * falls back to {@link skipAuthTimeCheck}
 *
 * @returns Object representing the parsed successful response, or an object
 * representing an OAuth 2.0 protocol style error. Use {@link isOAuth2Error} to
 * determine if an OAuth 2.0 error was returned.
 */
export async function processAuthorizationCodeOpenIDResponse(
  as: AuthorizationServer,
  client: Client,
  response: Response,
  expectedNonce: string | typeof expectNoNonce = expectNoNonce,
  maxAge: number | typeof skipAuthTimeCheck = client.default_max_age ?? skipAuthTimeCheck,
  options?: SignalledRequestOptions,
): Promise<OpenIDTokenEndpointResponse | OAuth2Error> {
  const result = await processGenericAccessTokenResponse(as, client, response, options)

  if (isOAuth2Error(result)) {
    return result
  }

  if (typeof result.id_token !== 'string' || result.id_token.length === 0) {
    throw new OPE('"response" body "id_token" property must be a non-empty string')
  }

  const claims = getValidatedIdTokenClaims(result)!
  if (
    (client.require_auth_time || maxAge !== skipAuthTimeCheck) &&
    claims.auth_time === undefined
  ) {
    throw new OPE('missing ID Token "auth_time" claims')
  }

  if (maxAge !== skipAuthTimeCheck) {
    if (typeof maxAge !== 'number' || maxAge < 0) {
      throw new TypeError('"options.max_age" must be a non-negative number')
    }

    const now = currentTimestamp()
    const tolerance = 30 // TODO: tolerance config
    if (claims.auth_time! + maxAge < now - tolerance) {
      throw new OPE('too much time has elapsed since the last End-User authentication')
    }
  }

  switch (expectedNonce) {
    case expectNoNonce:
      if (claims.nonce !== undefined) {
        throw new OPE('unexpected ID Token "nonce" claim received')
      }
      break
    default:
      if (typeof expectedNonce !== 'string' || expectedNonce.length === 0) {
        throw new OPE('"expectedNonce" must be a non-empty string')
      }
      if (claims.nonce === undefined) {
        throw new OPE('ID Token "nonce" claim missing')
      }
      if (claims.nonce !== expectedNonce) {
        throw new OPE('unexpected ID Token "nonce" claim value received')
      }
  }

  return <OpenIDTokenEndpointResponse>result
}

/**
 * (OAuth 2.0 without OpenID Connect only) Validates Authorization Code Grant
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Response Fetch API Response}
 * to be one coming from the
 * {@link AuthorizationServer.token_endpoint `as.token_endpoint`}.
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc6749.html#section-4.1 RFC 6749 - The OAuth 2.0 Authorization Framework}
 *
 * @param as Authorization Server Metadata
 * @param client Client Metadata
 * @param response resolved value from {@link authorizationCodeGrantRequest}
 *
 * @returns Object representing the parsed successful response, or an object
 * representing an OAuth 2.0 protocol style error. Use {@link isOAuth2Error} to
 * determine if an OAuth 2.0 error was returned.
 */
export async function processAuthorizationCodeOAuth2Response(
  as: AuthorizationServer,
  client: Client,
  response: Response,
): Promise<OAuth2TokenEndpointResponse | OAuth2Error> {
  const result = await processGenericAccessTokenResponse(as, client, response)

  if (isOAuth2Error(result)) {
    return result
  }

  if (result.id_token !== undefined) {
    throw new OPE(
      'Unexpected ID Token returned, use "options.mode" "oidc" for OpenID Connect callback processing',
    )
  }

  return <OAuth2TokenEndpointResponse>result
}

function checkJwtType(expected: string, result: CompactVerifyResult) {
  if (typeof result.header.typ !== 'string' || normalizeTyp(result.header.typ) !== expected) {
    throw new OPE('unexpected JWT "typ" header parameter value')
  }

  return result
}

function checkJwtCrit(result: CompactVerifyResult) {
  if (result.header.crit !== undefined) {
    throw new OPE('unexpected JWT "crit" header parameter')
  }

  return result
}

/**
 * Performs a Client Credentials Grant request at the
 * {@link AuthorizationServer.token_endpoint `as.token_endpoint`}.
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc6749.html#section-4.4 RFC 6749 - The OAuth 2.0 Authorization Framework}
 * @see {@link https://www.ietf.org/archive/id/draft-ietf-oauth-dpop-06.html#name-dpop-access-token-request draft-ietf-oauth-dpop-06 - OAuth 2.0 Demonstrating Proof-of-Possession at the Application Layer (DPoP)}
 *
 * @param as Authorization Server Metadata
 * @param client Client Metadata
 *
 * @returns Resolves with
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API Fetch API}'s
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Response Response}
 */
export async function clientCredentialsGrantRequest(
  as: AuthorizationServer,
  client: Client,
  options?: TokenEndpointRequestOptions,
): Promise<Response> {
  assertIssuer(as)
  assertClient(client)

  const parameters = new URLSearchParams(options?.additionalParameters)
  return tokenEndpointRequest(as, client, 'client_credentials', parameters, options)
}

/**
 * Validates Client Credentials Grant
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Response Fetch API Response}
 * to be one coming from the
 * {@link AuthorizationServer.token_endpoint `as.token_endpoint`}.
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc6749.html#section-4.4 RFC 6749 - The OAuth 2.0 Authorization Framework}
 *
 * @param as Authorization Server Metadata
 * @param client Client Metadata
 * @param response resolved value from {@link clientCredentialsGrantRequest}
 *
 * @returns Object representing the parsed successful response, or an object
 * representing an OAuth 2.0 protocol style error. Use {@link isOAuth2Error} to
 * determine if an OAuth 2.0 error was returned.
 */
export async function processClientCredentialsResponse(
  as: AuthorizationServer,
  client: Client,
  response: Response,
): Promise<ClientCredentialsGrantResponse | OAuth2Error> {
  const result = await processGenericAccessTokenResponse(
    as,
    client,
    response,
    undefined,
    true,
    true,
  )

  if (isOAuth2Error(result)) {
    return result
  }

  return <ClientCredentialsGrantResponse>result
}

export interface RevocationRequestOptions
  extends SignalledRequestOptions,
    AuthenticatedRequestOptions {
  /**
   * Any additional parameters to send. This cannot override existing parameter
   * values.
   */
  additionalParameters?: URLSearchParams
}

/**
 *
 * Performs a revocation request at the
 * {@link AuthorizationServer.revocation_endpoint `as.revocation_endpoint`}.
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc7009.html#section-2 RFC 7009 - OAuth 2.0 Token Revocation}
 *
 * @param as Authorization Server Metadata
 * @param client Client Metadata
 * @param token Token to revoke. You can provide the `token_type_hint`
 * parameter via {@link RevocationRequestOptions.additionalParameters options}.
 *
 * @returns Resolves with
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API Fetch API}'s
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Response Response}
 */
export async function revocationRequest(
  as: AuthorizationServer,
  client: Client,
  token: string,
  options?: RevocationRequestOptions,
): Promise<Response> {
  assertIssuer(as)
  assertClient(client)

  if (typeof token !== 'string' || token.length === 0) {
    throw new TypeError('"token" must be a non-empty string')
  }

  if (typeof as.revocation_endpoint !== 'string') {
    throw new TypeError('"issuer.revocation_endpoint" must be a string')
  }

  const url = new URL(as.revocation_endpoint)

  const body = new URLSearchParams(options?.additionalParameters)
  body.set('token', token)
  const headers = new Headers()

  return authenticatedRequest(as, client, 'POST', url, body, headers, options)
}

/**
 * Validates
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Response Fetch API Response}
 * to be one coming from the
 * {@link AuthorizationServer.revocation_endpoint `as.revocation_endpoint`}.
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc7009.html#section-2 RFC 7009 - OAuth 2.0 Token Revocation}
 *
 * @param response resolved value from {@link revocationRequest}
 *
 * @returns `undefined` when the request was successful, or an object
 * representing an OAuth 2.0 protocol style error.
 */
export async function processRevocationResponse(
  response: Response,
): Promise<undefined | OAuth2Error> {
  if (!(response instanceof Response)) {
    throw new TypeError('"response" must be an instance of Response')
  }

  if (response.status !== 200) {
    let err: OAuth2Error | undefined
    if ((err = await handleOAuthBodyError(response))) {
      return err
    }
    throw new OPE('"response" is not a conform Revocation Endpoint response')
  }
}

export interface IntrospectionRequestOptions
  extends SignalledRequestOptions,
    AuthenticatedRequestOptions {
  /**
   * Any additional parameters to send. This cannot override existing parameter
   * values.
   */
  additionalParameters?: URLSearchParams
  /**
   * Request a JWT Response from the
   * {@link AuthorizationServer.introspection_endpoint `as.introspection_endpoint`}.
   * Default is
   * - true when
   * {@link Client.introspection_signed_response_alg `client.introspection_signed_response_alg`}
   * is set
   * - false otherwise
   */
  requestJwtResponse?: boolean
}

function assertReadableResponse(response: Response) {
  if (response.bodyUsed === true) {
    throw new TypeError()
  }
}

/**
 * Performs an introspection request at the
 * {@link AuthorizationServer.introspection_endpoint `as.introspection_endpoint`}.
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc7662.html#section-2 RFC 7662 - OAuth 2.0 Token Introspection}
 * @see {@link https://www.ietf.org/archive/id/draft-ietf-oauth-jwt-introspection-response-12.html#section-4 draft-ietf-oauth-jwt-introspection-response-12 - JWT Response for OAuth Token Introspection}
 *
 * @param as Authorization Server Metadata
 * @param client Client Metadata
 * @param token Token to introspect. You can provide the `token_type_hint`
 * parameter via
 * {@link IntrospectionRequestOptions.additionalParameters options}.
 *
 * @returns Resolves with
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API Fetch API}'s
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Response Response}
 */
export async function introspectionRequest(
  as: AuthorizationServer,
  client: Client,
  token: string,
  options?: IntrospectionRequestOptions,
): Promise<Response> {
  assertIssuer(as)
  assertClient(client)

  if (typeof token !== 'string' || token.length === 0) {
    throw new TypeError('"token" must be a non-empty string')
  }

  if (typeof as.introspection_endpoint !== 'string') {
    throw new TypeError('"issuer.introspection_endpoint" must be a string')
  }

  const url = new URL(as.introspection_endpoint)

  const body = new URLSearchParams(options?.additionalParameters)
  body.set('token', token)
  const headers = new Headers()
  if (options?.requestJwtResponse ?? client.introspection_signed_response_alg) {
    headers.set('accept', 'application/token-introspection+jwt')
  } else {
    headers.set('accept', 'application/json')
  }

  return authenticatedRequest(as, client, 'POST', url, body, headers, options)
}

export interface IntrospectionResponse {
  readonly active: boolean
  readonly client_id?: string
  readonly exp?: number
  readonly iat?: number
  readonly sid?: string
  readonly iss?: string
  readonly jti?: string
  readonly username?: string
  readonly aud?: string | string[]
  readonly scope: string
  readonly sub?: string
  readonly nbf?: number
  readonly token_type?: string
  readonly cnf?: {
    readonly 'x5t#S256'?: string
    readonly jkt?: string

    readonly [claim: string]: unknown
  }

  readonly [claim: string]: unknown
}

/**
 * Validates
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Response Fetch API Response}
 * to be one coming from the
 * {@link AuthorizationServer.introspection_endpoint `as.introspection_endpoint`}.
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc7662.html#section-2 RFC 7662 - OAuth 2.0 Token Introspection}
 * @see {@link https://www.ietf.org/archive/id/draft-ietf-oauth-jwt-introspection-response-12.html#section-5 draft-ietf-oauth-jwt-introspection-response-12 - JWT Response for OAuth Token Introspection}
 *
 * @param as Authorization Server Metadata
 * @param client Client Metadata
 * @param response resolved value from {@link introspectionRequest}
 *
 * @returns Object representing the parsed successful response, or an object
 * representing an OAuth 2.0 protocol style error. Use {@link isOAuth2Error} to
 * determine if an OAuth 2.0 error was returned.
 */
export async function processIntrospectionResponse(
  as: AuthorizationServer,
  client: Client,
  response: Response,
  options?: SignalledRequestOptions,
): Promise<IntrospectionResponse | OAuth2Error> {
  assertIssuer(as)
  assertClient(client)

  if (!(response instanceof Response)) {
    throw new TypeError('"response" must be an instance of Response')
  }

  if (response.status !== 200) {
    let err: OAuth2Error | undefined
    if ((err = await handleOAuthBodyError(response))) {
      return err
    }
    throw new OPE('"response" is not a conform Introspection Endpoint response')
  }

  let json: unknown
  const [contentType] = (response.headers.get('content-type') || '').split(';')
  if (contentType === 'application/token-introspection+jwt') {
    if (typeof as.jwks_uri !== 'string') {
      throw new TypeError('"issuer.jwks_uri" must be a string')
    }

    const { claims } = await validateJws(
      await preserveBodyStream(response).text(),
      getPublicSigKeyFromIssuerJwksUri.bind(undefined, as, options?.signal),
    )
      .then(
        checkSigningAlgorithm.bind(
          undefined,
          client.introspection_signed_response_alg,
          as.introspection_signing_alg_values_supported,
          'RS256',
        ),
      )
      .then(checkJwtCrit)
      .then(checkJwtType.bind(undefined, 'token-introspection+jwt'))
      .then(parsePayload)
      .then(
        validatePresence.bind(undefined, [
          ['iss', 'issuer'],
          ['aud', 'audience'],
          ['iat', 'issued at'],
        ]),
      )
      .then(validateClaimTypesAndTimestamps)
      .then(validateIssuer.bind(undefined, as.issuer))
      .then(validateAudience.bind(undefined, client.client_id))

    json = claims.token_introspection
    if (!isTopLevelObject<IntrospectionResponse>(claims.token_introspection)) {
      throw new OPE('JWT payload must be a top level object')
    }
  } else {
    try {
      json = await preserveBodyStream(response).json()
    } catch {
      throw new OPE('failed to parsed "response" body as JSON')
    }
  }

  if (!isTopLevelObject<IntrospectionResponse>(json)) {
    throw new OPE('"response" body must be a top level object')
  }

  if (typeof json.active !== 'boolean') {
    throw new OPE('"response" body "active" property must be a boolean')
  }

  return json
}

export interface JwksRequestOptions extends SignalledRequestOptions {}

/**
 * Performs a request to the
 * {@link AuthorizationServer.jwks_uri `as.jwks_uri`}
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc7517.html#section-5 JWK Set Format}
 * @see {@link https://www.rfc-editor.org/rfc/rfc8414.html#section-3 RFC 8414 - OAuth 2.0 Authorization Server Metadata}
 * @see {@link https://openid.net/specs/openid-connect-discovery-1_0.html#ProviderConfig OpenID Connect Discovery 1.0}
 *
 * @param as Authorization Server Metadata
 *
 * @returns Resolves with
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API Fetch API}'s
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Response Response}
 */
export async function jwksRequest(
  as: AuthorizationServer,
  options?: JwksRequestOptions,
): Promise<Response> {
  assertIssuer(as)

  if (typeof as.jwks_uri !== 'string') {
    throw new TypeError('"issuer.jwks_uri" must be a string')
  }

  const url = new URL(as.jwks_uri)

  const headers = new Headers()
  headers.set('accept', 'application/json')
  headers.append('accept', 'application/jwk-set+json')
  headers.set('user-agent', USER_AGENT)

  return fetch(url.href, {
    headers,
    method: 'GET',
    redirect: 'manual',
    signal: options?.signal,
  }).then(processDpopNonce)
}

export interface JsonWebKeySet {
  readonly keys: JWK[]
}

/**
 * Validates
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Response Fetch API Response}
 * to be one coming from the
 * {@link AuthorizationServer.jwks_uri `as.jwks_uri`}.
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc7517.html#section-5 JWK Set Format}
 *
 * @param response resolved value from {@link jwksRequest}
 *
 * @returns Object representing the parsed successful response
 */
export async function processJwksResponse(response: Response): Promise<JsonWebKeySet> {
  if (!(response instanceof Response)) {
    throw new TypeError('"response" must be an instance of Response')
  }

  if (response.status !== 200) {
    throw new OPE('"response" is not a conform JSON Web Key Set response')
  }

  let json: unknown
  try {
    json = await preserveBodyStream(response).json()
  } catch {
    throw new OPE('failed to parsed "response" body as JSON')
  }

  if (!isTopLevelObject<JsonWebKeySet>(json)) {
    throw new OPE('"response" body must be a top level object')
  }

  if (!Array.isArray(json.keys)) {
    throw new OPE('"response" body "keys" property must be an array')
  }

  if (!Array.prototype.every.call(json.keys, isTopLevelObject)) {
    throw new OPE('"response" body "keys" property members must be JWK formatted objects')
  }

  return json
}

async function handleOAuthBodyError(response: Response) {
  if (response.status > 399 && response.status < 500) {
    try {
      const json: unknown = await preserveBodyStream(response).json()
      if (
        isTopLevelObject<OAuth2Error>(json) &&
        typeof json.error === 'string' &&
        json.error.length !== 0
      ) {
        if (typeof json.error_description !== 'string') {
          // @ts-expect-error
          delete json.error_description
        }
        if (typeof json.error_uri !== 'string') {
          // @ts-expect-error
          delete json.error_uri
        }
        return json
      }
    } catch {}
  }
}

function checkSupportedJweEnc(enc: unknown) {
  if (SUPPORTED_JWE_ENCS.includes(<any>enc) === false) {
    throw new UnsupportedOperationError('unsupported JWE "enc" identifier')
  }
  return <ContentEncryptionAlgorithm>enc
}

function checkSupportedJweAlg(alg: unknown) {
  if (SUPPORTED_JWE_ALGS.includes(<any>alg) === false) {
    throw new UnsupportedOperationError('unsupported JWE "alg" identifier')
  }
  return <KeyManagementAlgorithm>alg
}

function checkSupportedJwsAlg(alg: unknown) {
  if (SUPPORTED_JWS_ALGS.includes(<any>alg) === false) {
    throw new UnsupportedOperationError('unsupported JWS "alg" identifier')
  }
  return <JWSAlgorithm>alg
}

function checkRsaKeyAlgorithm(algorithm: RsaKeyAlgorithm) {
  if (typeof algorithm.modulusLength !== 'number' || algorithm.modulusLength < 2048) {
    throw new OPE(`${algorithm.name} modulusLength must be at least 2048 bits`)
  }
}

function subtleAlgorithm(
  alg: string,
  key: CryptoKey,
): AlgorithmIdentifier | RsaPssParams | EcdsaParams {
  switch (key.algorithm.name) {
    case 'ECDSA':
      return <EcdsaParams>{ name: key.algorithm.name, hash: `SHA-${alg.slice(-3)}` }
    case 'RSA-PSS':
      checkRsaKeyAlgorithm(<RsaKeyAlgorithm>key.algorithm)
      return <RsaPssParams>{
        name: key.algorithm.name,
        saltLength: parseInt(alg.slice(-3), 10) >> 3,
      }
    case 'RSASSA-PKCS1-v1_5':
      checkRsaKeyAlgorithm(<RsaKeyAlgorithm>key.algorithm)
    // Fall through
    default:
      return <AlgorithmIdentifier>{ name: key.algorithm.name }
  }
}

/**
 * Minimal JWS verify() implementation.
 */
async function validateJws(
  jws: string,
  getKey: (h: CompactJWSHeaderParameters) => Promise<CryptoKey>,
): Promise<CompactVerifyResult> {
  const { 0: protectedHeader, 1: payload, 2: signature, length } = jws.split('.')
  if (length === 5) {
    throw new UnsupportedOperationError('JWE structure JWTs are not supported')
  }
  if (length !== 3) {
    throw new OPE('Invalid JWT')
  }
  const header: CompactJWSHeaderParameters = JSON.parse(
    decoder.decode(decodeBase64Url(protectedHeader)),
  )
  const key = await getKey(header)
  const input = `${protectedHeader}.${payload}`
  const verified = await crypto.subtle.verify(
    subtleAlgorithm(header.alg, key),
    key,
    decodeBase64Url(signature),
    encoder.encode(input),
  )
  if (verified !== true) {
    throw new OPE('JWT signature verification failed')
  }

  return { header, payload: decodeBase64Url(payload) }
}

/**
 * Same as {@link validateAuthResponse} but for signed JARM responses.
 *
 * @see {@link https://openid.net/specs/openid-financial-api-jarm-ID1.html openid-financial-api-jarm-ID1 - JWT Secured Authorization Response Mode for OAuth 2.0 (JARM)}
 *
 * @param as Authorization Server Metadata
 * @param client Client Metadata
 * @param parameters JARM authorization response
 * @param expectedState Expected "state" parameter value
 *
 * @returns Validated Authorization Response parameters or Authorization Error Response.
 */
export async function validateJwtAuthResponse(
  as: AuthorizationServer,
  client: Client,
  parameters: URLSearchParams | URL,
  expectedState: string | typeof expectNoState | typeof skipStateCheck,
  options?: SignalledRequestOptions,
): Promise<CallbackParameters | OAuth2Error> {
  assertIssuer(as)
  assertClient(client)

  if (parameters instanceof URL) {
    parameters = parameters.searchParams
  }

  if (!(parameters instanceof URLSearchParams)) {
    throw new TypeError('"parameters" must be an instance of URLSearchParams, or URL')
  }

  const response = getURLSearchParameter(parameters, 'response')
  if (!response) {
    throw new OPE('"parameters" does not contain a JARM response')
  }

  if (typeof as.jwks_uri !== 'string') {
    throw new TypeError('"issuer.jwks_uri" must be a string')
  }

  const { claims } = await validateJws(
    response,
    getPublicSigKeyFromIssuerJwksUri.bind(undefined, as, options?.signal),
  )
    .then(
      checkSigningAlgorithm.bind(
        undefined,
        client.authorization_signed_response_alg,
        as.authorization_signing_alg_values_supported,
        'RS256',
      ),
    )
    .then(checkJwtCrit)
    .then(parsePayload)
    .then(
      validatePresence.bind(undefined, [
        ['iss', 'issuer'],
        ['aud', 'audience'],
        ['exp', 'expiration time'],
      ]),
    )
    .then(validateClaimTypesAndTimestamps)
    .then(validateIssuer.bind(undefined, as.issuer))
    .then(validateAudience.bind(undefined, client.client_id))

  const result = new URLSearchParams()
  for (const [key, value] of Object.entries(claims)) {
    // filters out timestamps
    if (typeof value === 'string' && key !== 'aud') {
      result.set(key, value)
    }
  }

  return validateAuthResponse(as, client, result, expectedState)
}

/**
 * if configured must be the configured one (client)
 * if not configured must be signalled by the issuer to be supported (issuer)
 * if not signalled must be fallback
 */
function checkSigningAlgorithm(
  client: string | undefined,
  issuer: string[] | undefined,
  fallback: string,
  result: CompactVerifyResult,
) {
  switch (true) {
    case client !== undefined: {
      if (result.header.alg !== client) {
        throw new OPE('unexpected JWT "alg" header parameter')
      }
      break
    }
    case Array.isArray(issuer): {
      if ((<string[]>issuer).includes(result.header.alg) === false) {
        throw new OPE('unexpected JWT "alg" header parameter')
      }
      break
    }
    default: {
      if (result.header.alg !== fallback) {
        throw new OPE('unexpected JWT "alg" header parameter')
      }
    }
  }
  return result
}

/**
 * Returns a parameter by name from URLSearchParams. It must be only provided
 * once. Returns undefined if the parameter is not present.
 */
function getURLSearchParameter(parameters: URLSearchParams, name: string): string | undefined {
  const { 0: value, length } = parameters.getAll(name)
  if (length > 1) {
    throw new OPE(`"${name}" parameter must be provided only once`)
  }
  return value
}

/**
 * DANGER ZONE
 *
 * Use this as a value to {@link validateAuthResponse} `expectedState`
 * parameter to skip the "state" value check. This should only ever be done if
 * you use a "state" parameter value that is integrity protected and bound to
 * the browsing session. One such mechanism to do so is described in an I-D
 * {@link https://datatracker.ietf.org/doc/html/draft-bradley-oauth-jwt-encoded-state-09 draft-bradley-oauth-jwt-encoded-state-09}.
 * It is expected you'll validate such state value yourself.
 */
export const skipStateCheck = Symbol()

/**
 * Use this as a value to {@link validateAuthResponse} `expectedState`
 * parameter to indicate no "state" parameter value is expected, i.e. no "state"
 * parameter value was sent with the authorization request.
 */
export const expectNoState = Symbol()

class CallbackParameters extends URLSearchParams {}

/**
 * Validates an OAuth 2.0 Authorization Response or Authorization Error Response
 * message returned from the authorization server's {@link
 * AuthorizationServer.authorization_endpoint `as.authorization_endpoint`}.
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc6749.html#section-4.1.2 RFC 6749 - The OAuth 2.0 Authorization Framework}
 * @see {@link https://openid.net/specs/openid-connect-core-1_0.html#ClientAuthentication OpenID Connect Core 1.0}
 * @see {@link https://www.rfc-editor.org/rfc/rfc9207.html RFC 9207 - OAuth 2.0 Authorization Server Issuer Identification}
 *
 * @param as Authorization Server Metadata
 * @param client Client Metadata
 * @param parameters Authorization response
 * @param expectedState Expected "state" parameter value
 *
 * @returns Validated Authorization Response parameters or Authorization Error Response.
 */
export function validateAuthResponse(
  as: AuthorizationServer,
  client: Client,
  parameters: URLSearchParams | URL,
  expectedState: string | typeof expectNoState | typeof skipStateCheck = expectNoState,
): CallbackParameters | OAuth2Error {
  assertIssuer(as)
  assertClient(client)

  if (parameters instanceof URL) {
    parameters = parameters.searchParams
  }

  if (!(parameters instanceof URLSearchParams)) {
    throw new TypeError('"parameters" must be an instance of URLSearchParams, or URL')
  }

  if (getURLSearchParameter(parameters, 'response')) {
    throw new OPE(
      '"parameters" contains a JARM response, use validateJwtAuthResponse() instead of validateAuthResponse()',
    )
  }

  const iss = getURLSearchParameter(parameters, 'iss')
  const state = getURLSearchParameter(parameters, 'state')

  if (!iss && as.authorization_response_iss_parameter_supported === true) {
    throw new OPE('"iss" issuer parameter expected')
  }

  if (iss && iss !== as.issuer) {
    throw new OPE('unexpected "iss" issuer parameter value')
  }

  switch (expectedState) {
    case expectNoState:
      if (state !== undefined) {
        throw new OPE('unexpected "state" parameter received')
      }
      break
    case skipStateCheck:
      break
    default:
      if (typeof expectedState !== 'string' || expectedState.length === 0) {
        throw new OPE('"expectedState" must be a non-empty string')
      }
      if (state === undefined) {
        throw new OPE('"state" callback parameter missing')
      }
      if (state !== expectedState) {
        throw new OPE('unexpected "state" parameter value received')
      }
  }

  const error = getURLSearchParameter(parameters, 'error')
  if (error) {
    return {
      error,
      error_description: getURLSearchParameter(parameters, 'error_description'),
      error_uri: getURLSearchParameter(parameters, 'error_uri'),
    }
  }

  const id_token = getURLSearchParameter(parameters, 'id_token')
  const token = getURLSearchParameter(parameters, 'token')
  if (id_token !== undefined || token !== undefined) {
    throw new UnsupportedOperationError('implicit and hybrid flows are not supported')
  }

  return new CallbackParameters(parameters)
}

type ReturnTypes =
  | TokenEndpointResponse
  | OAuth2TokenEndpointResponse
  | OpenIDTokenEndpointResponse
  | ClientCredentialsGrantResponse
  | DeviceAuthorizationResponse
  | IntrospectionResponse
  | OAuth2Error
  | PushedAuthorizationResponse
  | URLSearchParams
  | UserInfoResponse

function cekBitLength(enc: string) {
  switch (enc) {
    case 'A128GCM':
      return 128
    case 'A192GCM':
      return 192
    case 'A256GCM': // Fall through
    case 'A128CBC-HS256':
      return 256
    case 'A192CBC-HS384':
      return 384
    case 'A256CBC-HS512':
      return 512
    default:
      throw new UnsupportedOperationError()
  }
}
function randomCek(enc: string) {
  return crypto.getRandomValues(new Uint8Array(cekBitLength(enc) >> 3))
}

function randomIv(enc: string) {
  let bitLength: number
  switch (enc) {
    case 'A128GCM': // Fall through
    case 'A192GCM': // Fall through
    case 'A256GCM':
      bitLength = 96
      break
    case 'A128CBC-HS256': // Fall through
    case 'A192CBC-HS384': // Fall through
    case 'A256CBC-HS512':
      bitLength = 128
      break
    default:
      throw new UnsupportedOperationError()
  }

  return crypto.getRandomValues(new Uint8Array(bitLength >> 3))
}

async function oaepWrap(cek: Uint8Array, key: CryptoKey) {
  if (key.usages.includes('encrypt') === false) {
    throw new UnsupportedOperationError()
  }

  return new Uint8Array(await crypto.subtle.encrypt('RSA-OAEP', key, cek))
}

async function gcm(plaintext: Uint8Array, cek: Uint8Array, iv: Uint8Array, aad: Uint8Array) {
  const key = await crypto.subtle.importKey('raw', cek, 'AES-GCM', false, ['encrypt'])
  const encrypted = new Uint8Array(
    await crypto.subtle.encrypt(
      {
        additionalData: aad,
        iv,
        name: 'AES-GCM',
        tagLength: 128,
      },
      key,
      plaintext,
    ),
  )

  const tag = encrypted.slice(-16)
  const ciphertext = encrypted.slice(0, -16)

  return { ciphertext, tag }
}

async function cbc(
  enc: string,
  plaintext: Uint8Array,
  cek: Uint8Array,
  iv: Uint8Array,
  aad: Uint8Array,
) {
  const keySize = parseInt(enc.slice(1, 4), 10)

  const [encKey, macKey] = await Promise.all([
    crypto.subtle.importKey('raw', cek.subarray(keySize >> 3), 'AES-CBC', false, ['encrypt']),
    crypto.subtle.importKey(
      'raw',
      cek.subarray(0, keySize >> 3),
      {
        hash: `SHA-${keySize << 1}`,
        name: 'HMAC',
      },
      false,
      ['sign'],
    ),
  ])

  const ciphertext = new Uint8Array(
    await crypto.subtle.encrypt(
      {
        iv,
        name: 'AES-CBC',
      },
      encKey,
      plaintext,
    ),
  )

  const macData = concat(aad, iv, ciphertext, uint64be(aad.length << 3))
  const tag = new Uint8Array(
    (await crypto.subtle.sign('HMAC', macKey, macData)).slice(0, keySize >> 3),
  )

  return { ciphertext, tag }
}

function concat(...buffers: Uint8Array[]): Uint8Array {
  const size = buffers.reduce((acc, { length }) => acc + length, 0)
  const buf = new Uint8Array(size)
  let i = 0
  buffers.forEach((buffer) => {
    buf.set(buffer, i)
    i += buffer.length
  })
  return buf
}

function writeUInt32BE(buf: Uint8Array, value: number, offset?: number) {
  if (value < 0 || value >= MAX_INT32) {
    throw new RangeError(`value must be >= 0 and <= ${MAX_INT32 - 1}. Received ${value}`)
  }
  buf.set([value >>> 24, value >>> 16, value >>> 8, value & 0xff], offset)
}

const MAX_INT32 = 2 ** 32
function uint64be(value: number) {
  const high = Math.floor(value / MAX_INT32)
  const low = value % MAX_INT32
  const buf = new Uint8Array(8)
  writeUInt32BE(buf, high, 0)
  writeUInt32BE(buf, low, 4)
  return buf
}

async function encrypt(
  enc: string,
  plaintext: Uint8Array,
  cek: Uint8Array,
  iv: Uint8Array,
  aad: Uint8Array,
) {
  switch (enc) {
    case 'A128CBC-HS256': // Fall through
    case 'A192CBC-HS384': // Fall through
    case 'A256CBC-HS512':
      return cbc(enc, plaintext, cek, iv, aad)
    case 'A128GCM': // Fall through
    case 'A192GCM': // Fall through
    case 'A256GCM':
      return gcm(plaintext, cek, iv, aad)
    default:
      throw new UnsupportedOperationError()
  }
}

function uint32be(value: number) {
  const buf = new Uint8Array(4)
  writeUInt32BE(buf, value)
  return buf
}

function lengthAndInput(input: Uint8Array) {
  return concat(uint32be(input.length), input)
}

function deriveBitsLength(algorithm: KeyAlgorithm) {
  switch (algorithm.name) {
    case 'ECDH': {
      switch ((<EcKeyAlgorithm>algorithm).namedCurve) {
        case 'P-256':
          return 256
        case 'P-384':
          return 384
        case 'P-521':
          return 528
      }
    }
    default:
      throw new UnsupportedOperationError()
  }
}

async function ecdhEs(publicKey: CryptoKey, privateKey: CryptoKey, enc: string) {
  const Z = new Uint8Array(
    await crypto.subtle.deriveBits(
      { name: publicKey.algorithm.name, public: publicKey },
      privateKey,
      deriveBitsLength(publicKey.algorithm),
    ),
  )
  const keydatalen = cekBitLength(enc)
  const AlgorithmID = lengthAndInput(encoder.encode(enc))
  const PartyUInfo = lengthAndInput(new Uint8Array())
  const PartyVInfo = lengthAndInput(new Uint8Array())
  const SuppPubInfo = uint32be(keydatalen)
  const SuppPrivInfo = new Uint8Array()

  const OtherInfo = concat(AlgorithmID, PartyUInfo, PartyVInfo, SuppPubInfo, SuppPrivInfo)

  const iterations = Math.ceil(keydatalen / 256)
  const res = new Uint8Array(iterations * 32)
  for (let counter = 0; counter < iterations; counter++) {
    const input = new Uint8Array(4 + Z.byteLength + OtherInfo.byteLength)
    input.set(uint32be(counter + 1))
    input.set(Z, 4)
    input.set(OtherInfo, 4 + Z.byteLength)
    res.set(new Uint8Array(await crypto.subtle.digest('SHA-256', input)), counter * 32)
  }
  return res.slice(0, keydatalen >> 3)
}

/**
 * Minimal JWE encrypt() implementation.
 */
async function jwe(header: CompactJWEHeaderParameters, plaintext: Uint8Array, key: CryptoKey) {
  let cek: Uint8Array
  let encryptedKey: Uint8Array
  switch (header.alg) {
    case 'ECDH-ES': {
      const epk = <CryptoKeyPair>(
        await crypto.subtle.generateKey(key.algorithm, false, ['deriveBits'])
      )
      const { kty, crv, x, y } = await crypto.subtle.exportKey('jwk', epk.publicKey)
      header.epk = { kty, crv, x, y }
      cek = await ecdhEs(key, epk.privateKey, header.enc)
      encryptedKey = new Uint8Array()
      break
    }
    case 'RSA-OAEP': // Fall through
    case 'RSA-OAEP-256': // Fall through
    case 'RSA-OAEP-384': // Fall through
    case 'RSA-OAEP-512': {
      cek = randomCek(header.enc)
      encryptedKey = await oaepWrap(cek, key)
      break
    }
    default:
      throw new UnsupportedOperationError()
  }

  const iv = randomIv(header.enc)

  const protectedHeader = encoder.encode(JSON.stringify(header))
  const aad = encoder.encode(encodeBase64Url(protectedHeader))
  const { ciphertext, tag } = await encrypt(header.enc, plaintext, cek, iv, aad)

  return [protectedHeader, encryptedKey, iv, ciphertext, tag]
    .map((part) => encodeBase64Url(part))
    .join('.')
}

async function importJwk(jwk: JWK) {
  const { alg, ext, key_ops, use, ...key } = jwk

  let algorithm: RsaHashedImportParams | EcKeyImportParams

  switch (alg) {
    case 'PS256': // Fall through
    case 'PS384': // Fall through
    case 'PS512':
      algorithm = { name: 'RSA-PSS', hash: `SHA-${alg.slice(-3)}` }
      break
    case 'RS256': // Fall through
    case 'RS384': // Fall through
    case 'RS512':
      algorithm = { name: 'RSASSA-PKCS1-v1_5', hash: `SHA-${alg.slice(-3)}` }
      break
    case 'ES256':
      algorithm = { name: 'ECDSA', namedCurve: 'P-256' }
      break
    case 'ES384':
      algorithm = { name: 'ECDSA', namedCurve: 'P-384' }
      break
    case 'ES512':
      algorithm = { name: 'ECDSA', namedCurve: 'P-521' }
      break
    default:
      throw new UnsupportedOperationError()
  }

  return crypto.subtle.importKey('jwk', key, algorithm, true, ['verify'])
}

const CHUNK_SIZE = 0x8000
function encodeBase64(input: Uint8Array) {
  const arr = []
  for (let i = 0; i < input.byteLength; i += CHUNK_SIZE) {
    // @ts-expect-error
    arr.push(String.fromCharCode.apply(null, input.subarray(i, i + CHUNK_SIZE)))
  }
  return btoa(arr.join(''))
}

function encodeBase64Url(input: Uint8Array) {
  return encodeBase64(input).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
}

function decodeBase64(input: string): Uint8Array {
  return new Uint8Array(
    atob(input)
      .split('')
      .map((c) => c.charCodeAt(0)),
  )
}

function decodeBase64Url(input: string) {
  input = input.replace(/-/g, '+').replace(/_/g, '/').replace(/\s/g, '')
  try {
    return decodeBase64(input)
  } catch {
    throw new TypeError('The input to be decoded is not correctly encoded.')
  }
}

export interface DeviceAuthorizationRequestOptions
  extends SignalledRequestOptions,
    AuthenticatedRequestOptions {}

/**
 * Performs a Device Authorization Request at the
 * {@link AuthorizationServer.device_authorization_endpoint `as.device_authorization_endpoint`}.
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc8628.html#section-3.1 RFC 8628 - OAuth 2.0 Device Authorization Grant}
 *
 * @param as Authorization Server Metadata
 * @param client Client Metadata
 * @param parameters device authorization request parameters
 *
 * @returns Resolves with
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API Fetch API}'s
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Response Response}
 */
export async function deviceAuthorizationRequest(
  as: AuthorizationServer,
  client: Client,
  parameters: URLSearchParams,
  options?: DeviceAuthorizationRequestOptions,
): Promise<Response> {
  assertIssuer(as)
  assertClient(client)

  if (!(parameters instanceof URLSearchParams)) {
    throw new TypeError('"parameters" must be an instance of URLSearchParams')
  }

  if (typeof as.device_authorization_endpoint !== 'string') {
    throw new TypeError('"issuer.device_authorization_endpoint" must be a string')
  }

  const url = new URL(as.device_authorization_endpoint)

  const body = new URLSearchParams(parameters)
  body.set('client_id', client.client_id)

  const headers = new Headers({ accept: 'application/json' })

  return authenticatedRequest(as, client, 'POST', url, body, headers, options)
}

export interface DeviceAuthorizationResponse {
  readonly device_code: string
  readonly user_code: string
  readonly verification_uri: string
  readonly expires_in: number
  readonly verification_uri_complete?: string
  readonly interval?: number

  readonly [parameter: string]: unknown
}

/**
 * Validates
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Response Fetch API Response}
 * to be one coming from the
 * {@link AuthorizationServer.device_authorization_endpoint `as.device_authorization_endpoint`}.
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc8628.html#section-3.1 RFC 8628 - OAuth 2.0 Device Authorization Grant}
 *
 * @param as Authorization Server Metadata
 * @param client Client Metadata
 * @param response resolved value from {@link deviceAuthorizationRequest}
 *
 * @returns Object representing the parsed successful response, or an object
 * representing an OAuth 2.0 protocol style error. Use {@link isOAuth2Error} to
 * determine if an OAuth 2.0 error was returned.
 */
export async function processDeviceAuthorizationResponse(
  as: AuthorizationServer,
  client: Client,
  response: Response,
): Promise<DeviceAuthorizationResponse | OAuth2Error> {
  assertIssuer(as)
  assertClient(client)

  if (!(response instanceof Response)) {
    throw new TypeError('"response" must be an instance of Response')
  }

  if (response.status !== 200) {
    let err: OAuth2Error | undefined
    if ((err = await handleOAuthBodyError(response))) {
      return err
    }
    throw new OPE('"response" is not a conform Device Authorization Endpoint response')
  }

  let json: unknown
  try {
    json = await preserveBodyStream(response).json()
  } catch {
    throw new OPE('failed to parsed "response" body as JSON')
  }

  if (!isTopLevelObject<DeviceAuthorizationResponse>(json)) {
    throw new OPE('"response" body must be a top level object')
  }

  if (typeof json.device_code !== 'string' || json.device_code.length === 0) {
    throw new OPE('"response" body "device_code" property must be a non-empty string')
  }

  if (typeof json.user_code !== 'string' || json.user_code.length === 0) {
    throw new OPE('"response" body "user_code" property must be a non-empty string')
  }

  if (typeof json.verification_uri !== 'string' || json.verification_uri.length === 0) {
    throw new OPE('"response" body "verification_uri" property must be a non-empty string')
  }

  if (typeof json.expires_in !== 'number' || json.expires_in <= 0) {
    throw new OPE('"response" body "expires_in" property must be a positive number')
  }

  if (
    json.verification_uri_complete !== undefined &&
    (typeof json.verification_uri_complete !== 'string' ||
      json.verification_uri_complete.length === 0)
  ) {
    throw new OPE('"response" body "verification_uri_complete" property must be a non-empty string')
  }

  if (json.interval !== undefined && (typeof json.interval !== 'number' || json.interval <= 0)) {
    throw new OPE('"response" body "interval" property must be a positive number')
  }

  return json
}

/**
 * Performs a Device Authorization Grant request at the
 * {@link AuthorizationServer.token_endpoint `as.token_endpoint`}.
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc8628.html#section-3.4 RFC 8628 - OAuth 2.0 Device Authorization Grant}
 * @see {@link https://www.ietf.org/archive/id/draft-ietf-oauth-dpop-06.html#name-dpop-access-token-request draft-ietf-oauth-dpop-06 - OAuth 2.0 Demonstrating Proof-of-Possession at the Application Layer (DPoP)}
 *
 * @param as Authorization Server Metadata
 * @param client Client Metadata
 * @param deviceCode {@link DeviceAuthorizationResponse.device_code `device_code`}
 *
 * @returns Resolves with
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API Fetch API}'s
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Response Response}
 */
export async function deviceCodeGrantRequest(
  as: AuthorizationServer,
  client: Client,
  deviceCode: string,
  options?: TokenEndpointRequestOptions,
): Promise<Response> {
  assertIssuer(as)
  assertClient(client)

  if (typeof deviceCode !== 'string' || deviceCode.length === 0) {
    throw new TypeError('"deviceCode" must be a non-empty string')
  }

  const parameters = new URLSearchParams(options?.additionalParameters)
  parameters.set('device_code', deviceCode)
  return tokenEndpointRequest(
    as,
    client,
    'urn:ietf:params:oauth:grant-type:device_code',
    parameters,
    options,
  )
}

/**
 * Validates Device Authorization Grant
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Response Fetch API Response}
 * to be one coming from the
 * {@link AuthorizationServer.token_endpoint `as.token_endpoint`}.
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc8628.html#section-3.4 RFC 8628 - OAuth 2.0 Device Authorization Grant}
 *
 * @param as Authorization Server Metadata
 * @param client Client Metadata
 * @param response resolved value from {@link deviceCodeGrantRequest}
 *
 * @returns Object representing the parsed successful response, or an object
 * representing an OAuth 2.0 protocol style error. Use {@link isOAuth2Error} to
 * determine if an OAuth 2.0 error was returned.
 */
export async function processDeviceCodeResponse(
  as: AuthorizationServer,
  client: Client,
  response: Response,
  options?: SignalledRequestOptions,
): Promise<TokenEndpointResponse | OAuth2Error> {
  return processGenericAccessTokenResponse(as, client, response, options)
}
