class UI{
    static homePage(){
        document.getElementById("parameterBox").style.display="none";
        document.getElementById("requestJsonBox").style.display="block"; 
        document.getElementById("params").style.display="block"; 
    }
}

//function to add another div into empty div to add parameter box
function getElementById(string){
    let div=document.createElement('div');
    div.innerHTML=string;
    return div.firstElementChild;
}
//Initial number of parameters
let paramscount=1;

//Initaial Home Page
document.addEventListener('DOMContentLoaded',UI.homePage);

//If user clicks on JSON, hide the Parameters button
document.getElementById("jsonradio").addEventListener('click',()=>{
    document.getElementById("parameterBox").style.display = "none";
    document.getElementById("requestJsonBox").style.display = "block"; 
    document.getElementById("params").style.display = "block";
});

//If user clicks on Custom Parameters, hide the Json Box
document.getElementById("paramsradio").addEventListener('click',()=>{
    document.getElementById("requestJsonBox").style.display = "none";
    document.getElementById("parameterBox").style.display = "block";
    document.getElementById("params").style.display = "none";
});

//to add parameter box on clicking + button 
document.getElementById("addParam").addEventListener("click",()=>{
    paramscount++;
    let string=`<div class="form-row my-2">
    <label for="url" class="col-sm-2 col-form-label">Parameter ${paramscount }</label>
    <div class="col-md-4">
    <input type="text" class="form-control" id="parameterkey${paramscount }" placeholder="Enter Parameter  ${paramscount} Key">
    </div>
    <div class="col-md-4">
    <input type="text" class="form-control" id="parametervalue${paramscount }" placeholder="Enter Parameter  ${paramscount} Value">
    </div>
    <button type="button"  class="btn btn-primary deleteParam">-</button>
    </div>`;

    let paramElement=getElementById(string);
    params.appendChild(paramElement);

    //to delete an element on clicking - button
    let deleteParam = document.getElementsByClassName('deleteParam'); 
    for (item of deleteParam){
        item.addEventListener('click',(e)=>{
            e.target.parentElement.remove();
        });
    }
});

//when user clicks on submit button
document.getElementById('submit').addEventListener('click',()=>{

    //initially shows please wait msg to user in respose box
    document.getElementById('responseJsonText').value='Please Wait...';

    //fetch all details selected by user
    let url = document.getElementById('urlField').value;
    let reqtype = document.querySelector('input[name = "requestType"]:checked').value;
    let contenttype = document.querySelector('input[name = "contentType"]:checked').value;

    //if user is selected params content type
    if(contenttype === "params"){
        data={};
        // for(i=1;i<=paramscount;i++){
        //     if(document.getElementById('parameterkey'+i).value!=undefined){
        //         let key = document.getElementById('parameterkey'+i).value;
        //         let value = document.getElementById('paramaterkey'+i).value;
        //         data[key]=value;
        //     }
        // }
        // data = JSON.stringify(data);
        // console.log(data);
    }

    //if user is selected JSON content type
    else{
        data = document.getElementById('responseJsonText').value;
    }

    //if user selects GET technique
    if(reqtype === "GET"){
        fetch(url,{
            method:'GET'
        })
          .then(response => response.text())
          .then((text) => {
              document.getElementById('responseJsonText').value=text;
          });
    }

    //if user selects post technique
    else if(reqtype === "POST"){
        fetch(url,{
            method:'POST',
            body:data,
            headers:{
                "Content-type": "application/json; charset=UTF-8"
            }
        })
          .then(response => response.text())
          .then((text) => {
              document.getElemenyById('responseJsonText').value=text;
          })
    }

    setTimeout(function(){
        if(document.getElementById('responseJsonText').value === 'Please Wait...')
        {
            let str = `<!-- Modal Content -->
            <!-- The Modal -->
            <div class="modal" id="myModal">
                <div class="modal-dialog">
                    <div class="modal-content">
  
                        <!-- Modal Header -->
                        <div class="modal-header">
                            <h4 class="modal-title">Information</h4>
                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>
    
                        <!-- Modal body -->
                        <div class="modal-body">
                            No Response from Server
                        </div>
                        <!-- Modal footer -->
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>`;
        let modal = getElementById(str);
        console.log(modal);
        let myModal = document.getElementById('my-modal');
        myModal.appendChild(modal);
        document.getElementById('responseJsonText').value='No Response from User';
        }
    },5000);
});

