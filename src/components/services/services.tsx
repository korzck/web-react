import { Badge, Button, Card, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../state/store';
import { setMaterial, setMax, setMin, setOrder, setPage, setTitle } from '../state/user/user';
import { Link } from 'react-router-dom';
import { api } from '../../api';
import { WebInternalModelsItemsSwagger } from '../../api/Api';
import img from '../../assets/img.webp';
import { Pages } from '../pages/pages';
import { mockItems } from '../../utils/mockItems';
import { AxiosResponse } from 'axios';

export function Services() {

  const [items, setItems] = useState<WebInternalModelsItemsSwagger>();
  // const isLogin = useSelector((state: RootState) => state.user.isLogin)
  const maxPrice = useSelector((state: RootState) => state.user.maxPrice)
  const minPrice = useSelector((state: RootState) => state.user.minPrice)
  const material = useSelector((state: RootState) => state.user.material)
  const page = useSelector((state: RootState) => state.user.page)
  const title = useSelector((state: RootState) => state.user.title)
  const isLogin = useSelector((state: RootState) => state.user.isLogin)

  const dispatch = useDispatch<AppDispatch>()
  const [dummy, setDummy] = useState(false)
  const [pageSize, setPageSize] = useState(0)
  const [length, setLength] = useState(0)


  const search = async() => {
    let data: WebInternalModelsItemsSwagger | AxiosResponse<WebInternalModelsItemsSwagger, unknown>
    try {
        let resp  = await api.items.itemsList({
        min: minPrice,
        max: maxPrice,
        material: material,
        page: String(page),
        title: title,
      }, {withCredentials: true})
      data = resp?.data
    } catch (error) {
      data = mockItems()
    }
    setItems(data)
    // console.log(data)
    if (Number(data.order_id) != 0) {
      dispatch(setOrder(Number(data.order_id)))
    } else {
      dispatch(setOrder(0))
    }
    setLength(data.length)
    setPageSize(data.page_size)
  }

  const add = async (id: number) => {
    const { data } = await api.items.postCreate(id, {withCredentials: true})
    if (data != undefined && Number(data.id) != 0) {
      setDummy(!dummy)
    }
  }

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


  useEffect(()=>{
    search()
  },[dummy, page])
  

  const clear = () => {
    dispatch(setMin(''))
    dispatch(setMax(''))
    dispatch(setMaterial(''))
    dispatch(setTitle(''))
    dispatch(setPage(1))
    setDummy(!dummy)
  }

  return (
    <>
      <div className="w-auto p-3">
        <h1>Программы выполнения на ЧПУ-станках</h1>
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
          <option value="wire">Проволка</option>
          <option value="alloy">Сплавы</option>
          <option value="clean">Чистый металл</option>
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

        <Form.Control
        value={title}
        onChange={e => {
          dispatch(setTitle(e.target.value))
        }}
        className='m-3' type="text" placeholder="Название" id='title'/>
      </InputGroup>
      <Button variant='success' className='m-3 w-25' onClick={search}>Искать</Button>
      <Button variant='outline-success' className='m-3 w-25' onClick={clear}>Очистить фильтры</Button>
      {/* <Container className='w-100' style={{display: 'flex'}}> */}
      <Row xs={1} md={2} lg={4}>
        {items != undefined && items.items != undefined && items.items.length != 0 && items.items.map((item, index) => 
        <Col key={index}>
        <Card style={{ width: '22rem', margin: '2rem', height: '32rem' }}>
          {item.imgurl && item.imgurl != '' ?
            <Card.Img variant="top" src={item.imgurl} style={{height:"12rem", width: 'auto'}} />
            :
            <Card.Img variant="top" src={img} style={{height:"18rem", width: '18rem'}} />
          }
          <Card.Body>
            <Card.Title>{item.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{item.subtitle}</Card.Subtitle>

              
          </Card.Body>
            <Card.Footer >
            <Card.Text>
            Цена: {item.price} руб.
            <br/>
            <Badge bg='success'> {mapMaterial(String(item.type))}</Badge>
            </Card.Text>
            {isLogin &&  <Button variant="success" onClick={() => {add(Number(item.id))}} style={{marginRight: '10px'}}>Добавить</Button>}
            <Link to={`/services/`+item.id}><Button variant="outline-success" >Подробнее</Button></Link>
            </Card.Footer>
        </Card>
        
        </Col>
        )}
      {/* </Container> */}
      </Row>
      <Pages length={length} pageSize={pageSize}/>
    </>
  );
}