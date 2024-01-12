import { Button, Form, InputGroup, Table } from "react-bootstrap";
// import SubcardItem from "../orders/item";
import { useEffect, useState } from "react";

import { WebInternalModelsOrder } from "../../api/Api";
import { api } from "../../api";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { setMaxDate, setMinDate, setStatus, setUserEmail } from "../state/user/user";
import { useInterval } from "../../utils/utils";

export function Orders() {
  const [orders, setOrders] = useState<WebInternalModelsOrder[]>()
  const tag = useSelector((state: RootState) => state.user.tag)
  const isLogin = useSelector((state: RootState) => state.user.isLogin)
  const maxDate = useSelector((state: RootState) => state.user.maxDate)
  const minDate = useSelector((state: RootState) => state.user.minDate)
  const status = useSelector((state: RootState) => state.user.status)
  const userEmail = useSelector((state: RootState) => state.user.userEmail)
  const dispatch = useDispatch<AppDispatch>()
  const getOrders = async () => {
    if (!isLogin) {
        return
    }
    const { data } = await api.orders.ordersList({
        min_date: minDate,
        max_date: maxDate,
        status: status,
    }, {withCredentials: true})
    // console.log(data)

    data.sort(function compare( a, b ) {
      if ( Number(a.id) > Number(b.id) ){
        return -1;
      }
      if ( Number(a.id) < Number(b.id) ){
        return 1;
      }
      return 0;
    })
    console.log(data)

    if (userEmail != "") {
      setOrders(filterByUser(data))
      console.log("filtering", userEmail)
    } else {
      setOrders(data)
    }
  }

  useInterval(() => {
    getOrders()
  }, 1000)
  useEffect(()=>{
    getOrders()
  },[])

  const mapStatus = (status: string) => {
    const statusMap = {
        "pending": "В обработке",
        "canceled": "Отклонено",
        "approved": "Принято",
    }
    return statusMap[status]
  }

  const filterByUser = (orders: WebInternalModelsOrder[]) => {
    const filtered: WebInternalModelsOrder[] = []
    // console.log("before filtered", orders)

    orders.forEach(order => {
      // console.log(order.email, userEmail)
      if (order.email?.startsWith(userEmail)) {
        filtered.push(order)
      }
    });
    console.log("filtered", filtered)


    return filtered
  }

  return (
    <>
    {tag == "admin" && <div className="w-50">
      <InputGroup>
        <Form.Control
        value={minDate}
        onChange={e => {
          console.log(e.target.value)
          dispatch(setMinDate(e.target.value))
        }}
        className='m-3' type="text" placeholder="Минимальная дата в формате 2006-12-24" id='minDate' />
        <Form.Control
        value={maxDate}
        onChange={e => {
          dispatch(setMaxDate(e.target.value))
        }}
        className='m-3' type="text" placeholder="Максимальная дата в формате 2006-12-24" id='maxDate'/>
      </InputGroup>
      <InputGroup className=''>
        <Form.Select
        value={status}
        onChange={e => {
          // setSelectedOption(e.target.value);
          dispatch(setStatus(e.target.value))
        }}
        aria-label='Статус закаказа (по умолчанию "В обработке")' className='m-3' id='status'>
          {/* <option>Статус закаказа (по умолчанию "В обработке")</option> */}
          <option value="all">Все</option>
          <option value="pending">В обработке</option>
          <option value="approved">Принято</option>
          <option value="canceled">Отклонено</option>

        </Form.Select>
      </InputGroup>
      <InputGroup>
        <Form.Control
        value={userEmail}
        onChange={e => {
          dispatch(setUserEmail(e.target.value))
        }}
        className='m-3' type="text" placeholder="Email" id='minDate' />
      </InputGroup>
    </div>}
    {tag != "admin" && <h4 className="m-3" style={{textAlign: 'center'}}>Ваши заказы</h4>}
    {orders != undefined && Number(orders?.length) > 0 ?
  <div style={{display: 'flex', width: '100%', justifyContent: 'center', flexDirection: 'column', alignContent: 'center', justifyItems: 'center', alignItems: 'center'}}>
    <Table striped bordered hover responsive="md" className="table w-100">
      <thead>
        <tr>
          <th>№ заказа</th>
          {tag == "admin" && <th>Email заказчика</th>}
          {tag == "admin" && <th>ID сотрудника</th>}
          <th>Статус</th>
          <th>Создан</th>
          <th>Обновлен</th>
          {/* <th>Действия</th> */}
          {/* {orders == "new" && <th></th>} */}
        </tr>
      </thead>
      <tbody>
        {orders?.map((item, index) => (
          <tr key={index}>
            <td>{item?.id}</td>
            {tag == "admin" && <td>{item.email}</td>}
            {tag == "admin" && <td>{item.admin_id == 0 ? "-" : item.admin_id}</td>}
            <td>{mapStatus(String(item.status))}</td>
            <td>{String(item?.CreatedAt).slice(0, 10)}</td>
            <td>{String(item?.UpdatedAt).slice(0, 10)}</td>
            <td><Link to={"/orders/" + item.id}><Button onClick={() => {}} variant="outline-success">Подробнее</Button></Link></td>
            {item.status == "pending" && tag == "admin" && <td><Button onClick={() => {
                api.orders.approveUpdate(String(item.id), {status: "approved"}, {withCredentials: true})
            }} variant="success">Одобрить</Button></td>}
            {item.status == "pending" && tag == "admin" && <td><Button onClick={() => {
                api.orders.approveUpdate(String(item.id), {status: "canceled"}, {withCredentials: true})
            }} variant="outline-danger">Отклонить</Button></td>}

          </tr>
        ))}
      </tbody>
    </Table>
  </div> : 
  <div style={{display: 'flex', width: '100%', justifyContent: 'center', flexDirection: 'column', alignContent: 'center', justifyItems: 'center', alignItems: 'center'}}>
      <h6 className="m-3 w-50" style={{textAlign: 'center'}}>У вас пока нет заказов. Добавьте услуги на странице услуг и отправьте заказ на рассмотрение. Все активыне и завершенные заказы будут отображаться на этой странице</h6>
  </div>
}
  </>
    );
}