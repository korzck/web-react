import { Badge, Container, Image } from 'react-bootstrap'
import { IItem } from '../../modules/services'

export function ServicePage({...item}: IItem) {
    
    return (
        <>
            <div className="w-auto p-3">
                <h1>{item.title}</h1>
                <div className='fs-4 m-3'>{item.subtitle}</div>
                <Image src={item.imgurl} width='100%' />
                <Container className='w-50 m-0 p-0 fs-3'>
                    <Badge bg='dark'>Цена: {item.price}</Badge>
                    <span> </span>
                    <Badge bg='dark'>Материал: {item.type}</Badge>
                </Container>
                <div className='m-3'>{item.info}</div>
            </div>
        </>
    )
    
}