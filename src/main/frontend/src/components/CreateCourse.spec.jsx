/**
 * @jest-environment jsdom
 */
 
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RecoilRoot } from 'recoil'
import { CreateCourse } from './CreateCourse'

const renderComponent = () => {
    render(
        <RecoilRoot>
            <CreateCourse />
        </RecoilRoot>
    )

    const input 
        = screen.getByPlaceholderText('코스명을 입력해주세요. (최대 20자)')
    const nextButton 
        = screen.getByText('다음')
    const errorMessage 
        = screen.queryByText('코스명을 입력해주세요.')

    return {
        input,
        nextButton,
        errorMessage
    }
}

describe('CreateCourse Page', () => {

    test('코스 생성 컴포넌트 렌더링', () => {
        const { input, nextButton }= renderComponent()
        expect(input).not.toBeNull()
        expect(nextButton).not.toBeNull()
    })

    test('코스명을 입력하지 않고 다음 버튼 클릭 시 에러 메시지를 노출', async () => {
        const { nextButton, errorMessage } = renderComponent()
        await userEvent.click(nextButton)
        expect(errorMessage).not.toBeNull()
    })

    test('코스명 입력 후 다음 버튼 클릭 시 페이지 이동', async () => {
        const { input, nextButton, errorMessage } = renderComponent()
        await userEvent.type(input, '코스명')
        await userEvent.click(nextButton)
        expect(errorMessage).toHaveAttribute('data-valid', 'true')
    })

})