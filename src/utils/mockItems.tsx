import { WebInternalModelsItem, WebInternalModelsItemsSwagger } from "api/Api"

export const mockItems = ():WebInternalModelsItemsSwagger  => {
    return {
        "items": [
            {
                "id": 28,
                "title": "Фрезерование",
                "subtitle": "Создание отверстий, пазов и других форм обработки металлических деталей с помощью фрезерного станка",
                "price": "25",
                "imgurl": "https://raw.githubusercontent.com/korzck/korzck.github.io/main/img/3cd1e53c-fda6-4d4f-bc16-6cf888f0c57c.jpeg",
                "url": "",
                "info": "это механическая обработка резанием плоскостей, пазов, лысок, при которой режущий инструмент (фреза) совершает вращательное движение (со скоростью V), а обрабатываемая заготовка — поступательное (со скоростью подачи S).\n\nОфициальным изобретателем фрезерного станка является американец Эли Уитни, который получил патент на такой станок в 1818 г.",
                "type": "metal"
            },
            {
                "id": 29,
                "title": "Токарная обработка",
                "subtitle": "Изготовление деталей с использованием токарного станка, включая наружную и внутреннюю обработку деталей.",
                "price": "21",
                "imgurl": "https://raw.githubusercontent.com/korzck/korzck.github.io/main/img/7717cb2c-e4a7-42a0-bbd0-f119589d062a.jpeg",
                "url": "",
                "info": "это механическая обработка резанием или поверхностным пластическим деформированием (выглаживание, обкатывание и др.) наружных и внутренних поверхностей вращения, в том числе цилиндрических и конических, торцевание, отрезание, снятие фасок, обработка галтелей, прорезание канавок, нарезание внутренних и наружных резьб на токарных станках. Точение — одна из самых древних технических операций, которая была механизирована с помощью примитивного токарного станка.\n",
                "type": "metal"
            },
            {
                "id": 30,
                "title": "Сверление",
                "subtitle": "Создание отверстий определенного диаметра и глубины с помощью сверлильного станка.",
                "price": "14",
                "imgurl": "https://raw.githubusercontent.com/korzck/korzck.github.io/main/img/c742f6be-7661-4f4f-93f2-a88701e695ba.jpg",
                "url": "",
                "info": "Сверле́ние — вид механической обработки материалов резанием, при котором с помощью специального вращающегося режущего инструмента (сверла) получают отверстия различного диаметра и глубины, или многогранные отверстия различного сечения и глубины.",
                "type": "metal"
            },
            {
                "id": 31,
                "title": "Резка листового металла",
                "subtitle": "Выполнение прямолинейного или контурной резки листового металла на станке с ЧПУ, например, плазменной или лазерной резки.",
                "price": "16",
                "imgurl": "https://raw.githubusercontent.com/korzck/korzck.github.io/main/img/2a30cd91-6227-41b8-b108-10610de83f68.jpg",
                "url": "",
                "info": "На станке с ЧПУ выполняется резка листового металла, например, с помощью плазменной или лазерной резки. Программа резки определяет траекторию движения режущего инструмента для создания заданной формы или контура на листовом металле.",
                "type": "metal"
            },
            {
                "id": 32,
                "title": "Термическая обработка",
                "subtitle": "Управление процессом нагрева и охлаждения металлической детали с целью изменения её свойств или формы.",
                "price": "6",
                "imgurl": "https://raw.githubusercontent.com/korzck/korzck.github.io/main/img/44975b37-d33a-4574-bec2-c61c5d54985a.jpeg",
                "url": "",
                "info": "Эта программа контролирует параметры нагрева и охлаждения металлической детали для изменения её свойств, например, для закалки или отпуска.",
                "type": "metal"
            },
            {
                "id": 33,
                "title": "Фрезерование дерева",
                "subtitle": "Обработка деревянных деталей с помощью фрезерного станка, который осуществляет удаление материала с поверхности заготовки дерева",
                "price": "13",
                "imgurl": "https://raw.githubusercontent.com/korzck/korzck.github.io/main/img/90978dd7-7c82-4ff5-a90f-d9f37022bcb2.jpg",
                "url": "",
                "info": "Эта программа используется для обработки деревянных деталей с помощью фрезерного станка, который осуществляет удаление материала с поверхности заготовки дерева. Фрезерование может включать создание отверстий, пазов, фигурных элементов и других геометрических форм.",
                "type": "wood"
            },
            {
                "id": 34,
                "title": "Тиснение дерева",
                "subtitle": "Создание рельефных узоров на поверхности деревянных деталей с помощью тискильного станка",
                "price": "15",
                "imgurl": "https://raw.githubusercontent.com/korzck/korzck.github.io/main/img/b911f0fc-0c43-4ae5-8bf9-4f91f4ecd16d.jpeg",
                "url": "",
                "info": "Резьба по дереву является эффектным приемом декорирования  деревянных поверхностей. Однако, - она весьма трудоемка и занимает много времени, даже при применении фрезерных станков с ЧПУ.\n\nНо существует метод, позволяющий в определенной степени имитировать резьбу и механизировать процесс  - это технология горячего тиснения древесины, т.е. прессование или термическое формование древесины.",
                "type": "wood"
            },
            {
                "id": 35,
                "title": "Шлифование дерева",
                "subtitle": "Управление процессом точной обработки поверхности деревянных деталей с целью удаления неровностей и достижения заданной шероховатости.",
                "price": "9",
                "imgurl": "https://raw.githubusercontent.com/korzck/korzck.github.io/main/img/1fe71e9c-9041-487d-b5e9-14995f779189.jpg",
                "url": "",
                "info": "Шлифование дерева – это обработка поверхности для получения желаемой формы и качественного результата. Процесс работы заключается в том, чтобы убрать лишний слой, выровнять шероховатую поверхность и добиться ее гладкости. При проведении ремонтных работ остро стоит вопрос качественной обработки деревянных поверхностей",
                "type": "wood"
            },
            {
                "id": 36,
                "title": "Изготовление сложной столярной продукции",
                "subtitle": "Программирование станка для изготовления сложной столярной продукции, такой как красиво изогнутые детали мебели или декоративные элементы из дерева.",
                "price": "35",
                "imgurl": "https://raw.githubusercontent.com/korzck/korzck.github.io/main/img/653d7936-c140-4cd8-8a4e-ff7bfe78de80.jpg",
                "url": "",
                "info": "Компания специализируется на создании авторских интерьеров из ценных пород древесины и воплощении их в жизнь. Мы не осуществляем поточное производство стандартных изделий, наша специализация – индивидуальная работа с каждым клиентом. Изделия, выполненные в нашем столярном цеху, всегда неповторимы, что придаёт особый колорит созданным интерьерам.\n\nМы изготавливаем различные виды элементов интерьера из ценных пород деревьев, среди которых стеновые панели, лестницы, двери, различные предметы интерьера. При комплексном оформлении помещений все выполненные элементы неотделимы друг от друга и создают ощущение целостности и завершенности интерьера.",
                "type": "wood"
            },
            {
                "id": 37,
                "title": "Точение дерева",
                "subtitle": "Обработка деревянных деталей с использованием точильного станка с ЧПУ, включая создание деревянных столбов, ножек для мебели и других цилиндрических форм.",
                "price": "18",
                "imgurl": "https://raw.githubusercontent.com/korzck/korzck.github.io/main/img/bd429eab-9253-42e6-983b-8a25f5642bb1.jpg",
                "url": "",
                "info": "Токарная обработка — это механическая обработка посредством снятия лишнего слоя наружных и внутренних поверхностей вращения, в том числе цилиндрических и конических, торцевание, отрезание, снятие фасок, обработка галтелей, прорезание канавок, нарезание внутренних и наружных резьб на токарных станках. Точение — одна из самых древних технических операций, которая была механизирована с помощью примитивного токарного станка.",
                "type": "wood"
            },
            {
                "id": 38,
                "title": "Контроль качества",
                "subtitle": "Проверка размеров, формы и других параметров обработанных деревянных деталей с помощью измерительного оборудования с целью обеспечения соответствия требуемым стандартам качества.",
                "price": "40",
                "imgurl": "https://raw.githubusercontent.com/korzck/korzck.github.io/main/img/0d5acddd-8063-4f71-b6d8-d4d72d167671.jpeg",
                "url": "",
                "info": "Точность обработки деталей – наиболее важный показатель работы станка с ЧПУ. Это понятие включает в себя соблюдение геометрической формы, показателя шероховатости поверхности и размеров, заданных чертежом. В задачи наладчика и оператора входит не только контроль продукции на выходе, но и поддержание первоначальной точности оборудования. Для этих целей проводится диагностика станков с ЧПУ. Она представляет собой комплекс мероприятий, направленных на выявление причин отказов и сбоев. Конечная цель диагностики – поиск оптимального пути устранения проблем, составление технологической карты ремонта, коррекция управляющих программ.",
                "type": "wood"
            },
            {
                "id": 40,
                "title": "Точечное профилирование заготовок стали и меди",
                "subtitle": "Точечное профилирование заготовок стали и меди",
                "price": "381",
                "imgurl": "https://raw.githubusercontent.com/korzck/korzck.github.io/main/img/44975b37-d33a-4574-bec2-c61c5d54985a.jpeg",
                "url": "",
                "info": "Точечное профилирование заготовок стали и меди",
                "type": "metal"
            },
            {
                "id": 41,
                "title": "Лазерное тиснение заготовок алюминия и железа",
                "subtitle": "Лазерное тиснение заготовок алюминия и железа",
                "price": "649",
                "imgurl": "https://raw.githubusercontent.com/korzck/korzck.github.io/main/img/7717cb2c-e4a7-42a0-bbd0-f119589d062a.jpeg",
                "url": "",
                "info": "Лазерное тиснение заготовок алюминия и железа",
                "type": "metal"
            },
            {
                "id": 42,
                "title": "Шлифовальное профилирование заготовок вольфрама и никеля",
                "subtitle": "Шлифовальное профилирование заготовок вольфрама и никеля",
                "price": "902",
                "imgurl": "https://raw.githubusercontent.com/korzck/korzck.github.io/main/img/7717cb2c-e4a7-42a0-bbd0-f119589d062a.jpeg",
                "url": "",
                "info": "Шлифовальное профилирование заготовок вольфрама и никеля",
                "type": "metal"
            },
            {
                "id": 43,
                "title": "Автоматизированное обрабатывание деталей алюминия и стали",
                "subtitle": "Автоматизированное обрабатывание деталей алюминия и стали",
                "price": "336",
                "imgurl": "https://raw.githubusercontent.com/korzck/korzck.github.io/main/img/0d5acddd-8063-4f71-b6d8-d4d72d167671.jpeg",
                "url": "",
                "info": "Автоматизированное обрабатывание деталей алюминия и стали",
                "type": "metal"
            },
            {
                "id": 44,
                "title": "Многоточечное обрабатывание проволки из стали и никеля",
                "subtitle": "Многоточечное обрабатывание проволки из стали и никеля",
                "price": "839",
                "imgurl": "https://raw.githubusercontent.com/korzck/korzck.github.io/main/img/c742f6be-7661-4f4f-93f2-a88701e695ba.jpg",
                "url": "",
                "info": "Многоточечное обрабатывание проволки из стали и никеля",
                "type": "wire"
            }
        ],
        "order_id": 0,
        "length": 122611,
        "page_size": 16
    }
}

export const mockItem = (id: number): WebInternalModelsItem | undefined => {
    const items = mockItems()
    for (let i = 0; i < Number(items.length); i++) {
        // const element = array[i];
        if (items?.items[i]?.id == id) {
            return items?.items[i]
        }
    }
    return
}   

export const filterByName = (items: WebInternalModelsItem[], pattern: string): WebInternalModelsItem[] => {
    const res: WebInternalModelsItem[] = []
    if (pattern) {
        items.forEach(e => {
            if (e.title?.toLowerCase().includes(pattern.toLowerCase())) {
                res.push(e)
            }
        });
        return res
    } else {
        return items
    }
}

export const filterByPrice = (items: WebInternalModelsItem[], max: string, min: string): WebInternalModelsItem[] => {
    const res: WebInternalModelsItem[] = []
    let _min = -1
    let _max = Number.MAX_VALUE
    if (max) {
        _max = Number(max)
    }
    if (min) {
        _min = Number(min)
    }
    items.forEach(e => {
        if (Number(e.price) >= Number(_min) && Number(e.price) <= Number(_max)) {
            res.push(e)
        }
    });

    
    return res
   
}

export const filterByType = (items: WebInternalModelsItem[], type: string): WebInternalModelsItem[] => {
    const res: WebInternalModelsItem[] = []
    if (type) {
        items.forEach(e => {
            if (e.type == type) {
                res.push(e)
            }
        });
        return res
    } else {
        return items
    }
}