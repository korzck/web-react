import { Badge } from 'react-bootstrap'

export function Breadcrumbs() {
    const links = ['/']
    links.push(...String(window.location.pathname).split('/'))
    // console.log(links)
    return (
        <>
            {links.map((link) => (
              <a href={'/'+link}><Badge bg='dark' className='m-1 p-3 fw-regular'>{link}</Badge></a>
            ))}
        </>
    )
    
}