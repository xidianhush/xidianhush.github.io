export declare const manifest: {
  name: string
  displayName: string
  description: string
  version: string
  category: string
  quartzVersion: string
  defaultOrder: number
}

export default function ImageLayouts(): {
  name: string
  textTransform: (ctx: unknown, src: string) => string
}