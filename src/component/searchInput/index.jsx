import { Form, FormControl, Button, InputGroup } from 'solid-bootstrap'
import './style.css'

const SearchInput = (props) => {
  return (
    <div>
      <Form onSubmit={props.handleSubmit}>
        <InputGroup>
          <FormControl
            type="text"
            placeholder="Search city's weather here"
            value={props.query}
            onChange={props.handleChange}
            class="bg-transparent text-light formSearchBox"
          />
          <Button variant="transparent" class="text-light formButton" type="submit">
            Search
          </Button>
        </InputGroup>
      </Form>
    </div>
  )
}

export default SearchInput
