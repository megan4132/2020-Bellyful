var express = require('express');
var router = express.Router();

/* GET users listing. */
mysql = require('mysql')
mysqlDetails = require('./mysqlDetails')
con = mysqlDetails.con

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/getVolunteers', function(req, res, next) {
  //sql query for the data
  console.log(req.body.getID)
  
  sql = "select "+((typeof req.body.getID === 'undefined') ? "":"person1.person_id as id,") +" CONCAT(person1.person_fname , ' ' , person1.person_lname) as 'Name', person1.person_email as Email, person1.person_phone as Phone, CONCAT(address.add_num , ' ' , address.add_street) as 'Address', CONCAT(person2.person_fname , ' ' , person2.person_lname) as 'Ice'\
  from person as person1,person as person2 , volunteer , address\
  where person1.person_id = volunteer.person_id \
  AND person2.person_id = volunteer.ice_id \
  AND person1.add_id = address.add_id"
  // res.send("Got here!")
  con.query(sql, function (err, result) {
        if (err) {

           console.log(err)
            return
     };
        console.log("Got a result!\n");
        console.log(result)
        if(result.length == 0){
          res.send(404)
        } else {
          res.send(result)
        }
    });
});

router.post('/getDeliveries', function(req, res, next) {
  //sql query for the data
  sql = "select concat(person.person_fname,' ',person.person_lname) as 'Volunteer',\
        concat(person2.person_fname,' ',person2.person_lname) as 'Recipient', \
        concat(person3.person_fname,' ',person3.person_lname) as 'Referrer'\
  from delivery\
   join person as person2 on person2.person_id = delivery.recipient_id\
   join person as person3 on person3.person_id = delivery.ref_id\
   join delivery_status on delivery_status.stat_id = delivery.delivery_status\
   left join person ON person.person_id = delivery.`vol_id` "
  // res.send("Got here!")
  con.query(sql, function (err, result) {
        if (err) {

           console.log(err)
            return
     };
        console.log("Got a result!\n");
        console.log(result)
  
        if(result.length == 0){
          res.send(404)
        } else {
          res.send(result)
        }
    });
});


router.post('/getFreezerManager', function(req, res, next) {
  //sql query for the data
  sql = "select CONCAT(person.person_fname , ' ' , person.person_lname) as 'Name' ,CONCAT(address.add_num , ' ' , address.add_street) as 'Address', branch.branch_name as Branch, COUNT(meal.freezer_id) as 'Available Meals'\
  from freezer\
  join person  ON freezer.person_id = person.person_id\
  join address on freezer.add_id = address.add_id\
  join branch on freezer.branch_id = branch.branch_id\
  left outer join (select meal.freezer_id from meal where meal.delivery_id is NULL) as meal on meal.freezer_id = freezer.freezer_id\
  group by freezer.freezer_id\
    "
  //returns id, name, address, branch name
  // res.send("Got here!")
  con.query(sql, function (err, result) {
        if (err) {

           console.log(err)
            return
     };
        console.log("Got a result!\n");
        console.log(result)
        if(result.length == 0){
          res.send(404)
        } else {
          res.send(result)
        }
    });
  
});

router.post('/getDeliveryDetails', function(req, res, next) {
  //sql query for the data
  reQArr = req.body["type[]"]
  console.log("Request Body: ",req.body)
  console.log("Request arr Length:", Array.isArray(reQArr) ? reQArr.length : 1)
  sqlWhere = " AND ("
  for (var i = 0; i <(Array.isArray(reQArr) ? reQArr.length : 1 ); ++i ){
    sqlWhere = sqlWhere+(i==0 ? "":"OR")+" lower(delivery_status.stat_name) =  ? "
  }
  sqlWhere = sqlWhere +")"
  sql = "select delivery.delivery_id as id,  concat(person.person_fname,' ',person.person_lname) as 'Name', address.add_suburb 'Suburb',delivery_type(person.person_id) as 'Delivery Type', delivery_status.stat_name as 'Delivery Status'\
  from person ,address, delivery, delivery_status\
  where person.person_id = delivery.recipient_id\
  AND person.add_id = address.add_id\
  AND delivery.delivery_status = delivery_status.stat_id"
  sql = sql + sqlWhere;
  
  // res.send("Got here!")
  con.query(sql,(Array.isArray(reQArr) ? reQArr : [reQArr]), function (err, result) {
        if (err) {

           console.log(err)
            return
     };
        console.log("Got a result!\n");
        console.log(result)
        if(result.length == 0){
          res.send(404)
        } else {
          res.send(result)
        }
    });
});

router.post('/getReferrerStatus', function(req, res, next) {
  //sql query for the data
  reQArr = req.body["type[]"]
  
  const sql = "select referrer_type.RT_id, referrer_type.RT_type from referrer_type"
  // res.send("Got here!")
  con.query(sql, function (err, result) {
        if (err) {

           console.log(err)
            return
     };
        console.log("Got a result!\n");
        console.log(result)
        if(result.length == 0){
          res.send(404)
        } else {
          res.send(result)
        }
    });
});





router.post('/getUnassignedDeliveries', function(req, res, next) {
  //sql query for the data
  sql = "select concat(person1.person_fname,' ',person1.person_lname) as 'Volunteer',concat(person2.person_fname,' ',person2.person_lname) as 'Recipient', concat(person3.person_fname,' ',person3.person_lname) as 'Referrer',delivery_status.stat_name as 'Status', mealC.meal_count as 'Meals'\
  from delivery, person as person1, person as person2, person as person3, delivery_status,(SELECT COUNT(meal.delivery_id) AS meal_count FROM meal, delivery where meal.delivery_id = delivery.delivery_id) as mealC\
  where delivery_status = 1\
  AND delivery_status.stat_id = delivery.delivery_status\
  AND person2.person_id = delivery.recipient_id\
  AND person3.person_id = delivery.ref_id"
  // res.send("Got here!")
  con.query(sql, function (err, result) {
        if (err) {

           console.log(err)
            return
     };
        console.log("Got a result!\n");
        console.log(result)
        if(result.length == 0){
          res.send(404)
        } else {
          res.send(result)
        }
    });
});

module.exports = router;
