import { Badge, Container, Image } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { api } from '../../api'
import { useParams } from 'react-router-dom'
import { WebInternalModelsItemModel } from '../../api/Api';


export function ServicePage() {
    const { id } = useParams();
    const [item, setItem] = useState<WebInternalModelsItemModel>()
    const mapMaterial = (material: string) => {
        if (material == "wood") {
            return "дерево"
        }
        if (material == "metal") {
            return "металл"
        }
        if (material == "wire") {
          return "проволка"
        }
        if (material == "alloy") {
          return "сплав"
        }
        if (material == "clean") {
          return "чистый металл"
        }
      }

    const getItem = async () => {
        if (id && Number(id) != 0) {
            const { data } = await api.items.itemsDetail(id)
            console.log(data)
            setItem(data)
        }
    }

    useEffect(()=>{
        // const { data } =
        getItem()
    }, [])

    return (
        <>
            {item != undefined && <div className="p-3" style={{display: 'flex', flexDirection: 'row'}}>
                <div style={{width: '40%', marginRight: '5%'}}>
                    <h1>{item.title}</h1>
                    <div className='fs-4 m-3'>{item.subtitle}</div>
                    <Image src={item.imgurl} width='100%' />
                    <div><br /></div>
                </div>
                <Container className='w-50 m-0 p-0 fs-3'>
                    <Badge bg='dark'>Цена: {item.price} руб.</Badge>
                    <span> </span>
                    <Badge bg='dark'>Материал: {mapMaterial(String(item.type))}</Badge>
                    <div className=''>{item.info}</div>
                </Container>
            </div>}
        </>
        // <div></div>
    )
    
}
            // <div>
            //     <Row>
            //         <br />
            //         {orderItem.quantity > 0 && isLogin && <h3 style={{marginLeft: '20px'}}>Уже в вашей заявке</h3>}
            //         {/* {orderItems.map(orderItem => ( */}
            //             {orderItem.quantity > 0 && isLogin && <SubcardItem item={orderItem} func={callOrderItems} order={order.id} orderStatus='new'/>}
            //     </Row>
            // </div>