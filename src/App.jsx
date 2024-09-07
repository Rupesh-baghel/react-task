
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import CaptionPage from './captionPage';
import SearchPage from './SearchPage';
import './App.css'
const App = () => {

    return (
        <BrowserRouter>

            <Routes>
                <Route path='/' element={<SearchPage />} />
                <Route path='/caption/:id' element={<CaptionPage />} />
            </Routes>

        </BrowserRouter>)
}
export default App;