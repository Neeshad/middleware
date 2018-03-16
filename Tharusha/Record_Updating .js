var http = require('http');
var fs = require('fs');
var url = require('url');
var MongoClient = require('mongodb').MongoClient;
var dburl = "mongodb://localhost:27017/";
var mCollection = "employee";
var dbName = "mydb";
var findData = {};
var newData = {"name":"Tharusha1", "age":"300000", "city":"New York" ,"image":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAAAAACPAi4CAAAAB3RJTUUH1QEHDxEhOnxCRgAAAAlwSFlzAAAK8AAACvABQqw0mAAAAXBJREFUeNrtV0FywzAIxJ3+K/pZyctKXqamji0htEik9qEHc3JkWC2LRPCS6Zh9HIy/AP4FwKf75iHEr6eU6Mt1WzIOFjFL7IFkYBx3zWBVkkeXAUCXwl1tvz2qdBLfJrzK7ixNUmVdTIAB8PMtxHgAsFNNkoExRKA+HocriOQAiC+1kShhACwSRGAEwPP96zYIoE8Pmph9qEWWKcCWRAfA/mkfJ0F6dSoA8KW3CRhn3ZHcW2is9VOsAgoqHblncAsyaCgcbqpUZQnWoGTcp/AnuwCoOUjhIvCvN59UBeoPZ/AYyLm3cWVAjxhpqREVaP0974iVwH51d4AVNaSC8TRNNYDQEFdlzDW9ob10YlvGQm0mQ+elSpcCCBtDgQD7cDFojdx7NIeHJkqi96cOGNkfZOroZsHtlPYoR7TOp3Vmfa5+49uoSSRyjfvc0A1kLx4KC6sNSeDieD1AWhrJLe0y+uy7b9GjP83l+m68AJ72AwSRPN5g7uwUAAAAAElFTkSuQmCC" };


http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  
  var url_data = JSON.stringify(newData);   // Data to be inserterd
  var t ;
  
  t = JSON.parse(url_data);
  
  if (t.name!= null)
  {
    Object.assign(findData,{name:t.name});
  }else{
    delete findData.name;
  }

  if (t.id != null)
  {
    Object.assign(findData,{id:t.id});
  }else{
    delete findData.id;
  }

  res.write("{delet:"+deletDB(findData)+"}");
  res.write("{Save:"+insertDB(newData)+"}");

  res.end();

}).listen(3000); 


function deletDB(_findData)
{

  MongoClient.connect(dburl, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myquery = _findData;
    dbo.collection(mCollection).deleteOne(myquery, function(err, obj) {
      if (err) {
        throw err;
        return " fail";
      }else{
        console.log("1 document deleted");
      }
      
      db.close();
    });
  }); 
  return " successfull";
  
}

function insertDB(_newData)
{

  MongoClient.connect(dburl, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = _newData ;
    dbo.collection(mCollection).insertOne(myobj, function(err, res) {
      if (err) {
        throw err;
        return " fail";
      }else{
        console.log("1 document inserted");
      }
      
      db.close();
    });
  }); 
  return " successfull";
}