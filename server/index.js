var express = require('express');
// import cors from 'cors';
var cors = require('cors');

const fs = require('fs');
bodyParser = require('body-parser');

var app = express();

app.use(cors());


// console.log(a2)
// console.log(a);
// Object.entries(a).forEach(([key, value]) => {
//   console.log(`Key: ${key}, Value:`, value);
// });
// console.log(a[499].likes)
// a[499].likes++;
// console.log(a[499])

// let m = JSON.stringify(a)

// fs.writeFileSync('allProducts[1].json', m);
// console.log("written")
// let rawdata2 = fs.readFileSync('allProducts[1].json');
// let a2 = JSON.parse(rawdata2)

// console.log(a2[499].likes)


// console.log(projects);

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

// app.get('/add', (req, res) => {
//   res.sendFile(__dirname + '/post.html');
// });
// app.post('/add', (req, res) => {
//   const { project_name, project_id } = req.body;
//   let newproject = {
//     id: project_id,
//     name: project_name
//   }

//   projects.push(newproject);
//   let data = JSON.stringify(projects);

//   fs.writeFileSync('data-store.json', data);


//   res.send("  PROJECT ADDED SUCCESSFULLY")
// });
// app.get('/projects/:id', function (req, res) {


//   const { id } = req.params;

//   const sid = id;


//   var check = 0;
//   for (var i = 0; i < projects.length; i++) {
//     if (projects[i].id == sid) {

//       res.status(200)
//       res.send(projects[i]);

//     }
//   }
//   res.status(404)
//   res.send("not found");
// });
app.get('*', function (req, res) {
  res.sendStatus(404);
});
app.put('/updateProducts', express.json(), (req, res) => {
  // a[updatedData.Pid].likes++;

  let rawdata = fs.readFileSync("../allProducts.json")
  let a = JSON.parse(rawdata)
  const updatedData = req.body;
  console.log("here")
  // console.log(a[499].likes)
  if (updatedData.type == 2) {
    a[updatedData.Pid].likes++;
  }
  if (updatedData.type == -2) {
    a[updatedData.Pid].dislikes++;

  }
  if (updatedData.type == 1) {
    a[updatedData.Pid].views++;

  }
  if (updatedData.type == 3) {
    a[updatedData.Pid].addToCart++;

  }
  if (updatedData.type == 4) {
    a[updatedData.Pid].purchases++;

  }
  if (updatedData.type == 5) {
    a[updatedData.Pid].addToCart--;

  }
  if (updatedData.type == 6) {

    let newrating = (a[updatedData.Pid].normalRating * a[updatedData.Pid].views - 1) + updatedData.rating;
    newrating /= a[updatedData.Pid].views
    a[updatedData.Pid].normalRating = newrating;

  }
  let m = JSON.stringify(a)

  // fs.writeFileSync('allProducts[1].json', m);
  fs.writeFile('../allProducts.json', m, 'utf8', (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error updating JSON file');
      return;
    }
    res.send('JSON file updated successfully');
  });
});
app.get('/getObjects', express.json(), (req, res) => {
  let rawdata2 = fs.readFileSync("../recommendationSystem/response.json")
  let a2 = JSON.parse(rawdata2)
console.log(a2)
  
    res.send('JSON file updated successfully');
  });


app.put('/updateUserLogs', express.json(), (req, res) => {
  let rawdata2 = fs.readFileSync("../logs.json")
  let a2 = JSON.parse(rawdata2)

  const updatedData = req.body;
  // console.log(updatedData)
  if (updatedData.event == 3) {
    //set add to cart but how?
    //when bought return all values from frontend 

  }

  const projects = [];
  let newLog = {
    userid: updatedData.Uid,
    productid: updatedData.Pid,
    event: updatedData.type,
    time: updatedData.time
  }
  console.log(newLog)

  for (var i in a2) {
    projects.push(a2[i]);
  }
  projects.push(newLog)
  let data = JSON.stringify(projects);
  console.log(data)

  // fs.writeFileSync('logs.json', data);
  // async () => await
  fs.writeFile('../logs.json', data, 'utf8', (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error updating JSON file');
      return;
    }
    res.send('JSON file updated successfully');
  });
});

app.listen(8000, () => {
  console.log('Our express server is up on port 8000');
});