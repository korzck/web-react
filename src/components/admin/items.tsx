/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { api } from "../../api";
import { setOrder } from "../state/user/user";
import { WebInternalModelsItemsSwagger } from "../../api/Api";
import { Pages } from "../pages/pages";

export const AdminItems = () => {
    const [items, setItems] = useState<WebInternalModelsItemsSwagger>();
    const dispatch = useDispatch<AppDispatch>()
    const [pageSize] = useState(0)
    const [length] = useState(0)
    const page = useSelector((state: RootState) => state.user.page)
    const search = async() => {
      const { data } = await api.items.itemsList({
        min: "",
        max: "",
        material: "",
        page: String(page),
      }, {withCredentials: true})

      data?.items?.sort(function compare( a, b ) {
        if ( Number(a.id) > Number(b.id) ){
          return -1;
        }
        if ( Number(a.id) < Number(b.id) ){
          return 1;
        }
        return 0;
      })

      setItems(data)
      if (Number(data.order_id) != 0) {
        dispatch(setOrder(Number(data.order_id)))
      } else {
        dispatch(setOrder(0))
      }
    }

    useEffect(() => {
        search()
    }, [])

    useEffect(() => {
      search()
    }, [page])

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

    const deleteItem = async (itemId: number) => {
      await api.items.deleteDelete(itemId, {withCredentials: true})
      search()
    }
    

    return (
        <div>
            {/* {itemsShown != undefined && itemsShown.map((value) =>  */}
                <Link style={{color: 'white', textDecoration: 'none'}} to={"/services/admin/new"}><Button variant="success" className="m-3">Создать новую услугу</Button></Link>
                <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Номер</th>
                    <th>Название</th>
                    <th>Описание</th>
                    <th>Материал</th>
                    <th>Цена в руб.</th>
                  </tr>
                </thead>
                <tbody>
                  {items != undefined && items?.items != undefined && items.items.map((item) =>
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.title}</td>
                      <td>{item.subtitle}</td>
                      <td>{mapMaterial(String(item.type))}</td>
                      <td>{item.price}</td>
                      <td><Link to={"/services/admin/"+item.id}>Редактировать</Link></td>
                      <td><Button onClick={() => {deleteItem(Number(item.id))}} variant="outline-danger">Удалить</Button></td>
                    </tr>
                  )}
                </tbody>
              </Table>
              <Pages length={length} pageSize={pageSize}/>
        </div>
    )
}