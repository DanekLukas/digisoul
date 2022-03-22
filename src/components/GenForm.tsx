import { Button, TextField, TextareaAutosize } from '@material-ui/core'

type TProperties = { text: string; type: string; helperText?: string }

export type TValues = {
  [index: string]: string
}

export type TInput = {
  [index: string]: TProperties
}

type Props = {
  input: TInput
  values: TValues
  setValues: React.Dispatch<React.SetStateAction<TValues>>
  button: string
}

const GenForm = ({ input, values, setValues, button }: Props) => {
  const handleInput = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    item: string
  ) => {
    const tmp = { ...values }
    tmp[item as keyof typeof values] = e.currentTarget.value
    setValues(tmp)
  }

  return (
    <>
      {Object.keys(input).map((item, index) =>
        input[item as keyof typeof input].type === 'textarea' ? (
          <TextareaAutosize
            maxRows={4}
            key={index}
            aria-label='maximum height'
            placeholder={input[item as keyof typeof input].helperText || ''}
            value={values[item as keyof typeof values]}
            style={{ width: 200, height: 100 }}
            onChange={e => handleInput(e, item)}
          />
        ) : (
          <TextField
            label={input[item as keyof typeof input].text}
            key={index}
            name={item}
            value={values[item as keyof typeof values]}
            helperText={input[item as keyof typeof input].helperText || ''}
            type={input[item as keyof typeof input].type}
            autoComplete='on'
            onChange={e => handleInput(e, item)}
          />
        )
      )}
      <Button type='submit' variant='contained' color='primary'>
        {button}
      </Button>
    </>
  )
}

export default GenForm
