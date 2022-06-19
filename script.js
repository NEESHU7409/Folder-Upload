
window.addEventListener('load',fun);
function fun(){
    let file=document.querySelector('#selectFile');
    document.querySelector('#custom-button').addEventListener('click',function(){file.click();
        document.querySelector('#table').removeChild(h3);
    });
    file.addEventListener('change',readFiles);
    let h3=document.createElement('h3');
    h3.innerHTML="Please Choose a folder"
    document.querySelector('#table').appendChild(h3);
}
//Function for read the Files
function readFiles(){
    let nameArr=[];
    let sizeArr=[]; 
    let files=document.querySelector('#selectFile').files;
    for(let i=0;i<files.length;i++){
        let file=files[i];
        for(e in file){
            if(e=='name'){
              nameArr.push(file[e]);   
              console.log(file[e]);
            }
            if(e=='size'){
                sizeArr.push(file[e]);
            }
        }
     
    }
    let sortName=sortByExt(nameArr);
    let formatSize=fileSize(sizeArr);
    printInTable(sortName,formatSize,createTable);
}

//Function for sorting the name by usig extension
function sortByExt(files) {
    let arr = [];
    for (let x of files) { 
        let a =  x.split(/[\.]/g).filter(i => i.length > 0); 
        let b = '';
        if (a.length >= 2 && !x.endsWith('.'))
            b = a[a.length - 1];
    arr.push([b, x.replace(b, '')]);
    }
    return arr.sort().map(x => x[1].concat(x[0]));
}


//Function for formatig the size
function formatSizeUnits(bytes){
    if      (bytes >= 1073741824) { bytes = (bytes / 1073741824).toFixed(2) + " GB"; }
    else if (bytes >= 1048576)    { bytes = (bytes / 1048576).toFixed(2) + " MB"; }
    else if (bytes >= 1024)       { bytes = (bytes / 1024).toFixed(2) + " KB"; }
    else if (bytes > 1)           { bytes = bytes + " bytes"; }
    else if (bytes == 1)          { bytes = bytes + " byte"; }
    else                          { bytes = "0 bytes"; }
    return bytes;
  }

//Call the formatSizeUnits Function
  function fileSize(sizeArr){
      let formattedSizeArray=[];
    for(e of sizeArr){
       formattedSizeArray.push(formatSizeUnits(e));
    }
    return formattedSizeArray;
  }

//Function for printing the table 
  function printInTable(sortName,formatSize,createTable){ 
   
      createTable();
      let tblBody=document.querySelector('#tbody');
      console.log(sortName);
    for(let i=0;i<sortName.length;i++){
        const row=document.createElement('tr');
        const file=document.createElement("td");
        const size=document.createElement("td");
        file.innerHTML=sortName[i];
        size.innerHTML=formatSize[i];
        row.appendChild(file);
        row.appendChild(size);
        tblBody.appendChild(row);
    }
  }

  // Function for creating the table dynamically
  function createTable(){
    const tbl=document.createElement("table");
    tbl.border="1";
    const tblBody=document.createElement("tbody");
    tblBody.setAttribute("id","tbody");
        const row=document.createElement("tr");
        let flag="true"
        for(let j=0;j<2;j++){
            const cell=document.createElement("th");
            if(flag){
                cell.innerHTML="Name";
            }
            else{
                cell.innerHTML="Size"
            }
        
            row.appendChild(cell);
            flag=false;
        }
        tblBody.appendChild(row);
    tbl.appendChild(tblBody);
    document.querySelector('#table').appendChild(tbl);
  }