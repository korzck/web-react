import { Badge, Button, Container, Image, Row } from 'react-bootstrap'
import { IItem } from '../../modules/services'
import { IOrder, IOrderItem, addItemToCart, getCart, getOrderItems } from '../../modules/order'
import SubcardItem from '../orders/item'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../state/store'
import { TextCenter } from 'react-bootstrap-icons'

export function ServicePage({...item}: IItem) {
    // const [order, setOrder] = useState<IOrder>()
    const [orderItem, setOrderItem] = useState<IOrderItem>([])
    const [order, setOrder] = useState<IOrder>([])
    const isLogin = useSelector((state: RootState) => state.user.isLogin)
    const [loading, setLoading] = useState(false)
    const [total, setTotal] = useState(0)
    const maxPrice = useSelector((state: RootState) => state.user.maxPrice)
    const minPrice = useSelector((state: RootState) => state.user.minPrice)
    const material = useSelector((state: RootState) => state.user.material)
    const callOrderItems = async () => {
        setLoading(true)
            const cartOrder = await getCart()
            setOrder(cartOrder[0])
            let hasItem = false
            const resp = await getOrderItems(cartOrder[0].id)
            resp.forEach(i => {
                if (i.model.id == item.id) {
                    setOrderItem(i)
                    hasItem = true
                    // console.log(i)
                }
            });
            if (orderItem.quantity == 0 || resp.length == 0 || !hasItem) {
                setOrderItem({})
            }
        setLoading(false)
    }

    useEffect(() => {
        callOrderItems()
    }, [])
    
    const addItem = async () => {
        const res = await addItemToCart(item.id)
        console.log("got add", res)

        callOrderItems()
    }

    const mapMaterial = (material: string) => {
        if (material == "wood") {
            return "дерево"
        }
        if (material == "metal") {
            return "металл"
        }
    }

    return (
        <>
            <div className="p-3" style={{display: 'flex', flexDirection: 'row'}}>
                <div style={{width: '40%', marginRight: '5%'}}>
                    <h1>{item.title}</h1>
                    <div className='fs-4 m-3'>{item.subtitle}</div>
                    <Image src={item.imgurl} width='100%' />
                    <div><br /></div>
                    {isLogin && <Button onClick={addItem}>Добавить в корзину</Button>}
                </div>
                <Container className='w-50 m-0 p-0 fs-3'>
                    <Badge bg='dark'>Цена: {item.price}</Badge>
                    <span> </span>
                    <Badge bg='dark'>Материал: {mapMaterial(item.type)}</Badge>
                    <div className=''>{item.info}</div>
                </Container>
            </div>

            <div>
                <Row>
                    <br />
                    {orderItem.quantity > 0 && isLogin && <h3 style={{marginLeft: '20px'}}>Уже в вашей заявке</h3>}
                    {/* {orderItems.map(orderItem => ( */}
                        {orderItem.quantity > 0 && isLogin && <SubcardItem item={orderItem} func={callOrderItems} order={order.id} orderStatus='new'/>}
                    {/* ))} */}
                </Row>
            </div>

        </>
    )
    
}