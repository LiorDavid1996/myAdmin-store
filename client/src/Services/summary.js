export default async function KindergartenSrvice () {
    try{
    return await fetch('http://localhost:8080/sum').then(response=>response.json())
    }
    catch(error){
        console.log(error);
    }
    }