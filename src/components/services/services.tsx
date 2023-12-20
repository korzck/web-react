import { Badge, Button, Card, Container, Form, FormControl, InputGroup, Row } from 'react-bootstrap';
import { IItem, IItemsResponse, getItemsFilter } from '../../modules/services';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../state/store';
import { setMaterial, setMax, setMin } from '../state/user/user';
import { useNavigate } from 'react-router-dom';
import { IOrder, getCart, getOrderItems } from '../../modules/order'
import { SubcardItemSmall } from '../orders/item';
import { useInterval } from '../../modules/utils';
  
export function Services({items}: IItemsResponse) {

  const [itemsShown, setItemsShown] = useState<IItem[]>();
  const isLogin = useSelector((state: RootState) => state.user.isLogin)
  const maxPrice = useSelector((state: RootState) => state.user.maxPrice)
  const minPrice = useSelector((state: RootState) => state.user.minPrice)
  const material = useSelector((state: RootState) => state.user.material)
  
  const [order, setOrder] = useState<IOrder>([])

  const [itemsMap, setItemMap] = useState({})

  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate();
  const [dummy, setDummy] = useState(false)
  const [dummy2, setDummy2] = useState(false)

  const loadCart = async () => {
    // setDummy(!dummy)
    const cartOrder = await getCart()
    if (cartOrder.length == 0) {
      // console.log("loading cart fail")
      return
    }
    setOrder(cartOrder[0])
    // console.log("loading cart", cartOrder[0])
    const resp = await getOrderItems(cartOrder[0].id)
    // console.log("loading itms", cartOrder[0])

    const newMap = {}
    if (resp.length == 0) {
      // console.log("loading cart fail")
      return
    }
    resp.forEach(i => {
      newMap[i.model.id] = i
    });
    console.log("loaded map", newMap)
    setItemMap(newMap)
    // setDummy(!dummy)
    // search()
  }
  

  const search = async() => {
    const newItems = await getItemsFilter(minPrice, maxPrice, material)
    console.log("called with", minPrice)
    for (let i = 0; i < newItems.length; i++) {
      newItems[i].url = '/services/' + newItems[i].id
    }
    setItemsShown(newItems)
  }

  const mapMaterial = (material: string) => {
    if (material == "wood") {
        return "дерево"
    }
    if (material == "metal") {
        return "металл"
    }
  }

  const link = (url: string) => {
    navigate(url)
    setDummy(!dummy)
  }
  // useEffect(()=>{
  //   // search()
  //   loadCart()
  //   // search()
  // }, [dummy2])

  useEffect(()=>{
    search()
  },[dummy])
  

  const clear = () => {
    dispatch(setMin(''))
    dispatch(setMax(''))
    dispatch(setMaterial(''))
    setDummy(!dummy)
  }

  return (
    <>
      <div className="w-auto p-3">
        <h1>Услуги, исполняемые на ЧПУ станках</h1>
      </div>
      <InputGroup className=''>
        <Form.Select
        value={material}
        onChange={e => {
          // setSelectedOption(e.target.value);
          dispatch(setMaterial(e.target.value))
        }}
        aria-label="Выберите материал" className='m-3' id='material'>
          <option>Выберите материал</option>
          <option value="metal">Металл</option>
          <option value="wood">Дерево</option>
        </Form.Select>
      </InputGroup>
      
      <InputGroup>
        <Form.Control
        value={minPrice}
        onChange={e => {
          dispatch(setMin(e.target.value))
        }}
        className='m-3' type="number" placeholder="Минимальная цена" id='minPrice' />
        <Form.Control
        value={maxPrice}
        onChange={e => {
          dispatch(setMax(e.target.value))
        }}
        className='m-3' type="number" placeholder="Максимальная цена" id='maxPrice'/>
      </InputGroup>
      <Button className='m-3 w-25' onClick={search}>Искать</Button>
      <Button className='m-3 w-25' onClick={clear} variant='outline-primary'>Очистить фильтры</Button>
      <Container style={{ display: 'flex', flexDirection: 'column' }} >
        {itemsShown != undefined && itemsShown.map((value) => 
        <>
        <Card style={{ height: '8rem', display: 'flex', flexDirection: 'row', marginTop: "20px" }}>
          <Card.Img variant="top" src={value.imgurl} style={{height: 'inherit', width: '200px'}}/>
          <Card.Body style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Card.Title>{value.title}</Card.Title>
            <Card.Text>{value.subtitle}</Card.Text>
            <Card.Text className='fs-4'>
              <Badge bg='dark'>Цена: {value.price}</Badge>
              <Badge bg='dark'>Материал: {mapMaterial(value.type)}</Badge>

            </Card.Text>
            {/* <Link to={value.url}> */}
              <Button onClick={() => link(value.url)}>Перейти на страницу услуги</Button>
            {/* </Link> */}
          </Card.Body>
          
        </Card>
        
        </>
        )}
      </Container>
    </>
  );
}