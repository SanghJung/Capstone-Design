import Form from 'react-bootstrap/Form'

export const OptionBar = () => {
  return (
    <Form
      style={{
        'background-color': 'white',
        borderRadius: '20px',
        boxShadow: '10px',
        width: '150px',
        padding: '20px',
      }}
    >
      <h3 style={{fontWeight: '600'}}>옵션 선택</h3>
      <p style={{fontWeight: '500'}}> 지도 위 지하철 노선 보기</p>
      <Form.Check // prettier-ignore
        type='switch'
        id='custom-switch'
        label='1호선'
      />
      <Form.Check // prettier-ignore
        type='switch'
        id='custom-switch'
        label='2호선'
      />
      <Form.Check // prettier-ignore
        type='switch'
        id='custom-switch'
        label='3호선'
      />
      <Form.Check // prettier-ignore
        type='switch'
        id='custom-switch'
        label='4호선'
      />
      <Form.Check // prettier-ignore
        type='switch'
        id='custom-switch'
        label='5호선'
      />
      <Form.Check // prettier-ignore
        type='switch'
        id='custom-switch'
        label='6호선'
      />
      <Form.Check // prettier-ignore
        type='switch'
        id='custom-switch'
        label='7호선'
      />
      <Form.Check // prettier-ignore
        type='switch'
        id='custom-switch'
        label='8호선'
      />
      <Form.Check // prettier-ignore
        type='switch'
        id='custom-switch'
        label='9호선'
      />
      <p style={{fontWeight: '500'}}> 지도 위 랜드마크</p>
      <Form.Check // prettier-ignore
        type='switch'
        id='custom-switch'
        label=''
      />
    </Form>
  )
}
