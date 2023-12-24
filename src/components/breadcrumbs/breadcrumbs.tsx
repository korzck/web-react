import { useEffect, useState } from 'react'
import { Badge } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'

export function Breadcrumbs() {
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
        if (link == "adminorders") {
            return "Администрирование заявок"
        }
        if (link == "adminitems") {
            return "Администрирование услуг"
        }
        if (link == "admin") {
            return "Администрирование"
        }
        if (link == "items") {
            return "Услуги"
        }
        if (link == "edit") {
            return "Редактирование"
        }
        if (link == "new") {
            return "Новое"
        }
        return link
    }

    useEffect(()=>{
        console.log(location.pathname);
        const newRoutes = []
        newRoutes.push(...String(location.pathname).split('/'))
        if (newRoutes.length >= 2) {
            if (newRoutes[0] == "" && newRoutes[1] == "") {
                newRoutes.splice(0, 1)
            }
        }
        setRoutes(newRoutes)
    }, [location])

    return (
        <>
            {routes.map((link) => {
                let newLink = ''
                for (let i = 0; i < routes.length; i++) {
                    if (routes[i] != '') {
                        if (routes[i] == link) {
                            newLink += '/'+routes[i]
                            break
                        }
                        newLink += '/'+routes[i]
                    } else if (link == '') {
                        break
                    }
                }
                // console.log("link is",newLink, "and routes are", routes)
                return <Link to={newLink}><Badge bg='dark' className='m-1 p-2 fw-regular'>{mapLink(link)}</Badge></Link>
            })}
        </>
    )
}

