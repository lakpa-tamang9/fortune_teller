const OpenAI = require('openai');
const { Configuration, OpenAIApi } = OpenAI;

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const app = express();
const port = 3000;

const configuration = new Configuration({
    organization: "org-Mv89p3olbOhYA3KpocuAaDaa",
    apiKey: "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",
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
    const { message, language } =req.body;

    if (language == 'english'){
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Pretend you are a fortune teller. 
        Provide the good fortune with future tense sentences \ 
        using the following keywords: rich, healthy, marriage, kids, new house, new car. 
        Also, use the following personal information to make the sentences: ${message}`,
        max_tokens: 100,
        temperature: 0,
      });
      res.json({message: response.data.choices[0].text})
    } else if (language == 'korean'){
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Pretend you are a fortune teller. 
        Provide the good fortune with future tense sentences \ 
        using the following keywords in korean language: 부자, 건강, 결혼, 아기, 사업. 
        Also, use the following personal information to make the sentences: ${message}`,
        max_tokens: 200,
        temperature: 0,
      });
      res.json({message: response.data.choices[0].text})
    }        
});

app.listen(port, () => {
    console.log('Example app listening')
});