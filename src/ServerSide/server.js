const Data = require('./TestData.json'); 


// array of words loaded from json file. 
wordsEndpoint =[];
//array of results loaded from json file. 
ranksEndPoint=[]; 

//object to check if the words will have at least 1 word from each type. 
const isFound= {
    "noun":false, 
    "verb":false, 
    "adverb":false, 
    "adjective":false
}
//add express. 
const express = require('express'); 
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

//connection between Server and Client Side. 
app.use(express.static("../ClientSide")); 

app.get('/',function(req,res){
    //create array of 10 words and send it to Client side.
    resetIsFound(); 
    const words = constructWordList(); 
    res.send(words); 
})

app.post('/',(req,res)=>{
    const score = req.body.scorePercentage; 
    console.log(score);
    const totalRank = compareScore(score); 
    console.log(totalRank);
    res.json(totalRank.toPrecision(3));
});

//server's port number. 
const port = 8000; 
//listenting is the function that will be triggered when server starts. 
const server = app.listen(port,listening); 

function listening(){
    console.log("Server is Running...");

    /*getting data from json file to endpoints*/ 
    wordsEndpoint = Data.wordList; 
    ranksEndPoint = Data.scoresList; 
}

/*Create a List of 10 words to send it to the Client Side*/ 
function constructWordList(){
    const words =[]; 
    for(let i =0;i<10;i++){
        /*generate a random number to access the endpoint, to generate random list*/
        let random = Math.floor(Math.random()*wordsEndpoint.length);
        /* this condition to make sure that at least one word of each type is included */
        if(i<4){
            if(!words.includes(wordsEndpoint[random]) && isFound[wordsEndpoint[random].pos]===false){
            words[i] = wordsEndpoint[random];
            isFound[wordsEndpoint[random].pos]=true;  
            }
            else {
                i--; 
            }
        }
        /* start adding words randomly just insure that no word is duplicated */
        else{
            if(!words.includes(wordsEndpoint[random])){
                words[i] = wordsEndpoint[random];  
                }
                else {
                    i--; 
                }
        }
    }
    return words; 
}

/* reset function to make all types are false so the server can create a new list of words when the page is reloaded */
const resetIsFound =()=>{
    isFound["noun"] = false; 
    isFound["verb"] = false; 
    isFound["adverb"] = false; 
    isFound["adjective"] = false; 

}
/* compute the user rank through the user's score */
const compareScore =(score)=>{
    let count = 0 ; 
    ranksEndPoint.forEach((elem)=>{
        /* if the rank is less than user score then add number of ranks less than user's score. */
        if(elem < score){
            count++ ;
        }
}); 
    const totalRank = (count/ranksEndPoint.length)*100; 
    return totalRank; 
}