'use client'

// import { NextSSRApolloClient, NextSSRInMemoryCache, SSRMultipartLink } from '@apollo/experimental-nextjs-app-support/ssr'
// import { ApolloCache, ApolloLink, MutationOptions } from '@apollo/client'
// import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'
// import { getCookie, setCookie, removeCookie } from 'typescript-cookie'
// import { onError } from '@apollo/client/link/error'
// import { setContext } from 'apollo-link-context'
// import { GRAPHQL_CONFIG } from '@/config/graphql'
// import { toast } from 'sonner'

// const authMiddleware = setContext(async (_, { headers }) => {
//   if (!headers || !headers['choco-whisky'] || !headers['Choco-Whisky']) {
//     return {
//       headers: {
//         ...headers,
//         'choco-whisky': '161.22.32.0'
//       }
//     }
//   }

//   return {
//     headers
//   }
// })

// const getAccessToken = async () => {
//   try {
//     const res = await fetch(GRAPHQL_CONFIG.PROD_SERVER_URL, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json', refresh_token: getCookie('refreshToken') },
//       body: JSON.stringify({
//         operationName: 'RefreshAccessToken',
//         query: `query RefreshAccessToken {
//             refreshAccessToken {
//               code
//               info {
//                 code
//                 message
//               }
//               result {
//                 accessToken
//               }
//             }
//           }`
//       })
//     })
//     const resData = await res.json()

//     return resData
//   } catch (error) {
//     console.log('Error al obtener el token de acceso:', (error))
//     return null
//   }
// }

// const errorLink = onError(({ graphQLErrors, networkError }) => {
//   if (graphQLErrors) {
//     // const graphQLErrorsCodes = graphQLErrors.map((e) => (e.extensions?.info as any)?.statusCode)
//     if (graphQLErrors.some(error => error.extensions.code === 401)) {
//       getAccessToken()
//         .then(refreshToken => {
//           const refreshTokenErrors = refreshToken?.errors?.map((e) => e?.extensions?.statusCode)

//           // --- if refresh token is valid, refresh session
//           if (refreshToken?.data?.refreshAccessToken?.code === 200) {
//             setCookie('token', refreshToken?.data?.refreshAccessToken?.result?.accessToken as any)
//             window.location.reload()
//           }

//           // --- if refresh token is expired
//           if (refreshTokenErrors.some(error => error === 'AUT008')) {
//             removeCookie('refreshToken')
//             removeCookie('token')
//             window.location.href = '/iniciar-sesion'
//           }
//         })
//         .catch(console.error)
//     }

//     graphQLErrors.forEach(({ message, locations, path, extensions }: any) =>
//       toast.error(message, { description: extensions?.info?.message })
//     )
//   }

//   if (networkError) {
//     console.error(`[Network error]: ${networkError}`)
//   }
// })

// const defaultOptions: Partial<MutationOptions<any, any, any, ApolloCache<any>>> = {
//   errorPolicy: 'all'
// }

// const uploadLink = createUploadLink({ uri: GRAPHQL_CONFIG.PROD_SERVER_URL, credentials: 'same-origin' })

// export const client = new NextSSRApolloClient({
//   uri: GRAPHQL_CONFIG.PROD_SERVER_URL,
//   link: typeof window === 'undefined'
//     ? ApolloLink.from([new SSRMultipartLink({ stripDefer: true }), errorLink, authMiddleware as any, uploadLink])
//     : ApolloLink.from([errorLink, authMiddleware as any, uploadLink]),

//   cache: new NextSSRInMemoryCache(),
//   credentials: 'include',
//   ssrMode: false,
//   defaultOptions: {
//     mutate: defaultOptions,
//     query: defaultOptions,
//     watchQuery: defaultOptions
//   }
// })

'use client'

import { ApolloNextAppProvider, NextSSRApolloClient, NextSSRInMemoryCache } from '@apollo/experimental-nextjs-app-support/ssr'
import { ApolloCache, ApolloLink, MutationOptions } from '@apollo/client'
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'
import { getCookie, setCookie, removeCookie } from 'typescript-cookie'
import { onError } from '@apollo/client/link/error'
import { setContext } from 'apollo-link-context'
import { PropsWithChildren } from 'react'
import { toast } from 'sonner'

import { GRAPHQL_CONFIG } from '@/config/graphql'

const authMiddleware = setContext(async (_, { headers }) => {
  if (!headers || !headers['choco-whisky'] || !headers['Choco-Whisky']) {
    return {
      headers: {
        ...headers,
        'choco-whisky': '161.22.32.0'
      }
    }
  }

  return {
    headers
  }
})

const getAccessToken = async () => {
  try {
    const res = await fetch(GRAPHQL_CONFIG.LOCAL_SERVER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', refresh_token: getCookie('refreshToken') },
      body: JSON.stringify({
        operationName: 'RefreshAccessToken',
        query: `query RefreshAccessToken {
            refreshAccessToken {
              code
              info {
                code
                message
              }
              result {
                accessToken
              }
            }
          }`
      })
    })
    const resData = await res.json()

    return resData
  } catch (error) {
    console.log('Error al obtener el token de acceso:', (error))
    return null
  }
}

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    // const graphQLErrorsCodes = graphQLErrors.map((e) => (e.extensions?.info as any)?.statusCode)
    if (graphQLErrors.some(error => error.extensions.code === 401)) {
      getAccessToken()
        .then(refreshToken => {
          const refreshTokenErrors = refreshToken?.errors?.map((e) => e?.extensions?.statusCode)

          // --- if refresh token is valid, refresh session
          if (refreshToken?.data?.refreshAccessToken?.code === 200) {
            setCookie('token', refreshToken?.data?.refreshAccessToken?.result?.accessToken as any)
            window.location.reload()
          }

          // --- if refresh token is expired
          if (refreshTokenErrors.some(error => error === 'AUT008')) {
            removeCookie('refreshToken')
            removeCookie('token')
            window.location.href = '/iniciar-sesion'
          }
        })
        .catch(console.error)
    }

    graphQLErrors.forEach(({ message, locations, path, extensions }: any) =>
      toast.error(message, { description: extensions?.info?.message })
    )
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`)
  }
})

const defaultOptions: Partial<MutationOptions<any, any, any, ApolloCache<any>>> = {
  errorPolicy: 'all'
}

const uploadLink = createUploadLink({ uri: GRAPHQL_CONFIG.LOCAL_SERVER_URL, credentials: 'same-origin' })

function makeClient () {
  return new NextSSRApolloClient({
    uri: GRAPHQL_CONFIG.LOCAL_SERVER_URL,
    cache: new NextSSRInMemoryCache(),
    credentials: 'include',
    ssrMode: false,
    link: ApolloLink.from([errorLink, authMiddleware as any, uploadLink]),
    defaultOptions: {
      mutate: defaultOptions,
      query: defaultOptions,
      watchQuery: defaultOptions
    }
  })
}

export function ApolloWrapper ({ children }: PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  )
}
