import * as React from 'react'
import { useInput } from '@mui/base'
import { styled } from '@mui/system'
import { unstable_useForkRef as useForkRef } from '@mui/utils'

// 色定義
const blue = {
  100: '#DAECFF',
  200: '#80BFFF',
  400: '#3399FF',
  600: '#0072E5',
}

// 色定義
const grey = {
  50: '#F3F6F9',
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027',
}

// cssの定義
const StyledInputElement = styled('input')(
  ({ theme }) => `
  width: 99%;
  font-size: 0.875rem;
  font-family: IBM Plex Sans, sans-serif;
  font-weight: 400;
  line-height: 1.5;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[800] : grey[300]};
  border-radius: 8px;
  padding: 0 0;

  &:hover {
    background: ${theme.palette.mode === 'dark' ? null : grey[100]};
    border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
  }

  &:focus {
    outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[100]};
  }
`
)

// viewの定義
const PathTextMenu = React.forwardRef(
  (
    props: React.InputHTMLAttributes<HTMLInputElement>,
    ref: React.ForwardedRef<HTMLInputElement>
  ): JSX.Element => {
    // inputに必要な属性やeventの定義
    const { getRootProps, getInputProps } = useInput(props)
    const inputProps = getInputProps()
    inputProps.ref = useForkRef(inputProps.ref, ref)

    return (
      <div {...getRootProps()} style={{ width: '70%' }}>
        <StyledInputElement {...props} {...inputProps} />
        <span style={{ width: '1%', position: 'absolute', right: '17%' }}>
          ×
        </span>
        <span style={{ width: '1%', position: 'absolute', right: '16%' }}>
          ▼
        </span>
      </div>
    )
  }
)

/**
 *pathText部表示コンポーネント
 *
 * @param props - props
 *
 * @returns jsx
 */
const _PathTextMenu: React.FC<{
  path: string
  handleBlur: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}> = props => {
  return (
    <PathTextMenu
      aria-label='Demo input'
      placeholder='Type something...'
      onBlur={props.handleBlur}
      onChange={props.handleChange}
      value={props.path}
    ></PathTextMenu>
  )
}

export default _PathTextMenu

PathTextMenu.displayName = 'PathTextMenu'
