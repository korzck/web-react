import { Button, Form, Image } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import Loader from './loader';
import { useNavigate } from 'react-router-dom';
import { WebInternalModelsItemModel } from '../../api/Api';
import { api } from '../../api';

export function AdminItemNew() {
    
    const [currentItem, setCurrentItem] = useState<WebInternalModelsItemModel>({})
    const [title, setTitle] = useState(currentItem?.title);
    const [subtitle, setSubtitle] = useState(currentItem?.subtitle);
    const [price, setPrice] = useState(currentItem?.price);
    const [type, setType] = useState("wood");
    const [info, setInfo] = useState(currentItem?.info);
    const [img, setImg] = useState(currentItem?.imgurl);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    // const { id } = useParams()

    // const getItem = async () => {
    //   const { data } = await api.items.itemsDetail(id, {withCredentials: true})
    //   setCurrentItem(data)
    // }

    useEffect(() => {
      currentItem.type = type
      setCurrentItem(currentItem)
    }, [])

    useEffect(() => {

    }, [loading])

    const [image, setImage] = useState('');
    const [imageFile, setImageFile] = useState<File>();
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      setImageFile(file)
      const reader = new FileReader();
    
      reader.onload = (e) => {
        setImage(String(e?.target?.result));
      };
    
      if (file) {
        reader.readAsDataURL(file);
      }
    };

    const handleSubmit = (event) => {
      event.preventDefault();

    }

    const save = async () => {
        if (!title || title == '' || !subtitle || subtitle == '' || !type || type == '' || !price || price == '') {
          return
        }
        setLoading(true)
        await uploadFile()
        // const res = await createItem(currentItem)
        if (currentItem) {
          // console.log(currentItem)
          const { data } = await api.items.postCreate2(currentItem, {withCredentials: true})
          await new Promise(r => setTimeout(r, 500));
          setLoading(false)
          console.log(data)
          if (data.title != undefined) {
            navigate("/services/admin")
          }
        }
    }

    const uploadFile = async () => {
      if (!imageFile) {
        return
      }
        const { data } = await api.items.imageCreate({
          file: imageFile,
          metadata: ""
        })
        // setImg(res?.link)  
        if (data.link != undefined) {
            currentItem.imgurl = data.link
            setCurrentItem(currentItem)
            setImg(currentItem?.imgurl)   
        }
        // console.log(res?.link)
    };

    return (
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        {loading && <Loader />}
        <Form className='w-75 m-3' onSubmit={handleSubmit}>
          <Form.Group className='m-3'>
            <Form.Label>Название</Form.Label>
            <Form.Control
              required
              type="text"
              value={title}
              onChange={(e) => {
                currentItem.title = e.target.value
                setCurrentItem(currentItem)
                setTitle(currentItem?.title)
              }}
            />
          </Form.Group>
    
          <Form.Group className='m-3'>
            <Form.Label>Описание</Form.Label>
            <Form.Control
              required
              type="text"
              value={subtitle}
              onChange={(e) => {
                currentItem.subtitle = e.target.value
                setCurrentItem(currentItem)
                setSubtitle(currentItem?.subtitle)
              }}
            />
          </Form.Group>
    
          <Form.Group className='m-3'>
            <Form.Label>Материал</Form.Label>
            <Form.Control
              required
              as="select"
              value={type}
              onChange={(e) =>{
                currentItem.type = e.target.value
                setCurrentItem(currentItem)
                setType(currentItem?.type)
              }}
            >
              <option value="wood">Дерево</option>
              <option value="metal">Метал</option>
            </Form.Control>
          </Form.Group>
    
          <Form.Group className='m-3'>
            <Form.Label>Цена</Form.Label>
            <Form.Control
              required
              type="number"
              value={price}
              onChange={(e) => {
                currentItem.price = e.target.value
                setCurrentItem(currentItem)
                setPrice(currentItem?.price)
              }}
            />
          </Form.Group>
        
            <Form.Group className='m-3'>
            <Form.Label>Подробное описание</Form.Label>
            <Form.Control
              as={'textarea'}
              value={info}
              onChange={(e) => {
                currentItem.info = e.target.value
                setCurrentItem(currentItem)
                setInfo(currentItem?.info)
              }}
              style={{height: '200px'}}
            />
          </Form.Group>

          <Form.Group className='m-3'>
            <Form.Label>Ссылка на картинку</Form.Label>
            <Form.Control
              value={img}
              disabled
            />
          </Form.Group>

          {/* <form className='m-3' onSubmit={() => {}}> */}
          <Button variant='success' className='m-3'><label htmlFor='file'>Загрузить картинку</label></Button>
          <input id='file' className='m-3' style={{visibility: 'hidden'}} type="file" onChange={handleImageChange} />
          {/* </form> */}

          <br />
          {/* <div className='m-3'>Текущая картинка</div>
          <Image className='m-3' src={img} style={{height: '200px'}}></Image>
          <br /> */}
          {image && <div className='m-3'>Новая картинка</div>}
          {image && <Image className='m-3' src={image} style={{height: '200px'}} />}
          <br />
          <Button variant='success' className='m-3' onClick={save} type="submit">Сохранить</Button>
        </Form>
        
        </div>
      );
    
    
}