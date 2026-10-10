import React, { type ReactNode } from 'react'

interface SettingRowProps {
  label: string
  children: ReactNode
}

export const SettingRow: React.FC<SettingRowProps> = ({ label, children }) => {
  return (
    <div className="flex items-center justify-between gap-3">
      <span>{label}</span>

      {children}
    </div>
  )
}
