
import './App.css';
import SendIcon from '@mui/icons-material/Send';


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


async function querygeneration(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/gpt2",
    {
      headers: { Authorization: "Bearer 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" },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
}


async function querytranslation(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/Helsinki-NLP/opus-mt-en-fr",
		{
			headers: { Authorization: "Bearer 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" },
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}


//////////////////////////

///////// app

//////////////////////////


function App() {
  const [data,setdata] = useState([])
  const [ input,setinput] = useState("")
  var questions = []
  var answer = []
  function click(){
    queryconversation({"inputs": {
      "past_user_inputs": questions,
      "generated_responses": answer,
      "text": input
    }}).then((response) => {
      if (response.generated_text!==undefined){
        querygeneration({"inputs": response.generated_text}).then((response2) => {
          if (response2 !== undefined){
            const tab = [...data,[input,response2[0].generated_text]]
            setdata(tab)
          }
        })
        questions = [...questions,input]
        answer = [...answer,response.generated_text]
      }
    })
  }
  return (
    <div className="App">
      <div className="bady">
        <Header/>
        <div className="cont"> 
          <div className="scroll">
            {data.map((e)=>{
              return(
                <div className="container">
                  <div className="question">{e[0]}</div>
                  <div className="answer">{e[1]}</div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="input">
          <input type="text" onChange={change} ></input>
          <button onClick={click} >send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
