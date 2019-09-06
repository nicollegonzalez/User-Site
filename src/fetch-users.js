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

  let totalUsers;
  let promisesArray = [];
  let promiseObj = { items: [], _total: 0 };
  let offset = 0;
  let counter = 0;
  

  // async function getAllUsers() {
    
    // //Read first end point
    // let firstResponse = await fetch(USER_API_ENDPOINT);
    // let firstJson = await firstResponse.json();
    // let totalUsers = await console.log(firstJson.data);


    fetch(USER_API_ENDPOINT)
      .then(result => result.json())
      .then(data => {
        totalUsers = data._total;
        promiseObj._total = totalUsers;
        console.log(promiseObj);
        const num = Math.ceil(totalUsers / 50);
        const remainder = totalUsers % 50;
        for(let i = 0; i < num; i++){
          promisesArray.push( fetch(USER_API_ENDPOINT +`?limit=50&offset=${offset}`));
          offset += 50;
        }

        // console.table(promisesArray);

        Promise.all(promisesArray)
        .then(results => {
          console.log(results)
          results.forEach(result => {
            process(result.json())
          })
          console.log(results)
        }).then(response => {
          // sayHello();
          console.log("SUP BRAH")
        })


        // let process = (prom) => {
        function process(prom){
          prom.then(data =>{
            console.log("HELLO");
            let arr = data.items;
            // console.table(arr);
            arr.forEach( ele => {
              // console.log(ele);
              promiseObj.items.push(ele);
              // console.log(counter)
              counter ++;
              // console.log(counter)
            })
            if(counter === totalUsers){
              console.log(promiseObj);
              // return promiseObj.json();
              return new Promise(function(resolve, reject) {        
                  resolve(promiseObj);
                });
            }
          })
        }

        
      })
    
  // }




  let newEndPoint = USER_API_ENDPOINT +'?limit=50&offset=50';

 
  


  
  return fetch(newEndPoint)
    .then(results => results.json())
    // .then(results => console.log(results.json()))
    // .then(data => console.log(data))


};
