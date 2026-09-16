export interface ActiveSession {
  id: string
  deviceName: string
  browser: string
  os: string
  location?: string
  lastActive: string
  isCurrentSession: boolean
}

export interface ChangePasswordPayload {
  currentPassword?: string
  newPassword: string
  confirmPassword: string
}
