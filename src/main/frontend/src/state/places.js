import {atom} from 'recoil'

export const placeDataState = atom({
  key: 'placeDataState',
  default: {
    id: [],
    places: [],
    categories: [],
    index: [],
    positions: [],
    addresses: [],
    phoneNumber: [],
    placeUrl: [],
  },
})
