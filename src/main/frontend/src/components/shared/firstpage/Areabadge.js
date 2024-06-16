import Badge from 'react-bootstrap/Badge'
import Stack from 'react-bootstrap/Stack'
import styled from 'styled-components'
import {Areas} from '../../../data/areas'

export const AreaBadge = ({clickedArea}) => {
  const area = clickedArea.name
  return (
    <Stack direction='vertical' gap={2}>
      {Areas.map((v) =>
        v.name === area ? (
          <StyledSelectedButton>{area}</StyledSelectedButton>
        ) : (
          <StyledUnslectedButton>{v.name}</StyledUnslectedButton>
        )
      )}
    </Stack>
  )
}

const StyledSelectedButton = styled(Badge)`
  background-color: ${(props) => props.color || '#fa609e'} !important;
  border-radius: 50px;
  color: white;
  font-size: 15px;
`

const StyledUnslectedButton = styled(Badge)`
  background-color: ${(props) => props.color || '#d3a5a2'} !important;
  border-radius: 50px;
  color: ${'white'};
  font-size: 15px;
`
