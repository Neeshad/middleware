var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var fs      = require('fs');

var exjson = {
  "employee":{ "name":"John", "age":30, "city":"New York" ,"image":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAAAAACPAi4CAAAAB3RJTUUH1QEHDxEhOnxCRgAAAAlwSFlzAAAK8AAACvABQqw0mAAAAXBJREFUeNrtV0FywzAIxJ3+K/pZyctKXqamji0htEik9qEHc3JkWC2LRPCS6Zh9HIy/AP4FwKf75iHEr6eU6Mt1WzIOFjFL7IFkYBx3zWBVkkeXAUCXwl1tvz2qdBLfJrzK7ixNUmVdTIAB8PMtxHgAsFNNkoExRKA+HocriOQAiC+1kShhACwSRGAEwPP96zYIoE8Pmph9qEWWKcCWRAfA/mkfJ0F6dSoA8KW3CRhn3ZHcW2is9VOsAgoqHblncAsyaCgcbqpUZQnWoGTcp/AnuwCoOUjhIvCvN59UBeoPZ/AYyLm3cWVAjxhpqREVaP0974iVwH51d4AVNaSC8TRNNYDQEFdlzDW9ob10YlvGQm0mQ+elSpcCCBtDgQD7cDFojdx7NIeHJkqi96cOGNkfZOroZsHtlPYoR7TOp3Vmfa5+49uoSSRyjfvc0A1kLx4KC6sNSeDieD1AWhrJLe0y+uy7b9GjP83l+m68AJ72AwSRPN5g7uwUAAAAAElFTkSuQmCC" }
  } ;

var filepath = "C:\\Users\\Tharusha\\File.png";

var data;
var base64Data;
var binaryData;


    //console.log(exjson);

    for(var exkey in exjson)
    {   
        
        var exData = exjson[exkey];
        
        data = exData.image;
        //console.log("Image :");
        //console.log(data+"\n");

        storImg(data,filepath);

        while(writeData(exData,filepath) != true);
                 
    }

    
  function writeData(_exData,_fpath)
  {

    _exData.image = _fpath;
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("mydb");
      var myobj = _exData;
      dbo.collection('employee').insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
      });
    });

    return true;
  }

  function storImg(_img,_fpath)
  {
    base64Data  =   _img.replace(/^data:image\/png;base64,/, "");
    base64Data  +=  base64Data.replace('+', ' ');
    binaryData  =   new Buffer(base64Data, 'base64').toString('binary');

    fs.writeFile(_fpath, binaryData, "binary", function (err) {
        console.log(err); // writes out file without error, but it's not a valid image
    });

  }