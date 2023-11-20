import { Badge, Button, Card, Form, InputGroup } from 'react-bootstrap';
import { IItem, IItemsResponse, getItemsFilter } from '../../modules/services';
import { useEffect, useState } from 'react';
  
export function Services({items}: IItemsResponse) {
  const [selectedOption, setSelectedOption] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [itemsShown, setItemsShown] = useState<IItem[]>();

  const search = async() => {
    console.log(selectedOption, minPrice, maxPrice)
    const newItems = await getItemsFilter(minPrice, maxPrice, selectedOption)
    console.log(newItems)
    setItemsShown(newItems)
  }
  useEffect(() => {
    setItemsShown(items)
  }, [items])

  return (
    <>
      <div className="w-auto p-3">
        <h1>Услуги, исполняемые на ЧПУ станках</h1>
      </div>
      <InputGroup className=''>
        <Form.Select
        onChange={e => {
          setSelectedOption(e.target.value);
        }}
        aria-label="Выберите материал" className='m-3' id='material'>
          <option>Выберите материал</option>
          <option value="metal">Металл</option>
          <option value="wood">Дерево</option>
        </Form.Select>
      </InputGroup>
      
      <InputGroup>
        <Form.Control
        onChange={e => {
          setMinPrice(e.target.value);
        }}
        className='m-3' type="number" placeholder="Минимальная цена" id='minPrice' />
        <Form.Control
        onChange={e => {
          setMaxPrice(e.target.value);
        }}
        className='m-3' type="number" placeholder="Максимальная цена" id='maxPrice'/>
      </InputGroup>
      <Button className='m-3 w-25' onClick={search}>Искать</Button>
      {itemsShown != undefined && itemsShown.map((value) => 
      <Card className='m-4' style={{ width: '18rem' }}>
        <Card.Img variant="top" src={value.imgurl} />
        <Card.Body>
          <Card.Title>{value.title}</Card.Title>
          <Card.Text>{value.subtitle}</Card.Text>
          <Card.Text className='fs-4'>
            <Badge bg='dark'>Цена: {value.price}</Badge>
            <Badge bg='dark'>Материал: {value.type}</Badge>

          </Card.Text>
          <a href={value.url}>
            <Button className='w-100'>Перейти на страницу услуги</Button>
          </a>
        </Card.Body>
      </Card>
    )}
    </>
  );
}