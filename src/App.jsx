import { createSignal, createEffect } from "solid-js";
import { Container, Row, Col } from 'solid-bootstrap'
import styles from './App.module.css';
import 'animate.css'

import { apiCallCurrent, apiCallforecast } from './services'
import { ImageWeather } from './middleware/imageWeather'

import CurrentWeather from './component/currentWeather/index'
import Forecast from './component/forecast/index'
import SearchInput from './component/searchInput/index'
import ErrorWrapper from './component/handlingWrapper/errorWrapper'
import LoadingWrapper from './component/handlingWrapper/loadingWrapper'
import Detail from './component/detailWeather/index'

const App = () => {
  const [loading, setLoading] = createSignal(false)
  const [error, setError] = createSignal(false)
  const [showWeather, setShowWeather] = createSignal(false)

  const [query, setQuery] = createSignal('')
  const [search, setSearch] = createSignal('Singapore')

  const [weather, setWeather] = createSignal({})
  const [detail, setDetail] = createSignal({})
  const [forecast, setForecast] = createSignal([])
  const [errorMessage, setErrorMessage] = createSignal({})
  const [background, setBackground] = createSignal()


  const handleChange = (event) => setQuery(event.target.value)

  const handleSubmit = (event) => {
    event.preventDefault()
    setSearch(query())
    setQuery('')
  }

  createEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const currentWeather = await apiCallCurrent(search())
        const forecastList = await apiCallforecast(search())
        setWeather({
          id: currentWeather.data.weather[0].id,
          name: currentWeather.data.name,
          description: currentWeather.data.weather[0].description,
          icon: currentWeather.data.weather[0].icon,
          temp: currentWeather.data.main.temp,
          timezone: currentWeather.data.timezone,
        })
        setBackground(ImageWeather(weather().id))
        setDetail({
          clouds: currentWeather.data.clouds.all,
          humidity: currentWeather.data.main.humidity,
          wind: currentWeather.data.wind.speed,
          sunrise: currentWeather.data.sys.sunrise,
          sunset: currentWeather.data.sys.sunset,
          timezone: currentWeather.data.timezone,
        })
        setForecast(forecastList.data.list)
        setLoading(false)
        setShowWeather(true)
        setError(false)
      } catch (e) {
        setLoading(false)
        setErrorMessage(e.response.data)
        setShowWeather(false)
        setError(true)
      }
    }
    if (search() !== '') {
      fetchData()
    }
  }, [search()])

  return (
    <div class={styles.App} style={background()}>
      <Container class="mt-4">
        <SearchInput query={query()} handleChange={handleChange} handleSubmit={handleSubmit} />
        {loading() && <LoadingWrapper />}
        {!loading() && showWeather() && (
          <Row class="animate__animated animate__fadeIn">
            <Col lg={6} xs={12} class="mt-3">
              <CurrentWeather {...weather()} />
            </Col>
            <Col lg={6} xs={12} class="mt-3">
              <Detail {...detail()} />
            </Col>
            <Col lg={12} class="mt-3">
              <Forecast forecast={forecast()} />
            </Col>
          </Row>
        )}
        {!loading() && error() && (
          <div class="animate__animated animate__fadeIn">
            <ErrorWrapper {...errorMessage()} />
          </div>
        )}
      </Container>
    </div>
  )
}

export default App
