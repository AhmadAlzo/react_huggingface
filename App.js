import {useState} from 'react'
import './App.css';
// import SendIcon from '@mui/icons-material/Send';


////////////////////////////

////////////////////// model

////////////////////////////

async function queryconversation(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
    {
      headers: { Authorization: "Bearer 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" },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
}


// async function querygeneration(data) {
//   const response = await fetch(
//     "https://api-inference.huggingface.co/models/gpt2",
//     {
//       headers: { Authorization: "Bearer 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" },
//       method: "POST",
//       body: JSON.stringify(data),
//     }
//   );
//   const result = await response.json();
//   return result;
// }


// async function querytranslation(data) {
// 	const response = await fetch(
// 		"https://api-inference.huggingface.co/models/Helsinki-NLP/opus-mt-en-fr",
// 		{
// 			headers: { Authorization: "Bearer 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" },
// 			method: "POST",
// 			body: JSON.stringify(data),
// 		}
// 	);
// 	const result = await response.json();
// 	return result;
// }


//////////////////////////

///////// app

//////////////////////////
var questions = []
var answer = []

function App() {
  const [data,setdata] = useState([])
  const [ input,setinput] = useState("")
  // const [ questions,setquestionst] = useState([])
  // const [ answer,setanswer] = useState([])
  
  function click(){
    queryconversation({"inputs": {
      "past_user_inputs": questions,
      "generated_responses": answer,
      "text": input
    }}).then((response) => {
      if (response.generated_text!==undefined){
        // querygeneration({"inputs": response.generated_text}).then((response2) => {
        //   if (response2 !== undefined){
        //     const tab = [...data,[input,response2[0].generated_text]]
        //     setdata(tab)
        //   }
        // })
        const tab = [...data,[input,response.generated_text]]
        setdata(tab)
        // let interque = [...questions,input]
        // setquestionst(interque)
        // let interansw = [...answer,response.generated_text]
        // setanswer(interansw)
        questions.push(input)
        answer.push(response.generated_text)
        setinput("")
      }
    })
  }
  function change(e){
    setinput(e.target.value)
  }
  return (
    <div className="App">
      <div className="cont"> 
        <div className="scroll">
          {data.map((e,index)=>{
            return(
              <div className="container" key={index}>
                <div className="question">{e[0]}</div>
                <div className="answer">{e[1]}</div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="input">
        <input type="text" onChange={change} value={input}></input>
        <button onClick={click} >send</button>
      </div>
    </div>
  );
}

export default App;
