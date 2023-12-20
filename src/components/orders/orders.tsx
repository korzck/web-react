import { useEffect, useState } from "react"
import { IOrder, IOrderItem, changeOrderStatus, createNewOrder, getCart, getOrderItems, getOrders } from "../../modules/order"
import { useInterval } from "../../modules/utils"

import { Card, Row, Col, Button } from 'react-bootstrap';
import { RootState } from "../state/store";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";


export function Orders() {
    const [ordersList, setOrdersList] = useState<IOrder[]>([])
    const [orderItems, setOrderItems] = useState<IOrderItem[]>([])
    const isLogin = useSelector((state: RootState) => state.user.isLogin)
    // const [currentOpen, setCurrentOpen] = useState(-1)
    const [loading, setLoading] = useState(false)
    const [total, setTotal] = useState(0)
    const [currentOrder, setCurrentOrder] = useState<IOrder>([])
    const navigate = useNavigate();
    const id = useSelector((state: RootState) => state.user.id)

    useInterval(() => {
      orders()
    }, 1000 );

    const cart = async () => {
      const resp = await getCart()
      if (resp.length == 0) {
        return
      }
      setCurrentOrder(resp[0])
  }

    const orders = async () => {
        const resp = await getOrders()

        resp.sort(function compare( a, b ) {
          if ( a.id > b.id ){
            return -1;
          }
          if ( a.id < b.id ){
            return 1;
          }
          return 0;
        })

        setOrdersList(resp)        
    }

    const callOrderItems = async (orderId: number) => {
      setLoading(true)
        const resp = await getOrderItems(orderId)
        resp.sort(function compare( a, b ) {
          if ( a.model.id < b.model.id ){
            return -1;
          }
          if ( a.model.id > b.model.id ){
            return 1;
          }
          return 0;
        })
        setOrderItems(resp)
      setLoading(false)
    }
        

    useEffect(() => {
      let res = 0
      orderItems.forEach(item => {
        res += Number(item.model.price)*item.quantity
      });
      setTotal(res)
    }, [orderItems])

    useEffect(()=>{
      // shortPolling()
      if (isLogin) {
        orders()
      }
      ordersList.forEach(e => {
        if (e.status == "new") {
          callOrderItems(e.id).then()
          setCurrentOrder(e)
        }
      });
    }, [isLogin])

    const cancelOrder = (orderId: number) => {
      changeOrderStatus('canceled', orderId)
      // orders()
      // setCounter(!counter)
    }

    const saveOrder = async (orderId: number) => {
      // alert("saved!")
      // setLoading(true)
      await changeOrderStatus("pending", orderId)
      // setLoading(false)
      alert('Ваш заказ отправлен на рассмотрение, вы можете следить за его статусом в разделе "Заказы"')
      const resp = await createNewOrder(id)
      // console.log(resp)
      navigate('/orders')
    };

    useEffect(()=>{
      callOrderItems(currentOrder.id)
    },[currentOrder])

    const mapStatus = (status: string) => {
      if (status == "pending") {
        return "В обработке"
      }
      if (status == "canceled") {
        return "Отменен"
      }
      if (status == "in progress") {
        return "Выполняется"
      }
      if (status == "done") {
        return "Выполнен"
      }
      if (status == "new") {
        return "Черновик"
      }
    }

    return (
        <> 
            <h1 className="m-3">Список ваших заказов на производстве</h1>

            {/* <div>current order here</div> */}

            {isLogin && 
            <Row>
              {ordersList.map(order => (
                <Col key={order.id} sm={6} md={4} lg={10} style={{margin: 'auto', marginBottom: '20px'}}>
                  <Card>
                    <Card.Body>
                      <Card.Text>
                        <strong>Номер заказа:</strong> {order.id}<br />
                        <strong>Статус заказа:</strong> {mapStatus(order.status)}<br />
                        <strong>Дата создания:</strong> {order.CreatedAt}
                      </Card.Text>
                      {/* <Collapse in={currentOpen != -1 && currentOpen == order.id && !loading}>
                        <Row>
                          <br />
                          <Badge style={{fontSize: '1rem'}}>Цена: {total} руб.</Badge>
                          <div><br /></div>
                          {orderItems.map(orderItem => (
                            <SubcardItem item={orderItem} func={null} order={order.id}/>
                          ))}
                        </Row>
                      </Collapse> */}
                      {/* <Button 
                      style={{marginRight: '20px'}}
                      onClick={() => {
                        setCurrentOpen(order.id)
                        if (currentOpen == order.id) {
                          setCurrentOpen(-1)
                        } else {
                          callOrderItems(order.id)
                        }
                      }}
                      >
                       Детали заказа 
                      </Button> */}
                      <Link to={"/orders/"+order.id} style={{marginRight: '20px'}}>Детали заказа</Link>
                      {(order.status == 'pending') && order.status != 'canceled' && <Button onClick={() => {
                        cancelOrder(order.id)
                        orders()
                        }} variant='outline-danger' style={{marginRight: '20px'}}>Отменить заказ</Button>}
                      {order.status == 'canceled' && <Button variant='outline-secondary' disabled>Заказ отменен</Button>}
                      {order.status == 'done' && <Button variant='outline-secondary' disabled>Заказ выполнен</Button>}
                      {order.status == 'in progress' && <Button variant='outline-secondary' disabled>Заказ выполняется</Button>}
                      {order.status == 'pending' && <Button variant='outline-secondary' disabled>Заказ выполняется</Button>}
                      {order.status == 'new' && <Button variant='outline-primary' onClick={() => saveOrder(order.id)}>Подтвердить заказ</Button>}

                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
            }
            <br />
            {!isLogin &&
                <h4 className="m-3">Чтобы уидеть заказы, необходимо войти в аккаунт или зарегистрироваться!</h4>
            }
        </>
    )
}