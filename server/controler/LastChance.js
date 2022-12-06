const orderModel = require("../model/ordersModel");
const summaryModel = require("../model/summary-Model");
const ObjectId = require("objectid");
let gotHere=0
async function summaryHandle(pendingToSum, fullRecord) {
  // console.log("start");
  let allTimeRecordExistence,
    todayExistence,
    recursive = false,
    stopRecursive = false;
  //is recursive mode?
  let today;
  if (pendingToSum == undefined) {
    let start;
    start = await newSum();
    if (!start) {
      console.error("no orders to sum", start);
      return false;
    }
    start = [today, pendingToSum, fullRecord] = start;
  } else {
    if (pendingToSum.length == 1) {
      stopRecursive = true;
    }
    recursive = true;
    today = startNewDay(pendingToSum[0].createdAt);
  }
  for (let index = 0; index < pendingToSum.length; index++) {
    const element = pendingToSum[index];
    if (index == 0 && recursive) "";
    else if (index != 0) {
      const switchDay = isToday(
        element.createdAt,
        pendingToSum[index - 1].createdAt
      );
      if (switchDay && !stopRecursive) {
        await uploadSummary();
        return summaryHandle(pendingToSum.slice(index), fullRecord);
      }
    }
    gotHere++
    console.log('gotHere',gotHere);
      if (today.cities[element.city] == undefined)
        today.cities[element.city] = {};
      let cities = { ...today.cities[element.city] };
      if (Object.keys(cities).length > 0)
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
    console.log(today, "@#@#@#@",element.createdAt);
  }
  await uploadSummary();
  console.log("end");

  return;
  //$$$ function ***
  function getItems(city, arr) {
    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];
      if (Number(city[element])) city[element]++;
      else city[element] = 1;
    }
    return city;
  }
  async function newSum() {
    let day, fullRecord, pendingToSum;
    fullRecord = await summaryModel.findOne({ allTimeSum: true }, { _id: 0 });
    if (!fullRecord) {
      console.log("***********88 no fullRecord");
      allTimeRecordExistence = false;
      pendingToSum = await orderModel.find({});
      if (!pendingToSum.length) return false;
      fullRecord = {
        allTimeSum: true,
        lastDoc: "doc id",
        revenue: 0,
        refunds: 0,
        sum: 0,
        cities: { start: true },
      };
      console.log(pendingToSum.length);
      day = startNewDay(new Date(pendingToSum[1].createdAt).toDateString());
      return [day, pendingToSum, fullRecord];
    } else {
      allTimeRecordExistence = true;
    }
    console.log("########### creating pending");
    pendingToSum = await orderModel.find({
      _id: {
        $gte: ObjectId(fullRecord.lastDoc),
      },
    });
    if (pendingToSum.length == 1) return false;
    day = await summaryModel.findOne(
      { dayIs: new Date().toDateString() },
      { _id: 0 }
    );
    if (!day) {
      day = startNewDay(pendingToSum[1].createdAt.toDateString());
    } else todayExistence = true;
    return [day, pendingToSum, fullRecord];
  }

  function startNewDay(date) {
    todayExistence = false;
    return {
      revenue: 0,
      refunds: 0,
      sum: 0,
      dayIs: date,
      cities: { start: true },
    };
  }
  function isToday(doc, prevDoc) {
    doc = new Date(doc);
    prevDoc = new Date(prevDoc);
    if (
      doc.getFullYear() == prevDoc.getFullYear() &&
      doc.getDate() == prevDoc.getDate() &&
      doc.getMonth() == prevDoc.getMonth()
    ) {
      // console.log("recurcive should Start", doc, prevDoc,);
      return false;
    }
    return true;
  }
  async function uploadSummary() {
    console.log("now uploading", todayExistence);
    fullRecord.lastDoc = pendingToSum[pendingToSum.length - 1]._id;
    // console.log('---',fullRecord.lastDoc,today);
    for (const cityName in today.cities) {
      if (fullRecord.cities[cityName] == undefined)
        fullRecord.cities[cityName] = {};
      const fullRecordCity = fullRecord.cities[cityName];
      const city = today.cities[cityName];
      const element = city.products;
      if (cityName != true) {
        updateCityProduct(element, cityName);
        fullRecordCity.sum == undefined
          ? (fullRecord.sum = city.sum)
          : (fullRecord.sum += city.sum);
        fullRecordCity.revenue == undefined
          ? (fullRecord.revenue = city.revenue)
          : (fullRecord.revenue += city.revenue);

        fullRecordCity.history == undefined
          ? (fullRecordCity.history = {
              [today.dayIs]: {
                sum: city.sum,
                revenue: city.revenue,
              },
            })
          : (fullRecordCity.history = {
              [today.dayIs]: {
                sum: city.sum,
                revenue: city.revenue,
              },
            });
      }
    }
    if (allTimeRecordExistence) {
      await summaryModel.updateOne({ allTimeSum: true }, fullRecord);
    } else await summaryModel.insertMany(fullRecord);
    if (todayExistence) {
      today.dayIs = new Date(today.dayIs).toDateString();
      summaryModel.updateOne(
        { dayIs: new Date(today.dayIs).toDateString() },
        today
      );
    } else {
      today.dayIs = new Date(today.dayIs).toDateString();
      await summaryModel.insertMany(today);
    }
    function updateCityProduct(cityProducts, cityName) {
      let records = fullRecord.cities[cityName];
      for (const product in cityProducts) {
        const element = cityProducts[product];
        if (Number(records[product])) records += element;
        records[product] = element;
      }
    }
  }
}
module.exports = { summaryHandle };
