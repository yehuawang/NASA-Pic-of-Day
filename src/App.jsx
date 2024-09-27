import Main from "./components/Main.jsx";
import SideBar from "./components/SideBar.jsx";
import Footer from "./components/Footer.jsx";
import {useEffect, useState} from "react";

function App() {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const NASA_KEY = import.meta.env.VITE_NASA_API_KEY
    const [showModal, setShowModal] = useState(false)

    function handleToggleModal() {
        setShowModal(!showModal)
    }

    useEffect(() => {
        async function fetchData() {
            const url = 'https://api.nasa.gov/planetary/apod\n' + `?api_key=${NASA_KEY}`

            // caching
            const today = (new Date).toDateString()
            const localKey = `NASA-${today}`
            if (localStorage.getItem(localKey)) {
                const apiData = JSON.parse(localStorage.getItem(localKey))
                setData(apiData)
                console.log('fetched from cache')
                return
            }
            localStorage.clear()

            try {
                const res = await fetch(url)
                const apiData = await res.json()
                localStorage.setItem(localKey, JSON.stringify(apiData))
                setData(apiData)
                console.log('fetched from API')
            } catch (error) {
                console.log(error.message())
            }
        }

        fetchData()
    }, []);

    return (
        <>
            { data ?( <Main data={data} /> ) : (
                <div className="loading-spinner">
                    <i className="fa-solid fa-spinner"></i>
                </div>
            )}
            {showModal && ( <SideBar data={data} handleToggleModal={handleToggleModal}/> )}


            { data && ( <Footer data={data} handleToggleModal={handleToggleModal}/> )}
        </>
    )
}

export default App
