import {Container, Row, Button} from 'react-bootstrap'
import {motion, useMotionValue, useTransform} from 'framer-motion'
import {styled} from 'styled-components'
import {OverlayWrapper} from './shared/OverlayWrapper'

function CircularProgress({progress}) {
  const circleLength = useTransform(progress, [0, 1], [0, 1])
  const checkmarkPathLength = useTransform(progress, [0, 95, 100], [0, 0, 1])
  const circleColor = useTransform(
    progress,
    [0, 40, 100],
    ['#EE8580', '#295FF4', '#295FF4']
  )

  return (
    <motion.svg
      xmlns='http://www.w3.org/2000/svg'
      width='100'
      height='100'
      viewBox='0 0 258 258'
    >
      <motion.path
        d='M 130 6 C 198.483 6 254 61.517 254 130 C 254 198.483 198.483 254 130 254 C 61.517 254 6 198.483 6 130 C 6 61.517 61.517 6 130 6 Z'
        fill='#295FF4'
        strokeWidth='8'
        stroke={circleColor}
        style={{
          pathLength: circleLength,
        }}
      />
      <motion.path
        transform='translate(60 85)'
        d='M3 50L45 92L134 3'
        fill='#295FF4'
        stroke='#ffffff'
        strokeWidth={30}
        style={{pathLength: checkmarkPathLength}}
      />
    </motion.svg>
  )
}

export const CreateCourseEnd = () => {
  let progress = useMotionValue(90)
  return (
    <StyledCenteralizedContainer>
      <OverlayWrapper>
      <Container>
        <StyledRow>
          <Row>
            <StyledH1>코스가 생성됐어요!</StyledH1>
            <StyledSubtitle>
              피크닉이 생성된 코스를 기반으로 관심 있을만한 코스를 추천해드려요.
            </StyledSubtitle>
          </Row>
          <Row>
            <motion.div
              initial={{x: 0}}
              animate={{x: 100}}
              style={{x: progress}}
              transition={{duration: 1}}
            />
            <CircularProgress progress={progress} />
          </Row>
          <Row>
            <StyledSubmitButton>처음으로</StyledSubmitButton>
          </Row>
        </StyledRow>
      </Container>
      </OverlayWrapper>
    </StyledCenteralizedContainer>
  )
}

const StyledH1 = styled.h1`
  padding: 12px;
  font-weight: 600;
  line-height: 50px;
  text-align: Center;
  word-break: keep-all;
  overflow-wrap: break-word;
  span {
    color: #295ff4;
  }
`

const StyledCenteralizedContainer = styled(Container)`
  background-color: #fbf3f7;
  width: 30vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-item: center;
  padding: 0px;
  gap: 10px;
`

const StyledRow = styled(Row)`
  height: 80vh;
  align-items: center;
  justify-content: center;
`

const StyledSubtitle = styled.p`
  word-break: keep-all;
  overflow-wrap: break-word;
  color: gray;
  text-align: Center;
`

const StyledSubmitButton = styled(Button).attrs({type: 'submit'})`
  width: 60%;
  height: 50px;
  margin: 0 auto;
  background: white;
  border-radius: 50px;
  border-color: #295ff4;
  border-width: 2px;
  color: #295ff4;
  font-weight: 600;
  font-size: 18px;
  &: hover {
    background-color: #295ff4;
    filter: brightness(90%);
    color: white;
    font-weight: 1000;
  }
`