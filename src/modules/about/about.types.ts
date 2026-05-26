export interface AboutHighlight {
  icon: string
  label: string
  value: string
}

export interface AboutValue {
  title: string
  description: string
}

export interface AboutData {
  greeting: string
  bio: string[]
  highlights: AboutHighlight[]
  values: AboutValue[]
}
