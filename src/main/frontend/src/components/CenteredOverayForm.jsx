import {Container} from 'react-bootstrap'
import {styled} from 'styled-components'
import {OverlayWrapper} from './shared/OverlayWrapper'

export const CenteredOverayForm = ({children}) => {
  return (
    <StyledCenteralizedContainer>
      <OverlayWrapper>{children}</OverlayWrapper>
    </StyledCenteralizedContainer>
  )
}

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
