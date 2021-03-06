import { async } from "q";
import { forStatement } from "@babel/types";  

const USER_API_ENDPOINT = '/api/users';

export const fetchUsers = () => {
  // Currently, this function only fetches a subset of all the users because the API only returns up to 50 users at a time
  // The API supports two pagination parameters: `limit` and `offset`
  // You can see the API response using this URL in your browser: http://localhost:3001/api/users?pretty=true
  // The CHALLENGE is to update this function to return a promise with the list of all users and the total number of users,
  // in the format:
  // { items: [], _total: 0 }
  // You can read README.md for more info

  const USER_API_ENDPOINTS = [USER_API_ENDPOINT];
  let promiseObj = { items: [], _total: 0 };
  // const totalUsers = 0;

  // async function getTotalUsers(){
  async function f() {


    // let promiseGetTotalUsers = new Promise((resolve, reject) => {
    async function getTotalUsers () {
      const response = await fetch(USER_API_ENDPOINT);
      const data = await response.json();
      const total = await data._total;
      // promiseObj._total = data._total;
      // console.log(json);
      promiseObj._total = total;
      // console.log(promiseObj);
      return total;
    }

    getTotalUsers()
      .then(total => {
        // console.log(total);
        promiseObj._total = getTotalUsers()
      })


    async function pushUserApiEndpoint () {
      let offset = 50;
      const totalNumUsers = await getTotalUsers();
      const length = await Math.ceil(totalNumUsers / 50);
      // const x  = await function (length) {
        for(let i = 1; i < length; i++){
          USER_API_ENDPOINTS.push(`${USER_API_ENDPOINT}?limit=50&offset=${offset}`);
          offset += 50;
        }
        console.log(length);
        return console.log("Done pushing Endpoint to Array",length,USER_API_ENDPOINTS)
      // }
    }

    // pushUserApiEndpoint();

    async function getAllUserData(){
      const prom = await pushUserApiEndpoint();
      const response = await Promise.all(USER_API_ENDPOINTS.map(endPoint => fetch(endPoint)));
      // const json = await console.log(response.json());
      console.log(response);
      // const items = await json.items
    }

    getAllUserData();

  
    
    

    // async function getAllUserData(){
    //   Promise.all(USER_API_ENDPOINTS.map(endPoint =>
    //     fetch(endPoint)
    //       .then(function(response){
    //         // console.log(response.json())
    //         return response.json();
    //       })      
    //       .then(function(json) {
    //         console.log(json);
    //         console.log(json.items);
    //       })   
    //       // .then(parseJSON)
    //       // .catch(logError)
    //   ))
    //   .then(data => {
    //     // do something with the data
    //   })
    // }
    


        
  }


      
  f();







  return fetch(USER_API_ENDPOINT)
    .then(results => results.json())
};



// import { async } from "q";
// import { forStatement } from "@babel/types";

// const USER_API_ENDPOINT = '/api/users';

// export const fetchUsers = () => {
//   // Currently, this function only fetches a subset of all the users because the API only returns up to 50 users at a time
//   // The API supports two pagination parameters: `limit` and `offset`
//   // You can see the API response using this URL in your browser: http://localhost:3001/api/users?pretty=true
//   // The CHALLENGE is to update this function to return a promise with the list of all users and the total number of users,
//   // in the format:
//   // { items: [], _total: 0 }
//   // You can read README.md for more info

//   const USER_API_ENDPOINTS = [USER_API_ENDPOINT];
//   let promiseObj = { items: [], _total: 0 };
//   // const totalUsers = 0;

//   // async function getTotalUsers(){

//   //   let response = await fetch(USER_API_ENDPOINT)
//   //   let data = await response.json()
//   //   let totalUsers = await data._total
//   //   return totalUsers;
//   // }
//   async function f() {


//     // let promiseGetTotalUsers = new Promise((resolve, reject) => {
//     async function getTotalUsers () {
//       const response = await fetch(USER_API_ENDPOINT);
//       const json = await response.json();
//       const data = await json.data;
//       // promiseObj._total = data._total;
//       return data._total;
//     }

//     promiseObj._total = getTotalUsers();


//     async function pushUserApiEndpoint () {
//       let offset = await 0;
//       const totalNumUsers = await getTotalUsers();
//       const length = await Math.ceil(totalNumUsers / 50);
//       const x  = await function (length) {
//         for(let i = 1; i < length; i++){
//           USER_API_ENDPOINTS.push(USER_API_ENDPOINT +`?limit=50&offset=${offset}`);
//           offset += 50;
//         }
//       }
//     }

//     pushUserApiEndpoint();
        
//   }

//     fetch(USER_API_ENDPOINT)
//       .then(result => result.json())
//       .then(data => {
//         totalUsers = data._total;
//         promiseObj._total = totalUsers;
//         console.log(promiseObj);
//         const num = Math.ceil(totalUsers / 50);
//         const remainder = totalUsers % 50;
//         for(let i = 0; i < num; i++){
//           promisesArray.push( fetch(USER_API_ENDPOINT +`?limit=50&offset=${offset}`));
//           offset += 50;
//         }

//         // console.table(promisesArray);

//         Promise.all(promisesArray)
//         .then(results => {
//           console.log(results)
//           results.forEach(result => {
//             process(result.json())
//           })
//           console.log(results)
//         }).then(response => {
//           // sayHello();
//           console.log("SUP BRAH")
//         })


//         // let process = (prom) => {
//         function process(prom){
//           prom.then(data =>{
//             console.log("HELLO");
//             let arr = data.items;
//             // console.table(arr);
//             arr.forEach( ele => {
//               // console.log(ele);
//               promiseObj.items.push(ele);
//               // console.log(counter)
//               counter ++;
//               // console.log(counter)
//             })
//             if(counter === totalUsers){
//               console.log(promiseObj);
//               // return promiseObj.json();
//               return new Promise(function(resolve, reject) {        
//                   resolve(promiseObj);
//                 });
//             }
//           })
//         }

        
//       })
    
//   // }




//   let newEndPoint = USER_API_ENDPOINT +'?limit=50&offset=50';

 
  


  
//   return fetch(newEndPoint)
//     .then(results => results.json())
//     // .then(results => console.log(results.json()))
//     // .then(data => console.log(data))


// };
