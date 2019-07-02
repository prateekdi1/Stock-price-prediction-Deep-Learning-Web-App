import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
//import Appmain from './App_main';
//import SpeechRecognition from './speech';
import SpeechRecognition from 'react-speech-recognition';
import PropTypes from 'prop-types';

import * as tf from "@tensorflow/tfjs";
import { meanSquaredError, logLoss } from '@tensorflow/tfjs-core/dist/ops/loss_ops';
import { Optimizer } from '@tensorflow/tfjs';
//import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
//import StockData from './components/getstockdata';

const API_KEY = 'TQ6BTH5K7CD61THE';
let propsStk='';
let propsShowFlags='';
let propsDays=1;
let countflag = 0;


var Dates = [];
var showflag = 0;
var numdays = 1 ;
var stkName = '';
let transcriptcount = 0;

const propTypes = {
    // Props injected by SpeechRecognition
    transcript: PropTypes.string,
    interimTranscript: PropTypes.string,
    finalTranscript: PropTypes.string,
    resetTranscript: PropTypes.func,
    startListening: PropTypes.func,
    stopListening: PropTypes.func,
    recognition: PropTypes.object,
    browserSupportsSpeechRecognition: PropTypes.bool,
    listening :PropTypes.bool
  };

class Dictaphone extends Component {
    constructor(props){
      super(props);
      this.state ={
        flag : 0,
        showflag: 0,
        stkName: '',
        numdays: 1
      }
    }

    // callHandler=(e)=>{
    //   this.props.SpeechUpdate(stkName, showflag,numdays);
    // }
  render() {
    const { transcript,
            interimtranscript,
            finaltranscript,
            resetTranscript,
            startListening,
            stopListening,
            recognition= {lang:'en-UK'},
            browserSupportsSpeechRecognition,
            listening } = this.props

    if (!browserSupportsSpeechRecognition) {
      return null
    }
    console.log(transcript)
    let transcript1 = transcript;
    showflag = 0;
    numdays = 1 ;
    stkName = '';
    let transcriptcount = 0;
    let finalText ='';
    let transcriptArr = transcript1.split(' ')
    if(transcriptArr.length>0)
    {
      transcriptcount = 1;
      console.log(transcriptcount)
    }

    let j1 = 0;
        let k1 = 0;
        let predictioncounter = 0;
        let j_value = 0;

        if(!listening && transcriptcount==1) {
          console.log('listening stopped');
          console.log(transcriptArr);

        for (j1 = 0; j1< transcriptArr.length; j1++){
          if ((transcriptArr[j1]==='predictions' || transcriptArr[j1]==='prediction' ||
              transcriptArr[j1]==='predict' || transcriptArr[j1]==='predict') &&
              (transcriptArr[j1+1]==='of' || transcriptArr[j1+1]==='for')){
                predictioncounter = 1;
                showflag=1;
                j_value = j1;
              }}
              
                for(  k1 =0; k1<transcriptArr.length;k1++)
                {
                  if ((transcriptArr[k1]==='dont' || //transcriptArr[k1]==='do not' ||
                        transcriptArr[k1]==='not')&& predictioncounter==1){
                          showflag=2;
                          //this.props.SpeechUpdate(stkName, showflag, numdays)
                            console.log(stkName);
                            //console.log(temparr);
                            console.log(showflag);
                      }}

                      if(showflag===1){
                        console.log(j_value);
                            let temparr = transcriptArr.slice(-(transcriptArr.length -j_value-2))
                              if(temparr[temparr.length - 1]==='please') {
                               let temparr1 = temparr.slice(0,-1) 
                               stkName = temparr1.join(" "); 
                              // this.props.SpeechUpdate(stkName, showflag, numdays);
                              }
                              else {
                               stkName = temparr.join(" ");
                              // this.props.SpeechUpdate(stkName, showflag, numdays);
                              }
                                console.log(stkName);
                                console.log(temparr);
                                console.log(showflag);
                                j_value=0;
                      }
                      else {
                        showflag=3;
                        console.log(stkName);
                        console.log(showflag);
                        //this.props.SpeechUpdate(stkName, showflag, numdays);
                      }
        
    }

    // if(showflag===1 && !listening)
    // { console.log('calling parent function');
    //   this.props.SpeechUpdate(stkName, showflag, numdays);
    // }

    return (
      <div>
        <button onClick={resetTranscript}>Reset</button>
        <button onClick={startListening}>Start</button>
        <button onClick={stopListening}>Stop</button>
        <span>{transcript} 
      
        </span>
        
      </div>
    )
  }
}

Dictaphone.propTypes = propTypes;

let Speech_rec =  SpeechRecognition({autoStart: true, continuous: false})(Dictaphone);








class App extends Component {
  constructor(props){
    super(props);
    this.state={
    flagtoInititate:0,
    props_stk:'',
    props_show_flags:'',
    props_num_of_days:1,
    open: [],
    close :[],
    high : [],
    low : [],
    loaded: false,
    errormsg:'',
    StockCode: '',
    StockName: '',
    User_input_StockName: '',
    label: "Click Here",
    epoch_num : 0,
    market_type :'' ,
    region: '',
    marketopen:'',
    marketclose :'',
    timezone :'',
    currency : '',
    matchscore : '',
    tickerloaded :false,
    final_transcript:'',
    speechrec:'',
    Dates : [],
    cnnflag: 1
}
  // this.SpeechUpdate = this.SpeechUpdate.bind(this);
 // this.loadData= this.loadData.bind(this);
}

// SpeechUpdate =(stkcode,showflag,numdays)=>{
//   console.log('calling the Speech Update function');
//   propsStk= stkcode;
//   propsShowFlags=showflag;
//   propsDays=numdays;
//   //let prevcountflag = countflag;
  
//   let prevcountflag = countflag;
//   countflag = countflag+1;
//   console.log(stkcode, showflag, numdays,countflag);
// // //  if(countflag-prevcountflag ===1){
// //     this.setState({ flagtoInititate:1,
// //                    // props_stk:stkcode,
// //                     props_show_flags:showflag,
// //                     props_num_of_days:numdays});
// // //  //}
// //  console.log( this.state.flagtoInititate);
// //  console.log( this.state.props_stk);
// //  console.log( this.state.props_show_flags);
// }

loadData = (e)=>
{
if(showflag ===1)
{
  this.setState({User_input_StockName: stkName,
                  props_show_flags : showflag
                  });
                  this.gettingName_to_Ticker();
}
else {
this.setState({errormsg: "Couldn't recognize the voice"});
console.log(showflag);
}
}


gettingName_to_Ticker = async (e)=>{
  this.setState({ errormsg: "Loading the data..",
                 // StcokCode:e.target.elements.Stcokcode.value,
                  label: "Feching the data .."
                });
  // try{
  //     e.preventDefault();
      // const StcokCode=e.target.elements.Stcokcode.value;

  console.log("executing....");

  let ticker= [];
  let name = [];
  let market_type = [];
  let region= [];
  let marketopen= [];
  let marketclose = [];
  let timezone = [];
  let currency = [];
  let matchscore = [];

  try{
      await axios.get(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${this.state.User_input_StockName}&apikey=${API_KEY}`)
      .then(res => {
      console.log(res);
      const rawData1 = res;
      
      console.log(rawData1.data['bestMatches']);
      var arr1 = Object.values(rawData1.data['bestMatches']);
      console.log(arr1);
      console.log(Object.values(arr1[0]));
      console.log(arr1.length)

      for(let i =0; i<arr1.length;i++)
      { matchscore[i] = parseFloat(Object.values(arr1[i])[8]);
        ticker[i] = Object.values(arr1[i])[0];
        name[i] = Object.values(arr1[i])[1];  
        market_type[i] = Object.values(arr1[i])[2];
        region[i] = Object.values(arr1[i])[3];
        marketopen= Object.values(arr1[i])[4];
        marketclose = Object.values(arr1[i])[5];
        timezone = Object.values(arr1[i])[6];
        currency = Object.values(arr1[i])[7];
      }




      
      this.setState({StockCode:ticker[0],
                     StockName:name[0] ,
                     market_type : market_type[0],
                     region: region[0],
                     marketopen: marketopen[0],
                     marketclose : marketclose[0],
                     timezone : timezone[0],
                     currency : currency[0],
                     tickerloaded: true});
                     console.log(this.state.StockName);
      }
  );}

  catch (err) {
          console.error(err);
    this.setState({errormsg:"Unable to load the Data to State Ticker"})
  }
  
  
  

  if (this.state.tickerloaded === true){
    console.log("Ticker State Loaded");
    this.setState({ errormsg: "Ticker State Loaded"});
    this.gettingdata();


  }
  else
  { 
    console.log("Ticker State Not Loaded");
    this.setState({ errormsg: "Ticker State not Loaded"});
  }
}

gettingdata = async (e)=>{
    this.setState({ errormsg: "Loading the data...",
                   // StcokCode:e.target.elements.Stcokcode.value,
                    label: "Feching the data ..."  });
    // try{
    //     e.preventDefault();
        // const StcokCode=e.target.elements.Stcokcode.value;

    console.log("executing....");
    let open= [];
    let close = [];
    let high = [];
    let low = [];

    try{
        await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${this.state.StockCode}&outputsize=full&apikey=${API_KEY}`)
        .then(res => {
        console.log(res);
        const rawData = res;
        console.log(Object.getOwnPropertyNames(rawData));
        Dates = Object.getOwnPropertyNames(rawData.data['Time Series (Daily)']);
        var arr1 = Object.values(rawData.data['Time Series (Daily)']);
        console.log(arr1);

        console.log(Object.values(arr1[0]));

        for(let i =0; i<500;i++)
        { open[i] = parseFloat(Object.values(arr1[i])[0]);
          close[i] = parseFloat(Object.values(arr1[i])[3]);  
          high[i] = parseFloat(Object.values(arr1[i])[1]);
          low[i] = parseFloat(Object.values(arr1[i])[2]);
        }


        console.log(open)
        this.setState({open:open.reverse(),
                       close:close.reverse(),
                        high:high.reverse(),
                        low:low.reverse(),
                        Dates: Dates.reverse(),
                        loaded: true});

                        console.log(this.state.open);
        }
    );} 

    catch (err) {
            console.error(err);
      this.setState({errormsg:"Unable to load the Data to State"})
    }
    
    
    

    if (this.state.loaded === true){
      console.log("State Loaded");
      this.setState({ errormsg: "State Loaded"});
      this.datamodel();


    }
    else
    { 
      console.log("State Not Loaded");
      this.setState({ errormsg: "State not Loaded"});
    }
  }

  datamodel = async (e)=>{ 

  if(this.state.cnnflag ===1) {
     
    // Data preperation and model training CNN
        const learning_rate = 0.1;
        const no_of_epochs = 10;
        const optimizer = tf.train.adam(learning_rate);

        const full_input_data = [];
        const full_target_data = this.state.close;
        const testing_data = [];
        const training_data = [];
        const training_output_data = [];
        const actual_data =[];

        const test_split_percent = 0.2;


        for(let k =0; k<500;k++)
        { full_input_data[k] = [this.state.open[k],this.state.high[k],this.state.low[k]];
        }

        

        console.log(full_input_data);
        console.log(full_target_data);

        const num_of_observations = full_input_data.length;
        if(num_of_observations !== full_target_data.length){
          this.setState({errormsg : "Input and target data have different number of observations"});
        }

        const num_of_test_observations = Math.round(num_of_observations * test_split_percent);
        const num_of_train_observations = num_of_observations - num_of_test_observations;

        const input_dimensions = full_input_data[0].length;
          console.log('model buiilding');
          console.log('trainset');
          console.log(full_input_data.slice(0,400));
          console.log('train output');
          console.log(this.state.close.slice(0,400));
          console.log('testset');
          console.log(full_input_data.slice(400,500));

          console.log('test output');
          console.log(this.state.close.slice(400,500));

        // Creating 2D tensor for input feature data
        
        const trainset = tf.tensor2d(full_input_data.slice(0,400),[400,3]);
        console.log(trainset);
        // Creating 2D tensor for output data
        const trainset_output = tf.tensor1d(this.state.close.slice(0,400));
        // Creating 2D tensor for test input data
        const testset = tf.tensor2d(full_input_data.slice(400,500),[100,3]);

        const testset_output = tf.tensor1d(this.state.close.slice(400,500));

        // building the neural network
        const model = tf.sequential();

        model.add(tf.layers.dense({ inputShape : [3], activation :"relu", units : 5,}))

        model.add(tf.layers.dense({ inputShape : [5], activation :"relu", units : 6,}))
        model.add(tf.layers.dense({ inputShape : [6], activation :"relu", units : 5,}))
        model.add(tf.layers.dense({ inputShape : [5], activation :"relu", units : 4,}))

        model.add(tf.layers.dense({ inputShape : [4], activation :"relu", units : 3,}))

        model.add(tf.layers.dense({ inputShape : [3], activation :"relu", units : 1,}))

        await model.compile({loss: 'meanSquaredError', optimizer: optimizer, metrics: ['mse']});
            
        //training the model
        const startTime = Date.now();
        this.setState({errormsg:"Training the model..."});
        model.fit(trainset,trainset_output,
                  {epochs: no_of_epochs, 
                   
                   callbacks: {
                                onEpochEnd: async(epoch)=>{
                                  console.log("Epoch: "+ epoch );
                                  await tf.nextFrame();
                                },
                           }
                  })
        .then(async (history) => {
          this.setState({errormsg:"Model trained successfully"});
          console.log('DONE !. it took ', Date.now() - startTime , ' milli seconds');
          console.log(history); 
          const resullt = await model.predict(testset);
          console.log(resullt.print());
          const values = resullt.dataSync();
          const arr_resullt = Array.from(values);
          
          console.log(values);
          console.log(arr_resullt[0]);
         
          var arr_loss = Object.values(history['history']['loss']);
          var arr_mse = Object.values(history['history']['mse']);
          console.log(arr_loss);
          console.log(arr_mse);

        }) }
      //   trainset.dispose();
      //   trainset_output.dispose();
      //   testset.dispose();
      //   testset_output.dispose();
      }
    

        // const testing_data = [this.state.open.slice(400,500),this.state.high.slice(400,500),this.state.low.slice(400,500)];
        // console.log(testing_data[0]);
        // const training_data = [this.state.open.slice(0,400),this.state.high.slice(0,400),this.state.low.slice(0,400)];
        // console.log(training_data);
        // const training_output_data = this.state.close.slice(0,400);
        // console.log(training_output_data);
        // const actual_data = this.state.close.slice(400,500);
        // console.log(actual_data); 


        // // Generate some synthetic data for training.
        // const tf_training_data = tf.tensor2d(training_data, [3,400]);
        // const tf_outputdata = tf.tensor2d(training_output_data, [1,400]);
        // const tf_testing_data = tf.tensor2d(testing_data, [3,100]);

        //     const model = tf.sequential();
        //     await model.add(tf.layers.dense({units:1,
        //                                      inputShape: [3] }));

        //  // Prepare the model for training: Specify the loss and the optimizer.
        //     await model.compile({
        //                           loss:'meanSquaredError',
        //                           Optimizer:'sgd'});

        //  // Train the model using the data.
        //     await model.fit (tf_training_data,tf_outputdata, {epochs:10});
        //     const testing_result = await model.predict(tf_testing_data);

        //     console.log(testing_result);
        //     console.log(actual_data);

            // const model = tf.sequential();
            // await model.add(tf.layers.dense({units: 1, inputShape: [2]}));
            
            // // Prepare the model for training: Specify the loss and the optimizer.
            // await model.compile({loss: 'meanSquaredError', optimizer: 'sgd', metrics: ['mse']});
            
            // // Generate some synthetic data for training.
            // const xs = tf.tensor2d(training_data, [3, 400]);
            // const ys = tf.tensor2d(training_output_data, [400, 1]);
            
            // // Train the model using the data.
            // await model.fit(xs, ys).then(() => {
            //   // Use the model to do inference on a data point the model hasn't seen before:
            //   // Open the browser devtools to see the output
            //   model.predict(tf.tensor2d(testing_data, [3, 100])).print();
            //   //  console.log(resul);
            //   //  console.log(typeof(resul));
               
            //    });
  

  wrapperFunction = (event) => {
    this.gettingdata(event);
} 

  handleChange = event =>{
    this.setState({StockCode: event.target.value});
  }

  wrapperFunction1 = (event) => {
    this.gettingName_to_Ticker(event);
} 

  handleChange_input = event =>{
    this.setState({User_input_StockName: event.target.value});
  }

  
  render() {

    
    return (
      <div>
        <header className="App-header">
          <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
            <div> 
            <Speech_rec> {this.loadData.bind()}</Speech_rec>
            {this.loadData}
              <p>{this.state.errormsg}</p>
              <p>{this.state.StockCode}</p>
              <p>{this.state.StockName}</p>
              <p>{this.state.final_transcript}</p>
              <p>{this.state.User_input_StockName}</p>
              <p>{this.state.speechrec}</p>
             
              <input
                type="text"
                placeholder = " Stock Code here.."
                value = {this.state.StockCode}
                onChange={this.handleChange}
                />
              <button onClick={this.wrapperFunction}>Click</button>
                <div>
                <input
                type="text"
                placeholder = " Stock..."
                value = {this.state.User_input_StockName}
                onChange={this.handleChange_input}
                />
              <button onClick={this.loadData}>Click</button>
                </div>          
            </div>
        </div>
      </header>    
      </div>
    );
  }}

export default App;
