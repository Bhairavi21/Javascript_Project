var fs=require("fs");
var csv = fs.readFileSync("PDAC.csv")
var c = fs.readFileSync('../json/allstates.json');
allstates = JSON.parse(c);
var c = fs.readFileSync('../json/southern_states.json');
southern_states = JSON.parse(c);

function csvJSON(csv){
  var lines=csv.split("\n");
  var comm_res = [];
  var food = [];
  var oil = [];
  var comm=[];
  var state_res=[];
  var state_agg={};
  var headers=lines[0].split(",");

  for(i=0;i<headers.length;i++){
    if(headers[i].indexOf("Particulars")>=0)
    {
      var name=i;
    }

    if(headers[i].indexOf("3-2013")>=0)
     {
       var year2013=i;
     }
  }

  for(i=3;i<headers.length;i++){
    state_agg=new Object();
    state_agg["Year"]=headers[i].substr(3,6);
    for(k in southern_states)
    {
      state_agg[southern_states[k]]=0;
    }
    state_res.push(state_agg);
  }
  var a=[southern_states.length];
  for(i=0;i<southern_states.length;i++)
  a[i]=[23];

  for(i=0;i<southern_states.length;i++){
  for(j=0;j<23;j++)
  {
  a[i][j]=0;
  }
  }
  var n=0;

  for(i=0;i<southern_states.length;i++){
    a[i][0]=southern_states[i];
  }

  for(var i=1;i<lines.length;i++){

	  var food_obj = {};
    var oil_obj={};
    var comm_obj={};
    lines[i]=lines[i].replace("Annual,","Annual");
    lines[i]=lines[i].replace("\"Annual Ending mar Of Each Year\"","Annual Ending mar Of Each Year");
    var currentline=lines[i].split(",");

//Foodgrains

    if((currentline[name].indexOf("Agricultural Production Foodgrains ")!=-1)&&(currentline[name].indexOf("Agricultural Production Foodgrains Rabi")!=0)&&(currentline[name].indexOf("Agricultural Production Foodgrains Kharif")!=0))
    {
      for(var j=0;j<headers.length;j++){
      if(currentline[j].indexOf("NA")!=-1){
        currentline[j]=0;
      }
      if(j>2)
      currentline[j]=parseFloat(currentline[j]);
    }
    flag=0;
    for(k in allstates){
      if(currentline[name].indexOf(allstates[k])>0){
		      flag=1;
	  }
    if((currentline[name].indexOf("Area")>0)||(currentline[name].indexOf("Yield")>0)||(currentline[name].indexOf("Volume")>0))
    {
      flag=1;
    }
  }
  if(flag==0){
    food_obj[headers[name]] = currentline[name].substr(35,currentline[0].length);
    food_obj["Year"+headers[year2013].substr(3,6).trim()] = currentline[year2013];
    food.push(food_obj);
  }
  }

   //Oilseeds
    if((currentline[name].indexOf("Agricultural Production Oilseeds ")!=-1)&&(currentline[name].indexOf("Agricultural Production Oilseeds Rabi")!=0)&&(currentline[name].indexOf("Agricultural Production Oilseeds Kharif")!=0))
    {
      for(var j=0;j<headers.length;j++){
      if(currentline[j].indexOf("NA")!=-1){
        currentline[j]=0;
      }
      if(j>2)
      currentline[j]=parseFloat(currentline[j]);
      }
      oil_obj[headers[name]]=currentline[name].substr(33,currentline[0].length);
      oil_obj["Year"+headers[year2013].substr(3,6).trim()]= currentline[year2013];
      oil.push(oil_obj);
    }

    //Commercial
    if(currentline[name].indexOf("Commercial")!=-1)
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
//states
var flag1=null;
var x=0;
for(m in southern_states)
{
    if(currentline[name].indexOf("Rice Volume "+southern_states[m])>0)
    {
      flag1=southern_states[m];
      if(flag1!=null){
        j=3;
      for( k in state_res){
              currentline[j]=parseFloat(currentline[j]);
              state_res[k][flag1]=currentline[j];
            j++;
        }
      }}
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
for(i in comm_agg)
{
  comm_agg1 = new Object();
  comm_agg1["Year"]=i;
  comm_agg1["Sum"]=comm_agg[i];
  comm.push(comm_agg1);
}


 fs = require('fs')
 fs.writeFile('../json/Food.json', JSON.stringify(food,null,4).replace(/\\n|\\/g, ''), function (err,data) {
   if (err) {
     return console.log(err);
   }
   console.log(food.length);
 });
 fs.writeFile('../json/Oilseeds.json', JSON.stringify(oil,null,4).replace(/[\\]/g, ''), function (err,data) {
  if (err) {
    return console.log(err);
  }
  console.log("completed");
});
fs.writeFile('../json/Commercial.json', JSON.stringify(comm,null,4).replace(/\\n|\\/g, ''), function (err,data) {
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
