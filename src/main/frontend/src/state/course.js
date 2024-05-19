import {atom} from 'recoil'

export const placeState = atom({
  key: 'placeState',
  default: [],
})

export const categoryState = atom({
  key: 'categoryState',
  default: [],
})

export const positionState = atom({
  key: 'positionState',
  default: [],
})
