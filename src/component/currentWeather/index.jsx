import { createSignal, createEffect } from "solid-js";
import './style.css'
import moment from 'moment'
import { icons } from '../../middleware/importAssets'

const CurrentWeather = (props) => {
    const { name, description, icon, temp, timezone } = props

    const [date, setDate] = createSignal(new Date())

    function refreshTime() {
        setDate(new Date())
    }

    createEffect(() => {
        const timerId = setInterval(refreshTime, 1000)
        return function cleanup() {
            clearInterval(timerId)
        }
    }, [])

    return (
        <div class="currentBlock">
            <div class="iconWithText">
                <img src={icons(`pin.svg`)} alt="pin" width={40} height={40} />
                <h3>{name}</h3>
            </div>
            <div class="iconWithText">
                <h1>{Math.round(temp)}&deg;C</h1>
                <img src={icons(`${icon}.svg`)} alt={icon} width={70} height={70} />
            </div>
            <h5>{description}</h5>
            <small>
                {moment(date())
                    .utcOffset(timezone / 60)
                    .format('MMMM Do YYYY, h:mm:ss A')}
            </small>
        </div>
    )
}

export default CurrentWeather