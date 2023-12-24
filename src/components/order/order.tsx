import { Button, Table } from "react-bootstrap";
// import SubcardItem from "../orders/item";
import { useEffect, useState } from "react";
// import { IOrder, IOrderItem, changeCartComment, changeOrderStatus, createNewOrder, getOrderInfo, getOrderItems } from "../../modules/order";
// import { useSelector } from "react-redux";
// import { RootState } from "../state/store";
// import { useNavigate, useParams } from "react-router-dom";
import { WebInternalModelsOrderSwagger } from "../../api/Api";
import { api } from "../../api";
import { useNavigate, useParams } from "react-router-dom";
import './style.css';
import { Trash } from "react-bootstrap-icons";
import LoaderComponent from "./loader";

export function Order() {
  const { id } = useParams();
  const [order, setOrder] = useState<WebInternalModelsOrderSwagger>()
  const [loader, setLoader] = useState(false)
  const [total, setTotal] = useState(0)

  const navigate = useNavigate();
  // const dispatch = useDispatch<AppDispatch>()

  const getOrder = async () => {
    if (id) {
      const { data } = await api.orders.ordersDetail(String(id), {withCredentials: true})
      data?.items?.sort(function compare( a, b ) {
          if ( a.id < b.id ){
            return -1;
          }
          if ( a.id > b.id ){
            return 1;
          }
          return 0;
        })
      setOrder(data)
    }
  }
  useEffect(()=>{
    getOrder()
  },[])

  const deleteItem = async (itemId: string) => {
    const { data } = await api.orders.itemsDelete(itemId, {withCredentials: true})
    setOrder(data)
  }

  const deleteOrder = async () => {
    setLoader(true)
    await api.orders.deleteDelete({withCredentials: true})
    await new Promise(r => setTimeout(r, 500));
    setOrder(undefined)
    setLoader(false)
    navigate("/services")
  }

  const makeOrder = async () => {
    setLoader(true)
    await api.orders.makeUpdate({withCredentials: true})
    await new Promise(r => setTimeout(r, 500));
    setLoader(false)
    navigate("/services")
  }

  const getTotal = () => {
    let newTotal = 0
    order?.items?.forEach(item => {
    console.log(newTotal)
    newTotal += Number(item?.quantity) * Number(item.item?.price)
    });
    return newTotal
  }

  return (
    <>
    
    {(loader && <LoaderComponent />) ||
    <>
    {order && Number(order?.items?.length) > 0 ?
  <div style={{display: 'flex', width: '100%', justifyContent: 'center', flexDirection: 'column', alignContent: 'center', justifyItems: 'center', alignItems: 'center'}}>
    <Table striped bordered hover responsive="md" className="table w-100">
      <thead>
        <tr>
          <th>№ услуги</th>
          <th>Название</th>
          <th>Описание</th>
          <th>Цена</th>
          <th>Количество</th>
          {order.status == "new" && <th></th>}
        </tr>
      </thead>
      <tbody>
        {order?.items?.map((item, index) => (
          <tr key={index}>
            <td>{item.item?.id}</td>
            <td>{item.item?.title}</td>
            <td>{item.item?.subtitle}</td>
            <td>{item.item?.price} руб.</td>
            <td>{item.quantity}</td>
            {order.status == "new" &&<td><Button onClick={() => {deleteItem(String(item.id))}} variant="outline-success"><Trash /></Button></td>}

          </tr>
        ))}
      </tbody>
    </Table>
    {order.status == "new" && <Button onClick={makeOrder} variant="success" className="m-3" style={{width: '200px'}}>Подтвердить заказ</Button>}
    {order.status == "new" && <Button onClick={deleteOrder} variant="danger" className="m-3" style={{width: '200px'}}>Удалить заказ</Button>}
    <h6 className="m-3 w-50" style={{textAlign: 'center'}}>Сумма заказа: {getTotal()} руб.</h6>

  </div> : 
    <div style={{display: 'flex', width: '100%', justifyContent: 'center', flexDirection: 'column', alignContent: 'center', justifyItems: 'center', alignItems: 'center'}}>
      <h4 className="m-3 w-50" style={{textAlign: 'center'}}>В заказе пусто!</h4>
    </div>
  }
  </>}

  </>
    );
}