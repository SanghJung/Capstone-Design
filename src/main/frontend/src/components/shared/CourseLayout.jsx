import styled from 'styled-components'

export const CourseLayout = ({children}) => {
    return (
        <StyledContainer>
            {children}
        </StyledContainer>
    );
}

const StyledContainer = styled.div`
    padding: 50px;
`