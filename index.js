const OpenAI = require('openai');
const { Configuration, OpenAIApi } = OpenAI;

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();
const port = 3000;


const configuration = new Configuration({
    organization: "YOUR_ORG_ID",
    apiKey: "YOUR_API_KEY",
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

// app.post('/', (req, res) => {
//     res.json({
//         message: "Hello World!"
//     });
// });

app.post('/', async (req, res) => {
    const { message } =req.body;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Pretend you are a fortune teller. 
        Provide the good fortune with future tense sentences \ 
        using the following keywords: rich, healthy, marriage, kids, new house, new car. 
        Also, use the following personal information to make the sentences: ${message}`,
        max_tokens: 100,
        temperature: 0,
      });
      // console.log(response.data)
      if(response.data.choices[0].text){
        res.json({message: response.data.choices[0].text})
      }
});

app.listen(port, () => {
    console.log('Example app listening')
});