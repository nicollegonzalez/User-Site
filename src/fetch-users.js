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
  

  // async function getTotalUsers() {
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
        .then(results =>{
          results.forEach(result => {
            // console.log(result.json());
            // console.log("GROM")
            process(result.json());
            // console.log("YEWWWWWW")

          })
        })
        // .then(console.log("YEWWWWWW"))


        let process = (prom) => {
          prom.then(data =>{
            let arr = data.items;
            // console.table(arr);
            arr.forEach( ele => {
              // console.log(ele);
              promiseObj.items.push(ele);
              counter ++;
            })
            if(counter === totalUsers){
              console.log(promiseObj);
              return promiseObj.json();
            }
          })
        }


        
      })
  // }

  
  // for(let i=0; i < 12; i++){
  //   console.log(`${USER_API_ENDPOINT}?limit=50&offset=${offset}`)
  //   promisesArray.push( USER_API_ENDPOINT +`?limit=50&offset=${offset}`);
  //   offset += 50;
  // }
  // var checkVariable = function () {
  //   if (totalUsers === undefined){
  //     checkVariable();
  //   }
  //   else {
  //     let offset = 0;
  //     const num = Math.floor(totalUsers / 50);
  //     const remainder = totalUsers - (num * 50);
  //     console.log("this is num ", num, " now this is remainder ", remainder);
  //     for(let i=0; i < num; i++){
  //       console.log(`?limit=50&offset=${offset}`)
  //       promisesArray.push( USER_API_ENDPOINT +`?limit=50&offset=${offset}`);
  //       offset += 50;
  //     }
  //   }
  // };
  // checkVariable();


  // setTimeout(function  checkVariable (){
  //   if (totalUsers === undefined){
  //     checkVariable();
  //   }
  //   else {
  //     let offset = 0;
  //     const num = Math.floor(totalUsers / 50);
  //     const remainder = totalUsers - (num * 50);
  //     console.log("this is num ", num, " now this is remainder ", remainder);
  //     for(let i=0; i < num; i++){
  //       console.log(`?limit=50&offset=${offset}`)
  //       promisesArray.push( USER_API_ENDPOINT +`?limit=50&offset=${offset}`);
  //       offset += 50;
  //     }

  //   }
  // }, 250);
  




  // let newEndPoint = USER_API_ENDPOINT +'?limit=50&offset=50';

 
  


  
  // return fetch(newEndPoint)
  //   .then(results => results.json())
};
