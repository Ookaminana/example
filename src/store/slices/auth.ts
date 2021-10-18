import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Profile as ProfileType } from '../../types'
import { Auth, Auth as AuthService, RegType } from '../../services/Auth'
import { User as UserService } from '../../services/User'
import { ErrorsTypes } from '../../utils/api'
import { RootState } from '../index'

/**
 * Начальное состояние редьюсера Auth/
 */
export const initialState = {
    /** Объект авторизованного пользователя. */
    user: null as ProfileType | null,
    /** Состояние: проверка токена пользователя */
    checking: false,
    /** Состояние: проверка токена пользователя была произведена */
    checked: false,
    /** Состояние: пользователь авторизован */
    isAuth: false,
    /** Состояние: идет обновление данных пользователя */
    updating: false,
    /** Состояние: данные пользователя были обновлены */
    updated: false,
    /** Состояние: было ли обновление пользователя с ошибкой */
    errorUpdate: false,
    /** Объект ошибки при обновлении пользователя */
    errorUpdateData: undefined as ErrorsTypes | undefined,
}

// -------------------------------------------
// Async Thunks
// -------------------------------------------

export const performLogin = createAsyncThunk(
    'auth/login',
    async ({ login, password }: { login: string; password: string }) => {
        const result = await AuthService.login(login, password)
        return result //{status}
    }
)

/**
 * Проверка токена авторизации пользователя.
 * Перед запросом проверятся существование токена, если его нет, то метод завершается с ошибкой.
 * Если токен актуален, то возвращается объект пользователя, который сохраняется в стор.
 */
export const checkUser = createAsyncThunk(
    'auth/checkUser',
    async () => {
        const user = await UserService.getProfile()
        return { user }
    },
    {
        condition: () => {
            //Если есть токен с локалсторедж
            const token = AuthService.getToken()
            return !!token
        },
        dispatchConditionRejection: true,
    }
)

export const regUser = createAsyncThunk(
    'auth/regUser',
    async (data: RegType) => {
        const user = await Auth.registaration(data)
        return user
    }
)

/**
 * Выход пользователя.
 * На бэк уходит запрос на удаление токена. Так же токен удаляется из localStorage.
 */
export const signOut = createAsyncThunk('auth/signOut', async () => {
    await AuthService.removeToken()
})

// -------------------------------------------
// Slice
// -------------------------------------------

/**
 * Создание слайса Auth.
 */
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(performLogin.fulfilled, (state, action) => {
            state.checking = false
            state.isAuth = true
        })

        /**
         * Перед отправкой запроса на проверку токена ставим состояние checking в true.
         */
        builder.addCase(checkUser.pending, (state) => {
            state.checking = true
        })

        /**
         * Если проверка токена прошла успешно, то сохраняем объект авторизованного пользователя в стор.
         */
        builder.addCase(checkUser.fulfilled, (state, action) => {
            state.user = action.payload.user
            state.checking = false
            state.checked = true
            state.isAuth = true
        })

        /**
         * Если проверка токена завершилась провалом, то ставим состояние, что проверка была осуществлена
         */
        builder.addCase(checkUser.rejected, (state) => {
            state.checking = false
            state.checked = true
        })
        /**
         * После успешного запроса на удаление токена, удаляем объект авторизованного пользователя из стора
         * и ставим состояние isAuth в false.
         */
        builder.addCase(signOut.fulfilled, (state) => {
            state.user = null
            state.isAuth = false
        })

        /**
         * регистрация
         */
        builder.addCase(regUser.pending, (state) => {
            state.checking = true
            state.isAuth = true
        })
        builder.addCase(regUser.fulfilled, (state, action) => {
            // state.user = action.payload
            state.checking = false
            state.isAuth = true
        })
    },
})

// -------------------------------------------
// Export action creators
// -------------------------------------------

// -------------------------------------------
// Selectors
// -------------------------------------------

/**
 * Селектор, идет ли в текущий момент проверка токена.
 * @param state Объект стора
 */
export const selectAuthChecking = (state: RootState) =>
    state.auth.checking || !state.auth.checked
/**
 * Селектор, была ли проверка токена.
 * @param state Объект стора
 */
export const selectAuthChecked = (state: RootState) => state.auth.checked
/**
 * Селектор, авторизован ли пользователь.
 * @param state Объект стора
 */
export const selectIsAuth = (state: RootState) => state.auth.isAuth

/**
 * Селектор объекта авторизованного пользователя.
 * @param state Объект стора
 */
export const selectAuthUser = (state: RootState) => state.auth.user

// -------------------------------------------
// Export a reducer
// -------------------------------------------
export default authSlice.reducer
