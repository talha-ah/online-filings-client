import { useContext, createContext, useReducer } from "react"

import { AuthInitialState, AuthReducer, AuthTypes } from "./reducers/auth"

const combineReducers = (slices) => (prevState, action) =>
  Object.keys(slices).reduce(
    (nextState, nextProp) => ({
      ...nextState,
      [nextProp]: slices[nextProp](prevState[nextProp], action),
    }),
    prevState
  )

const AppReducer = combineReducers({
  auth: AuthReducer,
})

const AppInitialState = {
  auth: AuthInitialState,
}

export const AppContext = createContext({
  state: AppInitialState,
  dispatch: (arg1) => undefined,
})

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, AppInitialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => useContext(AppContext)

export { useAppContext, AuthTypes }
