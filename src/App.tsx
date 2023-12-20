import { About } from './components/about/About';
import TopMenu from './components/menu/menu';
import { Route, Routes } from 'react-router-dom'
import { Breadcrumbs } from './components/breadcrumbs/breadcrumbs';
import { Services } from './components/services/services';
import { useState, useEffect } from 'react';
import { IItem, getItemsFilter } from './modules/services';
import { ServicePage } from './components/services/service';
import { Orders } from './components/orders/orders';
import { Redirecter } from './components/redirecter/redirecter';
import LoginForm from './components/login/login';
import { setIsLogin, setStoreEmail } from './components/state/user/user';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './components/state/store';
import { validate } from './modules/auth';
import SignupForm from './components/signup/signup';
import { Order } from './components/order/order';
import { IOrder, getCart, getOrders } from './modules/order';
import { useInterval } from './modules/utils';

export function MyApp() {
  const [items, setItems] = useState<IItem[]>();
  const dispatch = useDispatch<AppDispatch>()
  // const isLogin = useSelector((state: RootState) => state.user.isLogin)
  // const name = useSelector((state: RootState) => state.user.name)
  const [order, setOrder] = useState<IOrder>([])
  const [ordersList, setOrdersList] = useState<IOrder[]>([])
  const maxPrice = useSelector((state: RootState) => state.user.maxPrice)
  const minPrice = useSelector((state: RootState) => state.user.minPrice)
  const material = useSelector((state: RootState) => state.user.material)
  const [dummy, setDummy] = useState(false)
  // const id = useSelector((state: RootState) => state.user.id)
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

  const cart = async () => {
      const resp = await getCart()
      if (resp.length == 0) {
        return
      }
      setOrder(resp[0])
  }
  const getItemsRequest = async() => {
    const res = await getItemsFilter(minPrice, maxPrice, material)
    for (let i = 0; i < res.length; i++) {
      res[i].url = '/services/' + res[i].id
    }
    setItems(res)
  }

  const getValidate = async() => {
    try {
      const response = await validate(); 
      dispatch(setStoreEmail(response?.email))
      dispatch(setIsLogin(response?.email != "guest"))
    } catch (error) {
      console.log("Error:", error)
    }
  }

  useEffect(() => {
    getItemsRequest()
    getValidate()
    cart()
    orders()
  }, [])


  const routes =[
      <Route path="/" element={<About />} />,
      <Route path="/services" element={<Services items={items}/>} />,
      <Route path="/contacts" element={<About />} />,
      <Route path="/orders" element={<Orders />} />,
      <Route path={"/orders/"+order.id} element={<Order orderId={order.id} />} />,
      <Route path="/logout" element={<Redirecter />} />,
      <Route path="/login" element={<LoginForm />} />,
      <Route path="/signup" element={<SignupForm />} />
  ]

  return (
    <>
    
      <TopMenu />
      <Breadcrumbs />
      <Routes>
          {routes}
          {items != undefined && 
            items.map(function(item) {
              return <Route path={item.url} element={<ServicePage {...item}/>} />
            })
          }
          {orders != undefined && 
            ordersList.map(function(item) {
              // console.log(item)
              return <Route path={"/orders/"+item.id} element={<Order orderId={item.id} />} />
            })
          }
          
      </Routes>
    </>
  );
}


  