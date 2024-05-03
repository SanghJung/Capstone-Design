import { render, screen } from "@testing-library/react"
import { RecoilRoot } from 'recoil'
import { AddDescription } from './AddDescription'

const renderComponent = () => {
    render(
        <RecoilRoot>
            <AddDescription />
        </RecoilRoot>
    )

    const input = screen.getByPlaceholderText('코스 설명을 작성해주세요. (최대 100자)')
    const nextButton = screen.getByText('다음')
    
    return {
        input,
        nextButton
    }
}

describe('AddDescription Page', () => {
    test('코스 부가 설명 입력 컴포넌트 렌더링', () => {
        const { input, nextButton }= renderComponent()
        expect(input).not.toBeNull()
        expect(nextButton).not.toBeNull()
    })
})