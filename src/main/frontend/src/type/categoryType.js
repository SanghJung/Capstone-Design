import {Play} from '../components/shared/svg/activity'
import {Cafe} from '../components/shared/svg/Cafe'
import {Eat} from '../components/shared/svg/restaurant'
import {Rest} from '../components/shared/svg/rest'

export const categoryMap = {
  restaurant: 'Eat.png', // 음식점
  activity: 'Play.png', // 카페
  Cafe: 'Cafe.png', // 힐링
  힐링: 'Rest.png', //TODO: 지금은 DB에 없다. 추후 보강 후 UI에 반영될 예정
  기타: 'Play.png', // 정의되지 않은 예외에 대해 기타로 지정해놓음
}

export const categoryComponentMap = {
  restaurant: {Component: Eat, color: '#64C466'},
  activity: {Component: Play, color: '#010101'},
  Cafe: {Component: Cafe, color: '#C39D74'},
  힐링: {Component: Rest, color: '#A1E4BD'},
  기타: {Component: Play, color: '#64C466'},
}
