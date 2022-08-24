//Utility funnctions:-
// 1.Utility funnction to get DOM from string
function getElementFromString(string){
    let div=document.createElement('div');
    div.innerHTML=string;
    return div.firstElementChild;
}

// Initiallize no. of parameters
let addparamsCount=0;

//Hides Parameters Box initially
let parametersBox=document.getElementById('parametersBox');
parametersBox.style.display='none';

// If the user clicks on params box, hides the json box
let paramsRadio=document.getElementById('paramsRadio');
paramsRadio.addEventListener('click',()=>{
    document.getElementById('jsonBox').style.display='none';
    document.getElementById('parametersBox').style.display='block';
})

// If the user clicks on json box, hides the params box
let jsonRadio=document.getElementById('jsonRadio');
jsonRadio.addEventListener('click',()=>{
    document.getElementById('parametersBox').style.display='none';
    document.getElementById('jsonBox').style.display='block';
})

// If the user clicks on + button, adds more parameters
let addparams=document.getElementById('addparams');
addparams.addEventListener('click',()=>{
    let params=document.getElementById('params');
    let string=`<div class="row g-3 my-2">
                <label for="url" class="col-sm-2 col-form-label">Parameter ${addparamsCount + 2}</label>
                <div class="col-md-4">
                    <input type="text" class="form-control" id="parameterkey${addparamsCount + 2}" placeholder="Enter Parameter ${addparamsCount + 2} key">
                </div>
                <div class="col-md-4">
                    <input type="text" class="form-control" id="parametervalue${addparamsCount + 2}" placeholder="Enter Parameter ${addparamsCount + 2} value">
                </div>
                <div class="col-md-2">
                    <button class="btn btn-primary deleteParams" > - </button>
                </div>
            </div>`;
    //Convert elent string to DOM node
    let paramElement=getElementFromString(string);
    params.appendChild(paramElement);

    //Add an eventlistener to remove parameters on clicking - button
    let deleteParam=document.getElementsByClassName('deleteParams');
    for (item of deleteParam){
        item.addEventListener('click',(e)=>{
            e.target.parentElement.parentElement.remove();
            addparamsCount=0;

        })
    }
    addparamsCount++;
})

// If the user clicks on submit button
let submit=document.getElementById('submit');
submit.addEventListener('click',()=>{
    //Show please wait in response box to request patience from user
    document.getElementById('response').placeholder="Please wait...Fetching response...";

    //Fetch all the values user has entered
    let url=document.getElementById('urlField').value;
    let requestType= document.querySelector("input[name='requestType']:checked").value;
    let contentType= document.querySelector("input[name='contentType']:checked").value; 

    //If user has selected params option,collects all the parameters in object
    if(contentType=='params'){
        data={};
        for(i=0;i<addparamsCount+1;i++){
            if(document.getElementById('parameterkey'+(i+1)) != undefined){
                let key=document.getElementById('parameterkey'+(i+1)).value;
                let value=document.getElementById('parametervalue'+(i+1)).value;
                data[key]=value;
            }
        }
        data=JSON.stringify(data);   
    }
    else{
        data= document.getElementById('requestjsonText').value;
    }

     // Log all the values in console for debugging
     console.log('url is:',url);
     console.log('requestType is:',requestType);
     console.log('contentType is:',contentType);
     console.log('data is:',data);

     //If request type is GET, invoke fetch api to create a get request
     if(requestType=='GET'){
        fetch(url,{
            method:'GET'
        })
        .then((response)=>response.text())
        .then((text)=>{
            document.getElementById('response').value=text;
        })
    }

     //If request type is POST, invoke fetch api to create a post request
     else{
        fetch(url,{
            method:'POST',
            body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
        })
        .then((response)=>response.text())
        .then((text)=>{
            document.getElementById('response').value=text;
        })
    }
 
})