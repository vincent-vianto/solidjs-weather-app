import './style.css'

const ErrorWrapper = (props) => {
  const { cod, message } = props

  return (
    <div class="errorWrapper">
      <h1>{cod}</h1>
      <h2>{message}</h2>
    </div>
  ) 
}

export default ErrorWrapper
