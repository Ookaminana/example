import apiWithoutToken from '../../utils/apiWithoutToken'

import { ResponseType } from '../../utils/api'
import { Auth as AuthService, LoginResponse, AuthLoginResult } from '../Auth'
import { User } from '../../types'

jest.mock('../../utils/apiWithoutToken')

const accessToken =
    'eyJ0eXBlIjoiand0IiwiYWxnIjoic2hhMjU2In0!.eyJpc3MiOiJhcHAtYXBpIiwic3ViIjozLCJhdWQiOiJjbGllbnQiLCJleHAiOjE1OTM3NTY1ODEsIm5iZiI6MTU5Mzc1Mjk4MSwiaWF0IjoxNTkzNzUyOTgxLCJqdGkiOiJIVUgwTGhPZmRkUVJCaXF2TTBDZ25OeVlLMnRvVFYtZSIsImN1c3RvbUNsYWltcyI6eyJ0eXBlIjoiYWNjZXNzX3Rva2VuIn0sInR5cGUiOiJhY2Nlc3NfdG9rZW4ifQ!!.f18d5aa712744ad8fd12c21f460657b43dc6a68feb1c593b95aadd0f05774168'
const refreshToken =
    'eyJ0eXBlIjoiand0IiwiYWxnIjoic2hhMjU2In0!.eyJpc3MiOiJhcHAtYXBpIiwic3ViIjozLCJhdWQiOiJjbGllbnQiLCJleHAiOjE1OTM4MzkzODEsIm5iZiI6MTU5Mzc1Mjk4MSwiaWF0IjoxNTkzNzUyOTgxLCJqdGkiOiJCenptOTJNZjZySDNLdE1Od3I4cjFmNURySWw0SWhuRSIsImN1c3RvbUNsYWltcyI6eyJ0eXBlIjoicmVmcmVzaF90b2tlbiJ9LCJ0eXBlIjoicmVmcmVzaF90b2tlbiJ9.da80475bc1483c9a4d3a285d6561976a6ee908e540afff2a3d7e287301794c32'

it('successfully login', async () => {
    const email = 'test@mail.ru'
    const password = 'secret'
    const accessTokenExpired = 1593756581
    const refreshTokenExpired = 1593839381
    const user: User = {
        id: 1,
        email: email,
        created_at: new Date(),
    }

    const responseData: LoginResponse = {
        code: 200,
        success: true,
        data: {
            user: user,
            access_token: {
                value: accessToken,
                expired: accessTokenExpired,
            },
            refresh_token: {
                value: refreshToken,
                expired: refreshTokenExpired,
            },
        },
    }
    const response = { data: responseData }
    const expected: AuthLoginResult = {
        success: true,
        data: { user },
    }

    ;(apiWithoutToken.post as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve(response)
    )

    await expect(AuthService.login(email, password)).resolves.toEqual(expected)
    expect(localStorage.setItem).toHaveBeenCalledWith(
        'access_token',
        accessToken
    )
    expect(localStorage.setItem).toHaveBeenCalledWith(
        'access_token_expired',
        accessTokenExpired + ''
    )
    expect(localStorage.setItem).toHaveBeenCalledWith(
        'refresh_token',
        refreshToken
    )
    expect(localStorage.setItem).toHaveBeenCalledWith(
        'refresh_token_expired',
        refreshTokenExpired + ''
    )
})

it('must send password recovery link successfully', async () => {
    const email = 'test@mail.ru'

    const responseData: ResponseType = {
        code: 200,
        success: true,
    }
    const response = { data: responseData }

    ;(apiWithoutToken.post as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve(response)
    )

    await expect(AuthService.sendPasswordRecoveryLink(email)).resolves.toEqual(
        undefined
    )

    expect(apiWithoutToken.post).toHaveBeenCalled()
})

it('must recovery password successfully', async () => {
    const token = 'recovery_token'
    const password = '1234567890'

    const accessTokenExpired = 1593756581
    const refreshTokenExpired = 1593839381
    const user: User = {
        id: 1,
        email: 'test@mail.ru',
        created_at: new Date(),
    }

    const responseData: LoginResponse = {
        code: 200,
        success: true,
        data: {
            user: user,
            access_token: {
                value: accessToken,
                expired: accessTokenExpired,
            },
            refresh_token: {
                value: refreshToken,
                expired: refreshTokenExpired,
            },
        },
    }
    const response = { data: responseData }

    ;(apiWithoutToken.post as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve(response)
    )

    await expect(
        AuthService.recoveryPassword(token, password)
    ).resolves.toEqual(user)
    expect(localStorage.setItem).toHaveBeenCalledWith(
        'access_token',
        accessToken
    )
    expect(localStorage.setItem).toHaveBeenCalledWith(
        'access_token_expired',
        accessTokenExpired + ''
    )
    expect(localStorage.setItem).toHaveBeenCalledWith(
        'refresh_token',
        refreshToken
    )
    expect(localStorage.setItem).toHaveBeenCalledWith(
        'refresh_token_expired',
        refreshTokenExpired + ''
    )
})
