const orderModel = require("../model/ordersModel");
const summaryModel = require("../model/summary-Model");
const moment = require("moment");

async function summaryEveryTwentyFourHours(today, toSumOrders) {
  if (toSumOrders == undefined) [today, toSumOrders] = await getInitDocuments();
  for (let index = 0; index < toSumOrders.length; index++) {
    const element = toSumOrders[index];
   

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
      };

    today.sum++;
    today.revenue += element.price;
    today.cities[element.city] = cities;
  }

  uploadChanges();

  async function getInitDocuments() {
    const toSumOrders = await orderModel.find({});
    const today = todayInitState();
    return [today, toSumOrders];
  }

  function todayInitState() {
    return {
      starDate: new Date(),
      expiration: new Date().setDate(new Date().getDate() + 1),
      lastUpdated: new Date().getTime(),
      sum: 0,
      allTimeDocument: false,
      revenue: 0,
      cities: { start: true },
      days: { start: true },
      refunds: 0,
      lastId: true,
    };
  }

  function getItems(city, arr) {
    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];
      if (Number(city[element])) city[element]++;
      else city[element] = 1;
    }
    return city;
  }
  
  function getArrayDates() {
    let daysArray = [];
    for (let index = 1; index < 8; index++) {
      let day = moment().subtract(index, "days").format("YYYY/MM/DD");
      daysArray.push(day);
    }
    return daysArray;
  }


  async function uploadChanges(i = toSumOrders.length) {
    await summaryModel.insertMany({ ...today, time: new Date().getTime() });
  }
}
module.exports = { summaryEveryTwentyFourHours };
