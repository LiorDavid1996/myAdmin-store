const orderModel = require("../model/ordersModel");
const summaryModel = require("../model/summary-Model");
const moment = require("moment");

async function summaryEveryTwentyFourHours(today, toSumOrders) {
  if (toSumOrders == undefined) [today, toSumOrders] = await getInitDocuments();

  for (let index = 0; index < toSumOrders.length; index++) {
    const element = toSumOrders[index];
    let day = element.createdAt.toString().slice(0, 16);

    if (today.days[day] == undefined) today.days[day] = {};

    if (Object.keys(today.days[day]).length)
      today.days[day] = {
        ...today.days[day],
        products: getItems(today.days[day].products, element.product),
        sum: today.days[day].sum + 1,
        revenue: today.days[day].revenue + element.price,
      };
    else
      today.days[day] = {
        ...today.days[day],
        products: getItems({}, element.product),
        sum: 1,
        revenue: element.price,
        name:day
      };

    if (today.cities[element.city] == undefined)
      today.cities[element.city] = {};
    let cities = { ...today.cities[element.city] };

    if (Object.keys(cities).length)
      cities = {
        ...cities,
        products: getItems(cities.products, element.product),
        sum: cities.sum + 1,
        revenue: cities.revenue + element.price,
      };
    else
      cities = {
        ...cities,
        products: getItems({}, element.product),
        sum: 1,
        revenue: element.price,
        name:element.city
      };

    today.sum++;
    today.revenue += element.price;
    today.cities[element.city] = cities;
    today.products["product"] = getItems( today.products.product , element.product);

  }
  today.products["sum"]=productSum(today.products.product)
  
  let li =Object.keys(today.products.product).reduce((a, b) => today.products[a] >today.products[b] ? a : b);
  today.products["max_product"]=li


  const salesArr = Object.values(today.days);
  
  const salesArr1 = Object.values(today.cities);

  today.days=sortDays(salesArr)
  today.cities=salesArr1
  


  uploadChanges();

  async function getInitDocuments() {
    const toSumOrders = await orderModel.find({});
    const today = todayInitState();
    return [today, toSumOrders];
  }


  function todayInitState() {
    return {
      sum: 0,
      revenue: 0,
      products: {
        product:{}
      },
      cities: {},
      days: {},
    };

  }
  function getItems(city, arr) {
    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];
      
      if (Number(city[element])) city[element]++;
      else{city[element] = 1
      
      }  
    }
    return city;
  }
  function productSum(items) {
    let total = 0;
for (let item in items) {
  total += items[item];
}
return total
  }

function sortDays(daysArray) {
  const sortedArr = daysArray.sort((a, b) => {
    return new Date(a.name) - new Date(b.name);
  });
  return sortedArr
}

  async function uploadChanges(i = toSumOrders.length) {
   
    await summaryModel.insertMany({ ...today, time: new Date().getTime() });
  }
}

module.exports = { summaryEveryTwentyFourHours };


