export const smooth = {
  duration: 0.4,
  ease: [0.4, 0, 0.2, 1] as const,
}

export const spring = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 30,
}

export const slow = {
  duration: 0.7,
  ease: 'easeOut' as const,
}
