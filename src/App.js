import React, { Component } from 'react';
import logo from './logo.svg';
import {Bar, Line, Pie} from 'react-chartjs-2';
import './App.css';
import {_} from 'lodash';
import axios from 'axios';
import Chart from 'chart.js';
// import Switch from 'react-toggle-switch';
// import Button from 'react-bootstrap/Button';
// import ToggleButton from 'react-bootstrap/ToggleButton'
// import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
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
let loss_chart = [];
let hist_chart = [];
var Dates = [];
var showflag = 0;
var numdays = 1 ;
var stkName = '';
let transcriptcount = 0;
var global_stock_name = '';
var global_show_flag = 0;

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
        numdays: 1,
        tran_array:[]
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
    console.log(finaltranscript);
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
                          this.setState({showflag:2});
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
                              //  this.setState({showflag:1,
                              //                  stkName: stkName}); 
                              // this.props.SpeechUpdate(stkName, showflag, numdays);
                              }
                              else {
                               stkName = temparr.join(" ");
                              //  this.setState({showflag:1,
                              //   stkName: stkName});
                              // this.props.SpeechUpdate(stkName, showflag, numdays);
                              }
                              
                                console.log(stkName);
                                global_stock_name = stkName;
                                global_show_flag = showflag;
                                console.log(temparr);
                                console.log(showflag);
                                j_value=0;
                      }
                      else {
                        showflag=3;
                        // this.setState({showflag:3,
                        //                });
                        console.log(stkName);
                        console.log(showflag);
                        //this.props.SpeechUpdate(stkName, showflag, numdays);
                      }
    }

    return (
      <div>
        <button onClick={resetTranscript}>Reset</button>
        <button onClick={startListening}>Start</button>
    
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
    //voice_novoice_flag :0, // default 0 for no voice. 1 for voice
    switched: false,// default false for no voice. true for voice
    flagtoInititate:0,
    props_stk:'',
    props_show_flags:'',
    props_num_of_days:1,
    open: [],
    close :[],
    high : [],
    low : [],
    volume :[],
    loaded: false,
    errormsg:'',
    StockCode: '',
    StockName: '',
    User_input_StockName: '',
    label: "Activate Voice Interaction",
    no_of_epochs : 30,
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
    cnnflag: 1,
    loss_arr:[],
    mse_arr:[],
    learning_rate : 0.1,
    optimizer:'adam',
    test_split_percent:0.2,
    model_trained:0
}
//   this.SpeechUpdate = this.SpeechUpdate.bind(this);
//  this.loadData= this.loadData.bind(this);
this.toggleSwitch = this.toggleSwitch.bind(this);
this.confirm = this.confirm.bind(this);
}

// SpeechUpdate =(stkcode,showflag,numdays)=>{
//   console.log('calling the Speech Update function');
//   propsStk= stkcode;
//   propsShowFlags=showflag;
//   propsDays=numdays;
  
//   let prevcountflag = countflag;
//   countflag = countflag+1;
//   console.log(stkcode, showflag, numdays,countflag);
//  if(countflag-prevcountflag ===1){
//     this.setState({ flagtoInititate:1,
//                    props_stk:stkcode,
//                     props_show_flags:showflag,
//                     props_num_of_days:numdays});
//  }
//  console.log( this.state.flagtoInititate);
//  console.log( this.state.props_stk);
//  console.log( this.state.props_show_flags);
// }

// loadData = (e)=>
// {
// if(showflag ===1)
// {
//   this.setState({User_input_StockName: stkName,
//                   props_show_flags : showflag
//                   });
//                   this.gettingName_to_Ticker();
// }
// else {
// this.setState({errormsg: "Couldn't recognize the voice"});
// console.log(showflag);
// }
// }

confirm(){ 
  if(global_show_flag===1){
  this.setState({ User_input_StockName: global_stock_name
  })}
}

toggleSwitch() {
  this.setState({ switched:!this.state.switched});
  if(this.state.switched===true)
  {  this.setState({ label:'Activate Voice Interaction'});
}
else{
   this.setState({ label:'Deactivate Voice Interaction'});
}
  console.log(this.state.switched);
}

gettingName_to_Ticker = async (e)=>{
  this.setState({ errormsg: "Loading the data..",
                 // StcokCode:e.target.elements.Stcokcode.value,
                 // label: "Feching the data .."
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
  console.log(global_stock_name);
  
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
                    //label: "Feching the data ..."
                    });
    // try{
    //     e.preventDefault();
        // const StcokCode=e.target.elements.Stcokcode.value;

    console.log("executing....");
    let open= [];
    let close = [];
    let high = [];
    let low = [];
    let dates = [];
    let volume = [];

    try{
        await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${this.state.StockCode}&outputsize=full&apikey=${API_KEY}`)
        .then(res => {
        console.log(res);
        const rawData = res;
        console.log(Object.getOwnPropertyNames(rawData));
        Dates = Object.getOwnPropertyNames(rawData.data['Time Series (Daily)']);
        var arr1 = Object.values(rawData.data['Time Series (Daily)']);
        console.log(arr1);
        //let datesreverse = Dates.reverse();
       // console.log(datesreverse);
        console.log(Object.values(arr1[0]));

        for(let i =0; i<1000;i++)
        { open[i] = parseFloat(Object.values(arr1[i])[0]);
          close[i] = parseFloat(Object.values(arr1[i])[3]);  
          high[i] = parseFloat(Object.values(arr1[i])[1]);
          low[i] = parseFloat(Object.values(arr1[i])[2]);
          dates[i] = Dates [i];
          volume[i] = parseFloat(Object.values(arr1[i])[4])
        }


        console.log(open)
        this.setState({open:open.reverse(),
                       close:close.reverse(),
                        high:high.reverse(),
                        low:low.reverse(),
                        Dates: dates.reverse(),
                        volume: volume.reverse(),
                        loaded: true});

                        console.log(this.state.close, this.state.Dates, this.state.volume);
                      //  console.log(this.state.Dates);
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


  // if(this.state.cnnflag ===1) {
     
    // Data preperation and model training 
        const optimizer = tf.train.adam(this.state.learning_rate);
        const full_input_data = [];
        const full_target_data = this.state.close;
        const testing_data = [];
        const training_data = [];
        const training_output_data = [];
        const actual_data =[];
        let date_seconds = [];
        for (let i = 0; i < 1000; i++) {
          date_seconds.push(new Date(this.state.Dates[i] + 'T00:00:00.000').getTime())
          
        }
        var test_split_percent = this.state.test_split_percent;
        for(let k =0; k<1000;k++)
        { //full_input_data[k] = [date_seconds[k], this.state.open[k],this.state.high[k],this.state.low[k]];
          full_input_data[k] = [ this.state.open[k],this.state.high[k],this.state.low[k]];
        }

        console.log(date_seconds);
        console.log(full_input_data);
        console.log(full_target_data);

        var num_of_observations = full_input_data.length;
        if(num_of_observations !== full_target_data.length){
          this.setState({errormsg : "Input and target data have different number of observations"});
        }
        var num_of_test_observations = Math.round(num_of_observations * test_split_percent);
        var num_of_train_observations = num_of_observations - num_of_test_observations;

        var input_dimensions = full_input_data[0].length;
          console.log('model buiilding');
          console.log('trainset');
          console.log(full_input_data.slice(0,800));
          console.log('train output');
          console.log(this.state.close.slice(0,800));
          console.log('testset');
          console.log(full_input_data.slice(800,1000));
          console.log('test output');
          console.log(this.state.close.slice(800,1000));

        // Creating 2D tensor for input feature data
        var trainset = tf.tensor2d(full_input_data.slice(0,800));
        //var x_train = tf.tensor2d(full_input_data.slice(0,800));
        console.log(trainset);
        // Creating 2D tensor for output data
        var trainset_output = tf.tensor1d(this.state.close.slice(0,800));
        //var y_train = tf.tensor1d(this.state.close.slice(0,800));
        // Creating 2D tensor for test input data
        var testset = tf.tensor2d(full_input_data.slice(800,1000));
        //var x_test = tf.tensor2d(full_input_data.slice(800,1000));
        // Creating 2D tensor for test output data
        var testset_output = tf.tensor1d(this.state.close.slice(800,1000));
        //var y_test = tf.tensor1d(this.state.close.slice(800,1000),[200,1]);
        // // Normalisation of training data
        // let inputMax = x_train.max();
        // let inputMin = x_train.min();  
        // let labelMax = y_train.max();
        // let labelMin = y_train.min();    
        // let normalizedInputs = x_train.sub(inputMin).div(inputMax.sub(inputMin));
        // let normalizedLabels = y_train.sub(labelMin).div(labelMax.sub(labelMin));
        // // Normalisation of testing data
        // let x_test_inputMax = x_test.max();
        // let x_test_inputMin = x_test.min();  
        // let x_test_labelMax = x_test.max();
        // let x_test_labelMin = x_test.min();    
        // let x_test_normalizedInputs = x_test.sub(x_test_inputMin).div(x_test_inputMax.sub(x_test_inputMin));
        // let x_test_normalizedLabels = x_test.sub(x_test_labelMin).div(x_test_labelMax.sub(x_test_labelMin));

        // building the neural network
        let model = tf.sequential();
        model.add(tf.layers.dense({ inputShape : [3], activation :"relu", units : 5,}))
        model.add(tf.layers.dense({ inputShape : [100], activation :"relu", units : 6,}))
        model.add(tf.layers.dense({ inputShape : [100], activation :"relu", units : 5,}))
        model.add(tf.layers.dense({ inputShape : [100], activation :"relu", units : 4,}))
        model.add(tf.layers.dense({ inputShape : [50], activation :"relu", units : 3,}))
        model.add(tf.layers.dense({ inputShape : [3], activation :"relu", units : 1,}))
        //training the model
        await model.compile({loss: 'meanSquaredError', optimizer: optimizer, metrics: ['mse']});
        const startTime = Date.now();
        this.setState({errormsg:"Training the model..."});
        // await model.fit(trainset,trainset_output,
        //           {epochs: this.state.no_of_epochs, 
        //            callbacks: {
        //                         onEpochEnd: async(epoch)=>{
        //                           console.log("Epoch: "+ epoch );
        //                           await tf.nextFrame();
        //                         },
        //                    }
        //           })

                   await model.fit(trainset,trainset_output,
                    {epochs: this.state.no_of_epochs, 
                     // batchSize : 25,
                    validationSplit :  .2,
                    verbose : 1,
                     callbacks: {
                                  onEpochEnd: async(epoch, logs, onEpochProcessed)=>{
                                    console.log("Epoch " + epoch );
                                    await tf.nextFrame();
                                  },
                             }
                    })

                    .then(async (history) => {
                      this.setState({errormsg:"Model trained successfully"});
                      console.log('DONE !. it took ', Date.now() - startTime , ' milli seconds');
                      console.log(history); 
                      var resullt = await model.predict(testset, {batchSize:25});
                  //  console.log(await model.predict(trainset));
                      console.log(resullt.print());
                      var values = resullt.dataSync();
                      var arr_resullt = Array.from(values);
                      
                      console.log(values);
                      console.log(arr_resullt[0]);
                     
                      var arr_loss = Object.values(history['history']['loss']);
                      var arr_mse = Object.values(history['history']['mse']);
                      console.log(arr_loss);
                      console.log(arr_mse);
                      this.setState({ loss_arr : arr_loss,
                                      mse_arr : arr_mse,
                                      model_trained : 1});
            
                    })   
                    
                   // var testResult =await  model.evaluate(x_test, y_test);
                   // onFinished(testResult);
                  //console.log(Object.testResult.dataSync());

        // .then(async (history) => {
        //   this.setState({errormsg:"Model trained successfully"});
        //   console.log('DONE !. it took ', Date.now() - startTime , ' milli seconds');
        //   console.log(history); 
        //   var resullt = await model.predict(testset);
        // console.log(await model.predict(trainset));
        //   console.log(resullt.print());
        //   var values = resullt.dataSync();
        //   var arr_resullt = Array.from(values);
          
        //   console.log(values);
        //   console.log(arr_resullt[0]);
         
        //   var arr_loss = Object.values(history['history']['loss']);
        //   var arr_mse = Object.values(history['history']['mse']);
        //   console.log(arr_loss);
        //   console.log(arr_mse);
        //   this.setState({ loss_arr : arr_loss,
        //                   mse_arr : arr_mse,
        //                   model_trained : 1});

        // })

      //   trainset.dispose();
      //   trainset_output.dispose();
      //   testset.dispose();
      //   testset_output.dispose();
     // }
    }
  

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

   // let Speech_rec =  SpeechRecognition({autoStart: true, continuous: false})(Dictaphone);



    if(this.state.model_trained ===1)
    { 
            let data_hist =
                  {
                    labels :  this.state.Dates,
                    datasets: [
                            {
                    label: 'Price in US Dollars',
                    backgroundColor:[
                          'rgba(255, 0, 255, 0.6)',
                          'rgba(255, 0, 255, 0.6)',
                          'rgba(255, 0, 255, 0.6)',
                          'rgba(255, 0, 255, 0.6)',
                          'rgba(255, 0, 255, 0.6)',
                          'rgba(255, 0, 255, 0.6)',
                          'rgba(255, 0, 255, 0.6)',
                          'rgba(255, 0, 255, 0.6)'],
                    borderColor: 'rgba(255,50,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: this.state.close,
                    type: 'line',
                    fill: true
                  }]}
         hist_chart = [];
        hist_chart.push(  
              <div style={{display: 'inline-block',width: '650px',height: '325px',padding: '5px',margin:'5px' ,border: '2px solid blue'}}>
              <Line 
                   data ={data_hist}
                   options={{
                             responsive: true,
                             hoverMode: 'index',
                             title:{
                                 display:true,
                                 text:'Variation in Price',
                                 fontSize:25
                                   },
                             legend:{
                                 display:true,
                                 position:'right'
                                     },
                             animation: {
                                 duration: 3000,
                                 easing: 'easeInBounce',
                                       // onProgress: function(animation) {
                                       //    progress.value = animation.animationObject.currentStep / animation.animationObject.numSteps;
                                       // }
                                     },
                             scales: {
                                 yAxes: [{
                                     type: 'linear', 
                                     display: true,
                                     position: 'left',
                                       }]
                                   },
                                   tooltips: {
                                     mode: "label"
                                   }}} />
                                   </div>
            )
   


      let epoch_arr = [];
          for ( let u=1; u<this.state.no_of_epochs+1; u++ )
          {
            epoch_arr.push(u);
          }
      console.log(epoch_arr);
          let data_mse =
                {
                  labels :  epoch_arr,
                  datasets: [
                          {
                  label: 'Mean Square Error',
                  backgroundColor:[
                        'rgba(255, 0, 255, 0.6)',
                        'rgba(255, 0, 255, 0.6)',
                        'rgba(255, 0, 255, 0.6)',
                        'rgba(255, 0, 255, 0.6)',
                        'rgba(255, 0, 255, 0.6)',
                        'rgba(255, 0, 255, 0.6)',
                        'rgba(255, 0, 255, 0.6)',
                        'rgba(255, 0, 255, 0.6)'],
                  borderColor: 'rgba(255,50,132,1)',
                  borderWidth: 1,
                  hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                  hoverBorderColor: 'rgba(255,99,132,1)',
                  data: this.state.mse_arr,
                  type: 'line',
                  fill: true
                }]}
      loss_chart = [];
      loss_chart.push(  
            <div style={{display: 'inline-block',width: '650px',height: '325px',padding: '5px',margin:'5px' ,border: '2px solid blue'}}>
            <Line 
                 data ={data_mse}
                 options={{
                           responsive: true,
                           hoverMode: 'index',
                           title:{
                               display:true,
                               text:'Mean Square error  Vs  Epochs',
                               fontSize:25
                                 },
                           legend:{
                               display:true,
                               position:'right'
                                   },
                           animation: {
                               duration: 3000,
                               easing: 'easeInBounce',
                                     // onProgress: function(animation) {
                                     //    progress.value = animation.animationObject.currentStep / animation.animationObject.numSteps;
                                     // }
                                   },
                           scales: {
                               yAxes: [{
                                   type: 'linear', 
                                   display: true,
                                   position: 'left',
                                     }]
                                 },
                                 tooltips: {
                                   mode: "label"
                                 }}} />
                                 </div>
          )
    }



    


    return (
      <div>
        <header className="App-header">
          <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
            <div> 
           
            
            <div>
             <Speech_rec/>
            </div>
 <button onClick={this.confirm}>Confirm</button> 
            {/* <SpeechRecognition> {this.loadData.bind()}</SpeechRecognition> */}
            {/* {this.loadData} */}
              <p>{this.state.errormsg}</p>
              <p>{this.state.StockCode}</p>
              <p>{this.state.StockName}</p>
              <p>{this.state.final_transcript}</p>
              <p>{this.state.User_input_StockName}</p>

             
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
              <button onClick={this.wrapperFunction1}>Click</button>
                </div> 
                {loss_chart[0]} 
                {hist_chart[0]}       
            </div>
        </div>
      </header>    
      </div>
    );
  }}

export default App;
