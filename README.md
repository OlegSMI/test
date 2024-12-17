#### /getTablesAndFreeChairByTime

```html
принимает timestamp, bookedDate query, принимать будет только следующий, либо завтрашний и секунды\милисекунды должны быть 00, по часам пока не знаю сколько ограничивать, но минуты либо 00, либо 30
```

#### /addFood

```html
принимает foodId : number body
если это было первое добавление и корзины ранее еще не было отдаст
succes: true
data: {
orderId: number,
itemId: number
}
```

#### /getActiveFood

```html
ничего не принимает
```

#### /cancelOrder

```html
принимает только orderId : number
```

#### /removeFromBasket

```html
принимает itemId : number
вернет success: true, data: null, все неудачное будет с success:false
```

#### /finalizeOrder

```html
принимает
type RequestData = {
orderId: number
bookedDate: Date - timestamp
seatingType: 'pickup' | 'free_table' | 'reserved_table'
chairId: number
tableId: number
}

отдаст так же success: true, data: null

вот здесь bookedDate уже серьезно проверяется, дата не может быть никакой кроме завтра, послезавтра и минуты 00 \ 30, секунды 00 (милисекунды тоже), так же как мне коля скажет какие временные отрезки вообще доступны будет ограничение уже по часам, пока тестим не страшно
```

#### /getUserData

```html
headers: {
Authorization: initDataRaw (tg)
}
```

#### /getActiveFoodByCategory

```html
 id в query, по желанию можно передать offset, по дефолту 0
```

#### /getActiveCategories

```html
ничего не принимает
```