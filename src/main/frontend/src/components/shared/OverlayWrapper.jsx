import {styled} from 'styled-components'

export const OverlayWrapper = ({children}) => {
  return <StyledContainer>{children}</StyledContainer>
}

const StyledContainer = styled.div`
  border-radius: 10px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  background-color: white;
  min-height: ${(props) => props.minHeight || `0`};
  padding: ${(props) => props.padding || `3vw`};
`
