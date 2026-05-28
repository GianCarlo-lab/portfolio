export interface AboutHighlight {
  icon: string
  label: string
  value: string
}

export interface ValueDemo {
  type: 'code' | 'symmetry' | 'learning' | 'fullstack' | 'teamwork'
  title: string
  description: string
}

export interface AboutValue {
  title: string
  description: string
  demo: ValueDemo
}

export interface AboutData {
  greeting: string
  bio: string[]
  highlights: AboutHighlight[]
  values: AboutValue[]
}
