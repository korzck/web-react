import { Badge, Button, Card, Col, Form, FormControl, InputGroup, Row, Spinner } from "react-bootstrap";
import SubcardItem from "../orders/item";
import { useEffect, useState } from "react";
import { IOrder, IOrderItem, changeCartComment, changeOrderStatus, createNewOrder, getCart, getOrderInfo, getOrderItems } from "../../modules/order";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { useNavigate } from "react-router-dom";

export function Order({orderId}) {
  const [order, setOrder] = useState<IOrder>([])
  const [orderItems, setOrderItems] = useState<IOrderItem[]>([])
  const [inputValue, setInputValue] = useState("");
  const id = useSelector((state: RootState) => state.user.id)
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [dummy, setDummy] = useState(false)
  const navigate = useNavigate();
  const callOrderItems = async () => {
    setLoading(true)
    const resp = await getOrderItems(orderId)
    // console.log("got resp", orderObj)
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
  const orderInfo = async () => {
    const resp = await getOrderInfo(orderId)
    setOrder(resp[0])
    setInputValue(resp[0].comment)
  }

  // useEffect(() => {
  //   // cart()
  // }, [])

  useEffect(() => {
    let res = 0
    orderItems.forEach(item => {
      res += Number(item.model.price)*item.quantity
    });
    // console.log("got res", res)
    setTotal(res)
  }, [orderItems])

  useEffect(() => {
    callOrderItems()
    orderInfo()
  }, [dummy])

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const saveComment = async () => {
    setLoading(true)
    await changeCartComment(inputValue)
    setLoading(false)
    setDummy(!dummy)
  };

  const saveOrder = async () => {
    // alert("saved!")
    setLoading(true)
    await changeOrderStatus("pending", orderId)
    setLoading(false)
    alert('Ваш заказ отправлен на рассмотрение, вы можете следить за его статусом в разделе "Заказы"')
    const resp = await createNewOrder(id)
    // console.log(resp)
    navigate('/orders')
  };


  return (
    <>
      {orderId != undefined && order.comment != undefined && (orderItems.length > 0 || order.comment != "") &&
      <Col key={orderId} sm={6} md={4} lg={10} style={{margin: 'auto', marginBottom: '20px'}}>
        <Card>
          <Card.Body>
            <Card.Text>
              <Form>
                <InputGroup className="mb-3">
                  <FormControl
                    as={'textarea'}
                    style={{height: '100'}}
                    placeholder="Комментарий к заказу"
                    onChange={handleInputChange}
                    value={inputValue}
                    />
                  <InputGroup>
                    <Button variant="outline-secondary" onClick={saveComment}>
                      {loading && <Spinner animation="border" role="status">
                        <span className="visually-hidden"></span>
                      </Spinner>}
                       Сохранить
                    </Button>
                  </InputGroup>
                  <Card.Title>Комментарий к заказу: {order.comment}</Card.Title>
                </InputGroup>
              </Form>

            </Card.Text>
            <Row>
              <br />
              <Badge style={{fontSize: '1rem'}}>Цена: {total} руб.</Badge>
              <div><br /></div>
              {orderItems.map(orderItem => (
                <SubcardItem item={orderItem} func={callOrderItems} order={orderId} orderStatus={order.status} />
              ))}
            </Row>
            
          </Card.Body>
        </Card>
        <br />
      </Col>}
      {orderId == undefined || (orderItems.length == 0 && order.comment == "") && 
        <h4 className="m-3">В заказе пусто!</h4>
      }
    </>
  );
}