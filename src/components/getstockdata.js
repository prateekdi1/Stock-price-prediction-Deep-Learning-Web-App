import React, {Component} from 'react';
import axios from 'axios';
import * as tf from "@tensorflow/tfjs";
import { meanSquaredError } from '@tensorflow/tfjs-core/dist/ops/loss_ops';
import { Optimizer } from '@tensorflow/tfjs';
//import "@tensorflow/tfjs-node";
// import ReactDOM from "react-dom";

export default class StockData extends React.Component {
    
    state ={
        open: [],
        close :[],
        high : [],
        low : [],
        loaded: false,
        errormsg:'',
        StcokCode: '' 
    }

    gettingdata = async (e)=>{
        this.setState({ errormsg: "Loading the data...",
                        StcokCode:e.target.elements.Stcokcode.value});
        // try{
        //     e.preventDefault();
            // const StcokCode=e.target.elements.Stcokcode.value;
        console.log("executing....");
        let open= [];
        let close = [];
        let high = [];
        let low = [];

        // const api_call = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&outputsize=full&apikey=demo`);
        // const rawData =  api_call.json();
        // console.log(rawData);

        // axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&outputsize=full&apikey=demo`)
        // .then(res => {
        // console.log(res);
        // const rawData = res;
    //     console.log(rawData.data['Time Series (Daily)']['2019-06-20']);
    //     var arr1 = Object.values(rawData.data['Time Series (Daily)']);
    //     console.log(arr1);
    //     console.log(Object.values(arr1[0]));

    //     for(let i =0; i<500;i++)
    //     { open[i] = Object.values(arr1[i])[0];
    //       close[i] = Object.values(arr1[i])[3];  
    //       high[i] = Object.values(arr1[i])[1];
    //       low[i] = Object.values(arr1[i])[2];
    //     }
    //     console.log(open)
    //     this.setState({open:open.reverse(),
    //                    close:close.reverse(),
    //                     high:high.reverse(),
    //                     low:low.reverse(),
    //                     loaded: true});

    //                     console.log(this.state.open);
    //     }
    // )
                        // catch (e) {
                        //     this.setState({errormsg:"Data not fetched"});
                        //   }

        // Data preperation and model training
        
            // const testing_data = [this.state.open.slice(400,500),this.state.high.slice(400,500),this.state.low.slice(400,500)];
            // console.log(testing_data);
            // const training_data = [this.state.open.slice(0,400),this.state.high.slice(0,400),this.state.low.slice(0,400)];
            // console.log(training_data);
            // const training_output_data = this.state.close.slice(0,400);
            // console.log(training_output_data);
            // const actual_data = this.state.close.slice(400,500);
            // console.log(actual_data);

            // const model = tf.sequential();
            // model.add(tf.layers.dense({units:1,
            //                            inputShape: [3] }));

            // model.compile({
            //     loss:'meanSquaredError',
            //     Optimizer:'sgd'
            // });

            // const tf_training_data = tf.tensor2d(training_data, [400,3]);
            // const tf_outputdata = tf.tensor2d(training_output_data, [400,1]);
            // const tf_testing_data = tf.tensor2d(testing_data, [100,3]);

            // await model.fit (tf_training_data,tf_outputdata, {epochs:200});
            // const testing_result = model.predict(tf_testing_data);
            // console.log(testing_result);
            // console.log(actual_data);
        }
        // else
        // {
        //     this.setState ({errormsg:"There was problem in loading the source data"});

        // }
    

        wrapperFunction = (event) => {
            this.gettingdata(event);

        }
     

    render()
    {
        return(
            <div> 
            <p>{this.state.errormsg}.</p>
            <form onSubmit = {this.wrapperFunction}>
            <input type="text" name="Stcokcode" placeholder="Stock Code"/>
            <button className="button">get</button>
            </form>
            </div>
        )
    }
}  