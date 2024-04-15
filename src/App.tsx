import { Header } from "./components"
import { Order, Cards, Reviews } from "./features"

const App = () => {
  return (
    <div className="App">
      <Header content="тестовое задание" />
      <div className="container">
        <Reviews />
        <Order />
        <Cards />
      </div>
    </div>
  )
}

export default App
