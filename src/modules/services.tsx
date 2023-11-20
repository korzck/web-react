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
    return fetch(`http://localhost:8080/items`)
        .then((response) => response.json())
        .catch(()=> ({ items:[] }))
}

export const getItemsFilter = async (minPrice: string, maxPrice: string, material: string): Promise<IItem[]> =>{
    return fetch(`http://localhost:8080/items?min=${minPrice}&max=${maxPrice}&material=${material}`)
        .then((response) => response.json())
        .catch(()=> ({ items:[] }))
}

// await console.log(getItems())
// let res = await getItems()
// console.log(res)