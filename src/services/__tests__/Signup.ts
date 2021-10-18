import api from '../../utils/api'

import {
    Signup as SignupService,
    SignupResponse,
    SignupParams,
    SignupConfirmResponse,
} from '../Signup'

jest.mock('../../utils/api')

it('must successfully sign up', async () => {
    const registrationParams: SignupParams = {
        name: 'Test User',
        email: 'test@mail.ru',
        password: 'secret',
    }

    const data: SignupResponse = {
        code: 200,
        success: true,
        data: {
            user: {
                id: 1,
                email: registrationParams.email,
                created_at: new Date(),
            },
        },
    }
    const testResponse = { data }
    ;(api.post as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve(testResponse)
    )

    await expect(SignupService.execute(registrationParams)).resolves.toEqual(
        data
    )
})

it('successfully confirm signup token', async () => {
    const token = 'test-token'

    const responseData: SignupConfirmResponse = {
        code: 200,
        success: true,
        data: {
            user: {
                id: 1,
                email: 'test@mail.ru',
                created_at: new Date(),
            },
            access_token: {
                value:
                    'eyJ0eXBlIjoiand0IiwiYWxnIjoic2hhMjU2In0!.eyJpc3MiOiJhcHAtYXBpIiwic3ViIjozLCJhdWQiOiJjbGllbnQiLCJleHAiOjE1OTM3NTYzOTAsIm5iZiI6MTU5Mzc1Mjc5MCwiaWF0IjoxNTkzNzUyNzkwLCJqdGkiOiItUmtoZXEzQzkyWGg4UkNOY3JiNDlnRDlOX2lZUXpjdyIsImN1c3RvbUNsYWltcyI6eyJ0eXBlIjoiYWNjZXNzX3Rva2VuIn0sInR5cGUiOiJhY2Nlc3NfdG9rZW4ifQ!!.356f51eca8a24c4e103907863fbd537575ba5b3c8ad36e166bd490ca68141555',
                expired: 1593756390,
            },
            refresh_token: {
                value:
                    'eyJ0eXBlIjoiand0IiwiYWxnIjoic2hhMjU2In0!.eyJpc3MiOiJhcHAtYXBpIiwic3ViIjozLCJhdWQiOiJjbGllbnQiLCJleHAiOjE1OTM4MzkxOTAsIm5iZiI6MTU5Mzc1Mjc5MCwiaWF0IjoxNTkzNzUyNzkwLCJqdGkiOiJNd2doVTlVd0FBaHdQUlZuY0lSR284NS1DRkR2VjgzVCIsImN1c3RvbUNsYWltcyI6eyJ0eXBlIjoicmVmcmVzaF90b2tlbiJ9LCJ0eXBlIjoicmVmcmVzaF90b2tlbiJ9.0a107f8839735c72cd25003cd84f30fae51c085e8001f60815a240a5f3163fad',
                expired: 1593839190,
            },
        },
    }

    const response = { data: responseData }
    ;(api.get as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve(response)
    )

    await expect(SignupService.confirm(token)).resolves.toEqual(responseData)
})
