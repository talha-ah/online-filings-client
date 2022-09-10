import getConfig from "next/config"

const { publicRuntimeConfig } = getConfig()

export const API_LIMIT = publicRuntimeConfig.apiLimit

export const BASE_URL = `${publicRuntimeConfig.apiPath}/api/${publicRuntimeConfig.apiVersion}`

export const SIDEBAR_WIDTH = 400
export const APP_BAR_HEIGHT = 65

export const APP_NAME = publicRuntimeConfig.appName

export const ENDPOINTS = {
  tasks: "/tasks",
  projects: "/projects",
}
