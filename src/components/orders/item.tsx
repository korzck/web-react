import { Badge, Button, Card } from "react-bootstrap";
import { IOrderItem, addOrderItem, delOrderItem } from "../../modules/order";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useInterval } from "../../modules/utils";

interface IDelProps {
    func: () => Promise<void>
    item: IOrderItem
    order: number
    orderStatus: string
}

export const SubcardItem = ({item, func, order, orderStatus}: IDelProps) => {

    const delItem = async (itemId: number) => {
        await delOrderItem(order, itemId);
        func()
        console.log("deleted item", itemId, "from order", order)
    }

    const addItem = async (itemId: number) => {
        await addOrderItem(order, itemId);
        func()
        console.log("got add", itemId, "for order", order)
    }
     
    return (
      <>
      {item.quantity > 0 && <Card style={{ width: '90%', margin: 'auto', marginBottom: '10px' }}>
        <Card.Body>
          <Card.Title><Link to={'/services/' + item.model.id}>{item.model.title}</Link></Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{item.model.subtitle}</Card.Subtitle>
          <Card.Text>
          Количество: {item.quantity}   
          </Card.Text>
          <Badge style={{fontSize: '1rem'}}>Цена: {Number(item.model.price)*item.quantity} руб.</Badge>
          <div><br /></div>

          {func != null && orderStatus == 'new' && <Card.Footer>
            <Button variant="outline-primary" style={{marginRight: '10px'}}
                onClick={() => addItem(item.model.id)}
            >+</Button>
            <Button variant="outline-danger" style={{marginRight: '10px'}}
                onClick={() => delItem(item.model.id)}
            >-</Button>

          </Card.Footer>}
        </Card.Body>
      </Card>}
      </>
    );
}
  
export default SubcardItem;

export const SubcardItemSmall = ({itemId, func, order}: IDelProps) => {
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  const delItem = async (itemId: number) => {
      await delOrderItem(order, itemId);
      func()
      console.log("deleted item", itemId, "from order", order)
      // console.log("deleted item", itemId, "from order", order)
  }

  const addItem = async (itemId: number) => {
      const res = await addOrderItem(order, itemId);
      func()
      console.log("got add", itemId, "for order", order)
  }
   
  return (
    <div>
      <Button variant="outline-primary" style={{marginRight: '10px'}}
          onClick={() => addItem(itemId)}
      >+</Button>
      <Button variant="outline-danger" style={{marginRight: '10px'}}
          onClick={() => delItem(itemId)}
      >-</Button>

    </div>
  );
}