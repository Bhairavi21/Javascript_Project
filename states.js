var fs=require("fs");
var csv = fs.readFileSync("PDAC.csv")

function csvJSON(csv){
//console.log(typeof csv);
  var lines=csv.split("\n");
  var lines=csv.split("\r");

  var result = [];

  var headers=lines[0].split(",");
  var res=[];
  var agg={};
  var year="Year";
  var tn="Tamil Nadu";
  var ka="Karnataka";
  var ke="Kerala";
  var ap="Andhra Pradesh";
  for(i=3;i<headers.length;i++){
    agg=new Object();
    agg[year]=headers[i].substr(3,6);
    agg[ap]=0;
    agg[ka]=0;
    agg[ke]=0;
    agg[tn]=0;
    res.push(agg);
  }
  var a=[4];
  for(i=0;i<4;i++)
  a[i]=[22];

  for(i=0;i<4;i++){
  for(j=0;j<22;j++)
  {
  a[i][j]=0;
  }
  }


m=0;n=0;
  for(var i=1;i<lines.length;i++){

	  var obj = {};
    var state="States";
    lines[i]=lines[i].replace("Annual,","Annual");
    lines[i]=lines[i].replace("\"Annual Ending mar Of Each Year\"","Annual Ending mar Of Each Year");
    var currentline=lines[i].split(",");
    if((currentline[0].indexOf("Rice Volume Karnataka")!=-1)||(currentline[0].indexOf("Rice Volume Andhra Pradesh")!=-1)||(currentline[0].indexOf("Rice Volume Tamil Nadu")!=-1)||(currentline[0].indexOf("Rice Volume Kerala")!=-1))
    {

      for(var j=3;j<headers.length;j++){
        if(currentline[j].indexOf("NA")!=-1){
          currentline[j]=0;
        }
        currentline[j]=parseFloat(currentline[j]);
      //   obj=new Object();
      //   obj[currentline[0].substr(48,currentline[0].length)] = currentline[j] ;
  		//   obj["year"] = headers[j].replace(" 3-","");
      //   result.push(obj);
  	  //
      a[m][n]=currentline[j];
      n++;
    }
    m++;
    n=0;

    }
    }
for(i=0;i<4;i++){
  for(j=0;j<22;j++)
  {
    if(i==0)
    {
      res[j]["Andhra Pradesh"]=a[i][j];
    }
  if(i==1)
  {
    res[j]["Karnataka"]=a[i][j];
}if(i==2)
{
  res[j]["Kerala"]=a[i][j];
}if(i==3)
{
  res[j]["Tamil Nadu"]=a[i][j];
}
}
}

// for(i=0; i<result.length;i++)
// for(j in result[i]){
//   if(j==="year")
//   console.log(result[i][j]);
// }


  //console.log(result);
 // return JSON.stringify(result);
 fs = require('fs')
 fs.writeFile('states.json', JSON.stringify(res,null,4).replace(/\\n|\\/g, ''), function (err,data) {
   if (err) {
     return console.log(err);
   }
   console.log("completed");
 });

}
var json=csvJSON(csv.toString());
//var str = json.replace("/");
