var fs=require("fs");
var csv = fs.readFileSync("PDAC.csv")

function csvJSON(csv){
//console.log(typeof csv);
  var lines=csv.split("\n");
  //var lines=csv.split("\r");
  var comm_res = [];
  var food_result = [];
  var oil_result = [];
  var comm_result=[];
  var year="Year";
  var state_res=[];
  var state_agg={};
  var year="Year";
  var tn="Tamil Nadu";
  var ka="Karnataka";
  var ke="Kerala";
  var ap="Andhra Pradesh";
  var headers=lines[0].split(",");

  for(i=3;i<headers.length;i++){
    state_agg=new Object();
    state_agg[year]=headers[i].substr(3,6);
    state_agg[ap]=0;
    state_agg[ka]=0;
    state_agg[ke]=0;
    state_agg[tn]=0;
    state_res.push(state_agg);
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

  var m=0;n=0;


  for(var i=1;i<180;i++){

	  var food_obj = {};
    var oil_obj={};
    lines[i]=lines[i].replace("Annual,","Annual");
    lines[i]=lines[i].replace("\"Annual Ending mar Of Each Year\"","Annual Ending mar Of Each Year");
    var currentline=lines[i].split(",");

//Foodgrains

    if((currentline[0].indexOf("Agricultural Production Foodgrains ")!=-1)&&(currentline[0].indexOf("Agricultural Production Foodgrains Rabi")!=0)&&(currentline[0].indexOf("Agricultural Production Foodgrains Kharif")!=0))
    {
      for(var j=0;j<headers.length;j++){
      if(currentline[j].indexOf("NA")!=-1){
        currentline[j]=0;
      }
      if(j>2)
      currentline[j]=parseFloat(currentline[j]);
}
		  food_obj[headers[0]] = currentline[0].substr(35,currentline[0].length);
      food_obj[year+headers[23].substr(3,6).trim()] = currentline[23];
      food_result.push(food_obj);
	  }



//Oilseeds
    if((currentline[0].indexOf("Agricultural Production Oilseeds ")!=-1)&&(currentline[0].indexOf("Agricultural Production Oilseeds Rabi")!=0)&&(currentline[0].indexOf("Agricultural Production Oilseeds Kharif")!=0))
    {
      for(var j=0;j<headers.length;j++){
      if(currentline[j].indexOf("NA")!=-1){
        currentline[j]=0;
      }
      if(j>2)
      currentline[j]=parseFloat(currentline[j]);
      }
      oil_obj[headers[0]]=currentline[0].substr(33,currentline[0].length);
      oil_obj[year+headers[23].substr(3,6).trim()]= currentline[23];
      oil_result.push(oil_obj);
    }
}
food_result.pop();food_result.pop();food_result.pop();

  for(var i=1;i<lines.length;i++){
    var comm_obj = {};
    lines[i]=lines[i].replace("Annual,","Annual");
    lines[i]=lines[i].replace("\"Annual Ending mar Of Each Year\"","Annual Ending mar Of Each Year");
    var currentline=lines[i].split(",");
    if(currentline[0].indexOf("Commercial")!=-1)
    {
      for(var j=3;j<headers.length;j++){
        if(currentline[j].indexOf("NA")!=-1){
          currentline[j]=0;
        }
        currentline[j]=parseFloat(currentline[j]);
        comm_obj[headers[j].substr(3,6)] = currentline[j];
            }
      comm_res.push(comm_obj);
    }

    if((currentline[0].indexOf("Rice Volume Karnataka")!=-1)||(currentline[0].indexOf("Rice Volume Andhra Pradesh")!=-1)||(currentline[0].indexOf("Rice Volume Tamil Nadu")!=-1)||(currentline[0].indexOf("Rice Volume Kerala")!=-1))
    {

      for(var j=3;j<headers.length;j++){
        if(currentline[j].indexOf("NA")!=-1){
          currentline[j]=0;
        }
        currentline[j]=parseFloat(currentline[j]);
        a[m][n]=currentline[j];
        n++;
    }
    m++;
    n=0;

    }
  }

  //Commercial
 var comm_agg={}
 for(i=3;i<headers.length;i++){
   comm_agg[headers[i].substr(3,6)]=0;
 }
for(i=0;i<comm_res.length;i++){
  for(j in comm_res[i]){
    comm_agg[j]+=comm_res[i][j];
  }
}
var comm_agg1={};
var year="Year";
var sum="Sum";
for(i in comm_agg)
{
//console.log(comm_agg[i]+"hi");
  comm_agg1 = new Object();
  comm_agg1[year]=i;
  comm_agg1[sum]=comm_agg[i];
  comm_result.push(comm_agg1);

}

//states
for(i=0;i<4;i++){
  for(j=0;j<22;j++)
  {
    if(i==0)
    {
      state_res[j]["Andhra Pradesh"]=a[i][j];
    }
  if(i==1)
  {
    state_res[j]["Karnataka"]=a[i][j];
}if(i==2)
{
  state_res[j]["Kerala"]=a[i][j];
}if(i==3)
{
  state_res[j]["Tamil Nadu"]=a[i][j];
}
}
}

 fs = require('fs')
 fs.writeFile('../json/Food.json', JSON.stringify(food_result,null,4).replace(/\\n|\\/g, ''), function (err,data) {
   if (err) {
     return console.log(err);
   }
   console.log(food_result.length);
 });
 fs.writeFile('../json/Oilseeds.json', JSON.stringify(oil_result,null,4).replace(/[\\]/g, ''), function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log("completed");
});
fs.writeFile('../json/Commercial.json', JSON.stringify(comm_result,null,4).replace(/\\n|\\/g, ''), function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log("completed");
});
fs.writeFile('../json/states.json', JSON.stringify(state_res,null,4).replace(/\\n|\\/g, ''), function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log("completed");
});

}
var json=csvJSON(csv.toString());
//var str = json.replace("/");
