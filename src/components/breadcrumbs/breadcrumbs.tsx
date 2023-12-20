import { useEffect, useState } from 'react'
import { Badge } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'

export function Breadcrumbs() {
    const links = ['/']
    // const route = useRoute();
    const location = useLocation();
    const [routes, setRoutes] = useState([])


    const mapLink = (link: string) => {
        if (link == "services") {
            return "Услуги"
        }
        if (link == "contacts") {
            return "Контакты"
        }
        if (link == "cart") {
            return "Корзина"
        }
        if (link == "orders") {
            return "Заказы"
        }
        if (link == "") {
            return "Домашняя страница"
        }
        if (link == "user") {
            return "Аккаунт"
        }
        if (link == "login") {
            return "Вход в аккаунт"
        }
        if (link == "signup") {
            return "Регистрация"
        }
        return link
    }

    useEffect(()=>{
        console.log(location.pathname);
        let newRoutes = []
        newRoutes.push(...String(location.pathname).split('/'))
        if (newRoutes.length >= 2) {
            if (newRoutes[0] == "" && newRoutes[1] == "") {
                newRoutes.splice(0, 1)
            }
        }
        console.log(newRoutes)
        setRoutes(newRoutes)
    }, [location])

    // links.push(...String(window.location.pathname).split('/'))
    return (
        <>
            {routes.map((link) => {
                // if (link == '/') {
                //     return <Link to={"/"}><Badge bg='dark' className='m-1 p-2 fw-regular' >{"/"}</Badge></Link>
                // } 
                return <Link to={"/"+link}><Badge bg='dark' className='m-1 p-2 fw-regular'>{mapLink(link)}</Badge></Link>
            })}
        </>
    )
}

function useRoute() {
    throw new Error('Function not implemented.');
}
