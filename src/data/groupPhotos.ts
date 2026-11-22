interface Props {
  filename: string
  description: string
  width?: number
  height?: number
  objectPosition?: string
}

export interface GroupPhoto extends Props {}
export class GroupPhoto {
  constructor(attrs: Props) {
    Object.assign(this, attrs)
  }
}

const PHOTO_2026_NOV: GroupPhoto = {
  filename: 'group_2026_nov.jpg',
  description: 'November, 2026',
  width: 4618,
  height: 3464,
  objectPosition: 'center 80%',
}

const PHOTO_2026_JUN: GroupPhoto = {
  filename: 'group_2026_jun.jpg',
  description: 'June, 2026',
  width: 2928,
  height: 1596,
}

const PHOTO_2023_JUN: GroupPhoto = {
  filename: 'group_2023_jun.jpg',
  description: 'June, 2023',
  width: 1536,
  height: 1152,
}

const PHOTO_2022_SEP: GroupPhoto = {
  filename: 'group_2022_sep.jpg',
  description: 'September, 2022',
  width: 1536,
  height: 1152,
}

export const GROUPPHOTOS: GroupPhoto[] = [PHOTO_2026_NOV, PHOTO_2026_JUN, PHOTO_2023_JUN, PHOTO_2022_SEP]

// Photos displayed in the homepage hero carousel (first entry is shown by default)
export const HOMEPAGE_PHOTOS: GroupPhoto[] = [PHOTO_2026_JUN, PHOTO_2026_NOV]
