import axios from "axios";

export interface IItem {
    id: number;
    title: string;
    subtitle: string;
    price: string;
    imgurl: string;
    url: string;
    info: string;
    type: string;
}

export interface IItemsResponse {
    items: IItem[] | undefined
}

export const getItems = async (): Promise<IItem[]> =>{
    return axios.get(`http://localhost:8080/items`)
        .then((response) => response.data)
        .catch(()=> ({ items:[] }))

}

export const getItemsFilter = async (minPrice: string, maxPrice: string, material: string): Promise<IItem[]> =>{
    return axios.get(`http://localhost:8080/items?min=${minPrice}&max=${maxPrice}&material=${material}`)
        .then((response) => response.data)
        .catch(()=> ({ items:[] }))
}

export const updateItem = async (item: IItem) => {
    return axios.put(`http://localhost:8080/admin/item`, 
    item,
    {
      withCredentials: true,
    })
        .then((response) => response.data)
        .catch(()=> ({ items:[] }))

}

export const createItem = async (item: IItem) => {
    return axios.post(`http://localhost:8080/admin/item`, 
    item,
    {
      withCredentials: true,
    })
        .then((response) => response.data)
        .catch((err)=> ({err}))

}

export const deleteItem = async (itemId: number) => {
    return axios.delete(`http://localhost:8080/admin/item`, 
    {
      withCredentials: true,
      data: {
        id: itemId,
      }
    })
        .then((response) => response.data)
        .catch((err)=> ({err}))

}

export const loadImage = async (formData) => {
    return axios.post(`http://localhost:8080/s3/upload`, formData,
    {
      headers: {
          'Content-Type': 'multipart/form-data'
      },
      withCredentials: true,
    })
        .then((response) => response.data)
        .catch((err)=> (err))

}

