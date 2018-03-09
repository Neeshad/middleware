var http = require('http');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var dburl = "mongodb://localhost:27017/";
var mongoCollection = "employee";
var dbName = "mydb";
var response = {"employee":''};
var file_name = "File.png";
var b64DataRT;
var q = {name:""};


http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    var temp="";    
    var t =req.url.toString();
    for(var x in t)
    {
        if(t[x]!= "/")
          temp =  temp+t[x];

    }

    q.name = temp.toString();
        

    find_one(q,function(result) {
        delete result._id; // remove the property  _id from the result
        
        readData(result.image,function(b64DataRT){
                        
             result.image = b64DataRT;    // Adding the base 64 encoded image back to JSON object
             response.employee = result;
             res.end(JSON.stringify(response));  
                        
        });
         
    });
    

}).listen(3000); 


function find_one(_query,cb)
{
    console.log(_query);
    MongoClient.connect(dburl, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        dbo.collection(mongoCollection).findOne(_query, function(err, result) {
            if (err) throw err;
            db.close();
	    cb(result);
        });
    }); 
}

function readData(_file_path,cbf)
{   
    //console.log(_file_path);

    fs.readFile(_file_path, function(err, binDataRT) {
        if (err) throw err
        b64DataRT = new Buffer(binDataRT,'binary').toString('base64');
        cbf(b64DataRT);    
    });
    
}