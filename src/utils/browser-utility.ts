import getConfig from "next/config"
const { publicRuntimeConfig } = getConfig()

const storageKey = publicRuntimeConfig.storageKey

export const setBrowserItem = (value: string, key = storageKey) => {
  window.localStorage.setItem(key, value)
}

export const getBrowserItem = (key = storageKey) => {
  return window.localStorage.getItem(key)
}

export const saveBrowserObj = (obj: any, key = storageKey) => {
  window.localStorage.setItem(key, JSON.stringify(obj))
}

export const getBrowserObj = (key = storageKey) => {
  const temp = window.localStorage.getItem(key)

  if (temp) return JSON.parse(temp)

  return null
}

export const removeBrowserItem = (key = storageKey) => {
  window.localStorage.removeItem(key)
}

export const removeBrowserAll = () => {
  window.localStorage.clear()
}

export const setOrgMetadata = (obj: any) => {
  window.localStorage.setItem("metadata", JSON.stringify(obj))
}

export const getOrgMetadata = () => {
  const temp = window.localStorage.getItem("metadata")

  if (temp) return JSON.parse(temp)

  return null
}
