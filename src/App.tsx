import { About } from './components/about/About';
import TopMenu from './components/menu/menu';
import { Route, Routes } from 'react-router-dom'
import { Breadcrumbs } from './components/breadcrumbs/breadcrumbs';
import { Services } from './components/services/services';
import { ServicePage } from './components/services/service';
import LoginForm from './components/login/login';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './components/state/store';
import SignupForm from './components/signup/signup';
import { AdminItems } from './components/admin/items';
import { AdminItem } from './components/admin/item';
import { api } from './api';
import { useEffect } from 'react';
import { setEmail, setId, setIsLogin, setName, setTag } from './components/state/user/user';
import { Order } from './components/order/order';
import { Orders } from './components/orders/orders';
import { AdminItemNew } from './components/admin/newItem';

export function MyApp() {
  const tag = useSelector((state: RootState) => state.user.tag)
  const dispatch = useDispatch<AppDispatch>()

  const validate = async () => {
    const { data } = await api.validate.validateCreate({
      withCredentials: true,
    })
    if (data != undefined && data.id != undefined) {
      dispatch(setId(Number(data.id)))
      dispatch(setTag(String(data.tags)))
      dispatch(setName(String(data.name)))
      dispatch(setEmail(String(data.email)))
      dispatch(setIsLogin(true))
    }
    return data
  }

  useEffect(() => {
    validate()
  }, [])


  const routes =[
      <Route path="/" element={<About />} />,
      <Route path="/services" element={<Services />} />,
      <Route path="/services/:id" element={<ServicePage />} />,
      <Route path="/orders/:id" element={<Order />} />,
      <Route path="/orders" element={<Orders />} />,
      <Route path="/contacts" element={<About />} />,
      <Route path="/login" element={<LoginForm />} />,
      <Route path="/signup" element={<SignupForm />} />,
      <Route path="/services/admin" element={tag == "admin" && <AdminItems />} />,
      <Route path={"/services/admin/:id"} element={tag == "admin" && <AdminItem/>} />,
      <Route path={"/services/admin/new"} element={tag == "admin" && <AdminItemNew/>} />,

      <Route path="/items/:id" element={<ServicePage />} />,
    ]

  return (
    <>
    
      <TopMenu />
      <Breadcrumbs />
      <Routes>
          {routes}
      </Routes>
    </>
  );
}


  