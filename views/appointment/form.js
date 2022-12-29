console.log('Hello');
const validata = () =>{
    var name = document.getElementById("Name").value;
    var subject = document.getElementById("Subject").value;
    var phone= document.getElementById('Phone').value;
    var email= document.getElementById("Email").value;
    var message = document.getElementById("Message").value;
    var error = document.getElementById("error");
    error.style.padding="10px";

    var text = '';
    if(name.length <3){
        text="Please Enter Vaild Name";
        document.getElementById("error").innerHTML = text;
        return false;
    }
    if(subject.length < 5){
        text="Please Enter Vaild Subject";
        document.getElementById("error").innerHTML = text;
        return false;
    }
    if(isNaN(phone) || phone.length!=10){
        text="Please Enter Vaild Phone Number";
        document.getElementById("error").innerHTML = text;
        return false;
    }
    if(email.indexOf("@")=-1 || email.length<6){
        text="Please Enter Vaild Email";
        document.getElementById("error").innerHTML = text;
        return false;
    }
    if(message.length <= 140){
        text="Please Enter more than 140 Characters";
        document.getElementById("error").innerHTML = text;
        return false;
    }
    alert("Form Submitted Successfully!");
    return true;
}