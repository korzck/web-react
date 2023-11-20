import { About } from './components/about/About';
import TopMenu from './components/menu/menu';
import { Route, Routes } from 'react-router-dom'
import { Breadcrumbs } from './components/breadcrumbs/breadcrumbs';
import { Services } from './components/services/services';
import { useState, useEffect } from 'react';
import { IItem, getItems } from './modules/services';
import { ServicePage } from './components/services/service';

export function MyApp() {
  const [items, setItems] = useState<IItem[]>();
  const getItemsRequest = async() => {
    const res = await getItems()
    for (let i = 0; i < res.length; i++) {
      res[i].url = '/services/' + res[i].id
    }
    setItems(res)
  }

  useEffect(() => {
    getItemsRequest()
  }, [])


  const routes =[
      <Route path="/" element={<About />} />,
      <Route path="/services" element={<Services items={items}/>} />,
      <Route path="/contacts" element={<About />} />
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
      </Routes>
    </>
  );
}


  