import axios, { AxiosResponse } from "axios";
import { IItem } from "./services";

export interface IOrder {
    id: number
    status: string
    comment: string
    CreatedAt: string
}

export interface IOrderItem {
  // id: number
  quantity: number
  model: IItem
}

export const getOrders = async (): Promise<IOrder[]> => {
    try {
      const response: AxiosResponse<IOrder[]> = await axios.get('http://localhost:8080/orders', {withCredentials: true});
    //   console.log("got resp:", response.data)
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
};

export const getCart = async (): Promise<IOrder[]> => {
  try {
    const response: AxiosResponse<IOrder[]> = await axios.get('http://localhost:8080/orders/current', {withCredentials: true});
  //   console.log("got resp:", response.data)
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const getOrderItems = async (id: number): Promise<IOrderItem[]> => {
  try {
    const response: AxiosResponse<IOrderItem[]> = await axios.get('http://localhost:8080/orderitems', 
      {
        withCredentials: true,
        params: {
          order_id: id
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};


export const delOrderItem = async (orderId: number, itemId: number) => {
  try {
    const response = await axios.delete('http://localhost:8080/orderitems',{
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        order_id: orderId,
        item_id: itemId
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const addOrderItem = async (orderId: number, itemId: number) => {
  try {
    const response = await axios.post('http://localhost:8080/orderitems',
    {
        order_id: orderId,
        items: [itemId]
    },
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("got req", itemId)
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const addItemToCart = async (itemId: number) => {
  try {
    const response = await axios.post('http://localhost:8080/cartadditem',
    {
        item_id: itemId,
    },
    {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const changeCartComment = async (comment: string) => {
  try {
    const response = await axios.post('http://localhost:8080/cartcomment',
    {
        comment: comment,
    },
    {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const changeOrderStatus = async (status: string, order_id: number) => {
  try {
    const response = await axios.put('http://localhost:8080/orders',
    {
      status: status,
      order_id: order_id,
    },
    {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const getOrderInfo = async (order_id: number) => {
  try {
    const response = await axios.get('http://localhost:8080/orders/'+order_id,
    {
      withCredentials: true,
      // params: {
      //   order_id: order_id,
      // },
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const createNewOrder = async (user_id: number) => {
  try {
    const response = await axios.post('http://localhost:8080/orders',
    {
      user_id: user_id,
      status: "new",
    },
    {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};