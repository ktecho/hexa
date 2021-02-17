import {
  CLEAR_SWAN_CACHE,
  FETCH_SWAN_AUTHENTICATION_URL_STARTED,
  FETCH_SWAN_AUTHENTICATION_URL_SUCCEEDED,
  REDEEM_SWAN_CODE_FOR_TOKEN_STARTED,
  REDEEM_SWAN_CODE_FOR_TOKEN_SUCCEEDED,
  LINK_SWAN_WALLET_FAILED,
  LINK_SWAN_WALLET_SUCCEEDED,
  LINK_SWAN_WALLET_COMPLETED,
  LINK_SWAN_WALLET,
} from '../actions/SwanIntegration'


export type SwanIntegrationState = {
  isSwanAuthenticationInProgress: boolean | null,
  swanAuthenticationUrl: string | null,
  code_verifier: string | null,
  code_challenge: string | null,
  state: string | null,
  nonce: number | null,
  hasFetchSwanAuthenticationUrlInitiated: boolean | null,
  hasFetchSwanAuthenticationUrlSucceeded: boolean | null,
  hasFetchSwanAuthenticationUrlCompleted: boolean | null,
  hasRedeemSwanCodeForTokenSucceeded: boolean | null,
  hasRedeemSwanCodeForTokenCompleted: boolean | null,
  hasRedeemSwanCodeForTokenInitiated: boolean | null,
  swanAuthenticatedCode: string | null,
  isSwanRedeemCodeInProgress: boolean | null,
  swanToken: string | null


  swanTokenDetails: unknown | null;
  swanWalletDetails: unknown | null;
  swanMetadataDetails: unknown | null;

  isFetchingSwanToken: boolean;
  fetchSwanTokenFailed: boolean;
  fetchSwanTokenFailedMessage: null;

  isLinkingSwanWallet: boolean;
  linkSwanWalletFailed: boolean;
  linkSwanWalletFailedMessage: null;

  isSyncingSwanWallet: boolean;
  syncSwanWalletFailed: boolean;
  syncSwanWalletFailedMessage: null;

  isAddingSwanMetadata: boolean;
  addSwanMetadataFailed: boolean;
  addSwanMetadataFailedMessage: null;
}

const INITIAL_STATE: SwanIntegrationState = {
  isSwanAuthenticationInProgress: false,
  swanAuthenticationUrl: null,
  code_challenge: null,
  code_verifier: null,
  state: null,
  nonce: null,
  hasFetchSwanAuthenticationUrlInitiated: false,
  hasFetchSwanAuthenticationUrlSucceeded: false,
  hasFetchSwanAuthenticationUrlCompleted: false,
  hasRedeemSwanCodeForTokenSucceeded: false,
  hasRedeemSwanCodeForTokenCompleted: false,
  hasRedeemSwanCodeForTokenInitiated: false,
  swanAuthenticatedCode: null,
  isSwanRedeemCodeInProgress: false,
  swanToken: null,


  swanTokenDetails: null,
  swanWalletDetails: null,
  swanMetadataDetails: null,

  isFetchingSwanToken: false,
  fetchSwanTokenFailed: false,
  fetchSwanTokenFailedMessage: null,

  isLinkingSwanWallet: false,
  linkSwanWalletFailed: false,
  linkSwanWalletFailedMessage: null,

  isSyncingSwanWallet: false,
  syncSwanWalletFailed: false,
  syncSwanWalletFailedMessage: null,

  isAddingSwanMetadata: false,
  addSwanMetadataFailed: false,
  addSwanMetadataFailedMessage: null,
}

const reducer = ( state = INITIAL_STATE, action ) => {
  switch ( action.type ) {
      case CLEAR_SWAN_CACHE:
        return {
          ...INITIAL_STATE
        }
      case FETCH_SWAN_AUTHENTICATION_URL_STARTED:
        return {
          ...state,
          hasFetchSwanAuthenticationUrlInitiated: true
        }
      case FETCH_SWAN_AUTHENTICATION_URL_SUCCEEDED:
        return {
          ...state,
          isSwanAuthenticationInProgress: true,
          hasFetchSwanAuthenticationUrlInitiated: true,
          hasFetchSwanAuthenticationUrlSucceeded: true,
          hasFetchSwanAuthenticationUrlCompleted: true,
          swanAuthenticationUrl: action.payload.data.swanAuthenticationUrl,
          code_challenge: action.payload.data.code_challenge,
          code_verifier: action.payload.data.code_verifier,
          nonce: action.payload.data.nonce,
          state: action.payload.data.state,
          swanAuthenticatedCode: null,
          hasRedeemSwanCodeForTokenSucceeded: false,
          hasRedeemSwanCodeForTokenCompleted: false,
          hasRedeemSwanCodeForTokenInitiated: false,
        }
      case REDEEM_SWAN_CODE_FOR_TOKEN_STARTED:
        return {
          ...state,
          hasRedeemSwanCodeForTokenInitiated: true,
        }
      case REDEEM_SWAN_CODE_FOR_TOKEN_SUCCEEDED:
        console.log( '@@@ -> Insidie code succeeded reducer action.payload.data', action.payload.data )
        return {
          ...state,
          hasRedeemSwanCodeForTokenSucceeded: true,
          hasRedeemSwanCodeForTokenCompleted: true,
          swanAuthenticatedCode: action.payload.data.swanAuthenticatedCode
        }
      case LINK_SWAN_WALLET:
        return {
          ...state,
          isLinkingSwanWallet: true,
        }

      case LINK_SWAN_WALLET_FAILED:
        return {
          ...state,
          isLinkingSwanWallet: false,
          linkSwanWalletFailed: true,
          linkSwanWalletFailedMessage: action.payload.linkSwanWalletFailedMessage,
        }

      case LINK_SWAN_WALLET_SUCCEEDED:
        return {
          ...state,
          isLinkingSwanWallet: false,
          linkSwanWalletFailed: false,
          swanWalletDetails: action.payload.swanWalletDetails,
        }

      case LINK_SWAN_WALLET_COMPLETED:
        return {
          ...state,
          isLinkingSwanWallet: false,
          linkSwanWalletFailedMessage: null,
        }
  }

  return state
}

export default reducer
